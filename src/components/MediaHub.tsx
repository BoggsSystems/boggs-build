import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Tv,
  CheckCircle2,
  X,
  GraduationCap,
  Cpu,
  Zap,
  Sparkles,
  Maximize2,
  Minimize2,
  Bell,
  Mail,
  Share2,
  Copy,
  Check,
  Flame,
} from 'lucide-react';
import { BoggsLogo } from './BoggsLogo';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'digitpop-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'project-id'?: string;
        'video-url'?: string;
        mode?: string;
        'auto-expand'?: string | boolean;
        inline?: string | boolean;
        'server-url'?: string;
      };
    }
  }
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration?: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  digitpopProjectId?: string;
  viewCount?: string;
  chapterRef?: string;
  notes?: string;
  isUpcoming?: boolean;
  isShort?: boolean;
  isNew?: boolean;
  thumbnailBadge?: string;
  productTitle?: string;
  productUrl?: string;
}

const AMAZON_BOOK_URL = 'https://www.amazon.com/dp/B0GN3G2HTQ';

const INITIAL_PLAYLISTS: { id: string; category: string; icon: React.ReactNode; videos: VideoItem[] }[] = [
  {
    id: 'craft-and-book',
    category: 'The Craft & The Book (AI-Native Engineering)',
    icon: <BookOpen size={18} color="#38bdf8" />,
    videos: [
      {
        id: 'vid-101',
        title: 'The New Physics of Software Velocity: From Prompts to Autonomous Loops',
        category: 'AI-Native Engineering',
        duration: '10:36',
        description: 'Keynote lecture and architectural speedrun detailing autonomous multi-agent loops, bounded-context isolation, and deterministic execution.',
        thumbnail: 'https://digitpop.opportunity-system.com/thumbnails/opportunity-os-about.jpg',
        videoUrl: 'https://digitpop.opportunity-system.com/videos/opportunity-os-about.mp4',
        digitpopProjectId: 'ba3087e7-bb6b-420f-bbb2-2a8fc7dda9df',
        viewCount: '24.8K views',
        chapterRef: 'Chapter 1: The Velocity Inversion',
        notes: 'Explores the transition from prompt engineering to system architecture. Core thesis: Agents require bounded context and deterministic execution gates.',
        isUpcoming: false,
      },
      {
        id: 'vid-102',
        title: 'Eliminating the Human-in-the-Loop Bottleneck in Modern Codebases',
        category: 'AI-Native Engineering',
        description: 'How to build verification sandboxes that allow autonomous agents to write, test, and self-heal production pull requests.',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Chapter 4: Closed-Loop Verification',
        notes: 'Covers test harness design, ephemeral container sandboxes, and automated rollback triggers.',
        isUpcoming: true,
      },
      {
        id: 'vid-103',
        title: 'Memory, Context Hygiene & Preventing Multi-Agent Cascades',
        category: 'AI-Native Engineering',
        description: 'Deep dive into context window economics, subagent transcript isolation, and avoiding catastrophic context compaction.',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Chapter 6: Memory Architectures',
        notes: 'Examines why unbounded search dumps trigger hallucination loops and how to isolate memory with Redis and pgvector.',
        isUpcoming: true,
      },
    ],
  },
  {
    id: 'student-mentorship',
    category: 'uOttawa & Next-Gen Developer Masterclasses (Hiring 10 SEG Roles)',
    icon: <GraduationCap size={18} color="#f59e0b" />,
    videos: [
      {
        id: 'vid-301',
        title: 'The 2026 CS Graduate Survival Guide: What Universities Aren\'t Teaching You',
        category: 'Student Mentorship',
        description: 'Direct advice for uOttawa computer science and software engineering students on how to stand out when basic coding is commoditized.',
        thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Epilogue: The Future of the Engineer',
        notes: 'Focuses on systems architecture, deterministic reasoning, domain knowledge, and proof-of-work development.',
        isUpcoming: true,
      },
      {
        id: 'vid-302',
        title: 'Building a Zero-to-One Portfolio with Autonomous Multi-Agent Systems',
        category: 'Student Mentorship',
        description: 'How students can leverage the Boggs Systems framework to ship production-grade systems that impress elite hiring committees.',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Chapter 8: The Autonomous Portfolio',
        notes: 'Actionable checklist for building repos with automated E2E tests, CI pipelines, and verifiable execution telemetry.',
        isUpcoming: true,
      },
    ],
  },
  {
    id: 'systems-in-action',
    category: 'Enterprise Platforms in Action (Opportunity OS & Live Telemetry)',
    icon: <Zap size={18} color="#10b981" />,
    videos: [
      {
        id: 'vid-201',
        title: 'Live Speedrun: Applying for Real AI Roles with Opportunity OS',
        category: 'Opportunity OS',
        duration: '6:39',
        description: 'Live job application session featuring Opportunity OS automations, 10ms autofill injection, AI-Native Software Engineering book discussion, and studio setup.',
        thumbnail: 'https://digitpop.opportunity-system.com/thumbnails/opportunity-os-job-application.jpg',
        videoUrl: 'https://digitpop.opportunity-system.com/videos/opportunity-os-job-application.mp4',
        digitpopProjectId: '2cc6c64d-a3c6-4de1-9596-2b39df9d3155',
        viewCount: '1.4K views',
        chapterRef: 'Applied Case Study: Career Pipeline',
        notes: 'Demonstrates Opportunity OS automated role discovery, ATS application tailoring, and interactive multi-product overlays.',
        isUpcoming: false,
      },
      {
        id: 'vid-202',
        title: 'Real-Time Pipeline Analytics & Conversion Telemetry',
        category: 'Opportunity OS',
        duration: '3:38',
        description: 'Deep dive into Opportunity OS real-time pipeline analytics, conversion telemetry, and system-level performance metrics.',
        thumbnail: 'https://pub-2af6e082fcb44c58add86361dad9d14b.r2.dev/thumbnails/opportunity-os-analytics.jpg',
        videoUrl: 'https://pub-2af6e082fcb44c58add86361dad9d14b.r2.dev/videos/opportunity-os-analytics.mp4',
        digitpopProjectId: '88e7b1a2-3164-4e9a-b4d2-f5f8b919a304',
        viewCount: '1.1K views',
        chapterRef: 'Applied Case Study: Analytics Engine',
        notes: 'Explores Opportunity OS real-time funnel telemetry, conversion attribution, and interactive multi-product overlays.',
        isUpcoming: false,
      },
      {
        id: 'vid-204',
        title: 'Inside the Opportunity OS Architecture: Browser Extension to API Gateway',
        category: 'Opportunity OS',
        description: 'Full stack walk-through of the Opportunity OS monorepo: Turborepo, NestJS, React 18, and local Chrome extension bridges.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Architecture Appendix: Opportunity OS',
        notes: 'Explains the decoupled worker queue, browser agent bridge, and local token storage guarantees.',
        isUpcoming: true,
      },
    ],
  },
  {
    id: 'architectural-teardowns',
    category: 'Deep-Dive Architecture & Enterprise Agent Systems',
    icon: <Cpu size={18} color="#a855f7" />,
    videos: [
      {
        id: 'vid-401',
        title: 'DigitPop: Sub-10ms Live Interactive Video Commerce Architecture',
        category: 'Architecture Teardown',
        description: 'How the DigitPop shoppable video platform synchronizes video frames with Stripe baskets, SRS streaming, and Redis pub/sub.',
        thumbnail: 'https://images.unsplash.com/photo-1534972195531-a756b1126975?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Case Study: Interactive Streaming',
        notes: 'Covers SRS RTMP/WebRTC gateways, Cloudflare R2 SigV4 ingest, and low-latency client overlays.',
        isUpcoming: true,
      },
      {
        id: 'vid-402',
        title: 'The 11-Function Enterprise Multi-Agent Execution Framework',
        category: 'Architecture Teardown',
        description: 'How Boggs Systems models complete enterprise operations (Governance, R&D, Commercial, Comms) with autonomous LLM agents.',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Chapter 11: Enterprise Orchestration',
        notes: 'Explains cross-functional agent communication protocols, auditing mechanisms, and deterministic state persistence.',
        isUpcoming: true,
      },
    ],
  },
];

interface MediaHubProps {
  onOpenNewsletter: () => void;
  playerRef: React.RefObject<HTMLDivElement>;
}

export const MediaHub: React.FC<MediaHubProps> = ({ onOpenNewsletter, playerRef }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(INITIAL_PLAYLISTS[0]!.videos[0]!);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showInspectModal, setShowInspectModal] = useState<boolean>(false);
  const [upcomingModalVideo, setUpcomingModalVideo] = useState<VideoItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  // Load DigitPop embed script
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.querySelector('script[src*="embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://digitpop.opportunity-system.com/embed.js?v=2.9.0';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleSelectVideo = (video: VideoItem) => {
    if (video.isUpcoming) {
      setUpcomingModalVideo(video);
      return;
    }
    setActiveVideo(video);
    setIsPlaying(true);
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayToggle = () => {
    if (videoElementRef.current) {
      if (isPlaying) {
        videoElementRef.current.pause();
        setIsPlaying(false);
      } else {
        videoElementRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="mediahub-wrapper" ref={playerRef} id="featured-keynote">
      {/* Stage Header */}
      <div className="mediahub-header">
        <div className="mediahub-badge-group">
          <div className="mediahub-status-pill">
            <span className="mediahub-status-dot" />
            <span>Interactive Stream Active</span>
          </div>
          <span className="mediahub-badge-ghost">uOttawa Keynote Companion</span>
        </div>

        <h2 className="mediahub-hero-title">
          The New Physics of <span>Software Velocity</span>
        </h2>
        <p className="mediahub-hero-desc">
          Architectural keynotes, autonomous loop teardowns, and live engineering masterclasses by <strong>Jeffrey Boggs</strong>.
        </p>
      </div>

      {/* Stage Grid: Left Interactive Player + Right Book Spotlight */}
      <div className="mediahub-stage-grid">
        {/* Left Column: DigitPop / HTML5 Player */}
        <div className={`digitpop-stage-wrapper ${isFullscreen ? 'is-fullscreen' : ''}`}>
          <div className="digitpop-top-bar">
            <div className="digitpop-player-title">
              <Tv size={15} color="#38bdf8" />
              <span>{activeVideo.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeVideo.duration && (
                <div className="mediahub-status-pill" style={{ fontSize: '0.725rem', padding: '2px 8px' }}>
                  <span>{activeVideo.duration}</span>
                </div>
              )}
              <button
                className="digitpop-btn-icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '6px', padding: '4px', cursor: 'pointer', border: 'none' }}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>
          </div>

          {/* Video Viewport */}
          <div className="digitpop-video-viewport" style={{ position: 'relative', minHeight: '440px', backgroundColor: '#020408' }}>
            {activeVideo.digitpopProjectId ? (
              <digitpop-player
                key={activeVideo.digitpopProjectId}
                project-id={activeVideo.digitpopProjectId}
                mode="vod"
                video-url={activeVideo.videoUrl || ''}
                inline="true"
                auto-expand="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  zIndex: 2,
                }}
              />
            ) : activeVideo.videoUrl && isPlaying ? (
              <video
                ref={videoElementRef}
                src={activeVideo.videoUrl}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  minHeight: '440px',
                  backgroundImage: `url(${activeVideo.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(4, 7, 14, 0.65)' }} />
                <button
                  onClick={handlePlayToggle}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                    border: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)',
                  }}
                  aria-label="Play Video"
                >
                  <Play size={36} fill="#ffffff" style={{ marginLeft: '4px' }} />
                </button>
              </div>
            )}
          </div>

          {/* Player Bottom Info Bar */}
          <div className="digitpop-meta-bar" style={{ padding: '16px 20px', background: 'rgba(8, 12, 22, 0.95)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeVideo.category} {activeVideo.chapterRef && `• ${activeVideo.chapterRef}`}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginTop: '4px', marginBottom: '6px' }}>
                  {activeVideo.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '720px', lineHeight: 1.5 }}>
                  {activeVideo.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleShare}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {copiedLink ? <Check size={14} color="#22c55e" /> : <Share2 size={14} />}
                  {copiedLink ? 'Link Copied!' : 'Share'}
                </button>
              </div>
            </div>

            {activeVideo.notes && (
              <div style={{ marginTop: '14px', padding: '12px 14px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.15)', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <strong style={{ color: '#38bdf8' }}>Architectural Insight:</strong> {activeVideo.notes}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Book Spotlight & uOttawa Banner Card */}
        <div className="mediahub-stage-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* The Book Spotlight */}
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(8, 12, 22, 0.95) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              <BookOpen size={16} /> Companion Enterprise Volume
            </div>

            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px', lineHeight: 1.3 }}>
              The New Physics of Software Velocity
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '18px' }}>
              The definitive treatise on building deterministic multi-agent architectures, context economics, and replacing prompts with autonomous loops.
            </p>

            <a
              href={AMAZON_BOOK_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                boxSizing: 'border-box',
              }}
            >
              Order on Amazon <ExternalLink size={15} />
            </a>
          </div>

          {/* uOttawa SEG Recruitment Spotlight Card */}
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(20, 24, 38, 0.9) 0%, rgba(10, 14, 24, 0.95) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              <GraduationCap size={16} /> uOttawa SEG Capstone 2026/2027
            </div>

            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px', lineHeight: 1.3 }}>
              Hiring 10 Software Engineering Students
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '18px' }}>
              Paid positions & capstone project sponsorships for autonomous multi-agent orchestration, browser extensions, and deterministic state platforms.
            </p>

            <a
              href="mailto:jeff@boggs.build?subject=uOttawa%20SEG%20Student%20Application%20-%20Boggs%20Systems"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              Apply via Email <Mail size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Playlists & Media Catalogs */}
      <div className="mediahub-catalogs" style={{ marginTop: '50px' }}>
        {INITIAL_PLAYLISTS.map((playlist) => (
          <div key={playlist.id} style={{ marginBottom: '44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              {playlist.icon}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                {playlist.category}
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {playlist.videos.map((vid) => {
                const isSelected = activeVideo.id === vid.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => handleSelectVideo(vid)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'rgba(15, 23, 42, 0.6)',
                      border: isSelected
                        ? '1px solid rgba(56, 189, 248, 0.6)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }} />

                      {vid.isUpcoming ? (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(245, 158, 11, 0.9)', color: '#000000', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          Upcoming
                        </div>
                      ) : (
                        vid.duration && (
                          <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>
                            {vid.duration}
                          </div>
                        )
                      )}

                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isSelected ? 1 : 0.8 }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                          <Play size={20} fill="#ffffff" style={{ marginLeft: '2px' }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '16px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {vid.category}
                      </span>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '4px', marginBottom: '6px', lineHeight: 1.35 }}>
                        {vid.title}
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.45, maxHeight: '2.9em', overflow: 'hidden' }}>
                        {vid.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Video Modal */}
      {upcomingModalVideo && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setUpcomingModalVideo(null);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              background: '#0f172a',
              borderRadius: '16px',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '28px',
              position: 'relative',
              color: '#f8fafc',
            }}
          >
            <button
              onClick={() => setUpcomingModalVideo(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
              <Bell size={16} /> Production In Progress
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
              {upcomingModalVideo.title}
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '16px' }}>
              {upcomingModalVideo.description}
            </p>

            {upcomingModalVideo.notes && (
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '20px' }}>
                <strong style={{ color: '#38bdf8' }}>Curriculum Note:</strong> {upcomingModalVideo.notes}
              </div>
            )}

            <button
              onClick={() => {
                setUpcomingModalVideo(null);
                onOpenNewsletter();
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Notify Me When Released
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
