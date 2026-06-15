import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  RefreshCw, 
  Link2, 
  Unlink, 
  FolderGit2, 
  Users, 
  Star, 
  Sparkles, 
  Bot, 
  Code,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Copy,
  Terminal,
  Settings
} from 'lucide-react';

interface Repo {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface GithubProfile {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface PortalState {
  isConnected: boolean;
  username: string;
  userProfile: GithubProfile | null;
  repositories: Repo[];
  lastUpdated: string | null;
}

export default function GitHubPortal() {
  const [state, setState] = useState<PortalState>({
    isConnected: false,
    username: 'dggaur385',
    userProfile: null,
    repositories: [],
    lastUpdated: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputUsername, setInputUsername] = useState('');
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<'dev' | 'shared' | null>(null);

  // Exact callback URLs from AI Studio metadata
  const devUrl = "https://ais-dev-scclakdldlsuxpspxxajga-688291315470.asia-east1.run.app";
  const sharedUrl = "https://ais-pre-scclakdldlsuxpspxxajga-688291315470.asia-east1.run.app";
  const callbackPath = "/auth/callback";

  // Fetch the current portal state from our Express server
  const fetchPortalState = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/github/profile');
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again in 15 minutes.");
      }
      if (!response.ok) {
        throw new Error(`Failed to load GitHub profile data (${response.status})`);
      }
      const data = await response.json();
      setState(data);
      if (data.username) {
        setInputUsername(data.username);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while loading GitHub data.");
    } finally {
      setLoading(false);
    }
  };

  // Switch public profile target (no OAuth required)
  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/github/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputUsername.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Failed to fetch public profile for "${inputUsername}"`);
      }

      const data = await response.json();
      setState(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || `Could not find public GitHub user "${inputUsername}". Check rate limits or spelling.`);
    } finally {
      setLoading(false);
    }
  };

  // Trigger the popup based OAuth flow following system iframe constraints
  const handleConnectOAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get the authorize URL with correctly embedded redirect origins
      const currentOrigin = window.location.origin;
      const response = await fetch(`/api/auth/github/url?origin=${encodeURIComponent(currentOrigin)}`);
      
      if (!response.ok) {
        const errVal = await response.json();
        throw new Error(errVal.error || "OAuth setup missing. Please read the developer config below.");
      }
      
      const { url } = await response.json();

      // 2. Open the GitHub Provider's authorize URL directly in popup
      const popupWidth = 620;
      const popupHeight = 720;
      const left = window.screen.width / 2 - popupWidth / 2;
      const top = window.screen.height / 2 - popupHeight / 2;

      const authWindow = window.open(
        url,
        'github_oauth_popup',
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );

      if (!authWindow) {
        throw new Error("Popup blocked! Please allow popups to link your account.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to trigger OAuth credentials flow.");
      setLoading(false);
    }
  };

  // Disconnect the authenticated access token
  const handleDisconnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/github/disconnect', { method: 'POST' });
      if (!response.ok) {
        throw new Error("Failed to clear authenticated session");
      }
      const data = await response.json();
      setState(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'dev' | 'shared') => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(type);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Listen for callback postMessage from the popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      // Allow from AI Studio preview or localhost
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchPortalState();
      }
    };

    window.addEventListener('message', handleMessage);
    fetchPortalState();

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 md:px-8">
      {/* HUD Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#1A1A1A]/10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-brand-accent text-[9px] font-mono font-bold tracking-widest uppercase block">
              CO-LAB INTEGRATION CORE
            </span>
          </div>
          <h2 className="font-serif italic text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase leading-none">
            GitHub Portal.
          </h2>
          <p className="text-sm text-brand-text-muted leading-relaxed font-normal max-w-xl">
            Inspect real-time developer metrics, active repositories, and source codes synced directly via the secure server-side GitHub pipeline.
          </p>
        </div>

        {/* Sync / Connect Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchPortalState}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-gray-900 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            SYNC REFRESH
          </button>

          {state.isConnected ? (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                LINKED VIA OAUTH
              </span>
              <button
                onClick={handleDisconnect}
                disabled={loading}
                className="p-1 px-2.5 text-[9px] text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-full font-mono font-bold uppercase cursor-pointer flex items-center gap-1"
                title="Disconnect your GitHub Account link"
              >
                <Unlink className="w-2.5 h-2.5" />
                UNLINK
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-50 border border-amber-100 text-amber-600 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                PUBLIC PROFILE SYNCHRONIZATION
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Error Indicator */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3.5 text-sm text-red-700"
        >
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold font-mono text-xs uppercase tracking-wider">Interface Dispatch Fault</h5>
            <p className="text-red-600 font-medium leading-relaxed">{error}</p>
            {!state.isConnected && (
              <button 
                onClick={() => setShowSetupInstructions(true)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline font-mono uppercase tracking-wider mt-1 cursor-pointer block"
              >
                Configure GitHub Secrets in AI Studio Settings &rarr;
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Grid: Left column (Identity Center), Right column (Repository Log) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Avatar Panel & Connector Config */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/80 backdrop-blur-md border border-[#1A1A1A]/10 p-6 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            {/* Ambient biological matrix blur indicator */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/5 blur-3xl" />
            
            <div className="space-y-6 relative z-10">
              {/* Profile Avatar Card */}
              {state.userProfile ? (
                <div className="space-y-4">
                  <div className="relative w-28 h-28 mx-auto group">
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-[#8B5CF6] to-[#10B981] p-[3px] shadow-sm">
                      <div className="w-full h-full bg-white rounded-[1.85rem] overflow-hidden">
                        <img
                          src={state.userProfile.avatar_url}
                          alt={state.userProfile.name || state.userProfile.login}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-1.5">
                    <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A]">
                      {state.userProfile.name || state.userProfile.login}
                    </h3>
                    <p className="font-mono text-xs text-brand-text-muted flex items-center justify-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-gray-500" />
                      @{state.userProfile.login}
                    </p>
                    {state.userProfile.bio && (
                      <p className="text-xs text-gray-600 italic px-4 mt-2 font-sans line-clamp-3 leading-relaxed">
                        &ldquo;{state.userProfile.bio}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Core Metrics Bento Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center font-mono">
                    <div className="p-1.5">
                      <span className="text-[10px] text-gray-400 block uppercase tracking-wider">REPOS</span>
                      <strong className="text-sm text-[#1A1A1A] font-black">{state.userProfile.public_repos}</strong>
                    </div>
                    <div className="p-1.5 border-x border-gray-200">
                      <span className="text-[10px] text-gray-400 block uppercase tracking-wider">FOLLOWERS</span>
                      <strong className="text-sm text-[#1A1A1A] font-black">{state.userProfile.followers}</strong>
                    </div>
                    <div className="p-1.5">
                      <span className="text-[10px] text-gray-400 block uppercase tracking-wider">FOLLOWING</span>
                      <strong className="text-sm text-[#1A1A1A] font-black">{state.userProfile.following}</strong>
                    </div>
                  </div>

                  <a
                    href={state.userProfile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors"
                  >
                    VISIT PROFILE ON GITHUB
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                /* Profile Loading Placeholder */
                <div className="text-center py-12 space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-300">
                    <Github className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-2/3 mx-auto animate-pulse" />
                  </div>
                  <p className="text-xs text-gray-400 font-mono">Syncing biological codes...</p>
                </div>
              )}
            </div>
          </div>

          {/* Linking Controllers Box */}
          <div className="bg-white/80 backdrop-blur-md border border-[#1A1A1A]/10 p-6 rounded-[2.5rem] shadow-sm space-y-5">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Linking Terminal
            </h4>

            {/* Form for public user query */}
            <form onSubmit={handleUpdateUsername} className="space-y-3">
              <label className="block text-xs font-sans font-semibold text-gray-700">
                Synchronize Public Github Account:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  placeholder="Enter GitHub username..."
                  className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl text-xs font-mono text-gray-900 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 p-1 text-indigo-600 hover:text-indigo-800 focus:outline-none disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 leading-snug">
                Type any valid GitHub username to automatically fetch public metrics, stars, and repository cards instantly.
              </p>
            </form>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <label className="block text-xs font-sans font-semibold text-gray-700">
                Establish Dedicated Authentication:
              </label>
              
              <button
                type="button"
                onClick={handleConnectOAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-tr from-[#8B5CF6] to-[#6366F1] hover:from-[#A78BFA] hover:to-[#8B5CF6] text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer disabled:opacity-60"
              >
                <Link2 className="w-4 h-4" />
                {state.isConnected ? "RECONNECT SECURE APP" : "CONNECT SECURE APP"}
              </button>

              <button
                type="button"
                onClick={() => setShowSetupInstructions(!showSetupInstructions)}
                className="w-full py-1.5 hover:bg-gray-50 border border-gray-150 text-gray-600 rounded-xl text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Settings className="w-3 h-3 text-indigo-500 animate-spin-slow" />
                {showSetupInstructions ? "HIDE SETUP SHEATH &larr;" : "SHOW DEVELOPER API CONFIG &rarr;"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Repositories Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/80 backdrop-blur-md border border-[#1A1A1A]/10 p-6 rounded-[2.5rem] shadow-sm space-y-6 min-h-[480px]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-brand-accent" />
                ACTIVE REPOSITORIES LOG ({state.repositories.length || 0})
              </h4>
              
              {state.lastUpdated && (
                <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest">
                  CELLULAR LOCK: {new Date(state.lastUpdated).toLocaleTimeString()}
                </span>
              )}
            </div>

            {/* Repos Grid */}
            {state.repositories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.repositories.map((repo, i) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-brand-accent/20 p-4.5 rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgb(124,58,237,0.03)] transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className="font-serif italic text-base font-bold text-[#1A1A1A] tracking-tight group-hover:text-brand-accent transition-colors line-clamp-1">
                          {repo.name}
                        </h4>
                        <a 
                          href={repo.html_url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {repo.description ? (
                        <p className="text-[#4b5563] text-xs font-sans line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      ) : (
                        <p className="text-gray-400 text-xs italic font-mono">No description curated.</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/50 mt-3">
                      {repo.language ? (
                        <span className="font-mono text-[9px] text-[#A78BFA] font-extrabold tracking-wider uppercase flex items-center gap-1">
                          <Code className="w-3 h-3 text-brand-accent" />
                          {repo.language}
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">Unknown</span>
                      )}

                      <div className="flex items-center gap-3 font-mono text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          {repo.stargazers_count}
                        </span>
                        <span className="text-[8px] text-gray-300">|</span>
                        <span>
                          {new Date(repo.updated_at).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-24 space-y-4">
                <FolderGit2 className="w-12 h-12 text-gray-200 animate-pulse" />
                <div className="space-y-1">
                  <h5 className="font-serif italic text-lg font-bold text-[#1A1A1A]">No public metrics retrieved</h5>
                  <p className="text-xs text-gray-400 max-w-sm">
                    Enter your GitHub username or pair your developer credentials using the link controllers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Developer API Configuration Helper Box Container */}
      <AnimatePresence>
        {showSetupInstructions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-[#1A1A1A] text-white p-6 md:p-8 rounded-[2.5rem] mt-6 border border-white/10 space-y-6 font-sans">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-[#A78BFA] flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    DEVELOPER SETUP GUIDE: GITHUB APP REGISTRATION
                  </h4>
                  <p className="text-xs text-gray-400">
                    Follow these essential secure steps to connect your dedicated personal GitHub portal to this container.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSetupInstructions(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm leading-relaxed">
                <div className="lg:col-span-7 space-y-4">
                  <h5 className="font-serif italic text-lg text-white font-medium">
                    1. Register a GitHub OAuth App
                  </h5>
                  <p className="text-gray-300 text-xs">
                    Access your Personal settings in GitHub, select Developer settings, and compile a new <strong>OAuth Application</strong>.
                  </p>
                  
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4.5 space-y-4 font-mono text-xs">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Homepage URL:</span>
                      <div className="flex items-center justify-between bg-black/50 p-2 rounded-lg border border-white/10">
                        <code className="text-[#10B981] select-all truncate">{devUrl}</code>
                        <button
                          onClick={() => copyToClipboard(devUrl, 'dev')}
                          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-colors cursor-pointer"
                        >
                          {copiedUrl === 'dev' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Authorization Callback URL:</span>
                      <div className="flex items-center justify-between bg-black/50 p-2 rounded-lg border border-white/10">
                        <code className="text-[#10B981] select-all truncate">{devUrl}{callbackPath}</code>
                        <button
                          onClick={() => copyToClipboard(`${devUrl}${callbackPath}`, 'shared')}
                          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white rounded transition-colors cursor-pointer"
                        >
                          {copiedUrl === 'shared' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-300/80 italic font-mono leading-normal">
                    * Make sure to add both local and preview callbacks if you intend to share this application with external reviewers.
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <h5 className="font-serif italic text-lg text-white font-medium">
                    2. Configure AI Studio Secret Keys
                  </h5>
                  <p className="text-gray-300 text-xs">
                    Under the <strong>Settings</strong> menu panel inside your AI Studio dashboard, add the generated Client parameters:
                  </p>
                  
                  <ul className="space-y-2 text-xs font-mono bg-black/40 border border-white/5 p-4 rounded-xl text-indigo-200">
                    <li className="flex justify-between items-center">
                      <span>GITHUB_CLIENT_ID</span>
                      <span className="text-gray-500 text-[10px] uppercase">Client parameter</span>
                    </li>
                    <li className="flex justify-between items-center border-t border-white/5 pt-2">
                      <span>GITHUB_CLIENT_SECRET</span>
                      <span className="text-gray-500 text-[10px] uppercase">Secret parameter</span>
                    </li>
                  </ul>

                  <div className="bg-indigo-950/40 border border-indigo-500/20 p-4 rounded-2xl flex gap-3 text-xs text-indigo-200">
                    <Bot className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans leading-relaxed">
                        Once environment parameters match securely, tap <strong>&ldquo;Connect Secure App&rdquo;</strong> to synchronize the authentication state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
