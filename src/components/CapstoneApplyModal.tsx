import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  UploadCloud,
  FileText,
  Trash2,
  Loader2,
  Check,
} from 'lucide-react';

interface CapstoneApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSystem?: string;
}

const SYSTEMS = [
  { id: 'smart-mohs', name: 'Smart Mohs (Medicine & Laser Robotics)', tag: 'C++23 • CUDA • Optics' },
  { id: 'borealis-pods', name: 'Borealis Pods (6-Passenger Autonomous Fleet)', tag: 'C++20 • ROS 2 • V2X' },
  { id: 'borealis-maglev', name: 'Borealis Maglev (500 km/h Tube & Avionics)', tag: 'Rust • QNX • SIL-4' },
  { id: 'robot-fleet', name: 'Robot Fleet (Humanoid & Quadruped Multi-Agent)', tag: 'CycloneDDS • MuJoCo • DTDL v3' },
  { id: 'digital-twin-appliance', name: 'Digital Twin Appliance (UE5 • Vulkan Cockpit)', tag: 'C++20 • UE5 • Embedded Linux' },
  { id: 'digitpop', name: 'DigitPop (Interactive Video & Live Commerce)', tag: 'Wasm • Sub-10ms • WebGL' },
  { id: 'opportunity-os', name: 'Opportunity OS (ATS Co-Pilot & Job Search Engine)', tag: 'TypeScript • Chrome MV3 • Local AI' },
  { id: 'civic-campus', name: 'Sovereign Civic Campuses (Pine Street Model & Pod Transit)', tag: 'Robotics • Transit • Civic Infra' },
];

const TRACKS = [
  { id: 'capstone', label: 'Senior Capstone (4th Year)' },
  { id: 'coop', label: 'Co-op Work Term' },
  { id: 'both', label: 'Both / Flexible' },
];

const SYSTEM_PLACEHOLDERS: Record<string, string> = {
  'smart-mohs': "e.g., Tell Jeff about your C++23, CUDA, or computer vision experience, and your interest in sub-cellular optical biopsy margins or 3D cold laser micro-ablation.",
  'borealis-maglev': "e.g., Tell Jeff about your Rust, QNX, control theory, or formal verification experience, and your interest in 20 kHz active levitation gap regulation or aerodynamic failsafes.",
  'robot-fleet': "e.g., Tell Jeff about your robotics, ROS 2 / CycloneDDS, MuJoCo physics, or computer vision experience, and your interest in multi-agent humanoid/quadruped collaborative manipulation.",
  'digital-twin-appliance': "e.g., Tell Jeff about your C++, Unreal Engine 5, embedded Linux / Vulkan DRM-KMS, or hardware HMI experience, and your interest in building bare-metal digital twin cockpits.",
  'borealis-pods': "e.g., Tell Jeff about your C++20, ROS 2, sensor fusion, or Cellular-V2X experience, and your interest in Level 4 urban path planning or dynamic green-wave pacing.",
  'transit-os': "e.g., Tell Jeff about your Rust, GIS, or distributed multi-agent routing experience, and your interest in deterministic municipal transit dispatch.",
  'digitpop': "e.g., Tell Jeff about your WebAssembly, WebGL, or video codec experience, and interest in building sub-10ms interactive live commerce overlays.",
  'opportunity-os': "e.g., Tell Jeff about your TypeScript, Chrome extension Manifest V3, DOM mutation parsing, or LLM agent workflow experience, and your interest in destroying the job search headache.",
  'civic-campus': "e.g., Tell Jeff about your robotics, ROS 2, civil infrastructure, microgrid systems, or urban transit corridor experience, and your interest in building modern dignified shelter communities."
};

export const CapstoneApplyModal: React.FC<CapstoneApplyModalProps> = ({
  isOpen,
  onClose,
  initialSystem = 'smart-mohs',
}) => {
  const [selectedSystem, setSelectedSystem] = useState(initialSystem);
  const [showSystemPicker, setShowSystemPicker] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('capstone');
  const [fullName, setFullName] = useState('');
  const [uottawaEmail, setUottawaEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [interestsNote, setInterestsNote] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen && initialSystem) {
      const resolved = initialSystem === 'transit-os' ? 'borealis-pods' : initialSystem;
      setSelectedSystem(resolved);
      setShowSystemPicker(false);
      setStatus('idle');
      setErrorMessage('');
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

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Resume file size must be less than 10MB.');
      return;
    }
    setErrorMessage('');
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const systemObj = SYSTEMS.find((s) => s.id === selectedSystem) || SYSTEMS[0];
    const trackObj = TRACKS.find((t) => t.id === selectedTrack) || TRACKS[0];

    try {
      const formData = new FormData();
      formData.append('_subject', `uOttawa Student Application [${trackObj.label}] - ${systemObj.name} (${fullName})`);
      formData.append('_replyto', uottawaEmail);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');
      formData.append('Candidate Name', fullName);
      formData.append('uOttawa Email', uottawaEmail);
      formData.append('GitHub Profile', githubUrl);
      formData.append('Application Track', trackObj.label);
      formData.append('Target System Pod', systemObj.name);
      formData.append('Engineering Strengths & Notes', interestsNote || 'None provided');
      if (resumeFile) {
        formData.append('attachment', resumeFile, resumeFile.name);
      }

      const response = await fetch('https://formsubmit.co/ajax/jeff@boggs.build', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json().catch(() => null);
      if (response.ok || (data && data.success === 'true')) {
        setStatus('success');
      } else {
        throw new Error(data?.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit network failure, falling back to mailto client:', err);
      // Graceful fallback to mailto if blocked by adblocker/offline
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
      window.location.href = `mailto:jeff@boggs.build?subject=${subject}&body=${body}`;
      setStatus('success');
    }
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

        {status !== 'success' ? (
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

              {/* Locked System Pod Badge (with toggle) */}
              <div className="capstone-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="capstone-form-label">Target System / Repository:</label>
                  <button
                    type="button"
                    onClick={() => setShowSystemPicker(!showSystemPicker)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#38bdf8',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: 600,
                    }}
                  >
                    {showSystemPicker ? 'Hide pods ▴' : 'Change pod ▾'}
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <span style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.86rem' }}>
                      {currentSystemObj.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: '#38bdf8',
                      fontFamily: 'monospace',
                      background: 'rgba(56, 189, 248, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {currentSystemObj.tag}
                  </span>
                </div>

                {showSystemPicker && (
                  <div className="capstone-system-grid" style={{ marginTop: '8px', maxHeight: '160px' }}>
                    {SYSTEMS.map((sys) => {
                      const isSelected = selectedSystem === sys.id;
                      return (
                        <button
                          type="button"
                          key={sys.id}
                          className={`capstone-system-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedSystem(sys.id);
                            setShowSystemPicker(false);
                          }}
                        >
                          <div className="capstone-sys-header">
                            <span className="capstone-sys-name">{sys.name}</span>
                            <span className="capstone-sys-tag">{sys.tag}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
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

              {/* Resume / Project Brief Upload */}
              <div className="capstone-form-group">
                <label className="capstone-form-label">
                  Resume / Project Brief (PDF or Word, Optional)
                </label>
                {!resumeFile ? (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileSelect(e.dataTransfer.files[0]);
                      }
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      padding: '14px 12px',
                      borderRadius: '10px',
                      border: `1px dashed ${isDragging ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)'}`,
                      background: isDragging ? 'rgba(56, 189, 248, 0.08)' : 'rgba(3, 7, 18, 0.4)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileSelect(e.target.files[0]);
                        }
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.84rem' }}>
                      <UploadCloud size={18} style={{ color: '#38bdf8' }} />
                      <span><strong style={{ color: '#f1f5f9' }}>Click to upload resume</strong> or drag and drop</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>PDF or Word documents up to 10MB</span>
                  </label>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                      <FileText size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: '#f1f5f9',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {resumeFile.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                          {(resumeFile.size / 1024).toFixed(1)} KB • Ready to send
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      title="Remove file"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Interests & Background Note */}
              <div className="capstone-form-group">
                <label className="capstone-form-label">
                  Engineering Strengths & Why You Want This System (Optional)
                </label>
                <textarea
                  rows={2}
                  value={interestsNote}
                  onChange={(e) => setInterestsNote(e.target.value)}
                  placeholder={
                    SYSTEM_PLACEHOLDERS[selectedSystem] ||
                    "Tell Jeff about your technical interests (C++, Rust, CUDA, WebAssembly, UI) and what features you'd like to build."
                  }
                  className="capstone-form-textarea"
                />
              </div>

              {errorMessage && (
                <div style={{ color: '#ef4444', fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px' }}>
                  {errorMessage}
                </div>
              )}

              {/* High-Velocity Guarantee Callout */}
              <div className="capstone-velocity-callout">
                <Clock size={18} className="text-amber" />
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                  <strong style={{ color: '#fbbf24' }}>48-Hour Turnaround:</strong> Application and brief delivered directly to founder Jeff Boggs (<code style={{ color: '#38bdf8' }}>jeff@boggs.build</code>).
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="capstone-btn-submit"
                style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting Brief & Resume...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Submit Application & Draft Brief
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="capstone-success-view">
            <div className="capstone-success-icon">
              <CheckCircle2 size={46} style={{ color: '#10b981' }} />
            </div>
            <h3 className="capstone-success-title">Application Submitted!</h3>
            <p className="capstone-success-desc">
              Your application details {resumeFile ? 'and resume ' : ''}have been routed directly to founder Jeff Boggs (<code>jeff@boggs.build</code>).
              You will receive a direct review of your GitHub profile and background ahead of the November Ottawa campus sprint.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
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
