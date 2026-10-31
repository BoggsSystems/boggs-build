import React, { useState } from 'react';
import {
  Users,
  Layers,
  FileCode2,
  Activity,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

export type DiagramViewType = 'actors' | 'subsystem' | 'uml-class' | 'sequence';

interface SystemArchitectureDiagramsProps {
  systemId: string;
  accentColor: string;
  initialView?: DiagramViewType;
}

export const SystemArchitectureDiagrams: React.FC<SystemArchitectureDiagramsProps> = ({
  systemId,
  accentColor,
  initialView = 'actors',
}) => {
  const [activeDiagram, setActiveDiagram] = useState<DiagramViewType>(initialView);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(Number((prev + delta).toFixed(2)), 0.75), 1.35));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="boggs-diagram-viewer">
      {/* Diagram Selector Toolbar */}
      <div className="boggs-diagram-toolbar">
        <div className="boggs-diagram-type-pills">
          <button
            className={`boggs-diagram-nav-btn ${activeDiagram === 'actors' ? 'active' : ''}`}
            onClick={() => setActiveDiagram('actors')}
          >
            <Users size={14} /> 1. Actors &amp; Use Cases
          </button>
          <button
            className={`boggs-diagram-nav-btn ${activeDiagram === 'subsystem' ? 'active' : ''}`}
            onClick={() => setActiveDiagram('subsystem')}
          >
            <Layers size={14} /> 2. Subsystem Architecture
          </button>
          <button
            className={`boggs-diagram-nav-btn ${activeDiagram === 'uml-class' ? 'active' : ''}`}
            onClick={() => setActiveDiagram('uml-class')}
          >
            <FileCode2 size={14} /> 3. UML Class Model &amp; Patterns
          </button>
          <button
            className={`boggs-diagram-nav-btn ${activeDiagram === 'sequence' ? 'active' : ''}`}
            onClick={() => setActiveDiagram('sequence')}
          >
            <Activity size={14} /> 4. Sequence &amp; Timing
          </button>
        </div>

        <div className="boggs-diagram-zoom-controls">
          <button onClick={() => handleZoom(-0.1)} className="boggs-zoom-btn" title="Zoom Out">
            <ZoomOut size={13} />
          </button>
          <span className="boggs-zoom-label">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={() => handleZoom(0.1)} className="boggs-zoom-btn" title="Zoom In">
            <ZoomIn size={13} />
          </button>
          <button onClick={handleResetZoom} className="boggs-zoom-btn" title="Reset Zoom">
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="boggs-diagram-canvas-wrap">
        <div
          className="boggs-diagram-svg-container"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.15s ease' }}
        >
          {activeDiagram === 'actors' && <ActorsDiagram systemId={systemId} accentColor={accentColor} />}
          {activeDiagram === 'subsystem' && <SubsystemDiagram systemId={systemId} accentColor={accentColor} />}
          {activeDiagram === 'uml-class' && <UmlClassDiagram systemId={systemId} accentColor={accentColor} />}
          {activeDiagram === 'sequence' && <SequenceDiagram systemId={systemId} accentColor={accentColor} />}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   DIAGRAM 1: ACTORS & USE CASES
   ========================================================================= */
const ActorsDiagram: React.FC<{ systemId: string; accentColor: string }> = ({ systemId, accentColor }) => {
  const getActorData = (id: string) => {
    switch (id) {
      case 'smart-mohs':
        return {
          title: 'SYSTEM BOUNDARY: SMART MOHS SURGICAL ROBOTICS WORKSTATION',
          primary: { role: 'Mohs Surgeon', sub: 'Primary Human Operator' },
          actors: [
            { role: 'Safety Watchdog', sub: 'Lockstep Micro-Core', color: '#f87171' },
            { role: 'Wasatch Spectrometer', sub: '100 kHz Line-Scan', color: '#38bdf8' },
            { role: 'Laser Shutter Coil', sub: '< 1.5ms Fail-Closed', color: '#fbbf24' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Optical Biopsy Scan', sub: '100 kHz 3D Swept Volume', color: accentColor },
            { num: 'UC-2', title: 'Stream A-Scans', sub: '<<include>> PCIe DMA', color: '#38bdf8' },
            { num: 'UC-3', title: '3D Tumor Segmentation', sub: 'TensorRT 3D U-Net (Dice ≥ 0.94)', color: '#c084fc' },
            { num: 'UC-4', title: 'Picosecond Ablation', sub: '20 kHz Cold Laser Closed-Loop', color: '#fbbf24' },
            { num: 'UC-5', title: 'Clamp Beam Shutter', sub: '< 1.5ms Watchdog Clamp', color: '#f87171' },
          ],
        };
      case 'borealis-pods':
        return {
          title: 'SYSTEM BOUNDARY: BOREALIS PODS AUTONOMOUS FLEET CORE',
          primary: { role: 'Transit Commuter', sub: 'Primary Passenger' },
          actors: [
            { role: 'SPaT Controller', sub: 'C-V2X Green Wave', color: '#34d399' },
            { role: 'Maglev Hub Berth', sub: 'UWB Docking Beacon', color: '#38bdf8' },
            { role: 'ASIL-D DBW Actuator', sub: 'Brake-by-Wire Safe-Stop', color: '#f87171' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Doorstep Pickup & Boarding', sub: 'Zero-Step Ramp Actuation', color: accentColor },
            { num: 'UC-2', title: 'Green-Wave Transit', sub: '<<include>> SPaT Negotiation', color: '#34d399' },
            { num: 'UC-3', title: 'Level 4 Perception Fusion', sub: 'LiDAR + 4D Radar + Cameras', color: '#c084fc' },
            { num: 'UC-4', title: 'UWB Precision Docking', sub: '< 15 Steps Maglev Transfer', color: '#38bdf8' },
            { num: 'UC-5', title: 'Minimum Risk Maneuver', sub: 'Automated Shoulder Pull-In', color: '#f87171' },
          ],
        };
      case 'borealis-maglev':
        return {
          title: 'SYSTEM BOUNDARY: BOREALIS MAGLEV INTERCITY AVIONICS',
          primary: { role: 'Intercity Passenger', sub: 'High-Speed Traveler' },
          actors: [
            { role: 'OCC Dispatcher', sub: 'Central CBTC Supervisor', color: '#38bdf8' },
            { role: 'Guideway Inverter', sub: 'Linear Stator Substation', color: '#fbbf24' },
            { role: 'Eddy-Current Skid', sub: 'Passive Magnetic Brake', color: '#f87171' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Airlock Berth Seal', sub: 'Cabin Pressure Stabilization', color: accentColor },
            { num: 'UC-2', title: '15mm Levitation Suspension', sub: '1 kHz Closed-Loop Control', color: '#38bdf8' },
            { num: 'UC-3', title: 'Linear Motor Booster Pulse', sub: '0 to 450 km/h Acceleration', color: '#fbbf24' },
            { num: 'UC-4', title: '500 km/h Supercruise', sub: 'SIL-4 Moving-Block Protection', color: '#34d399' },
            { num: 'UC-5', title: 'Deploy Eddy Failsafe', sub: 'Zero-Power Deceleration Skid', color: '#f87171' },
          ],
        };
      case 'sovereign-mesh':
        return {
          title: 'SYSTEM BOUNDARY: SOVEREIGN MESH DISTRIBUTED SMART GRID',
          primary: { role: 'Grid Operator', sub: 'Municipal Power Authority' },
          actors: [
            { role: 'Small Modular Reactor', sub: 'Base-Load SMR Unit', color: '#fbbf24' },
            { role: 'BESS Battery Inverter', sub: 'Sub-Cycle Droop Injection', color: '#10b981' },
            { role: 'Solid-State Switch', sub: '< 8ms Islanding Breaker', color: '#f87171' },
          ],
          useCases: [
            { num: 'UC-1', title: '60 Hz Baseline Sync', sub: 'Bulk Transmission Intertie', color: accentColor },
            { num: 'UC-2', title: 'Autonomous Islanding', sub: '< 8ms Disconnect on Fault', color: '#f87171' },
            { num: 'UC-3', title: 'Synthetic Grid Inertia', sub: 'Sub-Cycle Frequency Droop', color: '#10b981' },
            { num: 'UC-4', title: 'Encrypted P2P LoRa Mesh', sub: 'Teleprotection Packet Fabric', color: '#38bdf8' },
            { num: 'UC-5', title: 'Cryptographic Settlement', sub: 'Ed25519 Energy Accounting', color: '#c084fc' },
          ],
        };
      case 'digitpop':
        return {
          title: 'SYSTEM BOUNDARY: DIGITPOP INTERACTIVE VIDEO RUNTIME',
          primary: { role: 'Video Shopper', sub: 'In-Stream Consumer' },
          actors: [
            { role: 'Merchant Inventory', sub: 'Real-Time Stock Webhook', color: '#c084fc' },
            { role: 'Payment Gateway', sub: 'Apple Pay / Stripe Token', color: '#34d399' },
            { role: 'CDN Edge Stream', sub: 'Low-Latency HLS Manifest', color: '#38bdf8' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Adaptive Video Streaming', sub: 'Hardware WebCodecs Decode', color: accentColor },
            { num: 'UC-2', title: 'Sub-Frame Wasm Tracking', sub: '60 FPS Bounding Box Interpolate', color: '#c084fc' },
            { num: 'UC-3', title: 'Product Card Hover Expand', sub: 'Dynamic Non-Intrusive Overlay', color: '#38bdf8' },
            { num: 'UC-4', title: '1-Click In-Stream Checkout', sub: 'Tokenized Biometric Drawer', color: '#34d399' },
            { num: 'UC-5', title: 'Emit Clickstream Telemetry', sub: 'Sub-Second Attributed Beacon', color: '#fbbf24' },
          ],
        };
      default: // opportunity-os
        return {
          title: 'SYSTEM BOUNDARY: OPPORTUNITY OS CAREER ENGINE & DIGNITY GRAPH',
          primary: { role: 'Student Engineer', sub: 'Capstone Candidate' },
          actors: [
            { role: 'Jeff Boggs (Founder)', sub: '24h Technical Review', color: '#fbbf24' },
            { role: 'GitHub Repositories', sub: 'Source Code & Commit Tree', color: '#38bdf8' },
            { role: 'W3C Credential Issuer', sub: 'Verifiable Capstone Badge', color: '#10b981' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Deconstruct GitHub Commits', sub: 'Tree-Sitter Pattern Parser', color: accentColor },
            { num: 'UC-2', title: 'Embed Skill Vector Graph', sub: 'Multidimensional Competency', color: '#c084fc' },
            { num: 'UC-3', title: 'Dense Pod Requisition Match', sub: 'Cosine Similarity ≥ 0.88', color: '#38bdf8' },
            { num: 'UC-4', title: 'Multimodal AI Interview', sub: 'Blind Rubric Evaluation', color: '#10b981' },
            { num: 'UC-5', title: 'Digital NDA & Repo Access', sub: 'Direct Push Permissions', color: '#fbbf24' },
          ],
        };
    }
  };

  const data = getActorData(systemId);

  return (
    <svg viewBox="0 0 960 480" className="boggs-svg-canvas">
      <defs>
        <linearGradient id="act-boundary" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* System Boundary */}
      <rect x="230" y="25" width="500" height="430" rx="14" fill="url(#act-boundary)" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="250" y="52" fill="#94a3b8" fontSize="11" fontWeight="800" letterSpacing="0.06em">{data.title}</text>

      {/* Primary Human Actor */}
      <g transform="translate(60, 160)">
        <circle cx="45" cy="35" r="20" fill="#1e293b" stroke={accentColor} strokeWidth="2" />
        <line x1="45" y1="55" x2="45" y2="105" stroke={accentColor} strokeWidth="2.5" />
        <line x1="20" y1="75" x2="70" y2="75" stroke={accentColor} strokeWidth="2.5" />
        <line x1="45" y1="105" x2="25" y2="145" stroke={accentColor} strokeWidth="2.5" />
        <line x1="45" y1="105" x2="65" y2="145" stroke={accentColor} strokeWidth="2.5" />
        <text x="45" y="170" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="800">{data.primary.role}</text>
        <text x="45" y="186" textAnchor="middle" fill="#94a3b8" fontSize="10">{data.primary.sub}</text>
      </g>

      {/* Secondary External Actors */}
      {data.actors.map((act, idx) => (
        <g key={idx} transform={`translate(810, ${80 + idx * 115})`}>
          <rect x="0" y="0" width="120" height="70" rx="8" fill="#1e293b" stroke={act.color} strokeWidth="1.5" />
          <text x="60" y="24" textAnchor="middle" fill={act.color} fontSize="11" fontWeight="800">&lt;&lt;Actor&gt;&gt;</text>
          <text x="60" y="42" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700">{act.role}</text>
          <text x="60" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9">{act.sub}</text>
        </g>
      ))}

      {/* Use Cases */}
      {/* UC1 */}
      <ellipse cx="370" cy="115" rx="100" ry="28" fill="#0f172a" stroke={data.useCases[0].color} strokeWidth="1.5" />
      <text x="370" y="112" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[0].num}: {data.useCases[0].title}</text>
      <text x="370" y="127" textAnchor="middle" fill="#94a3b8" fontSize="9">{data.useCases[0].sub}</text>

      {/* UC2 */}
      <ellipse cx="600" cy="115" rx="95" ry="28" fill="#0f172a" stroke={data.useCases[1].color} strokeWidth="1.5" />
      <text x="600" y="112" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[1].num}: {data.useCases[1].title}</text>
      <text x="600" y="127" textAnchor="middle" fill={data.useCases[1].color} fontSize="9">{data.useCases[1].sub}</text>

      {/* UC3 */}
      <ellipse cx="480" cy="225" rx="110" ry="32" fill="#0f172a" stroke={data.useCases[2].color} strokeWidth="1.5" />
      <text x="480" y="221" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[2].num}: {data.useCases[2].title}</text>
      <text x="480" y="237" textAnchor="middle" fill={data.useCases[2].color} fontSize="9">{data.useCases[2].sub}</text>

      {/* UC4 */}
      <ellipse cx="370" cy="340" rx="105" ry="30" fill="#0f172a" stroke={data.useCases[3].color} strokeWidth="1.5" />
      <text x="370" y="336" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[3].num}: {data.useCases[3].title}</text>
      <text x="370" y="352" textAnchor="middle" fill="#94a3b8" fontSize="9">{data.useCases[3].sub}</text>

      {/* UC5 */}
      <ellipse cx="610" cy="340" rx="95" ry="30" fill="#0f172a" stroke={data.useCases[4].color} strokeWidth="1.5" />
      <text x="610" y="336" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[4].num}: {data.useCases[4].title}</text>
      <text x="610" y="352" textAnchor="middle" fill={data.useCases[4].color} fontSize="9">{data.useCases[4].sub}</text>

      {/* Association Lines */}
      <line x1="120" y1="205" x2="275" y2="125" stroke="#64748b" strokeWidth="1.5" />
      <line x1="120" y1="225" x2="370" y2="225" stroke="#64748b" strokeWidth="1.5" />
      <line x1="120" y1="245" x2="270" y2="335" stroke="#64748b" strokeWidth="1.5" />

      <line x1="470" y1="115" x2="505" y2="115" stroke={data.useCases[1].color} strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="810" y1="115" x2="695" y2="115" stroke={data.actors[0].color} strokeWidth="1.5" />
      <line x1="810" y1="230" x2="590" y2="225" stroke={data.actors[1].color} strokeWidth="1.5" />
      <line x1="810" y1="345" x2="705" y2="340" stroke={data.actors[2].color} strokeWidth="1.5" />
    </svg>
  );
};

/* =========================================================================
   DIAGRAM 2: SUBSYSTEM ARCHITECTURE & DATAFLOW
   ========================================================================= */
const SubsystemDiagram: React.FC<{ systemId: string; accentColor: string }> = ({ systemId, accentColor }) => {
  return (
    <svg viewBox="0 0 960 480" className="boggs-svg-canvas">
      <defs>
        <marker id="sub-arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
        </marker>
        <marker id="sub-arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
        </marker>
      </defs>

      {/* Tier 1: Hardware Abstraction & Sensor/Actuator Bus */}
      <g transform="translate(40, 360)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="200" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">TIER 1: PHYSICAL HARDWARE &amp; SENSORS</text>
        
        <rect x="20" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
        <text x="30" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Hardware Transducers &amp; Sensors</text>
        <text x="30" y="66" fill="#94a3b8" fontSize="9">100 kHz Optical • LiDAR • Synchrophasor • Coils</text>

        <rect x="310" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
        <text x="320" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Closed-Loop Actuators &amp; Inverters</text>
        <text x="320" y="66" fill="#94a3b8" fontSize="9">20 kHz Mirrors • Linear Stator • BESS Switches</text>

        <rect x="600" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#f87171" strokeWidth="1" />
        <text x="610" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Hardware Watchdog &amp; Physical E-Stop</text>
        <text x="610" y="66" fill="#f87171" fontSize="9">&lt; 1.5ms Shutter Clamp • Lockstep Relay</text>
      </g>

      {/* Tier 2: Real-Time Control & Safety Supervisor */}
      <g transform="translate(40, 245)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="220" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">TIER 2: REAL-TIME DETERMINISTIC CONTROL</text>

        <rect x="20" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
        <text x="30" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Zero-Copy DMA Ring Buffer / DDS</text>
        <text x="30" y="66" fill="#38bdf8" fontSize="9">Static Memory Arena (Zero Heap Allocations)</text>

        <rect x="310" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke={accentColor} strokeWidth="1" />
        <text x="320" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Deterministic State Supervisor</text>
        <text x="320" y="66" fill="#94a3b8" fontSize="9">1 kHz Closed-Loop Control • SIL-4 Formal Proofs</text>

        <rect x="600" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="1" />
        <text x="610" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Communications &amp; Telemetry Bridge</text>
        <text x="610" y="66" fill="#34d399" fontSize="9">C-V2X (IEEE 1609.2) • QNX IPC • LoRa Mesh</text>
      </g>

      {/* Tier 3: Algorithmic & AI Inference Tier */}
      <g transform="translate(40, 130)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="210" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">TIER 3: AI INFERENCE &amp; PLANNING ENGINE</text>

        <rect x="20" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#c084fc" strokeWidth="1" />
        <text x="30" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Deep Learning Segmentation / BEV Fusion</text>
        <text x="30" y="66" fill="#c084fc" fontSize="9">TensorRT 3D U-Net • Transformer Sensor Model</text>

        <rect x="310" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
        <text x="320" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Spatial &amp; Trajectory Path Planner</text>
        <text x="320" y="66" fill="#94a3b8" fontSize="9">Quintic Polynomial • CBTC Safe-Braking Curve</text>

        <rect x="600" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
        <text x="610" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Digital Twin &amp; Simulation Loop</text>
        <text x="610" y="66" fill="#fbbf24" fontSize="9">Hardware-in-the-Loop (HIL) Test Bench</text>
      </g>

      {/* Tier 4: Operator Cockpit & External Ecosystem */}
      <g transform="translate(40, 15)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="220" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">TIER 4: OPERATOR INTERACTION &amp; AUDIT</text>

        <rect x="20" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
        <text x="30" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Real-Time AR / Cockpit Display</text>
        <text x="30" y="66" fill="#10b981" fontSize="9">60 FPS 4K Low-Latency Surgical &amp; OCC UI</text>

        <rect x="310" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
        <text x="320" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Autonomous Fleet &amp; Grid Dispatch</text>
        <text x="320" y="66" fill="#94a3b8" fontSize="9">Centralized Moving-Block &amp; Intertie Balancing</text>

        <rect x="600" y="34" width="260" height="40" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1" />
        <text x="610" y="52" fill="#ffffff" fontSize="11" fontWeight="700">Cryptographic Audit &amp; Event Ledger</text>
        <text x="610" y="66" fill="#a855f7" fontSize="9">Immutable Failsafe Logs • Black Box Recorder</text>
      </g>

      {/* Data Bus Connection Lines */}
      <line x1="150" y1="360" x2="150" y2="335" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#sub-arrow-blue)" />
      <line x1="150" y1="245" x2="150" y2="220" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#sub-arrow-blue)" />
      <line x1="150" y1="130" x2="150" y2="105" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#sub-arrow-blue)" />

      <line x1="440" y1="130" x2="440" y2="240" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#sub-arrow-amber)" />
      <line x1="440" y1="245" x2="440" y2="355" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#sub-arrow-amber)" />

      <line x1="730" y1="355" x2="730" y2="335" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="730" y1="245" x2="730" y2="105" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
};

/* =========================================================================
   DIAGRAM 3: UML OBJECT-ORIENTED CLASS DIAGRAM & DESIGN PATTERNS
   ========================================================================= */
const UmlClassDiagram: React.FC<{ systemId: string; accentColor: string }> = ({ systemId, accentColor }) => {
  return (
    <svg viewBox="0 0 960 520" className="boggs-svg-canvas">
      <defs>
        <marker id="uml-diamond" viewBox="0 0 16 16" refX="0" refY="8" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <polygon points="0,8 8,0 16,8 8,16" fill="#38bdf8" stroke="#38bdf8" />
        </marker>
        <marker id="uml-triangle" viewBox="0 0 16 16" refX="16" refY="8" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <polygon points="0,0 16,8 0,16" fill="#090e1a" stroke="#cbd5e1" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* Class 1: Interface / Base Controller */}
      <g transform="translate(30, 20)">
        <rect x="0" y="0" width="270" height="190" rx="8" fill="#0d1322" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">&lt;&lt;Interface / HAL&gt;&gt;</text>
        <text x="135" y="36" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="800">ISubsystemController</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        <text x="12" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">+ sample_rate_hz: uint32_t</text>
        <text x="12" y="82" fill="#cbd5e1" fontSize="10" fontFamily="monospace">+ is_armed: atomic&lt;bool&gt;</text>
        <line x1="0" y1="94" x2="270" y2="94" stroke="#334155" strokeWidth="1" />
        <text x="12" y="112" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ calibrate_reference(): bool</text>
        <text x="12" y="130" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ arm_hardware_execution(): Task</text>
        <text x="12" y="148" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ stream_raw_telemetry(): void</text>
        <text x="12" y="166" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ trigger_hardware_estop(): void</text>
      </g>

      {/* Class 2: Concrete Supervisor */}
      <g transform="translate(30, 280)">
        <rect x="0" y="0" width="270" height="210" rx="8" fill="#0d1322" stroke={accentColor} strokeWidth="2" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">&lt;&lt;SystemSupervisor&gt;&gt;</text>
        <text x="135" y="36" textAnchor="middle" fill={accentColor} fontSize="12" fontWeight="800">MasterControllerCore</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        <text x="12" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- hardware_driver: IDriver*</text>
        <text x="12" y="82" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- actuator_set: ActuatorInterface</text>
        <text x="12" y="99" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- operational_state: StateEnum</text>
        <line x1="0" y1="110" x2="270" y2="110" stroke="#334155" strokeWidth="1" />
        <text x="12" y="128" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ calibrate_reference(): bool</text>
        <text x="12" y="146" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ arm_hardware_execution(): Task</text>
        <text x="12" y="164" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ stream_raw_telemetry(): void</text>
        <text x="12" y="182" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ trigger_hardware_estop(): void</text>
      </g>

      {/* Realization Line: MasterControllerCore implements ISubsystemController */}
      <line x1="165" y1="280" x2="165" y2="215" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#uml-triangle)" />
      <text x="175" y="248" fill="#cbd5e1" fontSize="9" fontStyle="italic">&lt;&lt;implements&gt;&gt;</text>

      {/* Class 3: RealTimeRingBuffer (Ring Buffer) */}
      <g transform="translate(360, 20)">
        <rect x="0" y="0" width="270" height="190" rx="8" fill="#0d1322" stroke="#34d399" strokeWidth="1.5" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">&lt;&lt;RingBuffer / DMA&gt;&gt;</text>
        <text x="135" y="36" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="800">DeterministicRingBuffer</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        <text x="12" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- dma_memory_arena: uint8_t*</text>
        <text x="12" y="82" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- head_index: atomic&lt;size_t&gt;</text>
        <text x="12" y="99" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- tail_index: atomic&lt;size_t&gt;</text>
        <line x1="0" y1="110" x2="270" y2="110" stroke="#334155" strokeWidth="1" />
        <text x="12" y="128" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ push_telemetry_batch(): bool</text>
        <text x="12" y="146" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ acquire_gpu_dma_view(): MemView</text>
        <text x="12" y="164" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ reset_buffer_arena(): void</text>
      </g>

      {/* Composition Line: MasterControllerCore composes DeterministicRingBuffer */}
      <path d="M 300 370 L 495 370 L 495 215" fill="none" stroke="#38bdf8" strokeWidth="1.5" markerStart="url(#uml-diamond)" />
      <text x="350" y="362" fill="#38bdf8" fontSize="9">&lt;&lt;composes 1..*&gt;&gt;</text>

      {/* Class 4: Neural/Algorithmic Engine */}
      <g transform="translate(670, 20)">
        <rect x="0" y="0" width="260" height="190" rx="8" fill="#0d1322" stroke="#c084fc" strokeWidth="1.5" />
        <rect x="0" y="0" width="260" height="46" rx="8" fill="#1e293b" />
        <text x="130" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">&lt;&lt;InferenceEngine&gt;&gt;</text>
        <text x="130" y="36" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="800">SpatialInferenceEngine</text>
        <line x1="0" y1="46" x2="260" y2="46" stroke="#334155" strokeWidth="1" />
        <text x="12" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- runtime_context: IRuntime*</text>
        <text x="12" y="82" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- async_stream: StreamHandle</text>
        <text x="12" y="99" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- confidence_cutoff: float = 0.90</text>
        <line x1="0" y1="110" x2="260" y2="110" stroke="#334155" strokeWidth="1" />
        <text x="12" y="128" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ execute_model_inference(): Result</text>
        <text x="12" y="146" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ compute_spatial_score(): f32</text>
      </g>

      <line x1="630" y1="110" x2="665" y2="110" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="635" y="100" fill="#c084fc" fontSize="9">&lt;&lt;uses&gt;&gt;</text>

      {/* Class 5: ClosedLoopActuation */}
      <g transform="translate(360, 280)">
        <rect x="0" y="0" width="270" height="210" rx="8" fill="#0d1322" stroke="#fbbf24" strokeWidth="1.5" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">&lt;&lt;ActuationEngine&gt;&gt;</text>
        <text x="135" y="36" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="800">ClosedLoopActuation</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        <text x="12" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- primary_actuator: MotorAxis</text>
        <text x="12" y="82" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- secondary_actuator: MotorAxis</text>
        <text x="12" y="99" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- pid_parameters: PIDCoefficients</text>
        <line x1="0" y1="110" x2="270" y2="110" stroke="#334155" strokeWidth="1" />
        <text x="12" y="128" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ execute_trajectory_vector(): Report</text>
        <text x="12" y="146" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ read_encoder_feedback(): Telemetry</text>
        <text x="12" y="164" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ emergency_failsafe_clamp(): void</text>
      </g>

      {/* Class 6: HardwareSafetyWatchdog */}
      <g transform="translate(670, 280)">
        <rect x="0" y="0" width="260" height="210" rx="8" fill="#0d1322" stroke="#f87171" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="46" rx="8" fill="#1e293b" />
        <text x="130" y="18" textAnchor="middle" fill="#f87171" fontSize="10" fontStyle="italic">&lt;&lt;SafetyWatchdog / Lockstep&gt;&gt;</text>
        <text x="130" y="36" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="800">HardwareSafetyWatchdog</text>
        <line x1="0" y1="46" x2="260" y2="46" stroke="#334155" strokeWidth="1" />
        <text x="12" y="65" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- dual_channel_pin: GPIOPin[2]</text>
        <text x="12" y="82" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- heartbeat_counter: atomic&lt;u64&gt;</text>
        <text x="12" y="99" fill="#cbd5e1" fontSize="10" fontFamily="monospace">- max_tracking_error: float</text>
        <line x1="0" y1="110" x2="260" y2="110" stroke="#334155" strokeWidth="1" />
        <text x="12" y="128" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ verify_heartbeat_alive(): bool</text>
        <text x="12" y="146" fill="#f87171" fontSize="10" fontFamily="monospace">+ trip_vital_hardware_relay(): void</text>
        <text x="12" y="164" fill="#38bdf8" fontSize="10" fontFamily="monospace">+ log_fault_to_audit_ledger(): void</text>
      </g>

      {/* Supervisory clamp */}
      <line x1="670" y1="380" x2="635" y2="380" stroke="#f87171" strokeWidth="2" />
      <text x="640" y="370" fill="#f87171" fontSize="9" fontWeight="800">&lt;&lt;clamps&gt;&gt;</text>

      {/* Pattern Badge */}
      <g transform="translate(680, 220)">
        <rect x="0" y="0" width="245" height="46" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        <text x="10" y="18" fill="#f59e0b" fontSize="10" fontWeight="800">PATTERN: Fail-Operational Lockstep</text>
        <text x="10" y="34" fill="#cbd5e1" fontSize="9">Zero-alloc loop + secondary core override</text>
      </g>
    </svg>
  );
};

/* =========================================================================
   DIAGRAM 4: SEQUENCE & DETERMINISTIC TIMING VERIFICATION
   ========================================================================= */
const SequenceDiagram: React.FC<{ systemId: string; accentColor: string }> = ({ systemId, accentColor }) => {
  return (
    <svg viewBox="0 0 960 480" className="boggs-svg-canvas">
      <defs>
        <marker id="sq-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
        </marker>
        <marker id="sq-arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
        </marker>
      </defs>

      {/* Lifeline Headers */}
      <g transform="translate(60, 20)">
        <rect x="0" y="0" width="110" height="34" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
        <text x="55" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">Operator / UI</text>
        <line x1="55" y1="34" x2="55" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(230, 20)">
        <rect x="0" y="0" width="120" height="34" rx="6" fill="#1e293b" stroke={accentColor} strokeWidth="1" />
        <text x="60" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">MasterController</text>
        <line x1="60" y1="34" x2="60" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(410, 20)">
        <rect x="0" y="0" width="110" height="34" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="1" />
        <text x="55" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">RingBuffer / DDS</text>
        <line x1="55" y1="34" x2="55" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(580, 20)">
        <rect x="0" y="0" width="120" height="34" rx="6" fill="#1e293b" stroke="#c084fc" strokeWidth="1" />
        <text x="60" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">InferenceEngine</text>
        <line x1="60" y1="34" x2="60" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(760, 20)">
        <rect x="0" y="0" width="130" height="34" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
        <text x="65" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">ActuatorWatchdog</text>
        <line x1="65" y1="34" x2="65" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      {/* Activation Steps */}
      <line x1="115" y1="90" x2="285" y2="90" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="200" y="82" textAnchor="middle" fill="#cbd5e1" fontSize="10">1. initiate_mission_execution()</text>

      <line x1="290" y1="130" x2="460" y2="130" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="375" y="122" textAnchor="middle" fill="#cbd5e1" fontSize="10">2. stream_sensor_dma_frames()</text>

      <rect x="330" y="145" width="220" height="22" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="0.8" />
      <text x="440" y="160" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="700">Real-Time Ingestion Buffer (&lt; 8ms)</text>

      <line x1="465" y1="195" x2="635" y2="195" stroke="#c084fc" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="550" y="187" textAnchor="middle" fill="#c084fc" fontSize="10">3. dispatch_spatial_inference()</text>

      <rect x="530" y="210" width="220" height="22" rx="4" fill="rgba(192, 132, 252, 0.15)" stroke="#c084fc" strokeWidth="0.8" />
      <text x="640" y="225" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="700">Deterministic Model Inference (&lt; 12ms)</text>

      <line x1="640" y1="260" x2="820" y2="260" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="730" y="252" textAnchor="middle" fill="#fbbf24" fontSize="10">4. verify_actuation_parameters()</text>

      <rect x="710" y="280" width="225" height="42" rx="6" fill="#1e293b" stroke="#f87171" strokeWidth="1" />
      <text x="822" y="298" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="800">5. Continuous Hardware Watchdog</text>
      <text x="822" y="314" textAnchor="middle" fill="#cbd5e1" fontSize="9">Clamp Shutter / Relay in &lt; 1.5ms on Fault</text>

      <line x1="825" y1="350" x2="825" y2="390" stroke="#fbbf24" strokeWidth="2" />
      <line x1="825" y1="390" x2="845" y2="390" stroke="#fbbf24" strokeWidth="2" />
      <line x1="845" y1="390" x2="845" y2="365" stroke="#fbbf24" strokeWidth="2" />
      <line x1="845" y1="365" x2="830" y2="365" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#sq-arrow)" />
      <text x="855" y="380" fill="#fbbf24" fontSize="10" fontWeight="700">6. High-Frequency Actuation</text>

      <line x1="825" y1="415" x2="115" y2="415" stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#sq-arrow-green)" />
      <text x="470" y="408" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">7. Operation Verified &amp; Telemetry Streamed to Cockpit</text>
    </svg>
  );
};
