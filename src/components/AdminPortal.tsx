import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Sliders, Shield, Terminal, Clock, Flag, 
  Activity, Settings, Lock, Eye, EyeOff, AlertTriangle, 
  CheckCircle, RefreshCw, Trash2, Send, Plus, Search, 
  ChevronRight, Calendar, UserCheck, UserX, XSquare, MessageSquare, 
  PlusCircle, LogOut, Info, ShieldAlert, Cpu, ArrowLeft
} from 'lucide-react';

interface TabStatus {
  id: string;
  name: string;
  status: "Active" | "Temporarily Closed";
  reason: string;
  startTime: string;
  endTime: string;
  message: string;
}

interface MaintenanceMode {
  enabled: boolean;
  startTime: string;
  endTime: string;
  reason: string;
  customMessage: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  status: "Active" | "Blocked";
  activity: string;
  lastActive: string;
}

interface Complaint {
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

interface AdminNotification {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
  target: "all" | string;
  timestamp: string;
}

interface AuditLog {
  id: string;
  adminName: string;
  actionType: string;
  affectedModule: string;
  timestamp: string;
  details: string;
}

interface AdminProfile {
  id: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  name: string;
}

interface AdminPortalProps {
  onStatusChange?: () => void;
  onClose?: () => void;
}

export default function AdminPortal({ onStatusChange, onClose }: AdminPortalProps) {
  // Authorization Session State
  const [adminUser, setAdminUser] = useState<AdminProfile | null>(() => {
    try {
      const saved = localStorage.getItem('active_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Login inputs
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Core Data States
  const [metrics, setMetrics] = useState<any>(null);
  const [systemStats, setSystemStats] = useState<any>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [tabsList, setTabsList] = useState<TabStatus[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceMode | null>(null);
  const [complaintsList, setComplaintsList] = useState<Complaint[]>([]);
  const [notificationsList, setNotificationsList] = useState<AdminNotification[]>([]);
  const [auditLogsList, setAuditLogsList] = useState<AuditLog[]>([]);

  // Navigation state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tabs' | 'maintenance' | 'users' | 'complaints' | 'notifications' | 'audit'>('dashboard');

  // Trigger loading state for tabular refreshes
  const [refreshing, setRefreshing] = useState(false);

  // Tab Adjuster Modal
  const [editingTab, setEditingTab] = useState<TabStatus | null>(null);
  const [tabReason, setTabReason] = useState('');
  const [tabMessage, setTabMessage] = useState('');
  const [tabStart, setTabStart] = useState('');
  const [tabEnd, setTabEnd] = useState('');
  const [tabError, setTabError] = useState('');

  // Confirmation Alert Modal system
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    action: () => void;
  } | null>(null);

  // Selected User filter and search
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState<'All' | 'Active' | 'Blocked'>('All');

  // Selected Issue Assignee and Remarks
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null);
  const [complaintStatus, setComplaintStatus] = useState<Complaint['status']>("Pending");
  const [complaintAssignee, setComplaintAssignee] = useState('');
  const [complaintRemarks, setComplaintRemarks] = useState('');

  // Notification Broadcaster inputs
  const [newNotifMsg, setNewNotifMsg] = useState('');
  const [newNotifType, setNewNotifType] = useState<"info" | "success" | "warning">("info");
  const [newNotifTarget, setNewNotifTarget] = useState("all");

  const toLocalDatetimeValue = (str: string) => {
    if (!str) return "";
    const d = new Date(str);
    if (isNaN(d.getTime())) return str.slice(0, 16);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const toISOStringOrEmpty = (str: string) => {
    if (!str) return "";
    const d = new Date(str);
    return isNaN(d.getTime()) ? str : d.toISOString();
  };



  // Load all dashboard metrics & database entities
  const loadPortalData = async () => {
    if (!adminUser) return;
    setRefreshing(true);
    try {
      const offset = localStorage.getItem('virtual_time_offset') || '0';
      const clientTime = new Date(Date.now() + parseInt(offset, 10)).toISOString();
      const query = `?clientTime=${encodeURIComponent(clientTime)}`;

      const [dashRes, usersRes, tabsRes, maintRes, complaintsRes, notifsRes, logsRes] = await Promise.all([
        fetch(`/api/admin/dashboard${query}`),
        fetch('/api/admin/users'),
        fetch(`/api/admin/tabs${query}`),
        fetch(`/api/admin/maintenance${query}`),
        fetch('/api/admin/complaints'),
        fetch('/api/admin/notifications'),
        fetch('/api/admin/audit-logs')
      ]);

      if (dashRes.ok) {
        const data = await dashRes.json();
        setMetrics(data.metrics);
        setSystemStats(data.systemStats);
      }
      if (usersRes.ok) setUsersList(await usersRes.json());
      if (tabsRes.ok) setTabsList(await tabsRes.json());
      if (maintRes.ok) setMaintenance(await maintRes.json());
      if (complaintsRes.ok) setComplaintsList(await complaintsRes.json());
      if (notifsRes.ok) setNotificationsList(await notifsRes.json());
      if (logsRes.ok) setAuditLogsList(await logsRes.json());
    } catch (err) {
      console.error("Failed to load admin telemetry records:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      loadPortalData();
    }
  }, [adminUser]);

  // Handle Login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passcode })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Cryptographic rejection: authentication denied.");
      }

      setAdminUser(data.admin);
      localStorage.setItem('active_admin_user', JSON.stringify(data.admin));
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Log out session
  const handleLogOut = () => {
    triggerConfirm(
      "CONFIRM AUTHORIZED EXIT",
      "Are you sure you want to dismantle your admin dashboard workspace? Your current authorization session will be purged.",
      () => {
        setAdminUser(null);
        localStorage.removeItem('active_admin_user');
        localStorage.removeItem('is_active_admin_authorized');
      }
    );
  };

  // Helper helper to open confirm modal
  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({
      show: true,
      title,
      message,
      action: () => {
        onConfirm();
        setConfirmModal(null);
        if (onStatusChange) onStatusChange();
      }
    });
  };

  // Toggle user block status
  const handleToggleUserBlock = (user: User) => {
    const isBlocking = user.status === "Active";
    triggerConfirm(
      isBlocking ? "BLOCK USER ACCESS" : "RESTORE USER ACCESS",
      `Are you sure you want to toggled access for user '${user.username}'? They will be immediately blocked from interacting with certain modules.`,
      async () => {
        try {
          const res = await fetch('/api/admin/users/block', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, adminName: adminUser?.name })
          });
          if (res.ok) loadPortalData();
        } catch (err) {
          console.error("Failed to alter user blocking parameter:", err);
        }
      }
    );
  };

  // Delete User
  const handleDeleteUser = (user: User) => {
    triggerConfirm(
      "PERMANENT USER DELETION",
      `WARNING: Purging user '${user.username}' (${user.email}) is highly irreversible. All their active records are deleted indefinitely. Proceed?`,
      async () => {
        try {
          const res = await fetch(`/api/admin/users/${user.id}?adminName=${encodeURIComponent(adminUser?.name || 'Admin')}`, {
            method: 'DELETE'
          });
          if (res.ok) loadPortalData();
        } catch (err) {
          console.error("Purging user failed:", err);
        }
      }
    );
  };

  // Open Edit Tab settings
  const handleConfigureTab = (tab: TabStatus) => {
    setEditingTab(tab);
    setTabReason(tab.reason);
    setTabMessage(tab.message || "This section is temporarily unavailable due to rework. Please check again later.");
    setTabStart(tab.startTime);
    setTabEnd(tab.endTime);
    setTabError('');
  };

  // Save Configured Tab close settings
  const handleSaveTabClose = async (statusOverride?: "Active") => {
    if (!editingTab) return;
    const nextStatus = statusOverride || (editingTab.status === "Active" ? "Temporarily Closed" : "Active");

    if (nextStatus === "Temporarily Closed") {
      if (tabStart && tabEnd) {
        const start = new Date(tabStart);
        const end = new Date(tabEnd);
        if (end <= start) {
          setTabError("VALIDATION REJECTION: Closure end time must remain after start time.");
          return;
        }
      }
    }

    triggerConfirm(
      nextStatus === "Active" ? "RESTORE TARGET MODULE" : "TEMPORARILY CLOSE TARGET MODULE",
      `Are you sure you want to toggle section '${editingTab.name}' status to ${nextStatus}? This will update normal user navigation gates instantly.`,
      async () => {
        try {
          const res = await fetch('/api/admin/tabs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tabId: editingTab.id,
              status: nextStatus,
              reason: tabReason,
              startTime: toISOStringOrEmpty(tabStart),
              endTime: toISOStringOrEmpty(tabEnd),
              message: tabMessage,
              adminName: adminUser?.name
            })
          });

          if (!res.ok) {
            const errBody = await res.json();
            throw new Error(errBody.error || "Failed to update configuration.");
          }

          setEditingTab(null);
          loadPortalData();
        } catch (err: any) {
          alert("Adjustment Failed: " + err.message);
        }
      }
    );
  };

  // Save Broad Maintenance Settings
  const handleSaveMaintenance = async (enableMode: boolean) => {
    if (!maintenance) return;

    const startInput = (document.getElementById('m_start') as HTMLInputElement)?.value || '';
    const endInput = (document.getElementById('m_end') as HTMLInputElement)?.value || '';
    const reasonInput = (document.getElementById('m_reason') as HTMLTextAreaElement)?.value || '';
    const messageInput = (document.getElementById('m_msg') as HTMLTextAreaElement)?.value || '';

    if (enableMode && startInput && endInput) {
      const start = new Date(startInput);
      const end = new Date(endInput);
      if (end <= start) {
        alert("VALIDATION REJECTION: Scheduled maintenance end time must be after the start time.");
        return;
      }
    }

    triggerConfirm(
      enableMode ? "ACTIVATE SYSTEM-WIDE MAINTENANCE" : "RESTORE SITE ACCESS",
      enableMode 
        ? "Warning: Setting master maintenance to ACTIVE blocks visitors from browsing any screen of this portfolio and shows the scheduled alert overlay. Confirm deployment?"
        : "Restoring regular site access handles real-time system loading and resumes baseline user interactions. Confirm restoration?",
      async () => {
        try {
          const res = await fetch('/api/admin/maintenance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              enabled: enableMode,
              startTime: toISOStringOrEmpty(startInput),
              endTime: toISOStringOrEmpty(endInput),
              reason: reasonInput,
              customMessage: messageInput,
              adminName: adminUser?.name
            })
          });

          if (!res.ok) {
            const errBody = await res.json();
            throw new Error(errBody.error || "Master toggle update rejected.");
          }

          loadPortalData();
        } catch (err: any) {
          alert("Error: " + err.message);
        }
      }
    );
  };

  // Save/Assign Complaint status
  const handleUpdateComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComplaint) return;

    triggerConfirm(
      "CONFIRM TICKET ADJUSTMENT",
      `This updates the developer/moderator task assigned status and remarks fields for complaint ticket #${editingComplaint.id}. Save changes?`,
      async () => {
        try {
          const res = await fetch(`/api/admin/complaints/${editingComplaint.id}/statusAndAssign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: complaintStatus,
              assignedTo: complaintAssignee,
              remarks: complaintRemarks,
              adminName: adminUser?.name
            })
          });

          if (res.ok) {
            setEditingComplaint(null);
            loadPortalData();
          }
        } catch (err) {
          console.error("Failed to execute ticket updates:", err);
        }
      }
    );
  };

  // Send Push Notification simulation
  const handleDispatchNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotifMsg.trim()) return;

    triggerConfirm(
      "BROADCAST LIVE ALERT",
      `Broadcasting this alert message: "${newNotifMsg}" will flash live toaster banners on all connected user viewports. Continue?`,
      async () => {
        try {
          const res = await fetch('/api/admin/notifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: newNotifMsg,
              type: newNotifType,
              target: newNotifTarget,
              adminName: adminUser?.name
            })
          });

          if (res.ok) {
            setNewNotifMsg('');
            loadPortalData();
          }
        } catch (err) {
          console.error("Notification broadcast disrupted:", err);
        }
      }
    );
  };

  // Helper date formatter
  const formatDate = (isoStr: string) => {
    if (!isoStr) return 'N/A';
    try {
      const d = new Date(isoStr);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch {
      return isoStr;
    }
  };

  if (!adminUser) {
    // SECURITY LOGIN INTERACT VIEW
    return (
      <div className="min-h-screen bg-neutral-50 text-[#1A1A1A] flex items-center justify-center p-4">
        <div className="absolute inset-x-0 top-0 h-[6px] bg-brand-accent animate-pulse" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white border-2 border-[#1A1A1A] p-8 shadow-[8px_8px_0px_0px_#10B981] space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-accent/10 border border-brand-accent flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7 text-brand-accent" />
            </div>
            <div>
              <h1 className="font-serif italic font-black text-2xl tracking-tight uppercase">
                ADMIN ACCESS COMMAND
              </h1>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 tracking-widest block">
                Biomedical Curator System Panel
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs font-mono rounded-none">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.15em] block">
                ADMIN SECURE EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                placeholder="admin@biotech.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-neutral-300 p-2.5 font-sans text-sm focus:border-brand-accent outline-none font-medium capitalize-none"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.15em] block">
                  AUTHORIZATION PASSCODE
                </label>
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-[9px] font-mono font-bold text-neutral-400 hover:text-brand-accent underline uppercase cursor-pointer"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPass ? "text" : "password"}
                required
                value={passcode}
                placeholder="••••••••"
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border-2 border-neutral-300 p-2.5 font-mono text-sm focus:border-brand-accent outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono font-bold py-3 uppercase tracking-wider text-xs border border-transparent shadow-[4px_4px_0px_0px_#10B981] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? "Decrypting Node..." : "DECRYPT COMMAND MODULE"}</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full border-2 border-neutral-300 hover:bg-neutral-200 text-[#1A1A1A] font-mono font-bold py-2.5 uppercase tracking-wider text-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO PORTFOLIO APPARATUS</span>
              </button>
            )}
          </form>


        </motion.div>
      </div>
    );
  }

  // LOGGED IN PORTAL WORKSPACE
  return (
    <div className="min-h-screen bg-neutral-50 text-[#1A1A1A] font-sans flex flex-col md:flex-row relative">
      
      {/* 1. LEFT SIDE NAVIGATION RAIL */}
      <aside className="w-full md:w-64 bg-[#1A1A1A] text-white flex flex-col md:min-h-screen shrink-0 border-r-2 border-[#1A1A1A] relative z-20">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent border border-brand-accent/50 flex items-center justify-center text-black font-mono font-black text-sm">
              DG
            </div>
            <div>
              <h2 className="font-serif italic font-bold text-xs uppercase tracking-tight text-white leading-none">
                Biotech Core
              </h2>
              <span className="text-[8px] font-mono text-neutral-400 tracking-[0.2em] uppercase">
                ADMIN CODENAME
              </span>
            </div>
          </div>
          <button 
            onClick={loadPortalData}
            title="Refresh Systems DB Feed"
            className="text-neutral-400 hover:text-brand-accent p-1 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* ADMIN WORKPLACE PROFILE BAR */}
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-9 h-9 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs text-brand-accent font-mono uppercase">
            {adminUser.role[0] || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-mono leading-none text-zinc-300 font-bold tracking-wide uppercase truncate">
              {adminUser.name}
            </p>
            <span className="text-[8px] font-mono text-[#10B981] tracking-widest uppercase block mt-1">
              • {adminUser.role}
            </span>
          </div>
        </div>

        {/* INTERACTIVE NAVIGATION BUTTONS */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'bg-neutral-800 text-brand-accent border-l-2 border-brand-accent font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('tabs')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
              activeTab === 'tabs' 
                ? 'bg-neutral-800 text-brand-accent border-l-2 border-brand-accent font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Tab Control System</span>
            {metrics?.closedTabsCount > 0 && (
              <span className="ml-auto bg-amber-500 text-black text-[9px] font-bold px-1.5 rounded-none">
                {metrics.closedTabsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('maintenance')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
              activeTab === 'maintenance' 
                ? 'bg-neutral-800 text-brand-accent border-l-2 border-brand-accent font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>App Maintenance</span>
            {metrics?.isMaintenanceEnabled && (
              <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-ping" />
            )}
          </button>

          <div className="h-px bg-zinc-800 my-4" />

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
              activeTab === 'users' 
                ? 'bg-neutral-800 text-brand-accent border-l-2 border-brand-accent font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Database</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
              activeTab === 'complaints' 
                ? 'bg-neutral-800 text-brand-accent border-l-2 border-brand-accent font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Complaints</span>
            {metrics?.pendingComplaints > 0 && (
              <span className="ml-auto bg-red-600 text-white text-[9px] font-bold px-1.5 rounded-none">
                {metrics.pendingComplaints}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
              activeTab === 'notifications' 
                ? 'bg-neutral-800 text-brand-accent border-l-2 border-brand-accent font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
              activeTab === 'audit' 
                ? 'bg-neutral-800 text-brand-accent border-l-2 border-brand-accent font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Audit Records</span>
          </button>
        </nav>

        {/* LOGOUT BUTTON FOOTER */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          {onClose && (
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-brand-accent font-mono uppercase font-bold text-[10px] py-2 cursor-pointer transition-colors border border-brand-accent/20 rounded-none animate-pulse"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO PORTFOLIO</span>
            </button>
          )}
          <button
            onClick={handleLogOut}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-mono uppercase font-bold text-[10px] py-2.5 cursor-pointer transition-colors rounded-none"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>DISMANTLE ACCESS</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKING PANEL */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        
        {/* HEADER BRANDING BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-[#1A1A1A] pb-6 gap-4">
          <div>
            <h1 className="font-serif italic font-black text-3xl tracking-tight text-[#1A1A1A] uppercase leading-none">
              ADMIN CONTROL MODULE
            </h1>
            <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mt-2">
              Systems Integration / Role Privilege Console
            </p>
          </div>
          {/* Real-time Status indicators */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className={`px-2.5 py-1.5 font-mono uppercase font-semibold text-[10px] border flex items-center gap-1.5 ${
              maintenance?.enabled 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${maintenance?.enabled ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
              <span>Status: {maintenance?.enabled ? "BROAD_MAINTENANCE" : "PORTAL_ACTIVE"}</span>
            </div>

            <div className="bg-neutral-200 border border-neutral-300 text-neutral-700 font-mono text-[10px] px-2.5 py-1.5 uppercase font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>{formatDate(new Date().toISOString())}</span>
            </div>
          </div>
        </div>

        {/* -------------------- VIEW 1: DASHBOARD FEED -------------------- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* KPI METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,0.1)] flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-accent/10 border border-brand-accent flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    TOTAL VISITORS
                  </span>
                  <div className="font-serif italic font-black text-2xl">
                    {metrics?.totalUsers || BigInt(0).toString()}
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,0.1)] flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    ACTIVE DIRECTORY
                  </span>
                  <div className="font-serif italic font-black text-2xl text-emerald-700">
                    {metrics?.activeUsers || 0}
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,0.1)] flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    PENDING COMPLAINTS
                  </span>
                  <div className="font-serif italic font-black text-2xl text-red-600">
                    {metrics?.pendingComplaints || 0}
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[4px_4px_0px_0px_rgba(26,26,26,0.1)] flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    BLOCKED WORKSPACES
                  </span>
                  <div className="font-serif italic font-black text-2xl text-amber-600">
                    {metrics?.closedTabsCount || 0}
                  </div>
                </div>
              </div>

            </div>

            {/* SPLIT SYSTEM GRAPH AND MAINTENANCE REPORT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SYSTEM HEALTH AND OS METRICS CONTAINER */}
              <div className="lg:col-span-2 bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-brand-accent animate-pulse" />
                    <h3 className="font-serif italic font-black text-lg uppercase">
                      Node Infrastructure Health
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono bg-zinc-100 px-2 py-0.5 rounded-none uppercase text-zinc-500 font-bold">
                    SECURE REPORT
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* UPTIME & CPU BAR */}
                  <div className="border border-neutral-200 p-4 space-y-3">
                    <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                      CURATOR SERVER RUNTIME
                    </span>
                    <div>
                      <div className="text-xl font-mono font-bold text-[#1A1A1A]">
                        {systemStats ? `${Math.floor(systemStats.uptimeSeconds / 3600)}h ${Math.floor((systemStats.uptimeSeconds % 3600) / 60)}m ${systemStats.uptimeSeconds % 60}s` : "Determining..."}
                      </div>
                      <span className="text-[9px] text-zinc-400 block mt-1 uppercase font-mono">
                        Active Continuous Server Thread
                      </span>
                    </div>

                    <div className="pt-2 border-t border-dashed">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                        PROC LOGICAL CORES
                      </span>
                      <div className="text-xs font-mono font-semibold text-neutral-700 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Intel Xeon VM Virtual Thread ({systemStats?.cpuCount || 2} CPU Threads)</span>
                      </div>
                    </div>
                  </div>

                  {/* MEMORY GRAPH PLACEMENT */}
                  <div className="border border-neutral-200 p-4 space-y-3">
                    <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      MEMORY USAGE COMPILER
                    </span>
                    {systemStats ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-zinc-500 uppercase">Allocated Mem</span>
                          <span className="font-bold text-[#1A1A1A]">
                            {Math.round((systemStats.totalMemBytes - systemStats.freeMemBytes) / (1024 * 1024 * 1024) * 100) / 100} GB
                          </span>
                        </div>
                        {/* Dynamic Progress Bar */}
                        <div className="w-full h-3 bg-neutral-100 border border-neutral-300 rounded-none overflow-hidden">
                          <div 
                            className="bg-brand-accent h-full"
                            style={{ 
                              width: `${((systemStats.totalMemBytes - systemStats.freeMemBytes) / systemStats.totalMemBytes) * 100}%` 
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-[9px] font-mono text-zinc-400 select-none">
                          <span>0 GB</span>
                          <span>Total: {Math.round(systemStats.totalMemBytes / (1024 * 1024 * 1024))} GB</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-400 font-mono italic">Calculating buffer metrics...</span>
                    )}
                  </div>
                </div>

                {/* DB POOLS OVERVIEW */}
                <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-none">
                  <span className="text-[10px] font-mono text-zinc-400 font-black tracking-wider uppercase block mb-3">
                    Active Storage Collection Pools
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-2 border bg-white">
                      <span className="text-zinc-400 text-[8px] block uppercase">admins</span>
                      <strong className="text-zinc-800">3 Records</strong>
                    </div>
                    <div className="p-2 border bg-white">
                      <span className="text-zinc-400 text-[8px] block uppercase">complaints</span>
                      <strong className="text-zinc-800">{complaintsList.length} Tickets</strong>
                    </div>
                    <div className="p-2 border bg-white">
                      <span className="text-zinc-400 text-[8px] block uppercase">audit_logs</span>
                      <strong className="text-zinc-800">{auditLogsList.length} Recs</strong>
                    </div>
                    <div className="p-2 border bg-white">
                      <span className="text-zinc-400 text-[8px] block uppercase">tabs</span>
                      <strong className="text-zinc-800">{tabsList.length} Anchors</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* QUICK MASTER MAINTENANCE MODULE */}
              <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b pb-3">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                    <h3 className="font-serif italic font-black text-base uppercase">
                      Emergency Gating
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-500 leading-normal">
                    Quickly disable or enable broad site access for scheduled rework or structural security patches. Takes effect live.
                  </p>

                  <div className={`p-4 border font-mono text-xs rounded-none ${
                    maintenance?.enabled 
                      ? 'bg-red-50 border-red-200 text-red-700' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}>
                    <strong className="uppercase">Master System Gate:</strong>
                    <p className="font-bold text-sm mt-1">{maintenance?.enabled ? "BLOCKING ACTIVE" : "PASSTHROUGH (ACTIVE)"}</p>
                    {maintenance?.enabled && (
                      <p className="text-[9px] text-red-500/80 mt-1 uppercase italic leading-normal">
                        Reason: {maintenance.reason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t mt-4">
                  {maintenance?.enabled ? (
                    <button
                      onClick={() => handleSaveMaintenance(false)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono uppercase font-bold text-xs py-3 tracking-medium cursor-pointer"
                    >
                      RESTORE GLOBAL PUBLIC ACCESS
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('maintenance')}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-mono uppercase font-bold text-xs py-3 tracking-medium cursor-pointer"
                    >
                      SCHEDULE SYSTEM OFFLINE
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* -------------------- VIEW 2: TAB CONTROL SYSTEM -------------------- */}
        {activeTab === 'tabs' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-2">
                <div>
                  <h3 className="font-serif italic font-black text-xl uppercase">
                    Interactive Portfolio Sections
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                    Toggle and time-restrict individual modules
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-neutral-100 text-neutral-500 px-3 py-1 uppercase rounded-none font-bold shrink-0">
                  Total Gating Tabs: {tabsList.length}
                </span>
              </div>

              {/* TABS GRID TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b-2 border-neutral-800 text-[10px] text-zinc-400 uppercase">
                      <th className="py-3 px-2 font-bold">Module ID</th>
                      <th className="py-3 px-2 font-bold">Section/Tab Name</th>
                      <th className="py-3 px-2 font-bold">Current Status</th>
                      <th className="py-3 px-2 font-bold">Block Timeline / Reason</th>
                      <th className="py-3 px-2 text-right font-bold">Management Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {tabsList.map(tab => (
                      <tr key={tab.id} className="hover:bg-neutral-50/50">
                        <td className="py-3 px-2 font-bold text-[#1A1A1A] select-all">{tab.id}</td>
                        <td className="py-3 px-2 font-sans font-bold text-[#1A1A1A]">{tab.name}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 font-mono text-[9px] font-bold ${
                            tab.status === "Active" 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "bg-amber-100 text-amber-800 animate-pulse"
                          }`}>
                            {tab.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-[10px]">
                          {tab.status === "Temporarily Closed" ? (
                            <div className="space-y-0.5">
                              <span className="text-zinc-600 block uppercase font-bold text-[9px]">REASON: {tab.reason || 'None specified'}</span>
                              <span className="text-zinc-400 block lowercase">
                                {tab.startTime ? formatDate(tab.startTime) : 'instantly'} - {tab.endTime ? formatDate(tab.endTime) : 'indefinitely'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-zinc-400 italic">None (Serving Publicly)</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => handleConfigureTab(tab)}
                            className="bg-zinc-800 hover:bg-[#1A1A1A] text-white text-[10px] font-mono px-3 py-1.5 uppercase transition-colors rounded-none cursor-pointer"
                          >
                            Adjust Gate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- VIEW 3: SYSTEM-WIDE MAINTENANCE -------------------- */}
        {activeTab === 'maintenance' && maintenance && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] space-y-6">
              <div className="flex items-center gap-2 border-b pb-4">
                <Settings className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="font-serif italic font-black text-xl uppercase">
                    Scheduled Broad Maintenance
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                    Configure master offline routing gates
                  </p>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 border font-mono text-xs ${
                maintenance.enabled 
                  ? "bg-red-50 border-red-200 text-red-700" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold uppercase text-[11px] mb-1">
                      Current Offline Routing Gate Status
                    </h4>
                    <p className="text-sm font-bold">
                      {maintenance.enabled ? "ACTIVE (Visitors locked out)" : "INACTIVE (Serving visitors normally)"}
                    </p>
                    {maintenance.enabled && maintenance.endTime && (
                      <p className="text-[9px] mt-1 text-red-500 italic block font-bold">
                        DUE TO RESTORE ON: {formatDate(maintenance.endTime)}
                      </p>
                    )}
                  </div>
                  <div>
                    {maintenance.enabled ? (
                      <button
                        onClick={() => handleSaveMaintenance(false)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono px-4 py-2 uppercase font-bold text-xs transition-colors cursor-pointer"
                      >
                        Deactivate Gating
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSaveMaintenance(true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-mono px-4 py-2 uppercase font-bold text-xs transition-colors cursor-pointer"
                      >
                        Execute Gating Now
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Maintenance Settings Form */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-serif italic font-black text-base uppercase">
                  Schedule Gating Window
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                      SCHEDULE START DATE/TIME (IST/LOCAL)
                    </label>
                    <input
                      type="datetime-local"
                      id="m_start"
                      defaultValue={maintenance.startTime ? toLocalDatetimeValue(maintenance.startTime) : ""}
                      className="w-full border-2 border-neutral-300 p-2 font-mono text-sm focus:border-brand-accent outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                      SCHEDULE END DATE/TIME (AUTO RESTORES ACCESS)
                    </label>
                    <input
                      type="datetime-local"
                      id="m_end"
                      defaultValue={maintenance.endTime ? toLocalDatetimeValue(maintenance.endTime) : ""}
                      className="w-full border-2 border-neutral-300 p-2 font-mono text-sm focus:border-brand-accent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                    MAINTENANCE CAUSE / CONTEXT (AUDITED)
                  </label>
                  <textarea
                    id="m_reason"
                    rows={2}
                    defaultValue={maintenance.reason}
                    placeholder="E.g., Deploying new interactive microscope cell visualization background..."
                    className="w-full border-2 border-neutral-300 p-2 font-sans text-sm focus:border-brand-accent outline-none resize-none font-medium capitalize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                    USER-FACING LOCKOUT MESSAGE
                  </label>
                  <textarea
                    id="m_msg"
                    rows={3}
                    defaultValue={maintenance.customMessage}
                    placeholder="E.g., The app is currently under maintenance. Please try again after the scheduled time."
                    className="w-full border-2 border-neutral-300 p-2 font-sans text-sm focus:border-brand-accent outline-none resize-none font-medium capitalize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSaveMaintenance(true)}
                    className="bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono uppercase font-bold text-xs py-2.5 px-6 tracking-wider shadow-[4px_4px_0px_0px_#10B981] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
                  >
                    DEPLOY SCHEDULE PARAMETERS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- VIEW 4: USER DATABASE -------------------- */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4">
                <div>
                  <h3 className="font-serif italic font-black text-xl uppercase">
                    Visitor Session Directories
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                    Review visitor activity and govern credentials blocking
                  </p>
                </div>
              </div>

              {/* SEARCH & FILTER CONTROLS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Look up username or email credentials..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full border-2 border-neutral-300 p-2 pl-9 font-sans text-xs focus:border-brand-accent outline-none font-medium text-neutral-800"
                  />
                </div>

                <select
                  value={userStatusFilter}
                  onChange={(e: any) => setUserStatusFilter(e.target.value)}
                  className="border-2 border-neutral-300 p-2 text-xs font-mono outline-none focus:border-brand-accent"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active Directory</option>
                  <option value="Blocked">Blocked Logins</option>
                </select>
              </div>

              {/* USERS DATA LISTING */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b-2 border-neutral-800 text-[10px] text-zinc-400 uppercase">
                      <th className="py-3 px-2 font-bold">User Identity</th>
                      <th className="py-3 px-2 font-bold">Email Coordinate</th>
                      <th className="py-3 px-2 font-bold">Active Status</th>
                      <th className="py-3 px-2 font-bold">Recent Telemetry Activity</th>
                      <th className="py-3 px-2 font-bold">Last Activity Timestamp</th>
                      <th className="py-3 px-2 text-right font-bold">Gating Adjustments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {usersList
                      .filter(u => {
                        const q = userSearchQuery.toLowerCase();
                        const matchesSearch = u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
                        const matchesFilter = userStatusFilter === "All" || u.status === userStatusFilter;
                        return matchesSearch && matchesFilter;
                      })
                      .map(user => (
                        <tr key={user.id} className="hover:bg-neutral-50/50">
                          <td className="py-3 px-2 font-bold font-sans text-[#1A1A1A] flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-neutral-400"}`} />
                            <span className="truncate">{user.username}</span>
                          </td>
                          <td className="py-3 px-2 text-zinc-600 font-sans font-medium select-all select-none">{user.email}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-0.5 text-[9px] font-bold ${
                              user.status === "Active" 
                                ? "bg-emerald-100 text-emerald-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-[10px] text-zinc-500 truncate max-w-[200px]" title={user.activity}>
                            {user.activity || 'No telemetry logs'}
                          </td>
                          <td className="py-3 px-2 text-[10px] text-zinc-400 whitespace-nowrap">
                            {formatDate(user.lastActive)}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {user.status === "Active" ? (
                                <button
                                  type="button"
                                  onClick={() => handleToggleUserBlock(user)}
                                  className="border border-red-500 hover:bg-neutral-100 text-red-600 text-[9px] px-2.5 py-1.5 uppercase font-bold cursor-pointer font-mono"
                                >
                                  Block
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleToggleUserBlock(user)}
                                  className="border border-emerald-500 hover:bg-[#10B981]/10 text-emerald-600 text-[9px] px-2.5 py-1.5 uppercase font-bold cursor-pointer font-mono"
                                >
                                  Unblock
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(user)}
                                className="bg-red-600 hover:bg-red-700 text-white p-1.5 cursor-pointer ml-1"
                                title="Purge Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- VIEW 5: COMPLAINTS / TICKETING -------------------- */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] space-y-4">
              <div>
                <h3 className="font-serif italic font-black text-xl uppercase">
                  User Complaints & Error Tickets
                </h3>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                  Delegate recruiter issues, assign statuses and configure log adjustments
                </p>
              </div>

              {/* TICKETS CONTAINER COMPILING */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t">
                {/* Tickets grid */}
                <div className="lg:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {complaintsList.length === 0 ? (
                    <div className="text-center py-10 border border-dashed text-zinc-400 font-mono text-xs uppercase">
                      No customer issues submitted.
                    </div>
                  ) : (
                    complaintsList.map(item => (
                      <div 
                        key={item.id}
                        className={`p-4 border-2 transition-colors cursor-pointer text-left ${
                          editingComplaint?.id === item.id 
                            ? 'border-brand-accent bg-brand-accent/5' 
                            : 'border-neutral-200 hover:border-zinc-400 bg-[#FAFAFA]'
                        }`}
                        onClick={() => {
                          setEditingComplaint(item);
                          setComplaintStatus(item.status);
                          setComplaintAssignee(item.assignedTo || '');
                          setComplaintRemarks(item.remarks || '');
                        }}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[9px] font-mono bg-zinc-200 px-2 py-0.5 font-bold uppercase rounded-none">
                            TICKET #{item.id}
                          </span>
                          <span className={`px-2 py-0.5 text-[9px] font-bold font-mono ${
                            item.status === "Pending" ? "bg-red-100 text-red-800" :
                            item.status === "In Progress" ? "bg-amber-100 text-amber-800" :
                            item.status === "Resolved" ? "bg-emerald-100 text-emerald-800" :
                            "bg-zinc-100 text-zinc-800"
                          }`}>
                            {item.status}
                          </span>
                        </div>

                        <h4 className="font-sans font-bold text-sm text-[#1A1A1A] mt-2 mb-1">
                          {item.subject}
                        </h4>
                        <p className="text-xs text-zinc-500 font-sans leading-normal font-medium max-h-[60px] overflow-hidden truncate">
                          {item.description}
                        </p>

                        <div className="mt-3 pt-3 border-t border-dashed flex flex-wrap justify-between text-[10px] font-mono text-zinc-400 gap-2">
                          <span>Sender: <strong className="text-neutral-500 font-sans font-semibold">{item.userName || 'Visitor'}</strong> ({item.userEmail || 'N/A'})</span>
                          <span>Assignee: <strong className="text-[#10B981]">{item.assignedTo || 'Unassigned'}</strong></span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* EDITING INTERACTIVE SIDEBAR DETAILS PANEL */}
                <div className="bg-[#FAFAFA] border-2 border-neutral-300 p-5 divide-y divide-zinc-200 space-y-4">
                  {editingComplaint ? (
                    <form onSubmit={handleUpdateComplaint} className="space-y-4">
                      <div>
                        <span className="text-[8px] font-mono text-zinc-400 block uppercase tracking-widest leading-none">
                          TICKET DELEGATION CARD
                        </span>
                        <h4 className="font-serif italic font-black text-lg uppercase text-[#1A1A1A] mt-1 truncate">
                          #{editingComplaint.id} Details
                        </h4>
                      </div>

                      <div className="space-y-2 pt-3 text-xs leading-normal">
                        <p className="font-mono text-[10px] text-zinc-400 uppercase">SUBJECT:</p>
                        <p className="font-sans font-black text-[#1A1A1A]">{editingComplaint.subject}</p>
                        
                        <p className="font-mono text-[10px] text-zinc-400 uppercase pt-2">DESCRIPTION:</p>
                        <p className="font-sans text-neutral-600 text-left bg-white p-2 border leading-relaxed capitalize-none">{editingComplaint.description}</p>

                        <p className="font-mono text-[10px] text-zinc-400 uppercase pt-2">SUBMITTED:</p>
                        <p className="font-mono text-neutral-500 block">{formatDate(editingComplaint.timestamp)}</p>
                      </div>

                      <div className="space-y-3 pt-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                            TICKET WORKFLOW STATUS
                          </label>
                          <select
                            value={complaintStatus}
                            onChange={(e: any) => setComplaintStatus(e.target.value)}
                            className="w-full border p-2 text-xs font-mono outline-none bg-white focus:border-brand-accent"
                          >
                            <option value="Pending">Pending (Red)</option>
                            <option value="In Progress">In Progress (Amber)</option>
                            <option value="Resolved">Resolved (Green)</option>
                            <option value="Rejected">Rejected (Gray)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                            ASSIGN DEVELOPER
                          </label>
                          <select
                            value={complaintAssignee}
                            onChange={(e) => setComplaintAssignee(e.target.value)}
                            className="w-full border p-2 text-xs font-mono outline-none bg-white focus:border-brand-accent"
                          >
                            <option value="Unassigned">Unassigned</option>
                            <option value="Dhruv Gaur">Dhruv Gaur (Lead)</option>
                            <option value="Systems Admin">Systems Admin</option>
                            <option value="Systems Moderator">Systems Moderator</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                            DEVELOPER REMARKS
                          </label>
                          <textarea
                            rows={3}
                            value={complaintRemarks}
                            onChange={(e) => setComplaintRemarks(e.target.value)}
                            placeholder="Input diagnostic updates or caching directives..."
                            className="w-full border p-2 text-xs font-sans outline-none bg-white focus:border-brand-accent resize-none font-medium capitalize-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono uppercase font-bold text-[10px] py-2.5 transition-colors cursor-pointer"
                        >
                          APPLY TICKET CHANGE
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingComplaint(null)}
                          className="border border-neutral-300 hover:bg-neutral-100 text-[#1A1A1A] font-mono uppercase font-bold text-[10px] py-2.5 px-3 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                    </form>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12 text-zinc-400 font-mono text-xs uppercase space-y-2 select-none">
                      <Terminal className="w-8 h-8 text-neutral-300" />
                      <span>Select an issue ticket card to configure remarks.</span>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* -------------------- VIEW 6: NOTIFICATIONS / BROADCASTS -------------------- */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] space-y-6">
              <div className="flex items-center gap-2 border-b pb-4">
                <Send className="w-6 h-6 text-brand-accent animate-pulse" />
                <div>
                  <h3 className="font-serif italic font-black text-xl uppercase">
                    Alert & Notification Workspace
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                    Push micro banners instantly into connected browser viewports
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Send Notification Form */}
                <form onSubmit={handleDispatchNotification} className="border border-neutral-200 p-5 space-y-4 rounded-none bg-[#FAFAFA]">
                  <h4 className="font-serif italic font-black text-base uppercase pb-2 border-b">
                    Broadcast Custom Banner
                  </h4>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                      NOTIFICATION CONTENT MESSAGE
                    </label>
                    <textarea
                      rows={3}
                      value={newNotifMsg}
                      required
                      placeholder="E.g., Complete active DNA scheduling buffers: systems-wide maintenance goes active in 10 minutes."
                      onChange={(e) => setNewNotifMsg(e.target.value)}
                      className="w-full border-2 border-neutral-300 p-2 font-sans text-sm focus:border-brand-accent outline-none bg-white resize-none font-medium capitalize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                        ALERT VISUAL VARIATION
                      </label>
                      <select
                        value={newNotifType}
                        onChange={(e: any) => setNewNotifType(e.target.value)}
                        className="w-full border-2 border-neutral-300 p-2 text-xs font-mono outline-none bg-white focus:border-brand-accent"
                      >
                        <option value="info">Info (Blue Standard)</option>
                        <option value="success">Success (Green Check)</option>
                        <option value="warning">Warning (Amber Alert)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                        TARGET COHORT
                      </label>
                      <select
                        value={newNotifTarget}
                        onChange={(e) => setNewNotifTarget(e.target.value)}
                        className="w-full border-2 border-neutral-300 p-2 text-xs font-mono outline-none bg-white focus:border-brand-accent"
                      >
                        <option value="all">All Viewports (Broad Broadcast)</option>
                        <option value="recruiters">Recruiting Directory Only</option>
                        <option value="testers">Diagnostic Sandbox Cohorts</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono uppercase font-bold text-xs py-3 tracking-wider shadow-[4px_4px_0px_0px_#10B981] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH PUSH BANNER</span>
                    </button>
                  </div>
                </form>

                {/* History list stream */}
                <div className="border border-neutral-200 p-5 space-y-4 bg-[#FAFAFA] flex flex-col h-full max-h-[385px] overflow-hidden rounded-none">
                  <h4 className="font-serif italic font-black text-base uppercase pb-2 border-b text-zinc-500 select-none">
                    Broadcast Feed Stream History
                  </h4>

                  <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                    {notificationsList.length === 0 ? (
                      <span className="text-xs text-zinc-400 italic font-mono block text-center py-10 uppercase">No active alerts dispatched.</span>
                    ) : (
                      notificationsList.map(item => (
                        <div key={item.id} className="p-3 bg-white border border-neutral-200 text-xs">
                          <div className="flex justify-between text-[9px] font-mono text-zinc-400 mb-1">
                            <span className="uppercase font-bold">TYPE: {item.type} | TARGET: {item.target}</span>
                            <span>{formatDate(item.timestamp)}</span>
                          </div>
                          <p className="font-sans font-medium text-neutral-700 leading-normal capitalize-none">{item.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* -------------------- VIEW 7: IMMUTABLE AUDIT LOGS -------------------- */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.15)] space-y-4">
              <div>
                <h3 className="font-serif italic font-black text-xl uppercase">
                  Immutable Cryptographic Audit Ledger
                </h3>
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                  Chronological records of all administrative adjustments, access authorizations, and scheduled automations.
                </p>
              </div>

              {/* AUDIT LOGS SCROLL FEED */}
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="w-full border-collapse text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b-2 border-neutral-800 text-[10px] text-zinc-400 uppercase sticky top-0 bg-white">
                      <th className="py-3 px-2 font-bold">Timestamp</th>
                      <th className="py-3 px-2 font-bold">Operator Admin</th>
                      <th className="py-3 px-2 font-bold">Action Event</th>
                      <th className="py-3 px-2 font-bold">Affect Module</th>
                      <th className="py-3 px-2 font-bold">Immutable Audit Detail Log</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {auditLogsList.map(log => (
                      <tr key={log.id} className="hover:bg-neutral-50/50">
                        <td className="py-3 px-2 whitespace-nowrap text-zinc-400 font-bold">{formatDate(log.timestamp)}</td>
                        <td className="py-3 px-2 font-sans font-black text-neutral-800">{log.adminName}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 text-[9px] font-bold ${
                            log.actionType.includes("CLOSE") || log.actionType.includes("BLOCK") 
                              ? "bg-red-100 text-red-800" 
                              : log.actionType.includes("OPEN") || log.actionType.includes("UNBLOCK") || log.actionType.includes("RESTORE")
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-zinc-100 text-zinc-800 font-bold"
                          }`}>
                            {log.actionType}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-zinc-500 font-bold">{log.affectedModule}</td>
                        <td className="py-3 px-2 text-zinc-600 font-sans font-medium text-left leading-relaxed capitalize-none" title={log.details}>
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==========================================
          --- MODAL SYSTEM 1: ADJUST TAB GATE ---
          ========================================== */}
      <AnimatePresence>
        {editingTab && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingTab(null)}
              className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white text-[#1A1A1A] w-full max-w-lg border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#10B981] flex flex-col z-10 rounded-none overflow-hidden"
            >
              {/* Header */}
              <div className="border-b-2 border-neutral-900 px-6 py-4 flex items-center justify-between bg-zinc-50">
                <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-neutral-500 flex items-center gap-1.5 leading-none">
                  <Sliders className="w-4 h-4 text-brand-accent" />
                  Gating: {editingTab.name}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingTab(null)}
                  className="text-xs font-mono font-bold text-neutral-400 hover:text-black"
                >
                  [CLOSE]
                </button>
              </div>

              {/* Form body */}
              <div className="p-6 space-y-4">
                {tabError && (
                  <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs font-mono rounded-none">
                    ⚠️ {tabError}
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block leading-none">MODULE GATEWAY ID</p>
                  <p className="font-mono text-sm font-black text-zinc-900 uppercase">{editingTab.id}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                      TEMPORARY GATE TIMELINE START (OPTIONAL)
                    </label>
                    <input
                      type="datetime-local"
                      value={tabStart ? toLocalDatetimeValue(tabStart) : ""}
                      onChange={(e) => setTabStart(e.target.value)}
                      className="w-full border-2 border-neutral-300 p-2 font-mono text-xs focus:border-brand-accent outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                      TEMPORARY GATE TIMELINE END (OPTIONAL)
                    </label>
                    <input
                      type="datetime-local"
                      value={tabEnd ? toLocalDatetimeValue(tabEnd) : ""}
                      onChange={(e) => setTabEnd(e.target.value)}
                      className="w-full border-2 border-neutral-300 p-2 font-mono text-xs focus:border-brand-accent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                    REASON FOR TEMPORARY GATING
                  </label>
                  <textarea
                    rows={2}
                    value={tabReason}
                    placeholder="E.g., Reworking projects portfolio layouts..."
                    onChange={(e) => setTabReason(e.target.value)}
                    className="w-full border-2 border-neutral-300 p-2 font-sans text-xs focus:border-brand-accent outline-none bg-white resize-none font-medium capitalize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-[0.1em] block">
                    USER-FACING REWORK EXPLAINER TEXT
                  </label>
                  <textarea
                    rows={3}
                    value={tabMessage}
                    placeholder="This section is temporarily unavailable due to rework. Please check again later."
                    onChange={(e) => setTabMessage(e.target.value)}
                    className="w-full border-2 border-neutral-300 p-2 font-sans text-xs focus:border-brand-accent outline-none bg-white resize-none font-medium capitalize-none"
                  />
                </div>

                <div className="pt-4 border-t flex flex-col sm:flex-row gap-2">
                  {editingTab.status === "Temporarily Closed" ? (
                    <button
                      onClick={() => handleSaveTabClose("Active")}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-mono uppercase font-bold text-xs py-3 tracking-wider transition-colors cursor-pointer"
                    >
                      RESTORE TO Regular ACTIVE STATUS
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSaveTabClose()}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono uppercase font-bold text-xs py-3 tracking-wider transition-colors cursor-pointer"
                    >
                      APPLY TEMPORARY GATING RULES
                    </button>
                  )}
                  <button
                    onClick={() => setEditingTab(null)}
                    className="border-2 border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-mono uppercase font-bold text-xs py-3 px-5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==========================================
          --- MODAL SYSTEM 2: REAL-TIME CONFIRM DIALOG ---
          ========================================== */}
      <AnimatePresence>
        {confirmModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal(null)}
              className="absolute inset-0 bg-[#1A1A1A]/85 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white text-[#1A1A1A] w-full max-w-sm border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#EF4444] flex flex-col z-10 rounded-none overflow-hidden"
            >
              <div className="border-b border-neutral-200 px-5 py-3 bg-red-50 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h4 className="text-xs font-mono font-bold tracking-wider text-red-700 uppercase leading-none">
                  {confirmModal.title}
                </h4>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-neutral-600 font-medium leading-relaxed font-sans text-left capitalize-none">
                  {confirmModal.message}
                </p>

                <div className="flex gap-2 font-mono text-xs pt-2">
                  <button
                    onClick={confirmModal.action}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 uppercase tracking-wide cursor-pointer text-center"
                  >
                    CONFIRM & EXECUTE
                  </button>
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 py-2 px-4 uppercase font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
