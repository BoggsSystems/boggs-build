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
  CheckCircle2,
  Clock,
  Radio,
  FileCode2,
  Play,
  Flame,
  Train,
  Car,
} from 'lucide-react';
import smartMohsWorkstationUrl from '../assets/smart-mohs-workstation.jpg';
import borealisMaglevTubeUrl from '../assets/borealis-maglev-tube.jpg';
import borealisRoadPodUrl from '../assets/borealis-road-pod.jpg';
import sovereignMeshEnergyUrl from '../assets/sovereign-mesh-energy.jpg';
import digitpopLiveCommerceUrl from '../assets/digitpop-live-commerce.jpg';
import opportunityOsResumeUrl from '../assets/opportunity-os-resume.png';
import spoProductPodArchitectureUrl from '../assets/spo-product-pod-architecture.jpg';
import highVelocityFunnelRoadmapUrl from '../assets/high-velocity-funnel-roadmap.jpg';

interface BoggsHeroProps {
  onScrollToPlayer: () => void;
  onOpenNewsletter: () => void;
  onOpenCapstone?: (systemId: string) => void;
  shortsSlot?: React.ReactNode;
}

export const BoggsHero: React.FC<BoggsHeroProps> = ({
  onScrollToPlayer,
  onOpenNewsletter,
  onOpenCapstone,
  shortsSlot,
}) => {
  return (
    <section className="boggs-hero-section">
      {/* Top Capstone Recruiting Announcement Banner */}
      <div className="boggs-announcement-pill">
        <div className="boggs-pill-badge">
          <GraduationCap size={15} /> uOttawa SEG 2026/2027 • Road to Ottawa
        </div>
        <span className="boggs-pill-text">
          Publishing live dev & test videos ahead of our Nov visit • Sponsoring <strong>10 Capstone roles</strong> across our advanced repos
        </span>
        <button
          onClick={() => onOpenCapstone ? onOpenCapstone('smart-mohs') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20SEG%20Capstone%20Inquiry%20-%20Student%20Application')}
          className="boggs-pill-link"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          Apply as Student <ArrowRight size={13} />
        </button>
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
                <GraduationCap size={12} /> Next-Gen Talent • SPO Apprenticeship
              </span>
              <div className="boggs-partner-title">University Students</div>
              <p className="boggs-partner-desc">
                Halting Canada's STEM brain drain. Teams take over dedicated, mature repositories already developed quite far by Jeff Boggs, crossing the finish line with student ingenuity and executive mentorship.
              </p>
              <ul className="boggs-partner-bullets">
                <li>
                  <GraduationCap size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>uOttawa SEG Sponsorship:</strong> Sponsoring 10 software engineering students for the 2026/2027 capstone cohort.</span>
                </li>
                <li>
                  <Cpu size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Advanced Repo Handover:</strong> Inheriting deep, high-performance codebases—not starting from scratch.</span>
                </li>
                <li>
                  <Sparkles size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Student Ingenuity:</strong> Full creative ownership to introduce novel features and optimize system architectures.</span>
                </li>
                <li>
                  <HeartHandshake size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>SPO Executive Mentorship:</strong> Trained in AI-native engineering loops, strategic management, and commercial product thinking.</span>
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

        {/* ==========================================================================
           The 5-System Operating Portfolio Showcase & High-Velocity Capstone Funnel
           ========================================================================== */}
        <div style={{ marginBottom: '40px' }}>
          <div className="boggs-section-badge" style={{ color: '#38bdf8' }}>
            <Layers size={14} /> The 5-System Sovereign & Commercial Portfolio
          </div>
          <h2 className="boggs-section-heading">
            Operating Platforms Designed for Autonomous Scale.
          </h2>
          <p className="boggs-section-desc">
            Explore every system under the Boggs Systems umbrella. University of Ottawa Capstone students inherit mature, production-grade codebases already developed extensively by founder Jeffrey Boggs (uOttawa SEG Inaugural Class)—with full creative freedom to build novel features and cross the finish line.
          </p>

          {/* High-Velocity Student Onboarding Manifesto Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '16px',
              padding: '22px 26px',
              marginBottom: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#f8fafc' }}>
                    uOttawa SEG 2026/2027 Capstone Apprenticeship • 48-Hour High-Velocity Intake
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Sponsoring 10 Capstone roles across our advanced repositories • Direct founder mentorship
                  </span>
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '5px 12px', borderRadius: '9999px', fontSize: '0.76rem', color: '#34d399', fontWeight: 700 }}>
                <Clock size={13} /> 48h Turnaround vs. 4-Week Corporate Bureaucracy
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginTop: '4px' }}>
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <CheckCircle2 size={16} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: '#ffffff' }}>Mature Codebases:</strong> No blank screens. Inherit an established repo developed far by Jeff Boggs and take it across the finish line.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <Sparkles size={16} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: '#ffffff' }}>Creative Ingenuity:</strong> Full freedom to architect your own features, refine algorithms, and own your engineering decisions.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <Cpu size={16} style={{ color: '#a855f7', flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: '#ffffff' }}>SPO Training:</strong> Mentored in AI-native engineering (Software Product Orchestrator) and strategic product management.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <Tv size={16} style={{ color: '#f43f5e', flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: '#ffffff' }}>Live Dev & Test Videos:</strong> Continuous dev speedruns and test traces published leading up to our November campus visit.</span>
              </div>
            </div>
          </div>

          {/* ==========================================================================
             The Autonomous Product Pod & SPO Team Model
             ========================================================================== */}
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(9, 14, 23, 0.9) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '20px',
              padding: '30px 30px 26px',
              marginBottom: '36px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8', fontSize: '0.76rem', fontWeight: 800, padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Users size={13} /> The Autonomous Product Pod Model
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', color: '#fbbf24', fontSize: '0.76rem', fontWeight: 800, padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Sparkles size={13} /> Software-Pure • Partner-Manufactured
              </span>
            </div>

            <h3 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 12px 0', lineHeight: 1.25 }}>
              How We Build: Interdisciplinary Pods Led by Software Orchestrators.
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 24px 0', maxWidth: '1000px' }}>
              Boggs Systems is built around a pure-software operating model. We architect the sovereign software intelligence, digital twins, and autonomous multi-agent pipelines, and execute an <strong>AI-Native Hardware Implementation Partnership Plan</strong> with established domestic manufacturers who build physical hardware.
              <br /><br />
              Each operating system is delivered by an <strong>Autonomous Product Pod</strong>. The very first role we are recruiting and filling across these pods is the <strong>Software Product Orchestrator (SPO)</strong>—uOttawa Software Engineering students who own the code, coordinate autonomous agents, and steer the system to the finish line.
            </p>

            {/* Pod Architecture Visual & Roles Grid */}
            <div className="boggs-pod-section-grid">
              {/* Left: 3D Pod Architecture Graphic */}
              <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.12)', background: '#020617', aspectRatio: '16 / 9' }}>
                <img
                  src={spoProductPodArchitectureUrl}
                  alt="Boggs Systems Autonomous Product Pod Architecture and Software Product Orchestrator Structure"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap', zIndex: 2 }}>
                  <span className="boggs-portfolio-stat-pill" style={{ background: 'rgba(15, 23, 42, 0.92)', borderColor: 'rgba(56, 189, 248, 0.4)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                    SPO Lead (Hiring First Now)
                  </span>
                  <span className="boggs-portfolio-stat-pill" style={{ background: 'rgba(15, 23, 42, 0.92)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
                    Commercial Outreach (Telfer)
                  </span>
                  <span className="boggs-portfolio-stat-pill" style={{ background: 'rgba(15, 23, 42, 0.92)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                    Hardware Alliance Partners
                  </span>
                </div>
              </div>

              {/* Right: Pod Roles Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Role 1: SPO */}
                <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '12px', padding: '13px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Cpu size={13} />
                      </div>
                      <strong style={{ fontSize: '0.86rem', color: '#f8fafc' }}>
                        Software Product Orchestrator (SPO)
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.2)', padding: '2px 8px', borderRadius: '9999px', textTransform: 'uppercase' }}>
                      Filling First Now (uOttawa SEG)
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    The central pillar of the pod. Software engineering students inherit our mature repos, coordinate multi-agent AI pipelines, architect product features, and lead system delivery. Direct 1-on-1 mentorship by Jeff Boggs.
                  </p>
                </div>

                {/* Role 2: Commercial & Outreach */}
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '11px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={13} />
                    </div>
                    <strong style={{ fontSize: '0.84rem', color: '#f8fafc' }}>
                      Commercial Outreach & Public Affairs Lead
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>(Business / Telfer)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    Engages municipal transit authorities, hospital administration, and commercial users. Drives pilot agreements, customer validation, and economic impact modeling.
                  </p>
                </div>

                {/* Role 3: Domain Specialists */}
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '11px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={13} />
                    </div>
                    <strong style={{ fontSize: '0.84rem', color: '#f8fafc' }}>
                      Domain Science & Clinical Specialists
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>(Physics & Medicine)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    Physics students model laser wave optics, dosimetry, and energy storage kinetics. Medical & health students guide surgical margin requirements and clinical validation.
                  </p>
                </div>

                {/* Role 4: Hardware Partners */}
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '11px 15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <HeartHandshake size={13} />
                    </div>
                    <strong style={{ fontSize: '0.84rem', color: '#f8fafc' }}>
                      Hardware Alliance Partners
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: '#10b981' }}>(AI-Native Hardware Plan)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    We partner with established domestic hardware manufacturers and medical device fabricators to deliver physical workstations, cold laser optics, and microgrid inverters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================
              HIGH-VELOCITY ONBOARDING FUNNEL SECTION (DIRECTLY ABOVE SMART MOHS)
              ============================================================= */}
          <div
            style={{
              marginTop: '44px',
              marginBottom: '32px',
              padding: '28px',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(2, 6, 23, 0.95) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Ambient subtle glow background */}
            <div
              style={{
                position: 'absolute',
                top: '-60px',
                right: '-40px',
                width: '260px',
                height: '260px',
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '9999px', fontSize: '0.74rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
                    <Sparkles size={12} /> High-Velocity Onboarding Funnel
                  </div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 6px 0', lineHeight: 1.25 }}>
                    Submit brief ➔ 24h review by Jeff Boggs ➔ Fast-track digital NDA ➔ Direct GitHub repo access
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: 0, maxWidth: '780px', lineHeight: 1.5 }}>
                    Engineered specifically for uOttawa Software Engineering candidates. No corporate resume shredders or bureaucratic delays. You apply directly to founder Jeff Boggs, undergo immediate architectural review, execute a mutual digital IP agreement, and get push rights to code.
                  </p>
                </div>

                <button
                  onClick={() => onOpenCapstone ? onOpenCapstone('smart-mohs') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20Student%20Application%20-%20Smart%20Mohs')}
                  className="boggs-portfolio-hiring-btn cyan"
                  style={{ whiteSpace: 'nowrap', padding: '10px 18px', fontSize: '0.85rem' }}
                >
                  <GraduationCap size={15} /> Apply as Student <ArrowRight size={14} />
                </button>
              </div>

              {/* 3D Visual Roadmap Banner */}
              <div
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: '#020617',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                  maxHeight: '340px',
                }}
              >
                <img
                  src={highVelocityFunnelRoadmapUrl}
                  alt="High-Velocity Funnel Roadmap: Submit brief to 24h review to fast-track digital NDA to direct GitHub repo access"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: '340px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.72rem',
                    color: '#e2e8f0',
                    fontWeight: 600,
                  }}
                >
                  <Clock size={13} style={{ color: '#38bdf8' }} />
                  Guaranteed 48-Hour SLA from Brief Submission to Day 1 Production Push
                </div>
              </div>

              {/* 4 Funnel Milestone Cards */}
              <div className="boggs-funnel-steps-grid">
                {/* Step 1 */}
                <div className="boggs-funnel-step-card">
                  <div className="boggs-funnel-step-header">
                    <span className="boggs-funnel-step-num cyan">01</span>
                    <span className="boggs-funnel-step-badge">2-Min Intake</span>
                  </div>
                  <h4 className="boggs-funnel-step-title">1. Submit Brief</h4>
                  <p className="boggs-funnel-step-desc">
                    Pick your preferred system pod below (Smart Mohs, Borealis Pods, Borealis Maglev, Sovereign Mesh, DigitPop, or Opportunity OS) and link your GitHub profile. No resume formatting required.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="boggs-funnel-step-card">
                  <div className="boggs-funnel-step-header">
                    <span className="boggs-funnel-step-num amber">02</span>
                    <span className="boggs-funnel-step-badge">&lt; 24h Review</span>
                  </div>
                  <h4 className="boggs-funnel-step-title">2. 24h Review by Jeff Boggs</h4>
                  <p className="boggs-funnel-step-desc">
                    Founder Jeff Boggs (uOttawa SEG Alum) personally evaluates your engineering background within 24 hours to match your strengths directly to active system milestones.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="boggs-funnel-step-card">
                  <div className="boggs-funnel-step-header">
                    <span className="boggs-funnel-step-num emerald">03</span>
                    <span className="boggs-funnel-step-badge">5-Min e-Sign</span>
                  </div>
                  <h4 className="boggs-funnel-step-title">3. Fast-Track Digital NDA</h4>
                  <p className="boggs-funnel-step-desc">
                    Streamlined digital execution of our mutual IP & confidentiality agreement, ensuring full academic accreditation for your uOttawa capstone while protecting proprietary code.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="boggs-funnel-step-card">
                  <div className="boggs-funnel-step-header">
                    <span className="boggs-funnel-step-num purple">04</span>
                    <span className="boggs-funnel-step-badge highlight">Day 1 Access</span>
                  </div>
                  <h4 className="boggs-funnel-step-title">4. Direct GitHub Access</h4>
                  <p className="boggs-funnel-step-desc">
                    Immediate invite to the private Boggs Systems organization on GitHub. Clone the production repo, join the autonomous pod, and ship your first pull request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="boggs-portfolio-container">
            {/* -------------------------------------------------------------
               PRODUCT 1: Smart Mohs (Medicine & Laser Robotics Plank)
               ------------------------------------------------------------- */}
            <div className="boggs-portfolio-card">
              <div className="boggs-portfolio-grid">
                <div className="boggs-portfolio-media">
                  <img
                    src={smartMohsWorkstationUrl}
                    alt="Smart Mohs Autonomous Optical Biopsy and Laser Robotics Workstation"
                    className="boggs-portfolio-img"
                  />
                  <div className="boggs-portfolio-overlay-badges">
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f43f5e' }} />
                      Sub-Cellular LC-OCT (1.2µm)
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      Zero-Latency 3D AI Margins
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
                      C++23 & CUDA Digital Twin
                    </span>
                  </div>
                </div>

                <div className="boggs-portfolio-body">
                  <div className="boggs-portfolio-tag" style={{ color: '#f43f5e' }}>
                    <Activity size={14} /> Medicine Plank • Surgical Laser Robotics
                  </div>
                  <h3 className="boggs-portfolio-title">
                    Smart Mohs: Autonomous Optical Biopsy & 3D Cold Laser Micro-Ablation
                  </h3>
                  <p className="boggs-portfolio-desc">
                    Modernizes skin cancer surgery from multi-hour frozen section histology into real-time sub-cellular digital margin assessment. Merges Line-Field Confocal OCT (LC-OCT), 3D AI segmentation, and cold laser micro-ablation into an integrated intraoperative workstation.
                  </p>

                  <div className="boggs-portfolio-specs">
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                        <Activity size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Closed-Loop Optical Biopsy:</strong> In situ volumetric tissue scanning replacing 45-minute frozen section histological slicing with instant digital 3D validation.
                      </div>
                    </div>
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                        <Zap size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Picosecond Cold Laser Ablation:</strong> 20 kHz galvanometer array excising microscopic tumor margins with single-cell precision while sparing healthy facial tissue.
                      </div>
                    </div>
                  </div>

                  <div className="boggs-portfolio-hiring-box amber">
                    <div className="boggs-portfolio-hiring-header">
                      <span className="boggs-portfolio-hiring-tag">
                        <GraduationCap size={13} /> Target Repo (Capstone / Co-op): Smart Mohs Wave Optics & Laser Control
                      </span>
                      <button
                        onClick={() => onOpenCapstone ? onOpenCapstone('smart-mohs') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20Student%20Application%20-%20Smart%20Mohs')}
                        className="boggs-portfolio-hiring-btn amber"
                      >
                        Apply as Student <ArrowRight size={13} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.79rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      <strong style={{ color: '#fbbf24' }}>High-Velocity Funnel:</strong> Submit brief ➔ 24h review by Jeff Boggs ➔ Fast-track digital NDA ➔ Direct GitHub repo access.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
               PRODUCT 2: Borealis Road Pods (Transportation Plank • Micro-Transit)
               ------------------------------------------------------------- */}
            <div className="boggs-portfolio-card">
              <div className="boggs-portfolio-grid reverse">
                <div className="boggs-portfolio-media">
                  <img
                    src={borealisRoadPodUrl}
                    alt="Borealis 6-Passenger Autonomous Road Pod Micro-Transit Vehicle"
                    className="boggs-portfolio-img"
                  />
                  <div className="boggs-portfolio-overlay-badges">
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                      Level-4 Urban Autonomy
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      Spacetime V2X Green-Wave
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c084fc' }} />
                      6-Seat Biosecure Cabin
                    </span>
                  </div>
                </div>

                <div className="boggs-portfolio-body">
                  <div className="boggs-portfolio-tag" style={{ color: '#38bdf8' }}>
                    <Car size={14} /> Transportation Plank • 6-Passenger Autonomous Fleet
                  </div>
                  <h3 className="boggs-portfolio-title">
                    Borealis Pods: 6-Passenger Autonomous Micro-Transit & V2X Corridors
                  </h3>
                  <p className="boggs-portfolio-desc">
                    On-demand Level-4 autonomous electric road pod fleet providing high-throughput doorstep pickup and feeder connectivity. Eliminates first/last-mile suburban friction with dynamic traffic signal priority and biosecure passenger cabins.
                  </p>

                  <div className="boggs-portfolio-specs">
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <Radio size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Spacetime V2X Green-Wave Engine:</strong> Exchanges live SPaT messages over C-V2X (3GPP Rel-18) with municipal traffic signals to guarantee continuous green corridors and hit ±15-second hub arrival windows.
                      </div>
                    </div>
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                        <Compass size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Canadian Winter Perception & Biosecure Cabin:</strong> Multi-modal LiDAR, 4D radar, and camera fusion with real-time snow/ice friction estimation, downward laminar airflow curtains, and automated 90s UV-C sanitization.
                      </div>
                    </div>
                  </div>

                  <div className="boggs-portfolio-hiring-box">
                    <div className="boggs-portfolio-hiring-header">
                      <span className="boggs-portfolio-hiring-tag">
                        <GraduationCap size={13} /> Target Repo (Capstone / Co-op): Borealis Autonomous Road Pod Fleet & V2X Engine
                      </span>
                      <button
                        onClick={() => onOpenCapstone ? onOpenCapstone('borealis-pods') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20Student%20Application%20-%20Borealis%20Pods')}
                        className="boggs-portfolio-hiring-btn"
                      >
                        Apply as Student <ArrowRight size={13} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.79rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      <strong style={{ color: '#38bdf8' }}>High-Velocity Funnel:</strong> Submit brief ➔ 24h review by Jeff Boggs ➔ Fast-track digital NDA ➔ Direct GitHub repo access.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intermodal Handshake Connection Banner */}
            <div
              style={{
                margin: '12px 0 20px 0',
                padding: '16px 22px',
                background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.22)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Compass size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                    The Intermodal "Zero-Wait" Handshake (Hub Gateway):
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '6px' }}>
                    UWB precision docking aligns the 6-passenger road pod directly against the elevated maglev platform for a guaranteed ≤ 15-step cross-platform transfer.
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '3px 10px', borderRadius: '9999px', fontWeight: 700 }}>
                DOORSTEP ➔ POD ➔ TUBE ➔ POD ➔ DESTINATION
              </span>
            </div>

            {/* -------------------------------------------------------------
               PRODUCT 3: Borealis Maglev (Transportation Plank • Intercity Rail)
               ------------------------------------------------------------- */}
            <div className="boggs-portfolio-card">
              <div className="boggs-portfolio-grid">
                <div className="boggs-portfolio-media">
                  <img
                    src={borealisMaglevTubeUrl}
                    alt="Borealis Elevated Canadian Maglev Tube Network and High-Speed Capsule"
                    className="boggs-portfolio-img"
                  />
                  <div className="boggs-portfolio-overlay-badges">
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                      500–600 km/h Pylon Tube
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      SIL-4 Active Levitation (20 kHz)
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
                      QNX & Rust Hard Real-Time
                    </span>
                  </div>
                </div>

                <div className="boggs-portfolio-body">
                  <div className="boggs-portfolio-tag" style={{ color: '#38bdf8' }}>
                    <Train size={14} /> Transportation Plank • 500 km/h Intercity Maglev
                  </div>
                  <h3 className="boggs-portfolio-title">
                    Borealis Maglev: Elevated Aerodynamic Tube Network & SIL-4 Capsule Avionics
                  </h3>
                  <p className="boggs-portfolio-desc">
                    Overcomes Canadian winter blizzards and habitat clear-cutting by elevating aerodynamic composite tubes onto slender, isolated point-load pylons. Capsules cruise at 500–600 km/h with hard real-time active magnetic levitation (Toronto ↔ Montreal in 1h 35m; Ottawa ↔ Montreal in 52m).
                  </p>

                  <div className="boggs-portfolio-specs">
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <Cpu size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Deterministic Active Gap Regulation:</strong> Closed-loop 20 kHz sensing-to-actuation cycle executing within ≤ 50 µs to regulate magnetic levitation clearance without physical touchdown at 500+ km/h.
                      </div>
                    </div>
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                        <Shield size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>SIL-4 Formal Verification & Secondary Braking:</strong> CENELEC EN 50128 compliant fail-safe architecture with autonomous eddy-current deceleration and deployable aerodynamic drag flaps.
                      </div>
                    </div>
                  </div>

                  <div className="boggs-portfolio-hiring-box">
                    <div className="boggs-portfolio-hiring-header">
                      <span className="boggs-portfolio-hiring-tag">
                        <GraduationCap size={13} /> Target Repo (Capstone / Co-op): Borealis Maglev Capsule Avionics & Guideway IoT
                      </span>
                      <button
                        onClick={() => onOpenCapstone ? onOpenCapstone('borealis-maglev') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20Student%20Application%20-%20Borealis%20Maglev')}
                        className="boggs-portfolio-hiring-btn"
                      >
                        Apply as Student <ArrowRight size={13} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.79rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      <strong style={{ color: '#38bdf8' }}>High-Velocity Funnel:</strong> Submit brief ➔ 24h review by Jeff Boggs ➔ Fast-track digital NDA ➔ Direct GitHub repo access.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
               PRODUCT 4: Sovereign Mesh (Clean Energy & Microgrids Plank)
               ------------------------------------------------------------- */}
            <div className="boggs-portfolio-card">
              <div className="boggs-portfolio-grid reverse">
                <div className="boggs-portfolio-media">
                  <img
                    src={sovereignMeshEnergyUrl}
                    alt="Sovereign Mesh Decentralized Clean Energy Microgrid Orchestration"
                    className="boggs-portfolio-img"
                  />
                  <div className="boggs-portfolio-overlay-badges">
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      Autonomous Islanding
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                      Canadian SMR Telemetry Standard
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
                      P2P Storage Balancing
                    </span>
                  </div>
                </div>

                <div className="boggs-portfolio-body">
                  <div className="boggs-portfolio-tag" style={{ color: '#10b981' }}>
                    <Zap size={14} /> Energy Plank • Sovereign Infrastructure
                  </div>
                  <h3 className="boggs-portfolio-title">
                    Sovereign Mesh: Distributed Community Microgrids & Sovereign Power Orchestration
                  </h3>
                  <p className="boggs-portfolio-desc">
                    Decouples Canadian communities and domestic compute clusters from vulnerable centralized grids and foreign energy conglomerates. Autonomous peer-to-peer microgrid controllers, clean battery storage load balancing, domestic SMR (Small Modular Reactor) telemetry, and edge compute balancing.
                  </p>

                  <div className="boggs-portfolio-specs">
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                        <Zap size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Autonomous Microgrid Balancing:</strong> Dynamic load-shedding and islanding for extreme climate resilience, remote communities, and domestic data security.
                      </div>
                    </div>
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <Radio size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Sovereign Telemetry Protocol:</strong> Domestic open standard unifying Small Modular Reactors (SMRs), community battery banks, and industrial edge compute.
                      </div>
                    </div>
                  </div>

                  <div className="boggs-portfolio-hiring-box emerald">
                    <div className="boggs-portfolio-hiring-header">
                      <span className="boggs-portfolio-hiring-tag">
                        <GraduationCap size={13} /> Target Repo (Capstone / Co-op): Sovereign Mesh Microgrid Controller
                      </span>
                      <button
                        onClick={() => onOpenCapstone ? onOpenCapstone('sovereign-mesh') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20Student%20Application%20-%20Sovereign%20Mesh')}
                        className="boggs-portfolio-hiring-btn emerald"
                      >
                        Apply as Student <ArrowRight size={13} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.79rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      <strong style={{ color: '#34d399' }}>High-Velocity Funnel:</strong> Submit brief ➔ 24h review by Jeff Boggs ➔ Fast-track digital NDA ➔ Direct GitHub repo access.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
               PRODUCT 5: DigitPop (Interactive Media & Live Commerce Plank)
               ------------------------------------------------------------- */}
            <div className="boggs-portfolio-card">
              <div className="boggs-portfolio-grid">
                <div className="boggs-portfolio-media">
                  <img
                    src={digitpopLiveCommerceUrl}
                    alt="DigitPop Sub-10ms Live Interactive Video Commerce Platform"
                    className="boggs-portfolio-img"
                  />
                  <div className="boggs-portfolio-overlay-badges">
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#c084fc' }} />
                      &lt;10ms Ultra-Low Latency
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                      Shoppable 4K Video Overlays
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      WebAssembly & WebGL
                    </span>
                  </div>
                </div>

                <div className="boggs-portfolio-body">
                  <div className="boggs-portfolio-tag" style={{ color: '#c084fc' }}>
                    <Tv size={14} /> Commerce & Media Plank • Commercial Engine
                  </div>
                  <h3 className="boggs-portfolio-title">
                    DigitPop: Sub-10ms Interactive Video Streaming & Decentralized Commerce Engine
                  </h3>
                  <p className="boggs-portfolio-desc">
                    The commercial growth and media engine of Boggs Systems. Replaces passive video broadcasts with ultra-low latency interactive WebAssembly streams, live dynamic clickable overlays, and decentralized digital commerce without middleman platform fees.
                  </p>

                  <div className="boggs-portfolio-specs">
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}>
                        <Play size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Interactive WebAssembly Pipeline:</strong> Client-side dynamic overlays running at 60fps across mobile browsers without native application installs.
                      </div>
                    </div>
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <Flame size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>In-Stream Direct Checkout:</strong> Synchronized video frames with live transaction engines allowing viewers to purchase products, vote, and unlock content inside the video frame.
                      </div>
                    </div>
                  </div>

                  <div className="boggs-portfolio-hiring-box purple">
                    <div className="boggs-portfolio-hiring-header">
                      <span className="boggs-portfolio-hiring-tag">
                        <GraduationCap size={13} /> Target Repo (Capstone / Co-op): DigitPop WebAssembly Player & Live Ingest
                      </span>
                      <button
                        onClick={() => onOpenCapstone ? onOpenCapstone('digitpop') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20Student%20Application%20-%20DigitPop')}
                        className="boggs-portfolio-hiring-btn purple"
                      >
                        Apply as Student <ArrowRight size={13} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.79rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      <strong style={{ color: '#c084fc' }}>High-Velocity Funnel:</strong> Submit brief ➔ 24h review by Jeff Boggs ➔ Fast-track digital NDA ➔ Direct GitHub repo access.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
               PRODUCT 6: Opportunity OS (Housing, Social Mobility & Dignity)
               ------------------------------------------------------------- */}
            <div className="boggs-portfolio-card">
              <div className="boggs-portfolio-grid reverse">
                <div className="boggs-portfolio-media">
                  <img
                    src={opportunityOsResumeUrl}
                    alt="Opportunity OS Evidence-Grounded Hiring & Dignity Engine"
                    className="boggs-portfolio-img"
                  />
                  <div className="boggs-portfolio-overlay-badges">
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
                      1-Click ATS Co-Pilot
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      Zero Data Exfiltration
                    </span>
                    <span className="boggs-portfolio-stat-pill">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                      Homelessness Shelter Mesh
                    </span>
                  </div>
                </div>

                <div className="boggs-portfolio-body">
                  <div className="boggs-portfolio-tag" style={{ color: '#fbbf24' }}>
                    <HeartHandshake size={14} /> Housing & Dignity Plank • Social Engine
                  </div>
                  <h3 className="boggs-portfolio-title">
                    Opportunity OS: Evidence-Grounded Candidate Pipelines & Homelessness Shelter Mesh
                  </h3>
                  <p className="boggs-portfolio-desc">
                    Restoring human agency and economic dignity. Replaces keyword-stuffing ATS resume shredders with verified skill evidence and 1-click intelligent autofill co-pilots, while powering real-time emergency shelter routing to systematically eliminate Canadian homelessness.
                  </p>

                  <div className="boggs-portfolio-specs">
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                        <FileCode2 size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Production Chrome Extension:</strong> Full-stack browser extension with local PDF parsing and contextual form autofill with 100% client-side privacy.
                      </div>
                    </div>
                    <div className="boggs-portfolio-spec-item">
                      <div className="boggs-portfolio-spec-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <HeartHandshake size={15} />
                      </div>
                      <div className="boggs-portfolio-spec-text">
                        <strong>Emergency Shelter Coordination Mesh:</strong> Algorithmic coordination platform matching unhoused citizens with open emergency shelter beds and modular housing inventory.
                      </div>
                    </div>
                  </div>

                  <div className="boggs-portfolio-hiring-box amber">
                    <div className="boggs-portfolio-hiring-header">
                      <span className="boggs-portfolio-hiring-tag">
                        <GraduationCap size={13} /> Target Repo (Capstone / Co-op): Opportunity OS Extension & Shelter Mesh
                      </span>
                      <button
                        onClick={() => onOpenCapstone ? onOpenCapstone('opportunity-os') : (window.location.href = 'mailto:jeff@boggs.build?subject=uOttawa%20Student%20Application%20-%20Opportunity%20OS')}
                        className="boggs-portfolio-hiring-btn amber"
                      >
                        Apply as Student <ArrowRight size={13} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.79rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      <strong style={{ color: '#fbbf24' }}>High-Velocity Funnel:</strong> Submit brief ➔ 24h review by Jeff Boggs ➔ Fast-track digital NDA ➔ Direct GitHub repo access.
                    </div>
                  </div>
                </div>
              </div>
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
