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
  Shield,
  Compass,
  Users,
  Building2,
  HeartHandshake,
  Landmark,
  Activity,
  Layers,
} from 'lucide-react';
import smartMohsWorkstationUrl from '../assets/smart-mohs-workstation.jpg';

interface BoggsHeroProps {
  onScrollToPlayer: () => void;
  onOpenNewsletter: () => void;
  shortsSlot?: React.ReactNode;
}

export const BoggsHero: React.FC<BoggsHeroProps> = ({
  onScrollToPlayer,
  onOpenNewsletter,
  shortsSlot,
}) => {
  return (
    <section className="boggs-hero-section">
      {/* Top Capstone Recruiting Announcement Banner */}
      <div className="boggs-announcement-pill">
        <div className="boggs-pill-badge">
          <GraduationCap size={15} /> uOttawa SEG 2026/2027
        </div>
        <span className="boggs-pill-text">
          Visiting Ottawa in Nov • Sponsoring <strong>10 Software Engineering Students</strong> across our Systems Portfolio
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
          <Landmark size={15} /> The Canadian Sovereign Infrastructure Plan (2026–2051)
        </div>

        <h1 className="boggs-hero-title">
          Building Canada's Sovereign Future. <br />
          <span className="boggs-hero-gradient">
            A Public-Interest Alliance Uniting Government, University Students, and Domestic Industry.
          </span>
        </h1>

        <p className="boggs-hero-subtitle">
          Boggs Systems Inc. is the Canadian enterprise house and operating umbrella convening a historic domestic partnership to modernize national infrastructure. We replace fragile foreign monopolies and high-fee consulting dependencies with sovereign, self-orchestrating public systems across <strong>Energy</strong>, <strong>Transportation</strong>, <strong>Medicine</strong>, and <strong>Housing</strong>.
          <br /><br />
          Founded by <strong>Jeffrey Boggs</strong>—member of the inaugural uOttawa Software Engineering class, 16-year enterprise software architect, and author of <em>The New Physics of Software Velocity</em>.
        </p>

        {/* Action Buttons */}
        <div className="boggs-hero-actions">
          <button onClick={onScrollToPlayer} className="boggs-btn-primary">
            <Tv size={17} /> Watch Keynote & Media Hub
          </button>

          <a
            href="mailto:jeff@boggs.build?subject=Canadian%20Sovereign%20Infrastructure%20Plan%20-%20Alliance%20Inquiry"
            className="boggs-btn-secondary"
          >
            <Mail size={16} /> Partner With Us (jeff@boggs.build)
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

        {/* Embedded Shorts Carousel (Above The Tripartite Public-Interest Coalition) */}
        {shortsSlot && (
          <div className="boggs-hero-shorts-slot">
            {shortsSlot}
          </div>
        )}

        {/* Section 1: The Tripartite Coalition */}
        <div className="boggs-coalition-section">
          <div className="boggs-section-badge" style={{ color: '#38bdf8' }}>
            <Sparkles size={14} /> The Tripartite Public-Interest Coalition
          </div>
          <h2 className="boggs-section-heading">
            Sovereign Infrastructure Built by Canadians, for Canadians.
          </h2>
          <p className="boggs-section-desc">
            A united national coalition moving beyond foreign corporate extraction to deliver modern, resilient, and transparent public systems across the country.
          </p>

          <div className="boggs-coalition-grid">
            {/* Coalition Partner 1: Governments */}
            <div className="boggs-coalition-card gov">
              <span className="boggs-partner-pill" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                <Landmark size={12} /> Public Partner
              </span>
              <div className="boggs-partner-title">Canadian Governments</div>
              <p className="boggs-partner-desc">
                Federal, provincial, and municipal public service modernizations designed for total data sovereignty, zero vendor lock-in, and radical cost reduction.
              </p>
              <ul className="boggs-partner-bullets">
                <li>
                  <Shield size={14} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Data Sovereignty:</strong> All resident and municipal telemetry stays strictly within sovereign Canadian boundaries.</span>
                </li>
                <li>
                  <Layers size={14} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Zero Vendor Lock-in:</strong> Open, auditable architectures eliminating multi-million-dollar legacy foreign software renewals.</span>
                </li>
                <li>
                  <Sparkles size={14} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Taxpayer Stewardship:</strong> Direct software delivery replacing high-overhead foreign consulting retainers.</span>
                </li>
              </ul>
            </div>

            {/* Coalition Partner 2: University Students */}
            <div className="boggs-coalition-card students">
              <span className="boggs-partner-pill" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <GraduationCap size={12} /> Next-Gen Talent
              </span>
              <div className="boggs-partner-title">University Students</div>
              <p className="boggs-partner-desc">
                Halting Canada's STEM brain drain by funding student engineers to build mission-critical domestic infrastructure through the 1,000-Student Sovereign Builder Corps.
              </p>
              <ul className="boggs-partner-bullets">
                <li>
                  <GraduationCap size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>uOttawa SEG Sponsorship:</strong> Sponsoring 10 software engineering students for the 2026/2027 capstone cohort.</span>
                </li>
                <li>
                  <Cpu size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Production Engineering:</strong> Students author and deploy real-world multi-agent runtimes, not disposable toy projects.</span>
                </li>
                <li>
                  <HeartHandshake size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>STEM Retention:</strong> High-wage domestic fellowships keeping our brightest engineers living and building in Canada.</span>
                </li>
              </ul>
            </div>

            {/* Coalition Partner 3: Domestic Industry & Boggs Systems */}
            <div className="boggs-coalition-card industry">
              <span className="boggs-partner-pill" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <Cpu size={12} /> Execution Engine
              </span>
              <div className="boggs-partner-title">Domestic Industry & Boggs Systems</div>
              <p className="boggs-partner-desc">
                Providing the deterministic multi-agent execution runtimes that operate national infrastructure with sub-second velocity, backed by a non-extractive enterprise charter.
              </p>
              <ul className="boggs-partner-bullets">
                <li>
                  <Zap size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Compound Velocity:</strong> Multi-agent software orchestration achieving 10x acceleration in critical system deployments.</span>
                </li>
                <li>
                  <Shield size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Deterministic Verification:</strong> Mathematical proof and high-assurance guarantees on public software execution.</span>
                </li>
                <li>
                  <HeartHandshake size={14} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Surplus Recycling:</strong> 100% of net enterprise profits beyond operating reserves re-invested into public Canadian well-being.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Flagship Capstone Project Spotlight: Smart Mohs Workstation & Laser Systems */}
        <div className="boggs-mohs-section">
          <div className="boggs-section-badge" style={{ color: '#f43f5e' }}>
            <Activity size={14} /> Flagship Capstone Project • uOttawa SEG 2026/2027
          </div>
          <h2 className="boggs-section-heading">
            Smart Mohs: Autonomous Optical Biopsy & Sub-Millimeter Laser Ablation
          </h2>
          <p className="boggs-section-desc">
            Our primary medical infrastructure initiative under the Medicine plank—decoupling dermatological oncology and laser surgery from slow, manual frozen-section histology.
          </p>

          <div className="boggs-mohs-grid">
            {/* Left: 3D Workstation Render */}
            <div>
              <div className="boggs-mohs-image-wrap">
                <img
                  src={smartMohsWorkstationUrl}
                  alt="Smart Mohs Closed-Loop Surgical Robotics Workstation"
                  className="boggs-mohs-img"
                />
                <div className="boggs-mohs-image-badge">
                  <span style={{ fontWeight: 800, color: '#38bdf8' }}>Smart Mohs Workstation Prototype</span>
                  <span style={{ color: '#94a3b8' }}>LC-OCT Biopsy • AI Segmentation</span>
                </div>
              </div>
              <div className="boggs-mohs-stats">
                <span className="boggs-mohs-stat-pill">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                  100% In Situ Negative Margins
                </span>
                <span className="boggs-mohs-stat-pill">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                  &lt;2 µm Thermal Damage
                </span>
                <span className="boggs-mohs-stat-pill">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                  Zero Frozen-Section Turnaround
                </span>
              </div>
            </div>

            {/* Right: Technical Architecture & Variations */}
            <div className="boggs-mohs-content">
              <p className="boggs-mohs-desc">
                Transforming Mohs surgery into an automated, scalpel-free, single-stage outpatient procedure. Cellular-resolution Line-Field Confocal Optical Coherence Tomography (LC-OCT) streams tissue volumes via zero-copy RDMA to a 3D neural network, guiding a cold femtosecond laser steered by a 20 kHz galvanometer array.
              </p>

              <div className="boggs-mohs-variations">
                {/* Variation 1: Mohs Oncology */}
                <div className="boggs-mohs-var-card">
                  <div className="boggs-mohs-var-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                    <Activity size={18} />
                  </div>
                  <div>
                    <div className="boggs-mohs-var-title">Dermatological Oncology (Smart Mohs)</div>
                    <p className="boggs-mohs-var-desc">
                      Closed-loop non-melanoma skin cancer excision (BCC & SCC). Automated margin segmentation and sub-millimeter ablation with instant crater re-scanning.
                    </p>
                  </div>
                </div>

                {/* Variation 2: Medical Dermatology */}
                <div className="boggs-mohs-var-card">
                  <div className="boggs-mohs-var-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="boggs-mohs-var-title">Medical Dermatology & Vascular Systems</div>
                    <p className="boggs-mohs-var-desc">
                      Real-time optical dosimetry and automated lesion targeting for deep vascular malformations, inflammatory pathologies, and precision pigment clearing.
                    </p>
                  </div>
                </div>

                {/* Variation 3: Aesthetics & Reconstructive Surgery */}
                <div className="boggs-mohs-var-card">
                  <div className="boggs-mohs-var-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="boggs-mohs-var-title">Aesthetic & Reconstructive Laser Software</div>
                    <p className="boggs-mohs-var-desc">
                      Computer-vision-guided fractional skin resurfacing, scar remodeling, and thermal-damage-free aesthetic soft-tissue ablation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Hiring Callout */}
              <div className="boggs-mohs-hiring-box">
                <div className="boggs-mohs-hiring-text">
                  <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '2px' }}>uOttawa SEG Capstone Hiring:</strong>
                  Sponsoring student engineers to build C++23 wave optics digital twins, real-time CUDA 3D segmentation, and FPGA safety watchdogs.
                </div>
                <a
                  href="mailto:jeff@boggs.build?subject=uOttawa%20SEG%20Capstone%20Application%20-%20Smart%20Mohs%20Team"
                  className="boggs-mohs-hiring-btn"
                >
                  Apply for Smart Mohs Team <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The 4 Infrastructure Pillars */}
        <div style={{ marginBottom: '32px' }}>
          <div className="boggs-section-badge" style={{ color: '#f59e0b' }}>
            <Building2 size={14} /> Critical Infrastructure Focus Areas
          </div>
          <h2 className="boggs-section-heading">
            The Four Infrastructure Pillars (2026–2051)
          </h2>
          <p className="boggs-section-desc">
            Modernizing the foundational systems of Canadian society with deterministic, autonomous software platforms.
          </p>

          <div className="boggs-pillars-grid">
            {/* Pillar 1: Energy */}
            <div className="boggs-pillar-card">
              <div className="boggs-pillar-header">
                <Zap size={22} className="boggs-icon-emerald" />
                <span className="boggs-pillar-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  Sovereign Mesh
                </span>
              </div>
              <div className="boggs-pillar-title">Energy</div>
              <p className="boggs-pillar-desc">
                Distributed community microgrid controllers, clean storage load balancing, Canadian sovereign telemetry standards, and Small Modular Reactor (SMR) / fusion grid orchestration decoupling power from foreign monopolies.
              </p>
            </div>

            {/* Pillar 2: Transportation */}
            <div className="boggs-pillar-card">
              <div className="boggs-pillar-header">
                <Compass size={22} className="boggs-icon-cyan" />
                <span className="boggs-pillar-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  Transit-OS
                </span>
              </div>
              <div className="boggs-pillar-title">Transportation</div>
              <p className="boggs-pillar-desc">
                Intelligent municipal transit scheduling, autonomous multi-agent dispatch, and corridor integration to eliminate "ghost-buses" and restore rider trust across Canadian transit networks.
              </p>
            </div>

            {/* Pillar 3: Medicine */}
            <div className="boggs-pillar-card">
              <div className="boggs-pillar-header">
                <Activity size={22} className="boggs-icon-rose" />
                <span className="boggs-pillar-badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                  Clinical Mesh
                </span>
              </div>
              <div className="boggs-pillar-title">Medicine</div>
              <p className="boggs-pillar-desc">
                De-bottlenecking emergency room and clinical administration, automated triage load balancing, and sovereign Canadian medical supply chain resilience to eliminate hospital logjams.
              </p>
            </div>

            {/* Pillar 4: Housing & Dignity */}
            <div className="boggs-pillar-card">
              <div className="boggs-pillar-header">
                <HeartHandshake size={22} className="boggs-icon-gold" />
                <span className="boggs-pillar-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Opportunity OS
                </span>
              </div>
              <div className="boggs-pillar-title">Housing & Dignity</div>
              <p className="boggs-pillar-desc">
                Real-time emergency shelter routing mesh, modular housing supply logistics, and dignity-first evidence-grounded candidate pipelines to systematically eliminate Canadian homelessness.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Umbrella Platform & Commercial Engine Note */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <Building2 size={24} style={{ color: '#38bdf8', flexShrink: 0 }} />
          <div style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.5 }}>
            <strong style={{ color: '#f1f5f9' }}>Boggs Systems Enterprise Umbrella:</strong> Boggs Systems Inc. is the Canadian parent enterprise house architecting both sovereign public systems and commercial engines like <strong>DigitPop</strong> (sub-10ms interactive live video streaming and decentralized digital commerce).
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
