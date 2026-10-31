import React from 'react';
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Mail,
  ExternalLink,
  Cpu,
  Tv,
  Zap,
  ShieldCheck,
  Compass,
  Users,
  Building2,
  HeartHandshake,
} from 'lucide-react';

interface BoggsHeroProps {
  onScrollToPlayer: () => void;
  onOpenNewsletter: () => void;
}

export const BoggsHero: React.FC<BoggsHeroProps> = ({
  onScrollToPlayer,
  onOpenNewsletter,
}) => {
  return (
    <section className="boggs-hero-section">
      {/* Top Capstone Recruiting Announcement Banner */}
      <div className="boggs-announcement-pill">
        <div className="boggs-pill-badge">
          <GraduationCap size={15} /> uOttawa SEG 2026/2027
        </div>
        <span className="boggs-pill-text">
          Visiting Ottawa in Nov • Hiring <strong>10 Software Engineering Students</strong> across our Systems Portfolio
        </span>
        <a
          href="mailto:jeff@boggs.build?subject=uOttawa%20SEG%20Capstone%20Inquiry%20-%20Student%20Application"
          className="boggs-pill-link"
        >
          Inquire <ArrowRight size={13} />
        </a>
      </div>

      <div className="boggs-hero-content">
        <div className="boggs-hero-tag">
          <Building2 size={15} /> Boggs Systems Corporation • The Sovereign Enterprise Umbrella
        </div>

        <h1 className="boggs-hero-title">
          Democratizing Compound Capability. <br />
          <span className="boggs-hero-gradient">The Sovereign Umbrella for Autonomous Operating Systems.</span>
        </h1>

        <p className="boggs-hero-subtitle">
          Boggs Systems Inc. is the Canadian enterprise house and parent umbrella platform behind{' '}
          <strong>Transit-OS</strong>, <strong>Opportunity OS</strong>, and <strong>DigitPop</strong>.
          We architect self-orchestrating multi-agent runtimes, deterministic public systems, and purpose-locked
          capital recycling to systematically remove resource constraints for the common man.
          Founded by <strong>Jeffrey Boggs</strong>—member of the inaugural uOttawa Software Engineering class,
          16-year enterprise software architect, and author of <em>The New Physics of Software Velocity</em>.
        </p>

        {/* Action Buttons */}
        <div className="boggs-hero-actions">
          <button onClick={onScrollToPlayer} className="boggs-btn-primary">
            <Tv size={17} /> Watch Keynote & Media Hub
          </button>

          <a
            href="mailto:jeff@boggs.build?subject=Boggs%20Systems%20-%20Executive%20Inquiry"
            className="boggs-btn-secondary"
          >
            <Mail size={16} /> Contact jeff@boggs.build
          </a>

          <a
            href="https://www.amazon.com/dp/B0GN3G2HTQ"
            target="_blank"
            rel="noreferrer"
            className="boggs-btn-outline"
          >
            <BookOpen size={16} /> The Book <ExternalLink size={13} />
          </a>

          <button onClick={onOpenNewsletter} className="boggs-btn-ghost">
            Engineering Dispatches
          </button>
        </div>

        {/* The Systems Portfolio (The Umbrella Grid) */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
            <Sparkles size={15} /> The Boggs Systems Operating Portfolio
          </div>

          <div className="boggs-hero-grid">
            {/* System 1: Transit-OS (Infrastructure Plank) */}
            <div className="boggs-metric-card">
              <div className="boggs-card-header">
                <Compass size={20} className="boggs-icon-cyan" />
                <div>
                  <span className="boggs-card-title">Transit-OS</span>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Infrastructure Plank
                  </div>
                </div>
              </div>
              <p className="boggs-card-desc">
                Intelligent municipal transit scheduling, multi-agent dispatch, and corridor integration eliminating "ghost-buses" and modernizing public mobility.
              </p>
            </div>

            {/* System 2: Opportunity OS (Social Plank) */}
            <div className="boggs-metric-card">
              <div className="boggs-card-header">
                <Users size={20} className="boggs-icon-gold" />
                <div>
                  <span className="boggs-card-title">Opportunity OS</span>
                  <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Social Plank • Dignity Engine
                  </div>
                </div>
              </div>
              <p className="boggs-card-desc">
                Democratizing economic opportunity: evidence-grounded candidate pipelines, automated social benefit claims, and transitional fair-wage work matching.
              </p>
            </div>

            {/* System 3: DigitPop (Media & Live Commerce) */}
            <div className="boggs-metric-card">
              <div className="boggs-card-header">
                <Tv size={20} className="boggs-icon-purple" />
                <div>
                  <span className="boggs-card-title">DigitPop</span>
                  <div style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 700, textTransform: 'uppercase' }}>
                    Interactive Video Commerce
                  </div>
                </div>
              </div>
              <p className="boggs-card-desc">
                Sub-10ms shoppable interactive video streaming, zero-latency client-side overlay architectures, and decentralized digital media engines.
              </p>
            </div>

            {/* System 4: Sovereign Mesh (Energy & Compute) */}
            <div className="boggs-metric-card">
              <div className="boggs-card-header">
                <Zap size={20} style={{ color: '#10b981' }} />
                <div>
                  <span className="boggs-card-title">Sovereign Mesh</span>
                  <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                    Energy & Sovereign Compute
                  </div>
                </div>
              </div>
              <p className="boggs-card-desc">
                Edge microgrid controllers, SMR control telemetry standards, and domestic zero-copy Canadian compute decoupling public systems from foreign monopolies.
              </p>
            </div>
          </div>
        </div>

        {/* The Sovereign Social Re-Investment Charter Callout */}
        <div
          style={{
            marginTop: '24px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.5) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '14px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '820px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0 }}>
              <HeartHandshake size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '2px' }}>
                The Sovereign Social Re-Investment Charter (Carlsberg & Bosch Model)
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.45 }}>
                Boggs Systems rejects extractive financialization. 100% of net enterprise surplus beyond operating reserves is irrevocably allocated to eliminating Canadian homelessness (real-time shelter routing & modular housing meshes) and deep-tech sovereign R&D (clean energy & microgrids).
              </p>
            </div>
          </div>

          <a
            href="mailto:jeff@boggs.build?subject=Sovereign%20Charter%20%26%20Public%20Affairs%20Inquiry"
            style={{
              padding: '9px 18px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontWeight: 700,
              fontSize: '0.84rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Charter Brief <ArrowRight size={13} style={{ display: 'inline', marginLeft: '4px' }} />
          </a>
        </div>
      </div>
    </section>
  );
};
