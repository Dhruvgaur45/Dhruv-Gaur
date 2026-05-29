import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
