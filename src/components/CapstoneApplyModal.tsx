import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  Zap,
} from 'lucide-react';

interface CapstoneApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSystem?: string;
}

const SYSTEMS = [
  { id: 'smart-mohs', name: 'Smart Mohs (Medicine & Laser Robotics)', tag: 'C++23 • CUDA • Optics' },
  { id: 'transit-os', name: 'Transit-OS (Transportation & Fleet Mesh)', tag: 'Rust • Multi-Agent • GIS' },
  { id: 'sovereign-mesh', name: 'Sovereign Mesh (Clean Energy & Microgrids)', tag: 'Telemetry • SMR • Edge' },
  { id: 'digitpop', name: 'DigitPop (Interactive Video & Live Commerce)', tag: 'Wasm • Sub-10ms • WebGL' },
  { id: 'opportunity-os', name: 'Opportunity OS (Social Plank & Dignity Engine)', tag: 'Full-Stack • Extension • AI' },
];

const TRACKS = [
  { id: 'capstone', label: 'Senior Capstone (4th Year)' },
  { id: 'coop', label: 'Co-op Work Term' },
  { id: 'both', label: 'Both / Flexible' },
];

const SYSTEM_PLACEHOLDERS: Record<string, string> = {
  'smart-mohs': "e.g., Tell Jeff about your C++23, CUDA, or computer vision experience, and your interest in sub-cellular optical biopsy margins or 3D cold laser micro-ablation.",
  'transit-os': "e.g., Tell Jeff about your Rust, GIS, or distributed multi-agent routing experience, and your interest in deterministic municipal transit dispatch.",
  'sovereign-mesh': "e.g., Tell Jeff about your edge systems, telemetry, or clean energy microgrid interests, and hands-on experience with SMR or battery control systems.",
  'digitpop': "e.g., Tell Jeff about your WebAssembly, WebGL, or video codec experience, and interest in building sub-10ms interactive live commerce overlays.",
  'opportunity-os': "e.g., Tell Jeff about your TypeScript, Chrome extension, or LLM agent workflow experience, and interest in building dignity-first career infrastructure."
};

export const CapstoneApplyModal: React.FC<CapstoneApplyModalProps> = ({
  isOpen,
  onClose,
  initialSystem = 'smart-mohs',
}) => {
  const [selectedSystem, setSelectedSystem] = useState(initialSystem);
  const [selectedTrack, setSelectedTrack] = useState('capstone');
  const [fullName, setFullName] = useState('');
  const [uottawaEmail, setUottawaEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [interestsNote, setInterestsNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && initialSystem) {
      setSelectedSystem(initialSystem);
      setSubmitted(false);
    }
  }, [isOpen, initialSystem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const systemObj = SYSTEMS.find((s) => s.id === selectedSystem) || SYSTEMS[0];
    const trackObj = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];
    const subject = encodeURIComponent(
      `uOttawa SEG Student Application [${trackObj.label}] - ${systemObj.name} (${fullName || 'Student'})`
    );
    const body = encodeURIComponent(
      `Full Name: ${fullName}\n` +
      `uOttawa Email: ${uottawaEmail}\n` +
      `GitHub Profile: ${githubUrl}\n` +
      `Application Track: ${trackObj.label}\n` +
      `Selected System: ${systemObj.name}\n\n` +
      `Engineering Background & Why I want to build this:\n${interestsNote}\n\n` +
      `---\n` +
      `Submitted via boggs.build Student Fast-Track Intake.`
    );

    // Open mail client
    window.location.href = `mailto:jeff@boggs.build?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const currentSystemObj = SYSTEMS.find((s) => s.id === selectedSystem) || SYSTEMS[0];
  const currentSystemShortName = currentSystemObj.name.split(' (')[0];

  return (
    <div className="capstone-modal-overlay" onClick={onClose}>
      <div
        className="capstone-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="capstone-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="capstone-modal-header">
              <div className="capstone-modal-badge">
                <GraduationCap size={15} /> uOttawa SEG Intake • {currentSystemShortName} Pod
              </div>
              <h2 className="capstone-modal-title">
                Apply to {currentSystemShortName}. Skip Corporate Bureaucracy.
              </h2>
              <p className="capstone-modal-subtitle">
                Whether you are applying for a <strong>Senior Capstone Project</strong>, a <strong>Co-op Work Term</strong>, or a <strong>Software Apprenticeship</strong>—Boggs Systems onboards you in <strong>48 hours</strong>: direct review by Jeff Boggs ➔ fast-track mutual NDA ➔ immediate GitHub repository invite to an advanced, working codebase.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="capstone-modal-form">
              {/* Application Track Selector */}
              <div className="capstone-form-group">
                <label className="capstone-form-label">
                  Select Application Track:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {TRACKS.map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      className={`capstone-system-card ${selectedTrack === t.id ? 'active' : ''}`}
                      onClick={() => setSelectedTrack(t.id)}
                      style={{ textAlign: 'center', padding: '9px 8px' }}
                    >
                      <span className="capstone-sys-name" style={{ fontSize: '0.78rem' }}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* System Selector */}
              <div className="capstone-form-group">
                <label className="capstone-form-label">
                  Select Target System / Repository:
                </label>
                <div className="capstone-system-grid">
                  {SYSTEMS.map((sys) => {
                    const isSelected = selectedSystem === sys.id;
                    return (
                      <button
                        type="button"
                        key={sys.id}
                        className={`capstone-system-card ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedSystem(sys.id)}
                      >
                        <div className="capstone-sys-header">
                          <span className="capstone-sys-name">{sys.name}</span>
                          <span className="capstone-sys-tag">{sys.tag}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="capstone-form-row">
                <div className="capstone-form-group" style={{ flex: 1 }}>
                  <label className="capstone-form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Tremblay"
                    className="capstone-form-input"
                  />
                </div>
                <div className="capstone-form-group" style={{ flex: 1 }}>
                  <label className="capstone-form-label">uOttawa Email *</label>
                  <input
                    type="email"
                    required
                    value={uottawaEmail}
                    onChange={(e) => setUottawaEmail(e.target.value)}
                    placeholder="student@uottawa.ca"
                    className="capstone-form-input"
                  />
                </div>
              </div>

              {/* GitHub URL */}
              <div className="capstone-form-group">
                <label className="capstone-form-label">GitHub Profile URL *</label>
                <input
                  type="url"
                  required
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/your-username"
                  className="capstone-form-input"
                />
              </div>

              {/* Interests & Background Note */}
              <div className="capstone-form-group">
                <label className="capstone-form-label">
                  Engineering Strengths & Why You Want This System (Optional)
                </label>
                <textarea
                  rows={3}
                  value={interestsNote}
                  onChange={(e) => setInterestsNote(e.target.value)}
                  placeholder={
                    SYSTEM_PLACEHOLDERS[selectedSystem] ||
                    "Tell Jeff about your technical interests (C++, Rust, CUDA, WebAssembly, UI) and what features you'd like to build."
                  }
                  className="capstone-form-textarea"
                />
              </div>

              {/* High-Velocity Guarantee Callout */}
              <div className="capstone-velocity-callout">
                <Clock size={18} className="text-amber" />
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  <strong style={{ color: '#fbbf24' }}>48-Hour Turnaround:</strong> Application reviewed directly by founder Jeff Boggs (uOttawa SEG Alum) ahead of the November Ottawa campus visit.
                </div>
              </div>

              <button type="submit" className="capstone-btn-submit">
                <Send size={16} /> Submit Application & Draft Brief
              </button>
            </form>
          </>
        ) : (
          <div className="capstone-success-view">
            <div className="capstone-success-icon">
              <CheckCircle2 size={42} style={{ color: '#10b981' }} />
            </div>
            <h3 className="capstone-success-title">Application Drafted!</h3>
            <p className="capstone-success-desc">
              Your application details have been formatted and routed to founder Jeff Boggs (<code>jeff@boggs.build</code>). If your email client didn't open automatically, send your brief directly to <strong>jeff@boggs.build</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="capstone-btn-secondary"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
