import fs from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export interface Admin {
  id: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  passcode: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  status: "Active" | "Blocked";
  activity: string;
  lastActive: string;
}

export interface TabStatus {
  id: string; // tab/section name
  name: string;
  status: "Active" | "Temporarily Closed";
  reason: string;
  startTime: string;
  endTime: string;
  message: string;
}

export interface MaintenanceMode {
  enabled: boolean;
  startTime: string;
  endTime: string;
  reason: string;
  customMessage: string;
}

export interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
  assignedTo: string;
  remarks: string;
  timestamp: string;
  userName: string;
  userEmail: string;
}

export interface AdminNotification {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
  target: "all" | string; // 'all' or userId
  timestamp: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  actionType: string;
  affectedModule: string;
  timestamp: string;
  details: string;
}

// Ensure database directory exists on load
async function ensureDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (err) {
    console.error("Error creating data directory:", err);
  }
}

// Generic file reading & writing
async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(dataDir, filename);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    await writeJsonFile(filename, defaultValue);
    return defaultValue;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDir();
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Sample database data seeds
const initialAdmins: Admin[] = [
  { id: "adm-1", email: "dggaur385@gmail.com", role: "Super Admin", passcode: "dggaur2026", name: "Dhruv Gaur" },
  { id: "adm-2", email: "admin@biotech.com", role: "Admin", passcode: "admin", name: "Systems Admin" },
  { id: "adm-3", email: "mod@biotech.com", role: "Moderator", passcode: "moderator", name: "Systems Moderator" }
];

const initialUsers: User[] = [
  { id: "usr-1", username: "dhruv_gaur", email: "dggaur385@gmail.com", status: "Active", activity: "Opened DNA Sequencer interface", lastActive: new Date().toISOString() },
  { id: "usr-2", username: "biologics_recruiter", email: "hire@topcorp.com", status: "Active", activity: "Scheduled lab meeting via Biotech Scheduler", lastActive: new Date().toISOString() },
  { id: "usr-3", username: "guest_auditor", email: "audit@gcp-biomed.org", status: "Active", activity: "Evaluated bioreactor chamber metrics", lastActive: new Date().toISOString() },
  { id: "usr-4", username: "malicious_probing", email: "spammer@shadowmail.net", status: "Blocked", activity: "Triggered multiple port scan telemetry headers", lastActive: new Date(Date.now() - 3600000).toISOString() }
];

const initialTabs: TabStatus[] = [
  { id: "welcome", name: "Welcome Portal", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "intro", name: "Intro Summary", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "skills", name: "Core Skills", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "experience", name: "Experience Timeline", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "certifications", name: "Certifications", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "research", name: "Active Research", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "research_map", name: "Research Map", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "projects", name: "Interactive Projects", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "github", name: "GitHub Integration", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "traffic", name: "Traffic Console", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "planner", name: "Lab Planner", status: "Active", reason: "", startTime: "", endTime: "", message: "" },
  { id: "contact", name: "Contact Hub", status: "Active", reason: "", startTime: "", endTime: "", message: "" }
];

const initialMaintenance: MaintenanceMode = {
  enabled: false,
  startTime: "",
  endTime: "",
  reason: "Performing high-throughput CPU scaling and server updates",
  customMessage: "The app is currently under maintenance. Please try again after the scheduled time."
};

const initialComplaints: Complaint[] = [
  {
    id: "comp-101",
    subject: "DNA helix is rendering pixelated on mobile viewports",
    description: "The synthetic nucleotide base pairs suffer from alignment jitter when reloading on touch devices.",
    status: "Pending",
    assignedTo: "Dhruv Gaur",
    remarks: "",
    timestamp: new Date().toISOString(),
    userName: "Alice Johnson",
    userEmail: "alice@bioinformatics.org"
  },
  {
    id: "comp-102",
    subject: "Scheduler slot reservation doesn't refresh calendar right away",
    description: "After booking a lab demo, the reservation takes up to 5 seconds to load on the calendar dashboard.",
    status: "In Progress",
    assignedTo: "Systems Admin",
    remarks: "Analyzing potential race condition on Google Calendar sync timers.",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    userName: "Robert Finch",
    userEmail: "robert@gcp-biomed.org"
  },
  {
    id: "comp-103",
    subject: "Contact form submits duplicate emails sometimes",
    description: "Double clicking the submit button on the contact module fires redundant REST API requests.",
    status: "Resolved",
    assignedTo: "Dhruv Gaur",
    remarks: "Added dynamic request buffering on key triggers to throttle double requests.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    userName: "Sarah Sterling",
    userEmail: "recruiting@innovative-solutions.com"
  }
];

const initialNotifications: AdminNotification[] = [
  {
    id: "notif-1",
    message: "Welcome to Dhruv Gaur's elite Systems & Biotech Engineering Port. Dynamic scheduler and diagnostics active.",
    type: "info",
    target: "all",
    timestamp: new Date().toISOString()
  }
];

const initialAuditLogs: AuditLog[] = [
  {
    id: "aud-0",
    adminName: "Systems Initialization",
    actionType: "BOOTSTRAP",
    affectedModule: "SYSTEM",
    timestamp: new Date().toISOString(),
    details: "Interactive port core audit pipeline initialized with sample datasets."
  }
];

// DB Operations exposure
export async function getAdmins(): Promise<Admin[]> {
  return readJsonFile<Admin[]>("admins.json", initialAdmins);
}
export async function saveAdmins(data: Admin[]): Promise<void> {
  await writeJsonFile<Admin[]>("admins.json", data);
}

export async function getUsers(): Promise<User[]> {
  return readJsonFile<User[]>("user_management_list.json", initialUsers);
}
export async function saveUsers(data: User[]): Promise<void> {
  await writeJsonFile<User[]>("user_management_list.json", data);
}

export async function getTabs(clientTime?: string | Date): Promise<TabStatus[]> {
  const tabs = await readJsonFile<TabStatus[]>("tabs_control.json", initialTabs);
  // Auto-reopen logic based on current time
  let modified = false;
  const now = clientTime ? new Date(clientTime) : new Date();
  const updatedTabs = tabs.map(tab => {
    if (tab.status === "Temporarily Closed" && tab.endTime) {
      const end = new Date(tab.endTime);
      if (now >= end) {
        modified = true;
        // Create auto audit log
        console.log(`[Auto Reopen System] Reopening closed tab: ${tab.id}`);
        addAuditLog("System Auto Scheduler", "AUTO_REOPEN_TAB", tab.id, `Automatically reopened tab due to schedule expiration (${tab.endTime}).`).catch(console.error);
        return {
          ...tab,
          status: "Active" as const,
          startTime: "",
          endTime: "",
          reason: "",
          message: ""
        };
      }
    }
    return tab;
  });
  if (modified) {
    await writeJsonFile<TabStatus[]>("tabs_control.json", updatedTabs);
    return updatedTabs;
  }
  return tabs;
}
export async function saveTabs(data: TabStatus[]): Promise<void> {
  await writeJsonFile<TabStatus[]>("tabs_control.json", data);
}

export async function getMaintenance(clientTime?: string | Date): Promise<MaintenanceMode> {
  const mode = await readJsonFile<MaintenanceMode>("maintenance_mode_v2.json", initialMaintenance);
  // Auto-disable maintenance based on timeframe
  if (mode.enabled && mode.endTime) {
    const now = clientTime ? new Date(clientTime) : new Date();
    const end = new Date(mode.endTime);
    if (now >= end) {
      console.log(`[Auto Reopen System] Maintenance timeframe elapsed. Automating main offline toggle to false.`);
      const updated = {
        ...mode,
        enabled: false,
        startTime: "",
        endTime: "",
        reason: "",
        customMessage: ""
      };
      await writeJsonFile<MaintenanceMode>("maintenance_mode_v2.json", updated);
      await addAuditLog("System Auto Scheduler", "AUTO_DISABLE_MAINTENANCE", "MAINTENANCE", `Automatically restored regular system status due to schedule expiration (${mode.endTime}).`);

      return updated;
    }
  }
  return mode;
}
export async function saveMaintenance(data: MaintenanceMode): Promise<void> {
  await writeJsonFile<MaintenanceMode>("maintenance_mode_v2.json", data);
}

export async function getComplaints(): Promise<Complaint[]> {
  return readJsonFile<Complaint[]>("complaints.json", initialComplaints);
}
export async function saveComplaints(data: Complaint[]): Promise<void> {
  await writeJsonFile<Complaint[]>("complaints.json", data);
}

export async function getNotifications(): Promise<AdminNotification[]> {
  return readJsonFile<AdminNotification[]>("admin_notifications.json", initialNotifications);
}
export async function saveNotifications(data: AdminNotification[]): Promise<void> {
  await writeJsonFile<AdminNotification[]>("admin_notifications.json", data);
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  const logs = await readJsonFile<AuditLog[]>("audit_logs.json", initialAuditLogs);
  // Return newest logs first
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
export async function saveAuditLogs(data: AuditLog[]): Promise<void> {
  await writeJsonFile<AuditLog[]>("audit_logs.json", data);
}

export async function addAuditLog(adminName: string, actionType: string, affectedModule: string, details: string): Promise<void> {
  const logs = await readJsonFile<AuditLog[]>("audit_logs.json", initialAuditLogs);
  const newLog: AuditLog = {
    id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    adminName,
    actionType,
    affectedModule,
    timestamp: new Date().toISOString(),
    details
  };
  logs.push(newLog);
  await saveAuditLogs(logs);
}
