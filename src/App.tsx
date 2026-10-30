import React, { useState, useRef } from 'react';
import {
  GraduationCap,
  BookOpen,
  Mail,
  ExternalLink,
  Tv,
  ArrowRight,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { BoggsLogo } from './components/BoggsLogo';
import { BoggsHero } from './components/BoggsHero';
import { MediaHub } from './components/MediaHub';
import { NewsletterModal } from './components/NewsletterModal';
import './styles/mediahub.css';

export const App: React.FC = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const handleScrollToPlayer = () => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mediahub-container">
      {/* Ambient background glow */}
      <div className="mediahub-ambient-glow" />

      {/* Top Corporate Navigation */}
      <header className="mediahub-nav">
        <div className="mediahub-nav-left">
          <a href="#" className="mediahub-logo-btn" style={{ textDecoration: 'none' }}>
            <BoggsLogo size={34} />
          </a>
        </div>

        <nav className="mediahub-nav-center" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="mailto:jeff@boggs.build?subject=uOttawa%20SEG%20Capstone%20Inquiry"
            className="mediahub-nav-link"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24' }}
          >
            <GraduationCap size={15} />
            <span>uOttawa SEG (Hiring 10)</span>
          </a>

          <button onClick={handleScrollToPlayer} className="mediahub-nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <Tv size={15} />
            <span>Keynote</span>
          </button>

          <a
            href="https://www.amazon.com/dp/B0GN3G2HTQ"
            target="_blank"
            rel="noreferrer"
            className="mediahub-nav-link"
          >
            <BookOpen size={15} />
            <span>The Book</span>
          </a>

          <button
            onClick={() => setShowNewsletter(true)}
            className="mediahub-nav-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <span>Dispatches</span>
          </button>
        </nav>

        <div className="mediahub-nav-right">
          <a
            href="mailto:jeff@boggs.build?subject=Boggs%20Systems%20Contact"
            className="mediahub-nav-cta"
            style={{ textDecoration: 'none' }}
          >
            <Mail size={15} />
            <span>jeff@boggs.build</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Core Corporate & Capstone Hero */}
        <BoggsHero
          onScrollToPlayer={handleScrollToPlayer}
          onOpenNewsletter={() => setShowNewsletter(true)}
        />

        {/* Transplanted Media Hub with Interactive Player */}
        <MediaHub
          playerRef={playerRef}
          onOpenNewsletter={() => setShowNewsletter(true)}
        />
      </main>

      {/* Corporate Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#050810',
          padding: '48px 24px',
          color: '#94a3b8',
          fontSize: '0.88rem',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div>
            <BoggsLogo size={28} />
            <p style={{ marginTop: '10px', maxWidth: '460px', lineHeight: 1.5, fontSize: '0.82rem' }}>
              Boggs Systems Inc. • Enterprise Multi-Agent Execution Platforms. Founded by Jeffrey Boggs (uOttawa SEG Inaugural Class).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:jeff@boggs.build"
              style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Mail size={14} /> jeff@boggs.build
            </a>
            <a
              href="https://www.amazon.com/dp/B0GN3G2HTQ"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <BookOpen size={14} /> The Book <ExternalLink size={12} />
            </a>
            <a
              href="https://jeffreyboggs.substack.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Substack <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1280px',
            margin: '24px auto 0',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontSize: '0.78rem',
            color: '#64748b',
          }}
        >
          <span>© {new Date().getFullYear()} Boggs Systems Inc. All rights reserved.</span>
          <span>Ottawa, ON • Silicon Valley • Global</span>
        </div>
      </footer>

      {/* Newsletter / Dispatches Modal */}
      <NewsletterModal
        isOpen={showNewsletter}
        onClose={() => setShowNewsletter(false)}
        source="boggs_build_corporate"
      />
    </div>
  );
};
export default App;
