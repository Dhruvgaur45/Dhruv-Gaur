import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import os from "os";
import * as adminDb from "./server/adminDb";

// Load environment variables
dotenv.config();

// Helper helper to send email notification using nodemailer
async function sendContactEmail(name: string, email: string, message: string) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(
      `[Nodemailer Warning] SMTP environment variables are not fully configured. ` +
      `Please define SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your environment secrets to send real emails.\n` +
      `Parsed contact submission:\n- Name: ${name}\n- Email: ${email}\n- Message: ${message}`
    );
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false for 587 or other ports
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${user}>`, // Use SMTP sender envelope to ensure deliverability
    replyTo: email, // Direct replies back to the contact form sender
    to: "dggaur385@gmail.com",
    subject: `[PORTFOLIO CONTACT] New Message from ${name}`,
    text: `
Hello Dhruv Gaur,

You have received a new contact submission from your portfolio website.

-----------------------------------------
SENDER DETAILS:
- Name: ${name}
- Email: ${email}
-----------------------------------------

MESSAGE:
${message}

-----------------------------------------
This message was safely recorded via the Biotech Curator API.
`,
    html: `
      <div style="font-family: sans-serif; padding: 25px; color: #1a1a1a; max-width: 600px; border: 2px solid #1a1a1a; background-color: #FAFAFA;">
        <h2 style="color: #E5422B; border-bottom: 2px solid #1a1a1a; padding-bottom: 12px; text-transform: uppercase; font-size: 16px; font-family: monospace; letter-spacing: 2px; margin-top: 0;">
          [PORTFOLIO INBOX MESSAGE]
        </h2>
        <p style="font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
          Hello Dhruv, you have received a new contact inquiry from your portfolio curator website.
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 10px 0; font-weight: bold; width: 110px; font-size: 11px; font-family: monospace; color: #E5422B; letter-spacing: 1px;">SENDER NAME:</td>
            <td style="padding: 10px 0; font-size: 13px; font-family: sans-serif; border-bottom: 1px solid #EAEAEA;"><strong>${name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; font-size: 11px; font-family: monospace; color: #E5422B; letter-spacing: 1px;">EMAIL ADDR:</td>
            <td style="padding: 10px 0; font-size: 13px; font-family: sans-serif; border-bottom: 1px solid #EAEAEA;"><a href="mailto:${email}" style="color: #1a1a1a; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 15px 0 10px 0; font-weight: bold; font-size: 11px; font-family: monospace; color: #E5422B; letter-spacing: 1px; vertical-align: top;">MESSAGE:</td>
            <td style="padding: 15px 0 10px 0; font-size: 14px; font-family: sans-serif; white-space: pre-wrap; line-height: 1.6;">${message}</td>
          </tr>
        </table>
        
        <div style="font-size: 9px; color: #888; font-family: monospace; border-top: 2px solid #1a1a1a; padding-top: 15px; letter-spacing: 1px; text-transform: uppercase;">
          SYSTEM METADATA // DISPATCHED AUTOMATICALLY VIA PORTFOLIO SERVER ENGINE
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer Dispatch] Notification successfully sent to dggaur385@gmail.com. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("[Nodemailer Error] Failed to dispatch email via SMTP:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware for parsing request bodies
  app.use(express.json());

  // ==========================================
  // --- ADMIN PORTAL SECURE CONTROL API ---
  // ==========================================

  // Admin and normal visitor status check (maintenance & tab gates)
  app.get("/api/admin/status", async (req, res) => {
    try {
      const clientTime = req.query.clientTime as string || undefined;
      const maintenance = await adminDb.getMaintenance(clientTime);
      const tabs = await adminDb.getTabs(clientTime);
      res.json({ maintenance, tabs });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to load site systems status." });
    }
  });

  // Admin login credential authority
  app.post("/api/admin/login", async (req, res) => {
    const { email, passcode } = req.body;
    if (!email || !passcode) {
      return res.status(400).json({ error: "Email address and passcode credentials are required." });
    }

    try {
      const admins = await adminDb.getAdmins();
      const match = admins.find(a => a.email.trim().toLowerCase() === email.trim().toLowerCase() && a.passcode === passcode);
      if (!match) {
        return res.status(401).json({ error: "CRYPTOGRAPHIC REJECTION: Credentials do not match current secure directories. Access denied." });
      }

      await adminDb.addAuditLog(match.name, "LOGIN_AUTHORIZED", "ADMIN_AUTH", `Admin successfully authenticated with raw security credentials. Role: ${match.role}`);

      res.json({
        success: true,
        admin: {
          id: match.id,
          email: match.email,
          role: match.role,
          name: match.name
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: "Login authentication compiler error: " + err.message });
    }
  });

  // Admin dashboard metrics aggregation
  app.get("/api/admin/dashboard", async (req, res) => {
    try {
      const clientTime = req.query.clientTime as string || undefined;
      const users = await adminDb.getUsers();
      const complaints = await adminDb.getComplaints();
      const tabs = await adminDb.getTabs(clientTime);
      const maintenance = await adminDb.getMaintenance(clientTime);

      const totalUsers = users.length;
      const activeUsers = users.filter(u => u.status === "Active").length;
      const blockedUsers = users.filter(u => u.status === "Blocked").length;

      const totalComplaints = complaints.length;
      const pendingComplaints = complaints.filter(c => c.status === "Pending").length;
      const inProgressComplaints = complaints.filter(c => c.status === "In Progress").length;
      const resolvedComplaints = complaints.filter(c => c.status === "Resolved").length;
      const rejectedComplaints = complaints.filter(c => c.status === "Rejected").length;

      const closedTabsCount = tabs.filter(t => t.status === "Temporarily Closed").length;

      res.json({
        metrics: {
          totalUsers,
          activeUsers,
          blockedUsers,
          totalComplaints,
          pendingComplaints,
          inProgressComplaints,
          resolvedComplaints,
          rejectedComplaints,
          closedTabsCount,
          isMaintenanceEnabled: maintenance.enabled
        },
        systemStats: {
          uptimeSeconds: Math.round((Date.now() - serverStartTime) / 1000),
          freeMemBytes: os.freemem(),
          totalMemBytes: os.totalmem(),
          cpuCount: os.cpus().length,
          loadAvg: os.loadavg()
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: "Internal dashboard compiler failure: " + err.message });
    }
  });

  // User Management routes
  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = await adminDb.getUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to read user directory." });
    }
  });

  app.post("/api/admin/users/block", async (req, res) => {
    const { userId, adminName } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId parameter is required." });
    }
    try {
      const users = await adminDb.getUsers();
      const index = users.findIndex(u => u.id === userId);
      if (index === -1) {
        return res.status(404).json({ error: "User record not found." });
      }

      const originalStatus = users[index].status;
      const newStatus = originalStatus === "Active" ? "Blocked" : "Active";
      users[index].status = newStatus;
      users[index].activity = `Systems administrator manually toggled status to ${newStatus}`;
      users[index].lastActive = new Date().toISOString();

      await adminDb.saveUsers(users);
      await adminDb.addAuditLog(
        adminName || "Admin Auditor", 
        newStatus === "Blocked" ? "BLOCK_USER" : "UNBLOCK_USER", 
        "USERS", 
        `User ${users[index].username} (${users[index].email}) status toggled and recorded as ${newStatus}.`
      );

      res.json({ success: true, user: users[index] });
    } catch (err: any) {
      res.status(500).json({ error: "User status update compiler error: " + err.message });
    }
  });

  app.delete("/api/admin/users/:id", async (req, res) => {
    const { id } = req.params;
    const adminName = (req.query.adminName as string) || "Admin Auditor";
    try {
      const users = await adminDb.getUsers();
      const match = users.find(u => u.id === id);
      if (!match) {
        return res.status(404).json({ error: "User record not found in system." });
      }
      const filtered = users.filter(u => u.id !== id);
      await adminDb.saveUsers(filtered);

      await adminDb.addAuditLog(
        adminName,
        "DELETE_USER",
        "USERS",
        `Permanently purged user ${match.username} (${match.email}) from general directory.`
      );
      res.json({ success: true, message: "User deleted successfully." });
    } catch (err: any) {
      res.status(500).json({ error: "PURGE FAILED: " + err.message });
    }
  });

  // Tab Control System
  app.get("/api/admin/tabs", async (req, res) => {
    try {
      const clientTime = req.query.clientTime as string || undefined;
      const tabs = await adminDb.getTabs(clientTime);
      res.json(tabs);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to read tab configurations." });
    }
  });

  app.post("/api/admin/tabs", async (req, res) => {
    const { tabId, status, reason, startTime, endTime, message, adminName } = req.body;
    if (!tabId || !status) {
      return res.status(400).json({ error: "tabId and status are required fields." });
    }

    if (status === "Temporarily Closed") {
      if (startTime && endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (end <= start) {
          return res.status(400).json({ error: "VALIDATION REJECTION: End time must be strictly after start time." });
        }
      }
    }

    try {
      const tabs = await adminDb.getTabs();
      const index = tabs.findIndex(t => t.id === tabId);
      if (index === -1) {
        return res.status(404).json({ error: "Specified section/tab not found." });
      }

      tabs[index] = {
        ...tabs[index],
        status,
        reason: reason || "",
        startTime: startTime || "",
        endTime: endTime || "",
        message: message || "This section is temporarily unavailable due to rework. Please check again later."
      };

      await adminDb.saveTabs(tabs);
      await adminDb.addAuditLog(
        adminName || "Admin Control",
        status === "Temporarily Closed" ? "CLOSE_TAB" : "OPEN_TAB",
        "TAB_SYSTEM",
        `Section/Tab '${tabs[index].name}' status set to '${status}'. Reason: ${reason || "None specified"}`
      );

      res.json({ success: true, tab: tabs[index] });
    } catch (err: any) {
      res.status(500).json({ error: "Tab control adjustment failed: " + err.message });
    }
  });

  // Maintenance Mode Control
  app.get("/api/admin/maintenance", async (req, res) => {
    try {
      const clientTime = req.query.clientTime as string || undefined;
      const maintenance = await adminDb.getMaintenance(clientTime);
      res.json(maintenance);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to read maintenance telemetry." });
    }
  });

  app.post("/api/admin/maintenance", async (req, res) => {
    const { enabled, startTime, endTime, reason, customMessage, adminName } = req.body;

    if (enabled) {
      if (startTime && endTime) {
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (end <= start) {
          return res.status(400).json({ error: "VALIDATION REJECTION: Maintenance end time must remain strictly after start time." });
        }
      }
    }

    try {
      const currentMaintenance = await adminDb.getMaintenance();
      const updatedMaintenance: adminDb.MaintenanceMode = {
        enabled: !!enabled,
        startTime: startTime || "",
        endTime: endTime || "",
        reason: reason || "High capacity software performance tuning",
        customMessage: customMessage || "The app is currently under maintenance. Please try again after the scheduled time."
      };

      await adminDb.saveMaintenance(updatedMaintenance);
      await adminDb.addAuditLog(
        adminName || "Admin Control",
        enabled ? "ENABLE_MAINTENANCE" : "DISABLE_MAINTENANCE",
        "MAINTENANCE",
        `Systems broad maintenance toggled to: ${enabled ? 'ACTIVE' : 'INACTIVE'}. Reasoning: ${reason || "N/A"}`
      );

      res.json({ success: true, maintenance: updatedMaintenance });
    } catch (err: any) {
      res.status(500).json({ error: "Maintenance mode configuration gate failed: " + err.message });
    }
  });

  // Complaint/Issue Management routes
  app.get("/api/admin/complaints", async (req, res) => {
    try {
      const complaints = await adminDb.getComplaints();
      res.json(complaints);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to compile issues database." });
    }
  });

  app.post("/api/admin/complaints", async (req, res) => {
    const { subject, description, userName, userEmail } = req.body;
    if (!subject || !description) {
      return res.status(400).json({ error: "Subject and description of the complaint are required." });
    }
    try {
      const complaints = await adminDb.getComplaints();
      const newComplaint: adminDb.Complaint = {
        id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        subject,
        description,
        status: "Pending",
        assignedTo: "Unassigned",
        remarks: "",
        timestamp: new Date().toISOString(),
        userName: userName || "Anonymous Recruiter",
        userEmail: userEmail || "anonymous@hire-elite.org"
      };

      complaints.unshift(newComplaint);
      await adminDb.saveComplaints(complaints);
      res.status(201).json({ success: true, complaint: newComplaint });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to store customer complaint: " + err.message });
    }
  });

  app.post("/api/admin/complaints/:id/statusAndAssign", async (req, res) => {
    const { id } = req.params;
    const { status, assignedTo, remarks, adminName } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status represents a required field." });
    }

    try {
      const complaints = await adminDb.getComplaints();
      const idx = complaints.findIndex(c => c.id === id);
      if (idx === -1) {
        return res.status(404).json({ error: "Complaint record not found." });
      }

      complaints[idx].status = status;
      if (assignedTo !== undefined) complaints[idx].assignedTo = assignedTo;
      if (remarks !== undefined) complaints[idx].remarks = remarks;

      await adminDb.saveComplaints(complaints);
      await adminDb.addAuditLog(
        adminName || "Moderator Panel",
        "UPDATE_COMPLAINT",
        "COMPLAINT_SYSTEM",
        `Complaint ID '${id}' set status to '${status}' and assigned to '${complaints[idx].assignedTo || 'None'}'.`
      );

      res.json({ success: true, complaint: complaints[idx] });
    } catch (err: any) {
      res.status(500).json({ error: "Complaint update compiler failed: " + err.message });
    }
  });

  // Admin Notification Push Simulator
  app.get("/api/admin/notifications", async (req, res) => {
    try {
      const notifications = await adminDb.getNotifications();
      res.json(notifications);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to fetch notifications." });
    }
  });

  app.post("/api/admin/notifications", async (req, res) => {
    const { message, type, target, adminName } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Notification content message is required." });
    }
    try {
      const list = await adminDb.getNotifications();
      const incomingNotif: adminDb.AdminNotification = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        message,
        type: type || "info",
        target: target || "all",
        timestamp: new Date().toISOString()
      };

      list.unshift(incomingNotif);
      await adminDb.saveNotifications(list);

      await adminDb.addAuditLog(
        adminName || "Broadcaster",
        "PUSH_NOTIFICATION",
        "NOTIFICATIONS",
        `Dispatched broad portal alert. Target: ${target || 'all'}. Message: "${message}"`
      );

      res.status(201).json({ success: true, notification: incomingNotif });
    } catch (err: any) {
      res.status(500).json({ error: "Broadcast engine failure: " + err.message });
    }
  });

  // Audit Logs Route
  app.get("/api/admin/audit-logs", async (req, res) => {
    try {
      const logs = await adminDb.getAuditLogs();
      res.json(logs);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to read system audit records." });
    }
  });

  // --- TRAFFIC & PERFORMANCE DIAGNOSTICS MONITOR CORE ---
  const trafficMetrics = {
    totalRequests: 0,
    statusCodes: {
      "2xx": 0,
      "3xx": 0,
      "4xx": 0,
      "5xx": 0
    },
    methods: {} as Record<string, number>,
    totalResponseTime: 0,
    averageLatencyMs: 0,
    recentRequests: [] as Array<{
      id: string;
      timestamp: string;
      method: string;
      url: string;
      status: number;
      latencyMs: number;
    }>
  };

  const serverStartTime = Date.now();

  // Track request metrics in Express middleware
  app.use((req, res, next) => {
    // Skip static assets or Vite HMR channels to avoid bloating logs
    if (
      req.url.startsWith("/@") || 
      req.url.includes("hot-update") || 
      req.url.includes("node_modules") || 
      req.url.startsWith("/src/") ||
      req.url.startsWith("/assets/") ||
      req.url.includes("favicon") ||
      req.url.includes(".css") ||
      req.url.includes(".js") ||
      req.url.includes(".png") ||
      req.url.includes(".jpg") ||
      req.url.includes(".svg")
    ) {
      return next();
    }

    const startHr = process.hrtime();
    trafficMetrics.totalRequests++;
    
    trafficMetrics.methods[req.method] = (trafficMetrics.methods[req.method] || 0) + 1;

    res.on("finish", () => {
      const diffHr = process.hrtime(startHr);
      const latencyMs = Math.round((diffHr[0] * 1e3 + diffHr[1] * 1e-6) * 100) / 100;

      const statusGroup = `${Math.floor(res.statusCode / 100)}xx`;
      if (statusGroup in trafficMetrics.statusCodes) {
        trafficMetrics.statusCodes[statusGroup as keyof typeof trafficMetrics.statusCodes]++;
      }

      trafficMetrics.totalResponseTime += latencyMs;
      trafficMetrics.averageLatencyMs = Math.round((trafficMetrics.totalResponseTime / trafficMetrics.totalRequests) * 100) / 100;

      // Add request details to rolling list
      trafficMetrics.recentRequests.unshift({
        id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        status: res.statusCode,
        latencyMs
      });

      if (trafficMetrics.recentRequests.length > 50) {
        trafficMetrics.recentRequests.pop();
      }
    });

    next();
  });

  // API - Get Traffic Telemetry & Real-Time Server Health
  app.get("/api/traffic/stats", (req, res) => {
    try {
      const freeMem = os.freemem();
      const totalMem = os.totalmem();
      const sysUptime = os.uptime();
      const processMemory = process.memoryUsage();

      res.json({
        uptimeSeconds: Math.round((Date.now() - serverStartTime) / 1000),
        systemUptimeSeconds: sysUptime,
        systemCpuCount: os.cpus().length,
        systemCpuModel: os.cpus()[0]?.model || "Unknown",
        systemLoadAverage: os.loadavg(),
        memory: {
          freeBytes: freeMem,
          totalBytes: totalMem,
          processRssBytes: processMemory.rss,
          processHeapTotalBytes: processMemory.heapTotal,
          processHeapUsedBytes: processMemory.heapUsed
        },
        metrics: {
          totalRequests: trafficMetrics.totalRequests,
          statusCodes: trafficMetrics.statusCodes,
          methods: trafficMetrics.methods,
          averageLatencyMs: trafficMetrics.averageLatencyMs || 0
        },
        recentRequests: trafficMetrics.recentRequests
      });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to read server statistics: " + err.message });
    }
  });

  // API - High-Workload Traffic Stress Target
  app.get("/api/traffic/stress", async (req, res) => {
    const delay = parseInt(req.query.delayMs as string, 10) || 0;
    const loadFactor = parseInt(req.query.loadFactor as string, 10) || 0;

    let computationResult = 0;
    if (loadFactor > 0) {
      // Safe prime numbers calculation payload to test standard CPU workloads
      const limit = Math.min(loadFactor, 850000); // capped to avoid hanging Cloud Run instance
      let count = 0;
      for (let i = 2; i <= limit; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
          if (i % j === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) count++;
      }
      computationResult = count;
    }

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 5000)));
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      computationResult,
      delayAppliedMs: delay,
      loadFactorApplied: loadFactor
    });
  });

  // API - Reset Telemetry metrics
  app.post("/api/traffic/reset", (req, res) => {
    trafficMetrics.totalRequests = 0;
    trafficMetrics.totalResponseTime = 0;
    trafficMetrics.averageLatencyMs = 0;
    trafficMetrics.statusCodes["2xx"] = 0;
    trafficMetrics.statusCodes["3xx"] = 0;
    trafficMetrics.statusCodes["4xx"] = 0;
    trafficMetrics.statusCodes["5xx"] = 0;
    trafficMetrics.methods = {};
    trafficMetrics.recentRequests = [];
    res.json({ success: true, message: "Telemetry pipeline reset successfully" });
  });

  // Path to the JSON contact submissions storage
  const dataDir = path.join(process.cwd(), "data");
  const submissionsFile = path.join(dataDir, "submissions.json");

  // Ensure database directory exists
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (err) {
    console.error("Error creating data directory:", err);
  }

  // Helper to read submissions
  async function readSubmissions() {
    try {
      const content = await fs.readFile(submissionsFile, "utf-8");
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  // Helper to write submissions
  async function writeSubmissions(submissions: any[]) {
    await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2), "utf-8");
  }

  // API Route - Get all contact submissions
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await readSubmissions();
      // Sort newest first
      submissions.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      res.json(submissions);
    } catch (err) {
      console.error("Error reading submissions:", err);
      res.status(500).json({ error: "Failed to read contact submissions logs" });
    }
  });

  // API Route - Save new contact submission record
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required fields." });
    }

    try {
      const submissions = await readSubmissions();
      const newSubmission = {
        id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      };

      submissions.push(newSubmission);
      await writeSubmissions(submissions);

      console.log(`[Message Record System] New submission saved for Dhruv Gaur:`, newSubmission);

      // Asynchronously trigger Nodemailer dispatch to stay responsive
      sendContactEmail(name, email, message).catch((err) => {
        console.error("[Nodemailer Async Alert] Failed to dispatch background email:", err);
      });

      res.status(201).json({
        success: true,
        message: "Message successfully recorded in database archive.",
        submission: newSubmission
      });
    } catch (err) {
      console.error("Error saving submission:", err);
      res.status(500).json({ error: "Failed to compile message database record." });
    }
  });

  // Path to the JSON custom cert images storage
  const certImagesFile = path.join(dataDir, "custom_cert_images.json");

  // Helper to read custom cert images
  async function readCertImages() {
    try {
      const content = await fs.readFile(certImagesFile, "utf-8");
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  // Helper to write custom cert images
  async function writeCertImages(data: any) {
    await fs.writeFile(certImagesFile, JSON.stringify(data, null, 2), "utf-8");
  }

  // API Route - Get all persistent custom cert images
  app.get("/api/custom-certs", async (req, res) => {
    try {
      const data = await readCertImages();
      res.json(data);
    } catch (err) {
      console.error("Error reading custom cert images:", err);
      res.status(500).json({ error: "Failed to read custom certification images archive" });
    }
  });

  // API Route - Save/Update a custom cert image
  app.post("/api/custom-certs", async (req, res) => {
    const { id, base64 } = req.body;

    if (!id || !base64) {
      return res.status(400).json({ error: "id and base64 string are required." });
    }

    try {
      const data = await readCertImages();
      data[id] = base64;
      await writeCertImages(data);
      console.log(`[Image Record System] New certificate image saved permanently for: ${id}`);
      res.json({ success: true, message: "Certificate image successfully saved to server archive." });
    } catch (err) {
      console.error("Error saving custom cert image:", err);
      res.status(500).json({ error: "Failed to persist certificate image record." });
    }
  });

  // API Route - Delete a custom cert image
  app.delete("/api/custom-certs/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const data = await readCertImages();
      if (data[id]) {
        delete data[id];
        await writeCertImages(data);
        console.log(`[Image Record System] Certificate image deleted permanently for: ${id}`);
      }
      res.json({ success: true, message: "Certificate image successfully deleted from server archive." });
    } catch (err) {
      console.error("Error deleting custom cert image:", err);
      res.status(500).json({ error: "Failed to delete certificate image record." });
    }
  });

  // API Route - Delete contact submission record
  app.delete("/api/contact/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const submissions = await readSubmissions();
      const filtered = submissions.filter((sub: any) => sub.id !== id);
      await writeSubmissions(filtered);
      res.json({ success: true, message: "Submission successfully deleted." });
    } catch (err) {
      console.error("Error deleting submission:", err);
      res.status(500).json({ error: "Failed to delete submission record." });
    }
  });

  // --- GITHUB OAUTH AND PROFILE PORTAL CHANNELS ---
  
  const githubFile = path.join(dataDir, "github.json");
  
  async function readGithubData() {
    try {
      const content = await fs.readFile(githubFile, "utf-8");
      return JSON.parse(content);
    } catch {
      return {
        isConnected: false,
        accessToken: null,
        username: "dggaur385", // Default username to show Dhruv's data initially
        userProfile: null,
        repositories: [],
        lastUpdated: null
      };
    }
  }
  
  async function writeGithubData(data: any) {
    await fs.writeFile(githubFile, JSON.stringify(data, null, 2), "utf-8");
  }
  
  async function fetchGithubProfileAndRepos(token: string | null, username: string) {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github+json",
      "User-Agent": "Dhruv-Gaur-Portfolio-Agent"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  
    // 1. Fetch user profile
    const profileUrl = token ? "https://api.github.com/user" : `https://api.github.com/users/${encodeURIComponent(username)}`;
    const profileRes = await fetch(profileUrl, { headers });
    if (!profileRes.ok) {
      throw new Error(`Failed to fetch profile: ${profileRes.statusText} (${profileRes.status})`);
    }
    const profile = await profileRes.json();
  
    // 2. Fetch user repos
    const reposUrl = token ? "https://api.github.com/user/repos?sort=updated&per_page=12" : `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`;
    const reposRes = await fetch(reposUrl, { headers });
    if (!reposRes.ok) {
      throw new Error(`Failed to fetch repos: ${reposRes.statusText} (${reposRes.status})`);
    }
    const repos = await reposRes.json();
  
    return {
      profile,
      repos: Array.isArray(repos) ? repos.map((r: any) => ({
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        language: r.language,
        updated_at: r.updated_at,
      })) : []
    };
  }

  // API Route - Get current GitHub portal state (cached)
  app.get("/api/github/profile", async (req, res) => {
    try {
      const githubData = await readGithubData();
      
      const cacheAge = githubData.lastUpdated ? Date.now() - new Date(githubData.lastUpdated).getTime() : Infinity;
      // Refresh cache if older than 30 minutes, or if we have no profile details yet
      if (!githubData.userProfile || cacheAge > 1000 * 60 * 30) {
        try {
          const result = await fetchGithubProfileAndRepos(githubData.accessToken, githubData.username || "dggaur385");
          githubData.isConnected = !!githubData.accessToken;
          githubData.userProfile = result.profile;
          githubData.repositories = result.repos;
          githubData.lastUpdated = new Date().toISOString();
          await writeGithubData(githubData);
        } catch (err: any) {
          console.warn("[GitHub API Sync Warning] Could not refresh GitHub details:", err.message);
          // If rate limit exceeded (403), prevent retry for 2 hours
          if (err.message.includes("403") || err.message.includes("rate limit")) {
            githubData.lastUpdated = new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString();
            await writeGithubData(githubData);
          }
        }
      }
      
      res.json(githubData);
    } catch (err) {
      console.error("Error reading github state:", err);
      res.status(500).json({ error: "Failed to read GitHub profile state" });
    }
  });

  // API Route - Set public GitHub username (loads publicly without OAuth)
  app.post("/api/github/username", async (req, res) => {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    try {
      const githubData = await readGithubData();
      githubData.username = username;
      githubData.accessToken = null; // Clear token since we're pointing to a custom username
      githubData.isConnected = false;
      
      const result = await fetchGithubProfileAndRepos(null, username);
      githubData.userProfile = result.profile;
      githubData.repositories = result.repos;
      githubData.lastUpdated = new Date().toISOString();
      await writeGithubData(githubData);
      
      res.json(githubData);
    } catch (err: any) {
      console.error("Error setting custom GitHub username:", err);
      res.status(400).json({ error: `Failed to load GitHub data: ${err.message}` });
    }
  });

  // API Route - Trigger OAuth Authorize URL creation
  app.get("/api/auth/github/url", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: "GITHUB_CLIENT_ID environment variable is not defined" });
    }
    
    // Detect callback origin
    const origin = (req.query.origin as string) || "https://ais-dev-scclakdldlsuxpspxxajga-688291315470.asia-east1.run.app";
    const redirectUri = `${origin}/auth/callback`;
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "read:user repo",
    });
    
    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
    res.json({ url: authUrl });
  });

  // API Route - OAuth callback URL (supports both trailing slash variations)
  app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
    const { code } = req.query;
    if (!code) {
      return res.send(`
        <html>
          <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f9fafb; margin: 0; color: #111827;">
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: center;">
              <h3 style="color: #ef4444; margin-top: 0;">OAuth Parameter Missing</h3>
              <p>No authorization code received from GitHub.</p>
              <button onclick="window.close()" style="padding: 8px 16px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer;">Close Window</button>
            </div>
          </body>
        </html>
      `);
    }
    
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      return res.send(`
        <html>
          <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f9fafb; margin: 0; color: #111827;">
            <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center; max-width: 450px;">
              <h3 style="color: #ef4444; margin-top: 0; text-transform: uppercase; font-family: monospace;">Environment Configuration Required</h3>
              <p style="font-size: 14px; text-align: left; line-height: 1.5; color: #4b5563; margin-bottom: 20px;">
                GitHub credentials are not yet configured in your AI Studio secrets environment. Please define:
                <br/><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 5px;">GITHUB_CLIENT_ID</code>
                <br/><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 5px;">GITHUB_CLIENT_SECRET</code>
              </p>
              <p style="font-size: 12px; font-family: monospace; color: #6b7280; text-align: left; background: #f9fafb; border: 1px solid #e5e7eb; padding: 10px; border-radius: 6px;">
                Homepage URL: <br/><strong>https://ais-dev-scclakdldlsuxpspxxajga-688291315470.asia-east1.run.app</strong>
                <br/><br/>
                Authorization Callback URL: <br/><strong>https://ais-dev-scclakdldlsuxpspxxajga-688291315470.asia-east1.run.app/auth/callback</strong>
              </p>
              <button onclick="window.close()" style="padding: 10px 16px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 12px; width: 100%; font-weight: 600;">Close Window</button>
            </div>
          </body>
        </html>
      `);
    }
    
    try {
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code
        })
      });
      
      if (!tokenResponse.ok) {
        throw new Error(`Token exchange failed with status: ${tokenResponse.statusText}`);
      }
      
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      
      if (!accessToken) {
        throw new Error(`No access token returned from GitHub: ${JSON.stringify(tokenData)}`);
      }
      
      // Query profile details and recent repositories
      const result = await fetchGithubProfileAndRepos(accessToken, "");
      const username = result.profile.login;
      
      const githubData = {
        isConnected: true,
        accessToken: accessToken,
        username: username,
        userProfile: result.profile,
        repositories: result.repos,
        lastUpdated: new Date().toISOString()
      };
      await writeGithubData(githubData);
      
      console.log(`[GitHub Portal] Successfully authenticated user: ${username}`);
      
      res.send(`
        <html>
          <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f9fafb; margin: 0; color: #111827;">
            <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; text-align: center; max-width: 400px;">
              <div style="width: 64px; height: 64px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 32px;">✓</div>
              <h2 style="margin: 0 0 8px; font-weight: 700; font-size: 20px;">Link Successful!</h2>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0 0 24px;">Successfully linked profile <strong>${username}</strong>. Closing popup dynamically...</p>
              <script>
                if (window.opener) {
                  window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                }
                setTimeout(() => { window.close(); }, 1200);
              </script>
              <button onclick="window.close()" style="padding: 10px 24px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; width: 100%;">Close Window</button>
            </div>
          </body>
        </html>
      `);
    } catch (err: any) {
      console.error("Error during GitHub OAuth exchange:", err);
      res.send(`
        <html>
          <body style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f9fafb; margin: 0;">
            <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center; max-width: 400px; border: 1px solid #ef4444;">
              <h3 style="color: #ef4444; margin-top: 0;">Authentication Error</h3>
              <p style="font-size: 14px; color: #4b5563; line-height: 1.5;">${err.message || "An unresolved exception occurred during token verification."}</p>
              <button onclick="window.close()" style="padding: 10px 24px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; width: 100%; font-weight: 600; margin-top: 12px;">Close</button>
            </div>
          </body>
        </html>
      `);
    }
  });

  // API Route - Disconnect linked GitHub account
  app.post("/api/github/disconnect", async (req, res) => {
    try {
      const githubData = await readGithubData();
      githubData.isConnected = false;
      githubData.accessToken = null;
      githubData.lastUpdated = null;
      // Retain the username so it falls back to public profiling
      try {
        const result = await fetchGithubProfileAndRepos(null, githubData.username || "dggaur385");
        githubData.userProfile = result.profile;
        githubData.repositories = result.repos;
        githubData.lastUpdated = new Date().toISOString();
      } catch (err) {
        githubData.userProfile = null;
        githubData.repositories = [];
      }
      await writeGithubData(githubData);
      res.json(githubData);
    } catch (err) {
      res.status(500).json({ error: "Failed to disconnect account." });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Biotech Curator API" });
  });

  // Vite middleware for dev or Static asset serving in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted successfully");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static assets from", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal server bootstrap error:", err);
});
