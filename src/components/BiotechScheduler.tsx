import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Trash2, 
  LogOut, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  User, 
  MapPin, 
  Info,
  CalendarCheck,
  ChevronDown
} from 'lucide-react';
import { 
  googleSignIn, 
  logout, 
  initAuth 
} from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
}

export default function BiotechScheduler() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form States for creating standard bio-consulting meetings
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('Biotech Consulting & Pipeline Review');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('10:00');
  const [meetingDuration, setMeetingDuration] = useState('60'); // Minutes
  const [meetingDesc, setMeetingDesc] = useState('Review of high-throughput biotechnology UI frameworks and bioinformatics pipeline execution.');
  const [meetingLocation, setMeetingLocation] = useState('Digital Lab Room alpha [Remote]');

  // Security Confirmation States (Zero-Trust Mutations)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'create' | 'delete';
    payload: any;
    title: string;
    details: string;
  }>({
    isOpen: false,
    type: 'create',
    payload: null,
    title: '',
    details: '',
  });

  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationSuccess, setMutationSuccess] = useState<string | null>(null);

  // Sync initialization
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        fetchEvents(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleConnectGoogle = async () => {
    setIsLoggingIn(true);
    setFetchError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        fetchEvents(res.accessToken);
      }
    } catch (err: any) {
      setFetchError(err.message || 'Google Calendar connection was declined or timed out.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setAccessToken(null);
      setEvents([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const fetchEvents = async (token: string) => {
    if (!token) return;
    setIsLoadingEvents(true);
    setFetchError(null);
    try {
      const timeMin = new Date().toISOString(); // Only fetch future events
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true&timeMin=${timeMin}&maxResults=15`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Google API returned status code ${res.status}`);
      }
      const data = await res.json();
      setEvents(data.items || []);
    } catch (err: any) {
      console.error('Query Calendar Events Error:', err);
      setFetchError('Failed to synchronize upcoming calendar events from Google.');
    } finally {
      setIsLoadingEvents(false);
    }
  };

  // Schedule preset items
  const presets = [
    {
      title: "Biotech Project Consultation",
      desc: "Architectural consultation on high-fidelity lab monitoring UI systems, genomic visualization, and modular LIMS tracker widgets.",
      duration: "60",
      type: "Remote Consultation Session"
    },
    {
      title: "Bioinformatics Pipeline Diagnostics",
      desc: "Hands-on analysis of Docker/Nextflow genome sequencer run pipelines, optimization diagnostics, and system orchestration structures.",
      duration: "45",
      type: "Advanced Sequence Engineering"
    },
    {
      title: "Google Developer Student Mentor Sync",
      desc: "Discussing student community outreach programs, GDG workshop schedules, or academic coordination with Dhruv.",
      duration: "30",
      type: "Academic and Community"
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setMeetingTitle(preset.title);
    setMeetingDesc(preset.desc);
    setMeetingDuration(preset.duration);
  };

  // Request Create Event with secure dialog trigger
  const requestCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingDate || !meetingTime) {
      alert("Please select a valid date and time for the Biotech Consultation.");
      return;
    }

    const startDateTime = new Date(`${meetingDate}T${meetingTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + parseInt(meetingDuration) * 60 * 1000);

    const payload = {
      summary: meetingTitle,
      description: meetingDesc,
      location: meetingLocation,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    setConfirmModal({
      isOpen: true,
      type: 'create',
      payload,
      title: 'Confirm Calendar Event Insertion',
      details: `Create "${meetingTitle}" on ${startDateTime.toLocaleDateString()} at ${meetingTime} for ${meetingDuration} minutes?`,
    });
  };

  // Request Delete Event with secure dialog trigger
  const requestDeleteEvent = (eventId: string, summary: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      payload: eventId,
      title: 'Confirm Calendar Event Cancellation',
      details: `Are you absolutely sure you want to remove "${summary}" from your Google Calendar? This action is irreversible.`,
    });
  };

  // Execute actual Google Calendar mutation after user confirmation
  const handleMutationConfirm = async () => {
    if (!accessToken) return;
    setMutationLoading(true);
    setMutationSuccess(null);

    try {
      if (confirmModal.type === 'create') {
        const res = await fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(confirmModal.payload),
          }
        );

        if (!res.ok) throw new Error(`Google API returned status code ${res.status}`);
        
        setMutationSuccess('Successfully inserted consultation slot into Google Calendar!');
        setShowScheduleForm(false);
      } else if (confirmModal.type === 'delete') {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events/${confirmModal.payload}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error(`Google API returned status code ${res.status}`);

        setMutationSuccess('Synchronous event cancellation complete.');
      }

      // Re-fetch list
      await fetchEvents(accessToken);
    } catch (err: any) {
      console.error('Mutation failure:', err);
      alert(`Calendar operation failed: ${err.message || 'Network anomaly'}`);
    } finally {
      setMutationLoading(false);
      setConfirmModal(prev => ({ ...prev, isOpen: false }));
      
      // Auto clear success banner
      setTimeout(() => setMutationSuccess(null), 5000);
    }
  };

  return (
    <div className="bg-white border border-[#1A1A1A]/10 p-6 md:p-8 relative overflow-hidden font-sans">
      {/* Visual Header Grid Accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-accent"></div>
      
      {/* Component Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1A1A1A]/10">
        <div>
          <span className="text-brand-accent font-mono text-[9px] font-bold tracking-widest uppercase block">Workspace Calendar Integration</span>
          <h3 className="font-serif italic text-2xl font-black text-[#1A1A1A] uppercase tracking-tight mt-1 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-brand-accent inline" />
            Biotech & Lab Planner
          </h3>
          <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
            Directly synchronize research sessions, scientific consultations, and meeting schedules with Google Calendar in real-time.
          </p>
        </div>

        {/* Auth controls or Refresh */}
        {currentUser && (
          <div className="flex items-center gap-2">
            <button
               onClick={() => fetchEvents(accessToken!)}
               className="p-2 bg-brand-surface hover:bg-brand-accent/10 border border-[#1A1A1A]/10 text-brand-accent transition-colors duration-200 cursor-pointer"
               title="Resync Events"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingEvents ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleDisconnect}
              className="px-3 py-1.5 bg-[#DC2626]/10 hover:bg-[#DC2626] text-[#DC2626] hover:text-white font-mono text-[9px] font-black tracking-widest uppercase transition-all duration-300 border border-[#DC2626]/20 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Success notification flag */}
      <AnimatePresence>
        {mutationSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono text-2xs flex items-center gap-2"
          >
            <Check className="w-4 h-4 shrink-0 font-bold" />
            <span className="font-bold tracking-wider">{mutationSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container State Switch */}
      {!currentUser ? (
        // STATE A: Unauthenticated, prompt GSI setup
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-brand-surface border border-[#1A1A1A]/10 flex items-center justify-center text-brand-accent">
            <CalendarCheck className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-sans text-sm font-black text-[#1A1A1A] uppercase tracking-wider">No Active Authorization Session</h4>
            <p className="text-2xs text-brand-text-muted leading-relaxed max-w-sm">
              Connect your Google Workspace Calendar to schedule scientific slots, bioinformatics evaluations, or monitor existing research itineraries directly.
            </p>
          </div>

          {/* GSI styled material button */}
          <button 
            disabled={isLoggingIn}
            onClick={handleConnectGoogle}
            className="gsi-material-button w-full sm:w-auto relative cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper flex items-center justify-center gap-3">
              <div className="gsi-material-button-icon bg-white p-1 ml-1 rounded">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }} className="w-5 h-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents font-mono text-[10px] font-bold tracking-[0.1em] text-[#1A1A1A]/80 pr-3">
                {isLoggingIn ? 'AUTHORIZING PIPELINE...' : 'CONNECT GOOGLE CALENDAR'}
              </span>
            </div>
          </button>

          {fetchError && (
            <div className="bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 py-2.5 px-4 font-mono text-3xs flex items-center gap-2 max-w-sm mt-3">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fetchError}</span>
            </div>
          )}
        </div>
      ) : (
        // STATE B: Authenticated Planner Panel
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Scheduled List Itinerary */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-2xs font-extrabold tracking-widest text-brand-accent uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping"></span>
                ACTIVE RESEARCH ITERATIONS
              </h4>
              <span className="bg-brand-surface font-mono text-3xs text-brand-accent px-2 py-0.5 border border-brand-accent/20">
                Authorized: {currentUser.email}
              </span>
            </div>

            {/* List Events Area */}
            {isLoadingEvents ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-6 h-6 text-brand-accent animate-spin" />
                <span className="font-mono text-3xs text-brand-text-muted uppercase tracking-widest">polling primary calendar...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="bg-brand-surface p-8 border-2 border-dashed border-[#1A1A1A]/10 text-center space-y-2">
                <CalendarIcon className="w-7 h-7 text-brand-text-muted/40 mx-auto" />
                <h5 className="font-mono text-3xs font-bold text-brand-text-muted uppercase tracking-wider">Empty Scientific Calendar</h5>
                <p className="text-[10px] text-brand-text-muted max-w-xs mx-auto leading-relaxed">
                  No upcoming scientific collaborations recorded. Use the planner panel on the right to insert a custom consultation slot.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {events.map((ev) => {
                  const startString = ev.start.dateTime || ev.start.date || '';
                  const startDate = startString ? new Date(startString) : null;
                  
                  return (
                    <div 
                      key={ev.id}
                      className="p-4 bg-brand-surface border border-[#1A1A1A]/10 hover:border-brand-accent/30 transition-all duration-300 group flex justify-between gap-4"
                    >
                      <div className="space-y-2">
                        {/* Title & Description */}
                        <div>
                          <h5 className="font-sans text-xs font-bold text-[#1A1A1A] tracking-tight group-hover:text-brand-accent transition-colors leading-snug">
                            {ev.summary || 'Unspecified Integration Slot'}
                          </h5>
                          {ev.description && (
                            <p className="text-3xs text-brand-text-muted mt-1 leading-relaxed max-w-sm line-clamp-2">
                              {ev.description}
                            </p>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-3xs text-[#4B6F62] font-mono font-bold uppercase tracking-wider">
                          {startDate && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-brand-accent" />
                              {startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} @ {startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </span>
                          )}
                          {ev.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-brand-accent" />
                              <span className="truncate max-w-[150px]">{ev.location}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action trigger */}
                      <button
                        onClick={() => requestDeleteEvent(ev.id, ev.summary)}
                        className="p-1 px-1.5 self-center text-zinc-400 hover:text-[#DC2626] hover:bg-[#DC2626]/5 transition-all duration-200 cursor-pointer"
                        title="Cancel Meeting Slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Event Creation & Booking Presets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2">
              <h4 className="font-mono text-2xs font-extrabold tracking-widest text-[#1A1A1A] uppercase flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-brand-accent" />
                SCHEDULE LAB CONSULTATION
              </h4>
              <button
                onClick={() => setShowScheduleForm(!showScheduleForm)}
                className="font-mono text-3xs text-brand-accent font-black hover:underline uppercase tracking-wider cursor-pointer"
              >
                {showScheduleForm ? 'CLOSE PLANNER' : 'OPEN MANUAL FORM'}
              </button>
            </div>

            {/* Presets Grid */}
            {!showScheduleForm ? (
              <div className="space-y-4">
                <div className="bg-brand-surface border border-[#1A1A1A]/10 p-4 rounded-none">
                  <span className="font-mono text-3xs text-brand-accent font-black tracking-widest uppercase block mb-1">Preset Diagnostic Slots</span>
                  <p className="text-3xs text-brand-text-muted leading-relaxed">
                    Select a scientific consultation theme below. You can customize the parameters or write a custom schedule slot instantly on the next step.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {presets.map((preset, idx) => (
                    <div 
                      key={idx}
                      className="bg-white hover:bg-brand-surface border border-[#1A1A1A]/10 hover:border-brand-accent/40 p-4 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-3xs text-brand-accent bg-[#10B981]/15 px-2 py-0.5 font-bold tracking-widest uppercase">
                            {preset.type}
                          </span>
                          <span className="font-mono text-3xs text-brand-text-muted font-bold flex items-center gap-0.5">
                            <Clock className="w-3 h-3 text-zinc-400" />
                            {preset.duration} min
                          </span>
                        </div>
                        <h5 className="font-sans text-xs font-bold text-[#1A1A1A] leading-tight mb-1">
                          {preset.title}
                        </h5>
                        <p className="text-[10px] text-brand-text-muted leading-normal line-clamp-2">
                          {preset.desc}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => {
                            applyPreset(preset);
                            setShowScheduleForm(true);
                          }}
                          className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-brand-accent text-white font-mono text-3xs font-black tracking-widest uppercase transition-colors shrink-0 cursor-pointer text-right"
                        >
                          Book Preset Target
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Live Manual Form
              <form onSubmit={requestCreateEvent} className="bg-brand-surface border border-[#1A1A1A]/15 p-5 space-y-4 font-mono text-[10px]">
                {/* Preset Fast Quick Switch */}
                <div className="p-2.5 bg-white border border-[#1A1A1A]/10 rounded flex justify-between items-center mb-2">
                  <span className="text-3xs text-brand-text-muted font-bold">Presets quick loader</span>
                  <div className="flex gap-1.5">
                    {presets.map((p, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => applyPreset(p)}
                        className={`px-2 py-1 text-3xs border transition-colors cursor-pointer font-bold ${
                          meetingTitle === p.title 
                          ? 'bg-brand-accent border-brand-accent text-white' 
                          : 'bg-brand-surface border-zinc-200 hover:border-zinc-400 text-zinc-600'
                        }`}
                      >
                        P{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-1">
                  <label className="text-3xs text-brand-text-muted font-black tracking-widest uppercase block">Meeting Summary / Title</label>
                  <input
                    type="text"
                    required
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    className="w-full bg-white border border-[#1A1A1A]/10 focus:border-brand-accent px-3 py-2 text-3xs text-zinc-900 focus:outline-none placeholder:text-zinc-300"
                    placeholder="Enter meeting context..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-3xs text-brand-text-muted font-black tracking-widest uppercase block">Execution Date</label>
                    <input
                      type="date"
                      required
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A]/10 focus:border-brand-accent px-3 py-2 text-3xs text-zinc-900 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs text-brand-text-muted font-black tracking-widest uppercase block">Start Time</label>
                    <input
                      type="time"
                      required
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A]/10 focus:border-brand-accent px-3 py-2 text-3xs text-zinc-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-3xs text-brand-text-muted font-black tracking-widest uppercase block">Duration (Minutes)</label>
                    <select
                      value={meetingDuration}
                      onChange={(e) => setMeetingDuration(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A]/10 focus:border-brand-accent px-3 py-2 text-3xs text-zinc-900 focus:outline-none"
                    >
                      <option value="15">15 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="45">45 Minutes</option>
                      <option value="60">60 Minutes / 1 Hr</option>
                      <option value="90">90 Minutes / 1.5 Hrs</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs text-brand-text-muted font-black tracking-widest uppercase block">Meeting Location</label>
                    <input
                      type="text"
                      value={meetingLocation}
                      onChange={(e) => setMeetingLocation(e.target.value)}
                      className="w-full bg-white border border-[#1A1A1A]/10 focus:border-brand-accent px-3 py-2 text-3xs text-zinc-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1 col-span-2">
                  <label className="text-3xs text-brand-text-muted font-black tracking-widest uppercase block">Agenda Summary Details</label>
                  <textarea
                    value={meetingDesc}
                    onChange={(e) => setMeetingDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-white border border-[#1A1A1A]/10 focus:border-brand-accent px-3 py-2 text-3xs text-zinc-900 focus:outline-none font-sans"
                    placeholder="Enter scientific agendas..."
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="px-4 py-2 border border-[#1A1A1A]/10 bg-white text-[#1A1A1A] font-mono text-3xs font-black tracking-widest uppercase hover:bg-brand-surface transition-colors cursor-pointer"
                  >
                    BACK TO PRESETS
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-accent text-white font-mono text-3xs font-black tracking-widest uppercase hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
                  >
                    Verify Slot & Insert
                  </button>
                </div>
              </form>
            )}

            {fetchError && (
              <div className="bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 py-2 px-4 font-mono text-3xs flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{fetchError}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ZERO-TRUST OAUTH SECURITY MUTATION CONFIRMATION DIALOG (MODAL INTEGRATION) */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!mutationLoading) setConfirmModal(prev => ({ ...prev, isOpen: false })); }}
              className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-md p-6 border border-[#1A1A1A]/10 shadow-2xl space-y-4 text-left font-sans"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <Info className="w-5 h-5 text-brand-accent" />
                <h4 className="font-mono text-2xs font-extrabold tracking-widest text-[#1A1A1A] uppercase">
                  {confirmModal.title}
                </h4>
              </div>

              <div className="space-y-3">
                <p className="text-2xs text-brand-text-muted leading-relaxed">
                  {confirmModal.details}
                </p>
                <div className="p-3 bg-brand-surface border border-zinc-200/50 rounded flex items-center gap-2 text-3xs font-mono font-black text-brand-accent">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shrink-0"></span>
                  ATTENTION: DIRECT REMOTE DATA MUTATION CONFIRMED WITH GOOGLE CALENDAR
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2.5">
                <button
                  type="button"
                  disabled={mutationLoading}
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 border border-[#1A1A1A]/10 bg-white hover:bg-brand-surface text-[#1A1A1A] font-mono text-3xs font-black tracking-widest uppercase transition-colors shrink-0 disabled:opacity-40 cursor-pointer"
                >
                  CANCEL OPERATION
                </button>
                <button
                  type="button"
                  disabled={mutationLoading}
                  onClick={handleMutationConfirm}
                  className={`px-5 py-2 text-white font-mono text-3xs font-black tracking-widest uppercase transition-all shrink-0 cursor-pointer ${
                    confirmModal.type === 'delete' 
                      ? 'bg-[#DC2626] hover:bg-red-700' 
                      : 'bg-brand-accent hover:bg-opacity-95'
                  }`}
                >
                  {mutationLoading ? 'COMMITTING WRITE...' : 'CONFIRM WRITE'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
