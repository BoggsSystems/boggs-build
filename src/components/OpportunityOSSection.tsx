import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  Layers,
  Zap,
} from 'lucide-react';
import resumeMockupUrl from '../assets/opportunity-os-resume.png';

const ChromeLogo: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12c0 .35.02.7.06 1.04l5.88-10.18C9.28 2.31 10.6 2 12 2z" />
    <path fill="#FBBC05" d="M12 2c2.3 0 4.41.77 6.1 2.07L12 12V2z" />
    <path fill="#4285F4" d="M21.94 10.96C21.98 11.3 22 11.65 22 12c0 5.52-4.48 10-10 10-.35 0-.7-.02-1.04-.06l10.18-5.88c.55-1.34.86-2.66.86-4.1z" />
    <path fill="#34A853" d="M12 22c-2.3 0-4.41-.77-6.1-2.07L12 12v10z" />
    <circle cx="12" cy="12" r="4.5" fill="#FFFFFF" />
    <circle cx="12" cy="12" r="3.5" fill="#1A73E8" />
  </svg>
);

export const OpportunityOSSection: React.FC = () => {
  const CHROME_STORE_URL =
    'https://chromewebstore.google.com/search/Opportunity%20OS';
  const WEB_APP_URL = 'https://opportunity-system.com';

  return (
    <section className="opportunity-section-wrap">
      <div className="opportunity-section-container">
        {/* Top Section Badge */}
        <div className="opportunity-section-badge">
          <Sparkles size={14} /> Social Plank • The Live Dignity Engine
        </div>

        <div className="opportunity-grid">
          {/* Left Column: Copy & Big Buttons */}
          <div className="opportunity-copy-col">
            <h2 className="opportunity-main-title">
              Cut 1 week off your search. <br />
              <span className="opportunity-title-gradient">Save $2,000.</span>
            </h2>

            <p className="opportunity-subtitle">
              At a $100K salary, every week spent searching or waiting costs nearly $2,000 in lost income. Opportunity OS automates your company discovery, ATS evidence tailoring, and 1-click application execution directly inside LinkedIn, Greenhouse, Ashby, and Workday.
            </p>

            <p className="opportunity-meta-note">
              <strong>The Empirical 23x Benchmark:</strong> Built as the live case study for <em>The New Physics of Software Velocity</em> (Chapter 21)—delivering an enterprise multi-surface ecosystem (180,000+ lines of production code) in 55 days as a solo orchestrator.
            </p>

            {/* BIG ACTION BUTTONS */}
            <div className="opportunity-buttons-deck">
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="opportunity-btn-chrome-big"
              >
                <ChromeLogo size={24} />
                <div style={{ textAlign: 'left' }}>
                  <div className="opportunity-btn-chrome-main">Add to Chrome — Free Co-Pilot</div>
                  <div className="opportunity-btn-chrome-sub">1-Click autofill & fit scoring on job portals</div>
                </div>
                <ArrowRight size={18} style={{ marginLeft: 'auto' }} />
              </a>

              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noreferrer"
                className="opportunity-btn-web-secondary"
              >
                <span>Launch Web Platform (3-Application Pass)</span>
                <ExternalLink size={15} />
              </a>
            </div>

            {/* Trust / Stats Row */}
            <div className="opportunity-perks-row">
              <div className="opportunity-perk-item">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Zero Generic AI Spam</span>
              </div>
              <div className="opportunity-perk-item">
                <ShieldCheck size={16} className="text-cyan" />
                <span>Private Career Evidence Vault</span>
              </div>
              <div className="opportunity-perk-item">
                <Clock size={16} className="text-gold" />
                <span>Save 15+ Hours / Week</span>
              </div>
            </div>
          </div>

          {/* Right Column: Platform UI Mockup */}
          <div className="opportunity-mockup-col">
            <div className="opportunity-browser-card">
              <div className="opportunity-browser-bar">
                <div className="opportunity-browser-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="opportunity-browser-address">
                  https://app.opportunity-system.com/resume
                </div>
                <span className="opportunity-browser-pill">Live App</span>
              </div>

              <div className="opportunity-browser-viewport">
                <img
                  src={resumeMockupUrl}
                  alt="Opportunity OS Resume & Evidence Studio"
                  className="opportunity-mockup-img"
                />
                <div className="opportunity-browser-overlay-hint">
                  <a
                    href={WEB_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="opportunity-overlay-cta"
                  >
                    <span>Inspect Live Platform</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              <div className="opportunity-card-footer">
                <div className="opportunity-feature-tags">
                  <span className="opportunity-feature-tag">
                    <Zap size={12} className="text-amber" /> 1-Click Form Autofill
                  </span>
                  <span className="opportunity-feature-tag">
                    <Layers size={12} className="text-cyan" /> Evidence Studio
                  </span>
                  <span className="opportunity-feature-tag">
                    <TrendingUp size={12} className="text-emerald" /> Pipeline Tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
