import React from 'react';
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Mail,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  Tv,
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
          Visiting Ottawa in Nov • Hiring <strong>10 Software Engineering Students</strong> for Capstone & Agent Infrastructure
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
          <Sparkles size={14} /> Boggs Systems Corporation • Enterprise Multi-Agent Platforms
        </div>

        <h1 className="boggs-hero-title">
          Autonomous Multi-Agent Architectures & <br />
          <span className="boggs-hero-gradient">Deterministic Software Velocity</span>
        </h1>

        <p className="boggs-hero-subtitle">
          Boggs Systems Inc. engineers self-orchestrating agent runtimes, bounded-context architectures,
          and closed-loop verification platforms. Founded by <strong>Jeffrey Boggs</strong>—member of the
          inaugural uOttawa Software Engineering class, 16-year enterprise software architect, and author
          of <em>The New Physics of Software Velocity</em>.
        </p>

        {/* Action Buttons */}
        <div className="boggs-hero-actions">
          <button onClick={onScrollToPlayer} className="boggs-btn-primary">
            <Tv size={17} /> Watch Keynote & Media Hub
          </button>

          <a
            href="mailto:jeff@boggs.build?subject=Boggs%20Systems%20-%20Engineering%20Inquiry"
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

        {/* Metric / Value Highlights Grid */}
        <div className="boggs-hero-grid">
          <div className="boggs-metric-card">
            <div className="boggs-card-header">
              <Cpu size={20} className="boggs-icon-cyan" />
              <span className="boggs-card-title">Autonomous Agent Loops</span>
            </div>
            <p className="boggs-card-desc">
              Deterministic state machines with closed-loop verification sandboxes replacing brittle prompt chains.
            </p>
          </div>

          <div className="boggs-metric-card highlight">
            <div className="boggs-card-header">
              <GraduationCap size={20} className="boggs-icon-gold" />
              <span className="boggs-card-title">10 uOttawa Student Roles</span>
            </div>
            <p className="boggs-card-desc">
              Capstone and internship cohorts deploying production agent swarms, browser bridges, and vector-backed stores.
            </p>
          </div>

          <div className="boggs-metric-card">
            <div className="boggs-card-header">
              <Layers size={20} className="boggs-icon-purple" />
              <span className="boggs-card-title">16-Year Enterprise Track</span>
            </div>
            <p className="boggs-card-desc">
              From high-concurrency commercial platforms and real-time streaming engines to full-scale SaaS operating systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
