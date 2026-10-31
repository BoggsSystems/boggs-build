import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Sliders,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Tv,
  CheckCircle2,
  X,
  GraduationCap,
  Cpu,
  Zap,
  Clock,
  Bell,
  Mail,
  Send,
  Share2,
  Copy,
  Check,
  Flame,
  Menu,
} from 'lucide-react';
import '../styles/mediahub.css';
import { ConductorLogo } from './ConductorLogo';
import { BoggsLogo } from './BoggsLogo';
import { BoggsHero } from './BoggsHero';
import { OpportunityOSSection } from './OpportunityOSSection';
import { NewsletterModal } from './NewsletterModal';
import bookCoverUrl from '../assets/ai-native-software-engineering-cover@2x.png';

interface AboutMediaHubPageProps {
  onStart?: (mode?: 'login' | 'signup') => void;
  onNavigateHome?: () => void;
  onNavigatePricing?: () => void;
  onNavigatePrivacy?: () => void;
  onNavigateTerms?: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'digitpop-feed': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        creator?: string;
        channel?: string;
        format?: string;
        layout?: string;
        'server-url'?: string;
        'auto-expand'?: string | boolean;
      };
      'digitpop-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'project-id'?: string;
        'video-url'?: string;
        mode?: string;
        'auto-expand'?: string | boolean;
        inline?: string | boolean;
        'server-url'?: string;
      };
      'digitpop-bubble': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        creator?: string;
        channel?: string;
        'project-id'?: string;
        position?: string;
        'server-url'?: string;
      };
    }
  }
}

interface VideoItem {
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
  thumbnailTitle?: string;
  thumbnailStyleColor?: string;
  productTitle?: string;
  productUrl?: string;
}

const AMAZON_BOOK_URL = 'https://www.amazon.com/dp/B0GN3G2HTQ';

const SHORTS_PLAYLIST: VideoItem[] = [];

const PLAYLISTS: { id: string; category: string; icon: React.ReactNode; videos: VideoItem[] }[] = [
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
        description: 'Keynote lecture and speedrun detailing the Opportunity OS architecture, autonomous multi-agent loops, and deterministic execution.',
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
        notes: 'Examines why multi-thousand line diffs trigger hallucination loops and how to isolate memory with Redis and pgvector.',
        isUpcoming: true,
      },
    ],
  },
  {
    id: 'opp-os-action',
    category: 'Opportunity OS in Action (Live Speedruns & Case Studies)',
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
        id: 'vid-203',
        title: 'Beating Black-Hole Applicant Tracking Systems (ATS) with Real Evidence',
        category: 'Opportunity OS',
        description: 'Teardown of how recruiters parse candidates and how Opportunity OS generates undeniable proof-of-work packages.',
        thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
        chapterRef: 'Chapter 9: Signal vs. Noise in Talent Markets',
        notes: 'Breakdown of keyword density vs semantic vector similarity in modern talent screening algorithms.',
        isUpcoming: true,
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
    id: 'student-mentorship',
    category: 'Next-Gen Developer Mentorship & Student Masterclasses',
    icon: <GraduationCap size={18} color="#f59e0b" />,
    videos: [
      {
        id: 'vid-301',
        title: 'The 2026 CS Graduate Survival Guide: What Universities Aren\'t Teaching You',
        category: 'Student Mentorship',
        description: 'Direct advice for computer science and software engineering students on how to stand out when basic coding has become commoditized.',
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

export const AboutMediaHubPage: React.FC<AboutMediaHubPageProps> = ({
  onStart = () => {},
  onNavigateHome = () => {},
  onNavigatePricing = () => {},
  onNavigatePrivacy = () => {},
  onNavigateTerms = () => {},
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(PLAYLISTS[0]!.videos[0]!);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
  const [showInspectModal, setShowInspectModal] = useState<boolean>(false);
  const [showPrologueDrawer, setShowPrologueDrawer] = useState<boolean>(false);
  const [upcomingModalVideo, setUpcomingModalVideo] = useState<VideoItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Cinematic Video Modal State
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);
  const [isClosingModal, setIsClosingModal] = useState<boolean>(false);
  const [modalFullscreen, setModalFullscreen] = useState<boolean>(false);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  // Dynamic Creator Media Hub Feed State (Defaulting to opportunity-system)
  const [playlists, setPlaylists] = useState<Array<{ id: string; category: string; icon: React.ReactNode; videos: VideoItem[] }>>(PLAYLISTS);
  const [shortsList, setShortsList] = useState<VideoItem[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && !document.querySelector('script[src*="embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://digitpop.opportunity-system.com/embed.js?v=2.9.0';
      script.async = true;
      document.head.appendChild(script);
    }

    const handleSelectVideoEvent = (e: any) => {
      if (e.detail && (e.detail.digitpopProjectId || e.detail.id)) {
        setActiveVideo({
          id: e.detail.id || e.detail.digitpopProjectId,
          title: e.detail.title || 'Interactive Masterclass',
          category: e.detail.category || 'AI-Native Engineering',
          description: e.detail.description || '',
          thumbnail: e.detail.thumbnail || '',
          videoUrl: e.detail.videoUrl || '',
          digitpopProjectId: e.detail.digitpopProjectId || e.detail.id,
          duration: e.detail.duration || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('digitpop:select-video', handleSelectVideoEvent);
    return () => window.removeEventListener('digitpop:select-video', handleSelectVideoEvent);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchMediaHubFeed = async () => {
      try {
        setIsLoadingFeed(true);
        const apiBase = 'https://digitpop.opportunity-system.com';

        const res = await fetch(`${apiBase}/api/public/creators/opportunity-system/media-hub?channel=about`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.hero && data.hero.id) {
              setActiveVideo(data.hero);
            }
            if (Array.isArray(data.shorts)) {
              setShortsList(data.shorts);
            }
            if (Array.isArray(data.playlists) && data.playlists.length > 0) {
              const mappedPlaylists = data.playlists.map((pl: any) => ({
                ...pl,
                icon: pl.iconName === 'Zap' ? (
                  <Zap size={18} color="#10b981" />
                ) : pl.iconName === 'Sparkles' ? (
                  <Sparkles size={18} color="#a855f7" />
                ) : (
                  <BookOpen size={18} color="#38bdf8" />
                ),
              }));
              setPlaylists(mappedPlaylists);
            }
          }
        }
      } catch (err) {
        console.warn('Media hub dynamic backend fetch warning:', err);
      } finally {
        if (isMounted) {
          setIsLoadingFeed(false);
        }
      }
    };

    fetchMediaHubFeed();
    return () => {
      isMounted = false;
    };
  }, []);

  // Video Drop Alert States
  const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(false);
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [subscribePreference, setSubscribePreference] = useState<'all' | 'keynotes'>('all');

  // Release Radar Card States
  const [radarEmail, setRadarEmail] = useState<string>('');
  const [radarStatus, setRadarStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Executive Substack Newsletter Modal
  const [showNewsletterModal, setShowNewsletterModal] = useState<boolean>(false);

  // Social Sharing Modal State
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareTargetVideo, setShareTargetVideo] = useState<VideoItem | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);
  const [copiedEmbedCode, setCopiedEmbedCode] = useState<boolean>(false);
  const [shareTab, setShareTab] = useState<'link' | 'embed'>('link');

  const handleOpenShare = (video: VideoItem | null, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!video) return;
    setShareTargetVideo(video);
    setCopiedShareLink(false);
    setCopiedEmbedCode(false);
    setShowShareModal(true);
  };

  const getShareUrl = (video: VideoItem | null) => {
    if (!video) return window.location.href;
    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://opportunity-system.com';
    const url = new URL(`${origin}/about`);
    const id = video.digitpopProjectId || video.id;
    if (video.isShort) {
      url.searchParams.set('short', id);
    } else {
      url.searchParams.set('v', id);
    }
    return url.toString();
  };

  const getEmbedSnippet = (video: VideoItem | null) => {
    if (!video) return '';
    const src = video.digitpopProjectId
      ? `https://player.digitpop.opportunity-system.com/?projectId=${video.digitpopProjectId}&mode=${video.isShort ? 'short' : 'vod'}`
      : `${window.location.origin}/about?v=${video.id}`;
    return `<iframe src="${src}" width="100%" height="600" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen style="border: none; border-radius: 12px;"></iframe>`;
  };

  const handleCopyShareLink = (video: VideoItem | null) => {
    const url = getShareUrl(video);
    navigator.clipboard.writeText(url);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  const handleCopyEmbedCode = (video: VideoItem | null) => {
    const embed = getEmbedSnippet(video);
    navigator.clipboard.writeText(embed);
    setCopiedEmbedCode(true);
    setTimeout(() => setCopiedEmbedCode(false), 2000);
  };

  // Open & Close Video Modal Handlers
  const handleOpenVideoModal = (video: VideoItem) => {
    if (video.isUpcoming) {
      setUpcomingModalVideo(video);
      setShowSubscribeModal(true);
      return;
    }
    setIsClosingModal(false);
    setModalVideo(video);
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        const id = video.digitpopProjectId || video.id;
        if (video.isShort) {
          url.searchParams.set('short', id);
          url.searchParams.delete('v');
        } else {
          url.searchParams.set('v', id);
          url.searchParams.delete('short');
        }
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {}
  };

  const handleCloseVideoModal = () => {
    setIsClosingModal(true);
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('short');
        url.searchParams.delete('v');
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {}
    setTimeout(() => {
      setModalVideo(null);
      setIsClosingModal(false);
      setModalFullscreen(false);
    }, 240);
  };

  // Deep-link auto-open or hero activation on page arrival: e.g. /about?short=<id> or /about?v=<id>
  const hasAutoOpenedRef = useRef<boolean>(false);
  useEffect(() => {
    if (typeof window === 'undefined' || hasAutoOpenedRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const shortParam = params.get('short');
    const vodParam = params.get('v') || params.get('projectId');
    const targetId = shortParam || vodParam;
    if (!targetId) return;

    // A. If deep-link is specifically for Shorts (?short=<id>)
    if (shortParam) {
      const matchedShort = shortsList.find(
        (s) => s.digitpopProjectId === targetId || s.id === targetId
      );
      if (matchedShort) {
        hasAutoOpenedRef.current = true;
        handleOpenVideoModal({
          ...matchedShort,
          isShort: true,
        });
        return;
      }
    }

    // B. If deep-link is for a longform video / keynote (?v=<id>)
    if (vodParam) {
      // Check if it matches the current active hero video
      if (activeVideo.digitpopProjectId === vodParam || activeVideo.id === vodParam) {
        hasAutoOpenedRef.current = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Check in playlists
      const allPlaylistVideos = playlists.flatMap((p) => p.videos || []);
      const matchedPlaylistVideo = allPlaylistVideos.find(
        (v) => v.digitpopProjectId === vodParam || v.id === vodParam
      );
      if (matchedPlaylistVideo) {
        hasAutoOpenedRef.current = true;
        setActiveVideo(matchedPlaylistVideo);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // C. Fallback: Query DigitPopServer directly for project details if not yet in memory
    if (!isLoadingFeed) {
      const fetchDirectVideo = async () => {
        try {
          const apiBase = (
            window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
              ? 'http://localhost:9000'
              : 'https://digitpop.opportunity-system.com'
          );
          const res = await fetch(`${apiBase}/api/projects/${encodeURIComponent(targetId)}`);
          if (res.ok) {
            const p = await res.json();
            const meta = p.metadata || {};
            const isShortVideo = Boolean(shortParam || p.mediaType === 'SHORT' || (meta.layoutMode && meta.layoutMode !== '16:9'));
            hasAutoOpenedRef.current = true;

            const videoItem: VideoItem = {
              id: p.id,
              digitpopProjectId: p.id,
              title: p.name || 'Interactive Shoppable Video',
              category: p.category || (isShortVideo ? 'Shorts' : 'Masterclass'),
              description: p.description || '',
              thumbnail: p.thumbnailUrl || '',
              videoUrl: p.masterVodUrl || '',
              duration: p.durationSeconds ? `${Math.floor(p.durationSeconds / 60)}:${String(Math.floor(p.durationSeconds % 60)).padStart(2, '0')}` : '0:30',
              isShort: isShortVideo,
            };

            if (isShortVideo) {
              handleOpenVideoModal(videoItem);
            } else {
              setActiveVideo(videoItem);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        } catch (err) {
          console.warn('Could not load shared video directly:', err);
        }
      };

      fetchDirectVideo();
    }
  }, [shortsList, playlists, isLoadingFeed, activeVideo]);

  // Auto-trigger Newsletter Welcome Modal on arrival (1.5s entrance delay, capped by 7-day cooldown and subscription status)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    try {
      const hasSubscribed = localStorage.getItem('opp_newsletter_subscribed') === 'true';
      if (hasSubscribed) {
        return;
      }

      const dismissedAtRaw = localStorage.getItem('opp_newsletter_modal_dismissed_at');
      const legacyDismissed = localStorage.getItem('opp_newsletter_modal_dismissed');
      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

      let isDismissedWithin7Days = false;
      if (dismissedAtRaw) {
        const dismissedTime = Number(dismissedAtRaw);
        if (Number.isFinite(dismissedTime) && Date.now() - dismissedTime < SEVEN_DAYS_MS) {
          isDismissedWithin7Days = true;
        }
      } else if (legacyDismissed) {
        isDismissedWithin7Days = true;
      }

      if (!isDismissedWithin7Days) {
        timer = setTimeout(() => {
          setShowNewsletterModal(true);
        }, 1500);
      }
    } catch {}

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleCloseNewsletterModal = () => {
    setShowNewsletterModal(false);
    try {
      localStorage.setItem('opp_newsletter_modal_dismissed_at', String(Date.now()));
    } catch {}
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showShareModal) {
          setShowShareModal(false);
        } else if (modalVideo) {
          handleCloseVideoModal();
        } else if (isFullscreen) {
          setIsFullscreen(false);
        } else if (showSubscribeModal) {
          setShowSubscribeModal(false);
        } else if (showPrologueDrawer) {
          setShowPrologueDrawer(false);
        } else if (showNewsletterModal) {
          handleCloseNewsletterModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShareModal, modalVideo, isFullscreen, showSubscribeModal, showPrologueDrawer, showNewsletterModal]);

  // Lock body scroll when any modal/drawer is open
  useEffect(() => {
    if (modalVideo || showSubscribeModal || showPrologueDrawer || showShareModal || showNewsletterModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalVideo, showSubscribeModal, showPrologueDrawer, showShareModal, showNewsletterModal]);

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail || !subscribeEmail.includes('@')) return;
    setSubscribeStatus('loading');
    
    // Call backend API & Substack
    fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: subscribeEmail, source: 'upcoming_video_modal' }),
    }).catch(() => {});

    setTimeout(() => {
      setSubscribeStatus('success');
      try {
        const existing = JSON.parse(localStorage.getItem('opportunity_media_subscribers') || '[]');
        existing.push({ email: subscribeEmail, preference: subscribePreference, date: new Date().toISOString() });
        localStorage.setItem('opportunity_media_subscribers', JSON.stringify(existing));
      } catch {}
    }, 400);
  };

  const handleRadarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!radarEmail || !radarEmail.includes('@')) return;
    setRadarStatus('loading');

    // Call backend API & Substack
    fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: radarEmail, source: 'release_radar_card' }),
    }).catch(() => {});

    setTimeout(() => {
      setRadarStatus('success');
      try {
        const existing = JSON.parse(localStorage.getItem('opportunity_media_subscribers') || '[]');
        existing.push({ email: radarEmail, source: 'release_radar_card', date: new Date().toISOString() });
        localStorage.setItem('opportunity_media_subscribers', JSON.stringify(existing));
      } catch {}
    }, 400);
  };

  const handlePlayToggle = () => {
    handleOpenVideoModal(activeVideo);
  };

  const handleSelectVideo = (video: VideoItem) => {
    handleOpenVideoModal(video);
  };

  return (
    <div className="mediahub-container">
      <div className="mediahub-ambient-glow" />

      {/* Navigation */}
      <header className="mediahub-nav">
        <div className="mediahub-nav-left">
          <a href="#" className="mediahub-logo-btn" style={{ textDecoration: 'none' }}>
            <BoggsLogo size={28} />
          </a>
          <div className="mediahub-badge">
            <Sparkles size={13} color="#38bdf8" />
            <span>Founder Media Hub</span>
          </div>
        </div>
        <div className="mediahub-nav-right">
          <div className="mediahub-nav-links">
            <a
              href="mailto:jeff@boggs.build?subject=uOttawa%20SEG%20Capstone%20Inquiry"
              className="mediahub-nav-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#fbbf24', textDecoration: 'none' }}
            >
              <GraduationCap size={15} />
              <span>uOttawa SEG (Hiring 10)</span>
            </a>
            <button className="mediahub-nav-link" onClick={() => setShowPrologueDrawer(true)}>
              <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
              The Book
            </button>
            <button className="mediahub-nav-link" onClick={() => setShowNewsletterModal(true)} style={{ color: '#f97316', fontWeight: 600 }}>
              <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Newsletter
            </button>
            <a
              href="mailto:jeff@boggs.build?subject=Boggs%20Systems%20Contact"
              className="mediahub-cta-btn"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Mail size={14} />
              <span>jeff@boggs.build</span>
            </a>
          </div>

          <button
            type="button"
            className="mediahub-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown / Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="mediahub-mobile-menu-dropdown">
            <button
              className="mediahub-mobile-menu-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateHome();
              }}
            >
              Product
            </button>
            <button
              className="mediahub-mobile-menu-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigatePricing();
              }}
            >
              Pricing
            </button>
            <button
              className="mediahub-mobile-menu-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowPrologueDrawer(true);
              }}
            >
              <BookOpen size={16} color="#38bdf8" />
              <span>The Book</span>
            </button>
            <button
              className="mediahub-mobile-menu-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowNewsletterModal(true);
              }}
              style={{ color: '#f97316' }}
            >
              <Mail size={16} color="#f97316" />
              <span>Newsletter</span>
            </button>
            <button
              className="mediahub-mobile-menu-item"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStart('login');
              }}
            >
              Log in
            </button>
            <button
              className="mediahub-mobile-cta-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStart('signup');
              }}
            >
              Get Started (Free)
            </button>
          </div>
        )}
      </header>

      {/* Boggs Systems Enterprise Hero & uOttawa Capstone Recruitment */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 24px' }}>
        <BoggsHero
          onScrollToPlayer={() => {
            const el = document.querySelector('.mediahub-hero-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenNewsletter={() => setShowNewsletterModal(true)}
          shortsSlot={
            <section className="mediahub-shorts-section" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              <div className="mediahub-shorts-header">
                <div className="mediahub-shorts-title-wrap">
                  <div className="mediahub-shorts-icon-badge">
                    <Flame size={16} color="#ffffff" />
                  </div>
                  <div>
                    <h2 className="mediahub-shorts-title">Shorts: Live Dev & Test Runs (Road to Ottawa)</h2>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
                      Watch Jeff's continuous live development sessions, active coding, and test executions between now and our November uOttawa visit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mediahub-shorts-feed-wrapper">
                <digitpop-feed
                  creator="opportunity-system"
                  channel="about"
                  format="shorts"
                  layout="carousel"
                  auto-expand="true"
                />
              </div>
            </section>
          }
        />
      </div>

      {/* Hero Viewport / TYT Stage */}
      <section className="mediahub-hero-section">
        <div className="mediahub-hero-header">
          <div className="mediahub-tagline-row">
            <div className="mediahub-status-pill">
              <span className="mediahub-status-dot" />
              <span>DigitPop Interactive Stream Active</span>
            </div>
          </div>
          <h1 className="mediahub-hero-title">
            The New Physics of <span>Software Velocity.</span>
          </h1>
          <p className="mediahub-hero-desc">
            Explore the engineering doctrines, live product speedruns, and masterclasses by <strong>Jeff Boggs</strong>, author of <em>AI-Native Software Engineering</em> and founder of Boggs Systems Corporation.
          </p>
        </div>

        {/* Stage Grid: Left Interactive Player + Right 3D Book Spotlight */}
        <div className="mediahub-stage-grid">
          {/* Left Column: DigitPop Player */}
          <div className={`digitpop-stage-wrapper ${isFullscreen ? 'is-fullscreen' : ''}`}>
            <div className="digitpop-top-bar">
              <div className="digitpop-player-title">
                <Tv size={15} color="#38bdf8" />
                <span>{activeVideo.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="mediahub-status-pill" style={{ fontSize: '0.725rem', padding: '2px 8px' }}>
                  <span>{activeVideo.duration}</span>
                </div>
                {isFullscreen && (
                  <button
                    className="digitpop-btn-icon"
                    onClick={() => setIsFullscreen(false)}
                    title="Exit Fullscreen (Esc)"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Video Viewport */}
            <div className="digitpop-video-viewport">
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
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  onPause={() => {
                    setIsPlaying(false);
                    setShowInspectModal(true);
                  }}
                  onPlay={() => {
                    setIsPlaying(true);
                    setShowInspectModal(false);
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#000',
                    zIndex: 2,
                  }}
                />
              ) : (
                <>
                  <div
                    className="digitpop-poster-bg"
                    style={{ backgroundImage: `url(${activeVideo.thumbnail})` }}
                  />
                  {!isPlaying && !showInspectModal && (
                    <div className="digitpop-play-overlay">
                      <button className="digitpop-big-play-btn" onClick={handlePlayToggle} aria-label="Play video">
                        <Play size={32} fill="#ffffff" style={{ marginLeft: '4px' }} />
                      </button>
                      <span style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 600 }}>
                        Click to Start Interactive Lecture
                      </span>
                    </div>
                  )}
                </>
              )}

              {!activeVideo.digitpopProjectId && (
                <>
                  {/* Watermark */}
                  <div className="digitpop-live-watermark" style={{ zIndex: 4 }}>
                    <span className="mediahub-status-dot" />
                    <span>DigitPop HD • {activeVideo.category}</span>
                  </div>

                  {/* Hotspot Beacon (DigitPop Tap-to-Reveal) */}
                  <button
                    className="digitpop-hotspot-beacon"
                    style={{ zIndex: 4 }}
                    onClick={() => setShowSidePanel((prev) => !prev)}
                    title="Tap to reveal Opportunity OS in-video trial"
                  >
                    <Zap size={13} />
                    <span>Try Opportunity OS Pro</span>
                  </button>
                </>
              )}

              {/* PAUSE_INSPECT Modal (DigitPop Canvas Freeze) */}
              {showInspectModal && (
                <div className="digitpop-inspect-modal">
                  <div className="digitpop-inspect-header">
                    <h4>
                      <Sliders size={16} />
                      <span>Pause-Inspect Mode • Chapter Blueprint</span>
                    </h4>
                    <button
                      className="digitpop-btn-icon"
                      onClick={() => setShowInspectModal(false)}
                      title="Close inspection"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="digitpop-inspect-body">
                    <div className="digitpop-inspect-notes">
                      <h5>{activeVideo.chapterRef || 'AI-Native Systems Architecture'}</h5>
                      <p>{activeVideo.notes || activeVideo.description}</p>
                    </div>
                    <div className="digitpop-inspect-box">
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px', textAlign: 'left' }}>
                        <img
                          src={bookCoverUrl}
                          alt="AI-Native Software Engineering by Jeffrey Boggs"
                          style={{ width: '48px', height: '74px', borderRadius: '4px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', flexShrink: 0 }}
                        />
                        <div>
                          <strong style={{ fontSize: '0.85rem', color: '#ffffff', display: 'block', lineHeight: 1.25, marginBottom: '2px' }}>AI-Native Software Engineering</strong>
                          <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>By Jeffrey Boggs</span>
                        </div>
                      </div>
                      <button
                        className="book-btn-read-prologue"
                        style={{ width: '100%', marginBottom: '8px' }}
                        onClick={() => {
                          setShowInspectModal(false);
                          setShowPrologueDrawer(true);
                        }}
                      >
                        <BookOpen size={14} />
                        <span>Read Prologue Free</span>
                      </button>
                      <a
                        href={AMAZON_BOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="book-btn-amazon"
                        style={{ width: '100%', fontSize: '0.8rem', padding: '8px 12px' }}
                      >
                        <span>Buy on Amazon ($9.99)</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                  <div className="digitpop-inspect-footer">
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      DigitPop Interactive Video • Frame Inspected
                    </span>
                    <button
                      className="digitpop-mode-toggle-btn active"
                      onClick={() => {
                        setShowInspectModal(false);
                        setIsPlaying(true);
                      }}
                    >
                      <Play size={13} />
                      <span>Resume Stream</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Video Control Bar */}
            <div className="digitpop-control-bar">
              <div className="digitpop-control-left">
                {activeVideo.digitpopProjectId ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="mediahub-status-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                      Interactive Shoppable Stream • Active
                    </span>
                  </div>
                ) : (
                  <>
                    <button className="digitpop-btn-icon" onClick={handlePlayToggle} aria-label="Toggle playback">
                      {isPlaying ? <Pause size={18} /> : <Play size={18} fill="#cbd5e1" />}
                    </button>
                    <span className="digitpop-timecode">14:02 / {activeVideo.duration}</span>
                  </>
                )}
              </div>
              <div className="digitpop-control-right">
                <button
                  className="digitpop-mode-toggle-btn digitpop-btn-share"
                  onClick={() => handleOpenShare(activeVideo)}
                  title="Share this shoppable video lecture"
                >
                  <Share2 size={13} color="#38bdf8" />
                  <span>Share</span>
                </button>
                <button
                  className={`digitpop-mode-toggle-btn digitpop-btn-alert ${showSubscribeModal ? 'active' : ''}`}
                  onClick={() => setShowSubscribeModal(true)}
                  title="Get email alerts when new masterclasses drop"
                >
                  <Bell size={13} color="#38bdf8" />
                  <span>Get Alerts</span>
                </button>
                <button
                  className={`digitpop-mode-toggle-btn ${isFullscreen ? 'active' : ''}`}
                  onClick={() => setIsFullscreen((prev) => !prev)}
                  title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Open in Fullscreen Cinema Mode'}
                >
                  {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>
                <button
                  className={`digitpop-mode-toggle-btn ${showInspectModal ? 'active' : ''}`}
                  onClick={() => setShowInspectModal((prev) => !prev)}
                >
                  <Sliders size={13} />
                  <span>Inspect Blueprint</span>
                </button>
                <button
                  className={`digitpop-mode-toggle-btn ${showSidePanel ? 'active' : ''}`}
                  onClick={() => setShowSidePanel((prev) => !prev)}
                >
                  <Maximize2 size={13} />
                  <span>Side Panel</span>
                </button>
              </div>
            </div>

            {/* Embedded SIDE_PANEL Drawer */}
            {showSidePanel && (
              <div className="digitpop-side-panel-drawer">
                <div className="digitpop-drawer-info">
                  <div className="digitpop-drawer-icon">
                    <ConductorLogo size={22} isThinking={true} />
                  </div>
                  <div className="digitpop-drawer-text">
                    <strong>Opportunity OS Candidate Workspace</strong>
                    <span>Automate your job applications with grounded AI evidence. Start free with 25 credits.</span>
                  </div>
                </div>
                <button className="digitpop-drawer-cta" onClick={() => onStart('signup')}>
                  Claim Free Access <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: The Central Artifact (The Book) + Release Radar */}
          <div className="mediahub-stage-right-col">
            <div className="book-spotlight-card">
              <div>
                <div className="book-spotlight-badge-row">
                  <div className="book-featured-badge">
                    <Sparkles size={12} />
                    <span>The Central Artifact</span>
                  </div>
                  <div className="book-format-badge">Kindle • Paperback</div>
                </div>

                {/* 3D Book Visual with Exact Cover */}
                <div className="book-3d-display">
                  <div
                    className="book-3d-wrapper"
                    onClick={() => setShowPrologueDrawer(true)}
                    title="Click to read the Prologue free"
                  >
                    <div className="book-hardcover-3d">
                      <img
                        src={bookCoverUrl}
                        alt="AI-Native Software Engineering: The New Physics of Software Velocity by Jeffrey Boggs"
                        className="book-cover-img"
                      />
                      <div className="book-spine-3d" />
                      <div className="book-pages-edge-3d" />
                      <div className="book-gloss-reflection" />
                    </div>
                  </div>
                </div>

                <div className="book-details-block">
                  <h3 className="book-title-heading">AI-Native Software Engineering</h3>
                  <div className="book-author-byline">By Jeffrey Boggs • Founder, Boggs Systems</div>
                  <p className="book-synopsis">
                    The definitive manifesto on why autocomplete and chat prompts hit a hard velocity wall, and how autonomous agent loops and deterministic verification engines rewrite software economics.
                  </p>
                </div>
              </div>

              <div className="book-action-buttons">
                <button className="book-btn-read-prologue" onClick={() => setShowPrologueDrawer(true)}>
                  <BookOpen size={16} />
                  <span>Read Prologue (Free on Site)</span>
                </button>
                <a
                  href={AMAZON_BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-btn-amazon"
                >
                  <span>Get on Amazon (Kindle & Paperback)</span>
                  <ExternalLink size={15} />
                </a>
                <div className="book-student-note">
                  <span>Free prologue & technical video lectures available for all readers and students.</span>
                </div>
              </div>
            </div>

            {/* Release Radar / Founder Media Dispatch Card */}
            <div className="mediahub-release-radar-card">
              <div className="radar-card-header">
                <div className="radar-badge" style={{ background: 'rgba(249, 115, 22, 0.15)', borderColor: 'rgba(249, 115, 22, 0.3)', color: '#f97316' }}>
                  <Mail size={12} color="#f97316" />
                  <span>The AI-Native Engineer Newsletter</span>
                </div>
                <div className="radar-frequency-tag" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>Substack</div>
              </div>

              <div className="radar-card-content">
                <h4 className="radar-title">Software at the Speed of Thought</h4>
                <p className="radar-desc">
                  Subscribe to get weekly architecture teardowns, 55-day solo build blueprints, unreleased book chapters, and free instant access to <strong>Chapter 1 + the 2026 Multi-Agent Checklist</strong>.
                </p>

                {radarStatus === 'success' ? (
                  <div className="radar-success-state">
                    <CheckCircle2 size={18} color="#10b981" />
                    <span>You're on the list! Welcome to The AI-Native Engineer.</span>
                  </div>
                ) : (
                  <form onSubmit={handleRadarSubmit} className="radar-form">
                    <div className="radar-input-wrap">
                      <Mail size={15} className="radar-input-icon" />
                      <input
                        type="email"
                        placeholder="Enter work email for Chapter 1..."
                        value={radarEmail}
                        onChange={(e) => setRadarEmail(e.target.value)}
                        required
                        className="radar-input"
                      />
                    </div>
                    <button type="submit" className="radar-submit-btn" style={{ background: '#f97316' }} disabled={radarStatus === 'loading'}>
                      {radarStatus === 'loading' ? 'Joining...' : 'Subscribe Free'}
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}

                <div className="radar-guarantee" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>⚡ Instant Chapter 1 PDF download • Zero spam</span>
                  <button
                    type="button"
                    onClick={() => setShowNewsletterModal(true)}
                    style={{ background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, padding: 0 }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity OS & Chrome Extension Showcase Section */}
      <OpportunityOSSection />

      {/* In-Browser Prologue Reader Drawer */}
      {showPrologueDrawer && (
        <div className="prologue-drawer-overlay" onClick={() => setShowPrologueDrawer(false)}>
          <div className="prologue-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="prologue-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={bookCoverUrl}
                  alt="AI-Native Software Engineering Cover"
                  style={{ width: '40px', height: '62px', borderRadius: '4px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.6)', flexShrink: 0 }}
                />
                <div className="prologue-drawer-titles">
                  <span>Free Prologue Preview</span>
                  <h3>Prologue — Before It Had a Name</h3>
                </div>
              </div>
              <button
                className="prologue-close-btn"
                onClick={() => setShowPrologueDrawer(false)}
                aria-label="Close reader"
              >
                <X size={20} />
              </button>
            </div>

            <div className="prologue-drawer-body">
              <p>
                <span className="prologue-dropcap">I</span> entered software engineering through an unusual door.
              </p>
              <p>
                From 1996 to 2001, I studied at the University of Ottawa as part of one of the first formal Software Engineering degree programs. It was separate and different from Computer Science. The emphasis was not on syntax or tooling, but on systems: how large software efforts were structured, managed, decomposed, and sustained over time.
              </p>
              <p>
                When the first edition of this book was published in early 2026, the shift toward AI-native software engineering was already underway, but the velocity has dramatically compounded in just the last several months. We have crossed from theoretical exploration into undeniable empirical reality. In modern engineering organizations, job requirements increasingly demand practitioners who are fluent in orchestration—engineers who command AI-native workflows rather than merely typing manual syntax.
              </p>
              <p>
                To demonstrate this shift concretely, this edition incorporates an empirical case study of <strong>Opportunity OS</strong> (<a href="https://opportunity-system.com" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>opportunity-system.com</a>), a platform engineered to cure the modern job search headache. Rather than relying on theoretical claims, the platform serves as measurable proof of the radical acceleration of software velocity under AI-native engineering—showing how a single orchestrator can design, build, and ship a multi-surface system across web, API, database, mobile, and browser automation in a fraction of traditional cycle times.
              </p>
              <p>
                More importantly, the build served as an empirical stress test of this book’s central thesis. Over a 55-day period, operating as a solo Software Product Orchestrator, I took the entire ecosystem from concept to production. The system spanned a React/Vite dashboard, React admin panel, NestJS API, PostgreSQL/Prisma backend, background workers, an iOS SwiftUI client, and a production Chrome extension—totaling over 180,000 lines of code across 416 commits. When measured against traditional estimation baselines—both a functionality-oriented Function Point Analysis (~46.1 person-months) and an AI-normalized COCOMO II model (~42.5 person-months)—a conventional team would have required roughly 45 person-months of effort. Delivering the platform in 1.8 person-months demonstrated a <strong>23x compression factor</strong>.
              </p>
              <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>
                (I break down the architecture, estimation methods, and build metrics in <strong>Chapter 21 — The 23x Build</strong>).
              </p>
              <p>
                While mainstream hiring practices still lag behind this reality, there are unmistakable glimmers of change across forward-thinking engineering teams. Forward-looking companies are quietly abandoning outdated, high-friction LeetCode whiteboard puzzles in favor of guided, AI-paired working sessions that evaluate how candidates frame ambiguity, decompose systems, and navigate live code generation in real time. (I explore this evaluation blueprint in <strong>Chapter 10 — Hiring for the AI-Native Software Engineering Team</strong>).
              </p>
              <p>
                At the same time, this acceleration has triggered a harsh reckoning: the "Junior Problem" and the collapse of the coding bootcamp promise. For over a decade, an entire industry promised aspiring developers that three months of memorizing syntax was a guaranteed ticket to a lucrative career. That shortcut is definitively over. Thousands of bootcamp graduates and entry-level developers now find themselves sidelined—not for a lack of talent or drive, but because they were trained exclusively for execution scarcity, a bottleneck that no longer exists. (I examine this structural mismatch and outline a four-year educational rebuild in <strong>Chapter 18 — The Junior Problem</strong>).
              </p>
              <p>
                Fast forward 25 years from my university graduation, and OpenAI’s guide on building an AI-Native Engineering Team released in November 2025, represents a foundational shift in how software engineering should be understood and practiced (<a href="https://developers.openai.com/codex/guides/build-ai-native-engineering-team/" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline', textUnderlineOffset: '3px' }}>OpenAI Codex Guide: Build an AI-Native Engineering Team</a>). Rather than offering incremental tooling advice, it articulates a true paradigm change — reframing the entire software delivery lifecycle so that AI agents are no longer peripheral assistants, but integral collaborators across every phase, from planning and design through testing, review, and deployment. This document isn’t just strategy — it is a living playbook. It demonstrates that AI agents are already capable of producing, testing, and iteratively refining code at scale, fundamentally changing where human effort is most valuable. Human engineers move up the abstraction stack, focusing on judgment, architecture, system-level reasoning, and validation. The guide sends a clear signal: engineering teams must evolve their processes, roles, and tooling to remain effective in a world where autonomous AI agents reshape both productivity and workflow.
              </p>
              <p>
                The following chart, produced by METR (Model Evaluation & Threat Research) and featured in OpenAI’s “Building an AI-Native Engineering Team” guide, illustrates the most consequential shift in software engineering since the invention of high-level programming languages: <strong>execution has become cheap</strong>. The vertical axis shows the length of a software task that an AI model can complete successfully 50% of the time. The horizontal axis is time. What matters is not the absolute values, but the slope. From 2019 onward, the task horizon grows exponentially—doubling roughly every seven months. Tasks that once required human engineers for hours, and later days, are now within the reliable execution window of AI systems. The implication is structural: the bottleneck in software engineering is no longer typing code. It is deciding what to build, why it should exist, and whether it is correct. Strategy, architecture, judgment, and verification become the scarce resources—while raw implementation becomes abundant. This is why AI-native engineering is not about speed. It is about leverage. When execution compounds at an exponential rate, organizations that cling to human-limited workflows fall behind not gradually, but suddenly.
              </p>
              <p>
                Immediately after graduation, I moved to the United States to work at Motorola. It was the first time I lived in the U.S. I would continue to do so—across cities, companies, and industries—for the next twenty-five years. By day, I worked as a developer inside some of the largest corporations in the United States. These were environments optimized for control: process-heavy, risk-aware, shaped by compliance and finance. Execution was expensive. Change required permission. Velocity was something to be managed, constrained, and justified. As a contractor, I moved between organizations and teams, which exposed me to a wide range of software engineering processes. Most were informal or effectively had no process.&nbsp; On the other hand, the software engineering process at Fidelity Investments permanently recalibrated my understanding of velocity. They had a standardized process using Agile development across the entire organization.&nbsp; The process was the same as the first team I was with and the second team.&nbsp; They were the only organization in my experience that effectively measured velocity.&nbsp; That definition became a reference point.
              </p>
              <p>
                At night, I began working differently.
              </p>
              <p>
                In 2009, following the financial crisis, I began building my own products and building software systems with distributed talent around the world through Rent-A-Coder. By day, I was an enterprise engineer operating within heavily siloed corporate teams. By night, I had to own the entire product lifecycle end-to-end: framing the business problem, designing user workflows, establishing system architecture, managing overseas contractors, and validating production builds.
              </p>
              <p>
                I was operating as what the industry today calls a <strong>Product Engineer</strong>—a single builder responsible for translating raw intent into a working, customer-facing product.
              </p>
              <p>
                From roughly 2010 through 2020, this rhythm matured into a deep decade-long collaboration with an extraordinary designer based in Romania. Working across time zones, we turned abstract concepts into concrete systems: deciding what the product actually was, what friction it truly eliminated, and what form it should take.
              </p>
              <p>
                In that era, running the full product loop as an individual builder was expensive and slow. Every handoff carried latency. Every misunderstanding in requirements cost days of rework. Delegation was an agonizing, high-friction act because the cost of being misunderstood was so high.
              </p>
              <p>
                When artificial intelligence arrived, it did not invent this multi-disciplinary way of working.
              </p>
              <div className="prologue-quote-box">
                "It collapsed the cost of delegation."
              </div>
              <p>
                What once required an entire distributed team of contractors, specialized handoffs, and weeks of synchronization across time zones is now executed inside a continuous loop:
              </p>
              <ul className="prologue-loop-list">
                <li>Logos.</li>
                <li>Workflows.</li>
                <li>Font selection.</li>
                <li>Layouts.</li>
                <li>Front-end code.</li>
                <li>Back-end APIs.</li>
                <li>Visual narratives.</li>
              </ul>
              <p>
                AI did not replace the designer, the developer, or the product thinker. It eliminated the friction between them. It allowed a single Software Product Engineer to hold strategic intent in their head and orchestrate execution across the entire software delivery lifecycle in real time.
              </p>
              <p>
                All of this unfolded against a shifting national backdrop. The dot-com collapse. September 11th. The consolidation of financial power. The 2008 financial crisis. The rise of platform monopolies. A pandemic that dissolved geography altogether. My own path moved through Chicago, San Francisco, Santa Barbara, Boston, Austin, New Hampshire, Rhode Island, Newport Beach, Las Vegas and New York.
              </p>
              <p>
                When artificial intelligence arrived, the economics finally collapsed. Execution stopped being scarce. For the first time in my career, software engineering velocity was no longer constrained by implementation—but by how clearly decisions could be made upstream. AI did not introduce orchestration. It made it unavoidable.
              </p>
              <p>
                This book is not about tools. It is about what happens when execution becomes free and the remaining constraint on software engineering velocity is how well teams think. For most of my career, these ideas lived in fragments: in outsourcing workflows that punished ambiguity, in Agile teams that measured real velocity, in long collaborations where judgment was delegated carefully because failure was expensive. AI did not introduce those patterns. It removed the penalty for getting them wrong early.
              </p>
              <p>
                What OpenAI’s publication signaled—whether intentionally or not—was that this was no longer a fringe observation. The constraint collapse was now visible enough that it required organizational guidance. Despite this, the majority of organizations have not restructured deeply enough to capture the value they expect. As McKinsey Global Institute observes, AI adoption remains largely incremental — applied to existing workflows rather than reorganizing how work is actually done.
              </p>
              <p>
                This book exists in that moment. Not to restate these documents, but to explore their consequences.&nbsp; And to provide a practical guide to restructuring for the age of AI-Native Software Engineering.
              </p>

              <h4 style={{ marginTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '28px' }}>
                Who This Book Is For
              </h4>
              <p>
                This book is not a manual for writing code with AI. It is a field guide for navigating a world where the cost of execution has collapsed, and the value of judgment has skyrocketed.
              </p>

              <div className="prologue-audience-list">
                <div className="prologue-audience-card">
                  <div className="prologue-audience-header">
                    <span className="prologue-audience-badge">1</span>
                    <h5>The Engineering Leader <span className="prologue-audience-subtitle">(CTOs, VPs, and Directors)</span></h5>
                  </div>
                  <p>
                    You are currently managing a "factory" built on Old Physics. You are optimized for predictable velocity, sprint points, and minimizing the risk of "junior" mistakes.
                  </p>
                  <div className="prologue-audience-callout">
                    <strong>Why you need this:</strong> You are likely seeing the "Constraint Collapse" in real-time but are still hiring and promoting based on execution scarcity. This book will help you restructure your organization around Intent and Verification rather than "The Grind."
                  </div>
                </div>

                <div className="prologue-audience-card">
                  <div className="prologue-audience-header">
                    <span className="prologue-audience-badge">2</span>
                    <h5>The Software Product Orchestrator <span className="prologue-audience-subtitle">(The New Senior Engineer)</span></h5>
                  </div>
                  <p>
                    You have realized that your value is no longer in how fast you can type or how many frameworks you have memorized. You feel the shift toward becoming a "system architect of one."
                  </p>
                  <div className="prologue-audience-callout">
                    <strong>Why you need this:</strong> This book provides the vocabulary and the "Symptom Index" for your new role. It teaches you how to manage the Delegation Loop and how to use AI to build complex, cross-domain systems (like robotics and mobile apps) in days rather than months.
                  </div>
                </div>

                <div className="prologue-audience-card">
                  <div className="prologue-audience-header">
                    <span className="prologue-audience-badge">3</span>
                    <h5>The Skeptic <span className="prologue-audience-subtitle">(The Veteran Engineer)</span></h5>
                  </div>
                  <p>
                    Like my father, you have spent decades mastering the "dark arts" of engineering—cross-compilation, manual memory management, and complex debugging. You believe AI is overhyped because it doesn't "understand" the hardware.
                  </p>
                  <div className="prologue-audience-callout">
                    <strong>Why you need this:</strong> This book is a challenge to your physics. It isn't meant to diminish your expertise, but to show you how that expertise—your Judgment—is finally being liberated from the manual labor that used to consume 90% of your time.
                  </div>
                </div>

                <div className="prologue-audience-card">
                  <div className="prologue-audience-header">
                    <span className="prologue-audience-badge">4</span>
                    <h5>The Student and the Educator</h5>
                  </div>
                  <p>
                    You are entering (or teaching) a field that is changing faster than the curriculum can keep up.
                  </p>
                  <div className="prologue-audience-callout">
                    <strong>Why you need this:</strong> This book outlines the "Junior Problem" and proposes a new path: moving away from "Syntax First" and toward "System Orientation." It is a roadmap for how to become a high-leverage engineer from Year One.
                  </div>
                </div>
              </div>

              <div className="prologue-footer-cta">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <img
                    src={bookCoverUrl}
                    alt="AI-Native Software Engineering by Jeffrey Boggs"
                    style={{ width: '92px', height: '144px', borderRadius: '6px', objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.8)' }}
                  />
                </div>
                <h5>Continue Reading the Complete Blueprint</h5>
                <p>Available worldwide in Kindle eBook and Paperback formats on Amazon.</p>
                <div className="prologue-cta-group">
                  <a
                    href={AMAZON_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="book-btn-amazon"
                  >
                    <span>Get Book on Amazon ($9.99 / $24.95)</span>
                    <ExternalLink size={15} />
                  </a>
                  <button className="book-btn-read-prologue" onClick={() => onStart('signup')}>
                    <span>Try Opportunity OS Free</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-Player / Video Drop Subscribe Modal */}
      {showSubscribeModal && (
        <div className="digitpop-modal-overlay" onClick={() => setShowSubscribeModal(false)}>
          <div className="digitpop-subscribe-modal" onClick={(e) => e.stopPropagation()}>
            <div className="digitpop-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="radar-badge" style={{ margin: 0 }}>
                  <Bell size={12} color="#38bdf8" />
                  <span>Series Alerts</span>
                </div>
                {upcomingModalVideo && (
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    for <em>{upcomingModalVideo.title}</em>
                  </span>
                )}
              </div>
              <button
                className="prologue-close-btn"
                onClick={() => {
                  setShowSubscribeModal(false);
                  setUpcomingModalVideo(null);
                }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="digitpop-modal-body">
              <h3 className="digitpop-modal-title">
                {upcomingModalVideo ? 'Get Early Access When This Episode Drops' : 'Get Notified on New Masterclass Drops'}
              </h3>
              <p className="digitpop-modal-desc">
                Receive direct email notifications whenever Jeff Boggs publishes new engineering doctrines, autonomous multi-agent speedruns, or blueprint downloads.
              </p>

              {subscribeStatus === 'success' ? (
                <div className="digitpop-subscribe-success">
                  <div className="subscribe-success-icon">
                    <CheckCircle2 size={36} color="#10b981" />
                  </div>
                  <h4>You're on the list!</h4>
                  <p>
                    We'll email <strong>{subscribeEmail}</strong> as soon as the next episode or blueprint goes live.
                  </p>
                  <button
                    className="book-btn-read-prologue"
                    onClick={() => {
                      setShowSubscribeModal(false);
                      setSubscribeStatus('idle');
                      setSubscribeEmail('');
                      setUpcomingModalVideo(null);
                    }}
                    style={{ marginTop: '18px', width: '100%', justifyContent: 'center' }}
                  >
                    <span>Back to Media Hub</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} className="digitpop-subscribe-form">
                  <div className="subscribe-preference-row">
                    <button
                      type="button"
                      className={`subscribe-pill-option ${subscribePreference === 'all' ? 'active' : ''}`}
                      onClick={() => setSubscribePreference('all')}
                    >
                      <Sparkles size={13} color={subscribePreference === 'all' ? '#38bdf8' : '#94a3b8'} />
                      <span>All Video Drops & Blueprints</span>
                    </button>
                    <button
                      type="button"
                      className={`subscribe-pill-option ${subscribePreference === 'keynotes' ? 'active' : ''}`}
                      onClick={() => setSubscribePreference('keynotes')}
                    >
                      <Tv size={13} color={subscribePreference === 'keynotes' ? '#38bdf8' : '#94a3b8'} />
                      <span>Major Keynotes Only</span>
                    </button>
                  </div>

                  <div className="radar-input-wrap" style={{ marginTop: '16px' }}>
                    <Mail size={16} className="radar-input-icon" />
                    <input
                      type="email"
                      placeholder="Enter your developer email..."
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      required
                      className="radar-input"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    className="digitpop-subscribe-btn"
                    disabled={subscribeStatus === 'loading'}
                  >
                    {subscribeStatus === 'loading' ? (
                      <span>Subscribing...</span>
                    ) : (
                      <>
                        <Bell size={15} />
                        <span>Notify Me on New Releases</span>
                      </>
                    )}
                  </button>

                  <div className="radar-guarantee" style={{ marginTop: '12px', textAlign: 'center' }}>
                    <span>⚡ 100% Free • Direct from the Author • No Spam</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Shoppable Video Modal */}
      {modalVideo && (
        <div
          className={`mediahub-video-modal-backdrop ${isClosingModal ? 'is-closing' : 'is-entering'}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseVideoModal();
          }}
          aria-modal="true"
          role="dialog"
          aria-label={modalVideo.title}
        >
          <div className={`mediahub-video-modal-content ${isClosingModal ? 'is-closing' : 'is-entering'} ${modalFullscreen ? 'is-fullscreen' : ''} ${modalVideo.isShort ? 'is-short-modal' : ''}`}>
            {/* Modal Header */}
            <div className="mediahub-video-modal-header">
              <div className="mediahub-modal-title-wrap">
                <div
                  className="mediahub-badge"
                  style={{
                    borderColor: modalVideo.isShort ? 'rgba(255, 0, 0, 0.4)' : 'rgba(56, 189, 248, 0.4)',
                    color: modalVideo.isShort ? '#ff4d4d' : '#38bdf8',
                    background: modalVideo.isShort ? 'rgba(255, 0, 0, 0.15)' : 'rgba(14, 116, 144, 0.2)',
                  }}
                >
                  {modalVideo.isShort ? <Flame size={13} color="#ff0000" /> : <Tv size={13} />}
                  <span>{modalVideo.category}</span>
                </div>
                <h3 className="mediahub-modal-title">{modalVideo.title}</h3>
                {modalVideo.duration && (
                  <span className="mediahub-modal-duration-pill">{modalVideo.duration}</span>
                )}
              </div>
              <div className="mediahub-modal-header-actions">
                <button
                  className="mediahub-modal-btn-icon"
                  onClick={() => handleOpenShare(modalVideo)}
                  title="Share Shoppable Video"
                  aria-label="Share Shoppable Video"
                >
                  <Share2 size={16} />
                </button>
                <button
                  className="mediahub-modal-btn-icon"
                  onClick={() => setModalFullscreen((prev) => !prev)}
                  title={modalFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  aria-label="Toggle Fullscreen"
                >
                  {modalFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  className="mediahub-modal-close-btn"
                  onClick={handleCloseVideoModal}
                  title="Close Video (Esc)"
                  aria-label="Close Video Modal"
                >
                  <span className="mediahub-modal-esc-hint">ESC</span>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Video Viewport */}
            <div className="mediahub-video-modal-viewport">
              {modalVideo.isShort ? (
                <digitpop-player
                  key={`modal-short-${modalVideo.digitpopProjectId || modalVideo.id}`}
                  project-id={modalVideo.digitpopProjectId || 'short-project'}
                  mode="short"
                  video-url={modalVideo.videoUrl || ''}
                  inline="true"
                  auto-expand="true"
                  className="mediahub-modal-iframe"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : modalVideo.digitpopProjectId ? (
                <digitpop-player
                  key={`modal-vod-${modalVideo.digitpopProjectId || modalVideo.id}`}
                  project-id={modalVideo.digitpopProjectId}
                  mode="vod"
                  video-url={modalVideo.videoUrl || ''}
                  inline="true"
                  auto-expand="true"
                  className="mediahub-modal-iframe"
                  style={{ width: '100%', height: '100%' }}
                />
              ) : modalVideo.videoUrl ? (
                <video
                  src={modalVideo.videoUrl}
                  poster={modalVideo.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="mediahub-modal-video"
                />
              ) : (
                <div className="mediahub-modal-fallback-view">
                  <Play size={48} color="#38bdf8" />
                  <p>Stream preview temporarily unavailable</p>
                </div>
              )}
            </div>

            {/* Modal Sub-footer info */}
            {modalVideo.chapterRef && (
              <div className="mediahub-video-modal-footer">
                <div className="mediahub-modal-chapter-info">
                  <Sparkles size={14} color="#38bdf8" />
                  <span><strong>{modalVideo.chapterRef}</strong>: {modalVideo.notes || modalVideo.description}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Social Media Sharing Modal */}
      {showShareModal && shareTargetVideo && (
        <div className="digitpop-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="mediahub-share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="digitpop-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Share2 size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                  Share Shoppable Video
                </span>
              </div>
              <button
                className="prologue-close-btn"
                onClick={() => setShowShareModal(false)}
                aria-label="Close share dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="digitpop-modal-body">
              {/* Target Preview */}
              <div className="mediahub-share-target-preview">
                <img
                  src={shareTargetVideo.thumbnail}
                  alt={shareTargetVideo.title}
                  className="mediahub-share-thumb"
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 className="mediahub-share-target-title">{shareTargetVideo.title}</h4>
                  <span className="mediahub-share-target-sub">{shareTargetVideo.category} • DigitPop HD</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="share-tabs-nav">
                <button
                  className={`share-tab-nav-btn ${shareTab === 'link' ? 'active' : ''}`}
                  onClick={() => setShareTab('link')}
                >
                  <Copy size={13} />
                  <span>Share Link</span>
                </button>
                <button
                  className={`share-tab-nav-btn ${shareTab === 'embed' ? 'active' : ''}`}
                  onClick={() => setShareTab('embed')}
                >
                  <ExternalLink size={13} />
                  <span>Embed Player</span>
                </button>
              </div>

              {shareTab === 'link' ? (
                <>
                  <div className="share-copy-box">
                    <input
                      type="text"
                      readOnly
                      value={getShareUrl(shareTargetVideo)}
                      className="share-copy-input"
                    />
                    <button
                      className={`share-copy-btn ${copiedShareLink ? 'copied' : ''}`}
                      onClick={() => handleCopyShareLink(shareTargetVideo)}
                    >
                      {copiedShareLink ? (
                        <>
                          <Check size={14} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Broadcast to Social Channels
                  </div>

                  <div className="share-social-grid">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Watch "${shareTargetVideo.title}" on Opportunity OS Media Hub:`
                      )}&url=${encodeURIComponent(getShareUrl(shareTargetVideo))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-social-btn x"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>X / Twitter</span>
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        getShareUrl(shareTargetVideo)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-social-btn linkedin"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `${shareTargetVideo.title} - ${getShareUrl(shareTargetVideo)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-social-btn whatsapp"
                    >
                      <Send size={13} />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        getShareUrl(shareTargetVideo)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-social-btn facebook"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>

                    <a
                      href={`https://reddit.com/submit?url=${encodeURIComponent(
                        getShareUrl(shareTargetVideo)
                      )}&title=${encodeURIComponent(shareTargetVideo.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-social-btn reddit"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702z"/>
                      </svg>
                      <span>Reddit</span>
                    </a>

                    <a
                      href={`mailto:?subject=${encodeURIComponent(
                        shareTargetVideo.title
                      )}&body=${encodeURIComponent(
                        `Check out this interactive shoppable video lecture: ${shareTargetVideo.title}\n\n${getShareUrl(
                          shareTargetVideo
                        )}`
                      )}`}
                      className="share-social-btn email"
                    >
                      <Mail size={13} />
                      <span>Email</span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="share-copy-box">
                    <input
                      type="text"
                      readOnly
                      value={getEmbedSnippet(shareTargetVideo)}
                      className="share-copy-input"
                    />
                    <button
                      className={`share-copy-btn ${copiedEmbedCode ? 'copied' : ''}`}
                      onClick={() => handleCopyEmbedCode(shareTargetVideo)}
                    >
                      {copiedEmbedCode ? (
                        <>
                          <Check size={14} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                    Paste this iframe snippet into your website, CMS, or blog to embed the full interactive DigitPop video experience.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="landing-footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '36px 24px', background: '#080c15' }}>
        <div className="footer-content" style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BoggsLogo size={24} />
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
            <span style={{ color: '#64748b' }}>Umbrella Systems:</span>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>Transit-OS (Infrastructure)</span>
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>Opportunity OS (Social)</span>
            <span style={{ color: '#c084fc', fontWeight: 600 }}>DigitPop (Commerce)</span>
            <a href="mailto:jeff@boggs.build" style={{ color: '#38bdf8', textDecoration: 'none' }}>
              jeff@boggs.build
            </a>
            <a href={AMAZON_BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
              The Book (Amazon)
            </a>
            <button onClick={() => setShowNewsletterModal(true)} style={{ background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', padding: 0 }}>
              Newsletter
            </button>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0, textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} Boggs Systems Inc. All rights reserved. The sovereign enterprise umbrella for autonomous systems.
          </p>
        </div>
      </footer>

      {/* Executive Substack Newsletter Modal */}
      <NewsletterModal
        isOpen={showNewsletterModal}
        onClose={handleCloseNewsletterModal}
        source="about_page_modal"
      />
    </div>
  );
};
