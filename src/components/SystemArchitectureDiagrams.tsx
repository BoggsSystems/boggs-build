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
      <ellipse cx="370" cy="115" rx="100" ry="28" fill="#0f172a" stroke={data.useCases[0].color} strokeWidth="1.5" />
      <text x="370" y="112" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[0].num}: {data.useCases[0].title}</text>
      <text x="370" y="127" textAnchor="middle" fill="#94a3b8" fontSize="9">{data.useCases[0].sub}</text>

      <ellipse cx="600" cy="115" rx="95" ry="28" fill="#0f172a" stroke={data.useCases[1].color} strokeWidth="1.5" />
      <text x="600" y="112" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[1].num}: {data.useCases[1].title}</text>
      <text x="600" y="127" textAnchor="middle" fill={data.useCases[1].color} fontSize="9">{data.useCases[1].sub}</text>

      <ellipse cx="480" cy="225" rx="110" ry="32" fill="#0f172a" stroke={data.useCases[2].color} strokeWidth="1.5" />
      <text x="480" y="221" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[2].num}: {data.useCases[2].title}</text>
      <text x="480" y="237" textAnchor="middle" fill={data.useCases[2].color} fontSize="9">{data.useCases[2].sub}</text>

      <ellipse cx="370" cy="340" rx="105" ry="30" fill="#0f172a" stroke={data.useCases[3].color} strokeWidth="1.5" />
      <text x="370" y="336" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.useCases[3].num}: {data.useCases[3].title}</text>
      <text x="370" y="352" textAnchor="middle" fill="#94a3b8" fontSize="9">{data.useCases[3].sub}</text>

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
   DIAGRAM 2: SUBSYSTEM ARCHITECTURE & DATAFLOW (Bespoke Per System)
   ========================================================================= */
const SubsystemDiagram: React.FC<{ systemId: string; accentColor: string }> = ({ systemId, accentColor }) => {
  const getSubsystemData = (id: string) => {
    switch (id) {
      case 'smart-mohs':
        return {
          tier1Label: 'TIER 1: OPTICAL TRANSDUCERS & LASER ABLATION',
          tier1Blocks: [
            { title: '1310nm Swept-Source & Wasatch Camera', sub: '100 kHz A-Scan Spectral Interference', color: '#38bdf8' },
            { title: 'Thorlabs 20 kHz Dual-Galvo Array', sub: 'Closed-Loop Mirror Vector Steer Setpoints', color: '#fbbf24' },
            { title: 'Fail-Closed Optical Shutter Interlock', sub: '< 1.5ms Magnetic Drop Hardware Clamp', color: '#f87171' },
          ],
          tier2Label: 'TIER 2: REAL-TIME DETERMINISTIC CONTROL',
          tier2Blocks: [
            { title: 'PCIe Gen4 DMA Ring Buffer Arena', sub: 'Zero-Copy Direct GPU Transfer (Zero Heap)', color: '#38bdf8' },
            { title: 'IEC 62304 Class C State Controller', sub: 'Deterministic State & Calibration Verification', color: accentColor },
            { title: 'Lockstep Micro-Core Watchdog Bridge', sub: 'Continuous Position Feedback Telemetry', color: '#34d399' },
          ],
          tier3Label: 'TIER 3: AI INFERENCE & RECONSTRUCTION PIPELINE',
          tier3Blocks: [
            { title: 'CUDA k-Space Resampling & FFT Kernel', sub: '< 8ms Volumetric B-Scan Reconstruction', color: '#c084fc' },
            { title: 'TensorRT 3D U-Net Segmentation Engine', sub: '< 12ms Neoplastic Boundary Prediction', color: '#38bdf8' },
            { title: 'Picosecond Ablation Vector Planner', sub: 'Microscopic Cell Vaporization Trajectories', color: '#fbbf24' },
          ],
          tier4Label: 'TIER 4: SURGEON COCKPIT & AUDIT TRAIL',
          tier4Blocks: [
            { title: 'Real-Time 4K AR Cockpit Display', sub: '60 FPS Low-Latency Overlay with Zero Jitter', color: '#10b981' },
            { title: 'Surgeon Foot-Pedal Arming Interlock', sub: 'Mechanical Dual-Switch Vital Confirmation', color: '#38bdf8' },
            { title: 'Cryptographic Coordinate Audit Ledger', sub: 'Immutable Hash-Chained Surgical Firing Log', color: '#a855f7' },
          ],
        };
      case 'borealis-pods':
        return {
          tier1Label: 'TIER 1: DRIVE-BY-WIRE & PERCEPTION HARDWARE',
          tier1Blocks: [
            { title: '32-Beam Solid-State LiDAR & 4D Radar', sub: 'Multi-Modal Range & Doppler Velocity Arrays', color: '#38bdf8' },
            { title: 'ASIL-D Drive-By-Wire Actuator Rig', sub: 'Dual-Channel Steer & Brake Motor Drivers', color: '#fbbf24' },
            { title: 'Ultra-Wideband (UWB) Antenna Arrays', sub: 'Platform Berth Sub-Centimeter Transceivers', color: '#f87171' },
          ],
          tier2Label: 'TIER 2: REAL-TIME AUTONOMY PLATFORM',
          tier2Blocks: [
            { title: 'ROS 2 DDS Zero-Copy Shared Memory Bus', sub: 'Deterministic Point-Cloud & Video Ingestion', color: '#38bdf8' },
            { title: 'PREEMPT_RT Real-Time Linux Supervisor', sub: 'Dual Lockstep Microcontroller Safety Watchdog', color: accentColor },
            { title: 'Cellular-V2X (C-V2X) Gateway Node', sub: 'IEEE 802.11bd / IEEE 1609.2 Security Link', color: '#34d399' },
          ],
          tier3Label: 'TIER 3: PERCEPTION & TRAJECTORY PLANNING ENGINE',
          tier3Blocks: [
            { title: 'BEV Transformer 3D Sensor Fusion', sub: 'Real-Time Bird-Eye-View Object Tracking (≥30 FPS)', color: '#c084fc' },
            { title: 'Spacetime Quintic Trajectory Planner', sub: 'Dynamic Collision Horizon & Comfort Splines', color: '#38bdf8' },
            { title: 'Municipal SPaT Green-Wave Optimizer', sub: 'Negotiates Zero Stop-and-Go Signal Corridor', color: '#fbbf24' },
          ],
          tier4Label: 'TIER 4: FLEET OPERATIONS & PASSENGER EXPERIENCE',
          tier4Blocks: [
            { title: 'Intermodal Berth UWB Docking Handshake', sub: '< 15 Steps Seamless Maglev Transfer Deck', color: '#10b981' },
            { title: 'Borealis Fleet Central OCC Dispatch', sub: 'Autonomous Headway & Fleet Charge Management', color: '#38bdf8' },
            { title: 'Cabin Biosecurity & Ramp Deployment', sub: 'ADA Step Ramp + Automated 90s UV-C Cycle', color: '#a855f7' },
          ],
        };
      case 'borealis-maglev':
        return {
          tier1Label: 'TIER 1: ELECTROMAGNETIC LEVITATION & PROPULSION',
          tier1Blocks: [
            { title: '32 EMS Magnet Bogie Poles & Inductive Gaps', sub: 'Continuous 15mm Clearance Measurement (1 kHz)', color: '#38bdf8' },
            { title: 'Linear Synchronous Motor (LSM) Inverters', sub: '3-Phase Guideway Stator Booster Coils', color: '#fbbf24' },
            { title: 'Passive Permanent-Magnet Eddy-Current Skids', sub: 'Zero-Power Aerodynamic Deceleration Failsafe', color: '#f87171' },
          ],
          tier2Label: 'TIER 2: SIL-4 CERTIFIED FLIGHT AVIONICS',
          tier2Blocks: [
            { title: 'Triple Modular Redundant (TMR) Rust Cores', sub: '2-out-of-3 Hardware Majority Voter in Lockstep', color: '#38bdf8' },
            { title: 'Hard Real-Time 1 kHz QNX IPC Microkernel', sub: 'Zero Heap Allocations • Type-State Levitation', color: accentColor },
            { title: 'CBTC Wireless Moving-Block Radios', sub: 'IEEE 1474 Continuous Safe Braking Telemetry', color: '#34d399' },
          ],
          tier3Label: 'TIER 3: TRAIN PROTECTION & DYNAMIC SPEED CONTROL',
          tier3Blocks: [
            { title: 'SIL-4 Moving-Block Automatic Train Protection', sub: 'Enforces Collision-Free Safe Headways at 500 km/h', color: '#c084fc' },
            { title: 'LSM Guideway Phase Handover Dispatcher', sub: 'Synchronizes Capsule Velocity to Stator Blocks', color: '#38bdf8' },
            { title: 'Guideway Concrete Tube Pylon Telemetry', sub: 'Fiber Strain Gauges & Seismic Drift Observers', color: '#fbbf24' },
          ],
          tier4Label: 'TIER 4: CAPSULE LIFE SUPPORT & FLEET DISPATCH',
          tier4Blocks: [
            { title: 'Cabin Atmospheric Pressure Regulator', sub: 'Maintains 101.3 kPa Envelope in Evacuated Tube', color: '#10b981' },
            { title: 'Regenerative Grid Power Deceleration', sub: 'Recovers 88% Kinetic Energy back to Storage', color: '#38bdf8' },
            { title: 'Central OCC High-Speed Rail Dispatch', sub: 'Cross-Platform Handshake with Borealis Pods', color: '#a855f7' },
          ],
        };
      case 'sovereign-mesh':
        return {
          tier1Label: 'TIER 1: DISTRIBUTED GENERATION & INVERTERS',
          tier1Blocks: [
            { title: 'Synchrophasor PMU & Phase Transducers', sub: '4800 Samples/sec Voltage & Current Phasors', color: '#38bdf8' },
            { title: 'Solid-State Battery BESS Bidirectional Inverters', sub: 'Sub-Cycle Four-Quadrant Reactive Injection', color: '#fbbf24' },
            { title: 'Substation Solid-State Transfer Breaker', sub: '< 8ms Fast Autonomous Islanding Trip', color: '#f87171' },
          ],
          tier2Label: 'TIER 2: SUB-CYCLE DETERMINISTIC FREQUENCY CONTROL',
          tier2Blocks: [
            { title: '250µs Wavelet Frequency Anomaly Detector', sub: 'Detects Bulk Grid Loss of Mains within < 4ms', color: '#38bdf8' },
            { title: 'Frequency Droop Synthetic Inertia Controller', sub: 'Arrests Rate of Change of Frequency (RoCoF)', color: accentColor },
            { title: 'Encrypted Multi-Hop 915 MHz LoRa Mesh Node', sub: 'Teleprotection Packet Fabric without Internet', color: '#34d399' },
          ],
          tier3Label: 'TIER 3: POWER BALANCING & ARBITRAGE ENGINES',
          tier3Blocks: [
            { title: 'Dynamic Microgrid Island Power Balancer', sub: 'Autonomous SMR, Solar & Storage Load Match', color: '#c084fc' },
            { title: 'Algorithmic Priority Load-Shedding Matrix', sub: 'Guarantees Transit & Hospitals during Grid Loss', color: '#38bdf8' },
            { title: 'Real-Time Locational Marginal Pricing Engine', sub: 'Predictive 24h Battery Arbitrage Dispatch', color: '#fbbf24' },
          ],
          tier4Label: 'TIER 4: ENERGY ACCOUNTING & OPERATOR GOVERNANCE',
          tier4Blocks: [
            { title: 'FIPS 140-3 Hardware Security Module (HSM)', sub: 'Cryptographically Signs Curtailment & Disconnect', color: '#10b981' },
            { title: 'Ed25519 Energy Settlement Ledger', sub: 'Audited P2P Kilowatt-Hour Micro-Trading Records', color: '#38bdf8' },
            { title: 'Zero-Crossing Phase Synchronization Bridge', sub: 'Seamless Microgrid Reconnection to Primary Grid', color: '#a855f7' },
          ],
        };
      case 'digitpop':
        return {
          tier1Label: 'TIER 1: MEDIA INGESTION & CLIENT RUNTIME',
          tier1Blocks: [
            { title: 'HTML5 Video & W3C WebCodecs API', sub: 'Hardware-Accelerated GPU Video Decoder', color: '#c084fc' },
            { title: 'Low-Latency HLS (LL-HLS) Stream Buffer', sub: 'Adaptive Bitrate CDN Fragment Ingestion', color: '#38bdf8' },
            { title: 'Graceful Fallback DOM Renderer', sub: 'Automatic SVG Fallback for Legacy Browsers', color: '#34d399' },
          ],
          tier2Label: 'TIER 2: SPATIAL MOTION & FRAME SYNCHRONIZATION CORE',
          tier2Blocks: [
            { title: 'WebAssembly Optical Flow Module (C++/Rust)', sub: 'Sub-Frame Bounding Box Interpolator (< 8ms Drift)', color: '#c084fc' },
            { title: 'Affine Camera Motion Compensator Matrix', sub: 'Real-Time Transformation for Pan / Tilt / Zoom', color: accentColor },
            { title: 'Presentation Timestamp (PTS) Event Bus', sub: 'Microsecond Video Time to Hotspot Sync', color: '#38bdf8' },
          ],
          tier3Label: 'TIER 3: INTERACTIVE HOTSPOT & RENDERING ENGINE',
          tier3Blocks: [
            { title: 'WebGL 2D/3D Hardware-Accelerated Overlay', sub: 'Smooth 60 FPS Clickable Anchor Canvas', color: '#38bdf8' },
            { title: 'Flyweight Pattern Hotspot Cache Pool', sub: 'Recycled Instances with Zero GC Frame Drops', color: '#fbbf24' },
            { title: 'Dynamic Product Preview Card Drawer', sub: 'Non-Intrusive Drawer Expanding Over Video', color: '#10b981' },
          ],
          tier4Label: 'TIER 4: COMMERCE CHECKOUT & ATTRIBUTION GATEWAY',
          tier4Blocks: [
            { title: '1-Click In-Stream Tokenized Checkout Bridge', sub: 'Apple Pay, Google Pay & Stripe Elements Isolation', color: '#34d399' },
            { title: 'Real-Time Merchant Inventory Webhook', sub: 'Sub-Second Stock Sync (Shopify / Custom ATS)', color: '#c084fc' },
            { title: 'Sub-Second Attribution Analytics Beacon', sub: 'Clickstream & Hover Telemetry Ingestion', color: '#a855f7' },
          ],
        };
      default: // opportunity-os
        return {
          tier1Label: 'TIER 1: SOURCE INGESTION & CODE PARSING PIPELINE',
          tier1Blocks: [
            { title: 'Tree-Sitter AST & Semantic Git Parser', sub: 'Deconstructs Commits, Pull Requests & Architecture', color: '#38bdf8' },
            { title: 'GitHub Enterprise API Repository Scanner', sub: 'Extracts Code Contributions & Test Suites', color: '#fbbf24' },
            { title: 'Blind Evaluation Masking Filter', sub: 'Sanitizes PII & Eliminates Algorithmic Bias', color: '#10b981' },
          ],
          tier2Label: 'TIER 2: SEMANTIC KNOWLEDGE GRAPH CORE',
          tier2Blocks: [
            { title: '1536-Dimensional Skill Vector Embeddings', sub: 'Dense Competency Mapping Across C++, Rust, TS', color: '#c084fc' },
            { title: 'Qdrant Vector Database Dense Search Index', sub: 'Sub-45ms Cosine Similarity Matching Query', color: accentColor },
            { title: 'Graph Centrality & Competency Scorer', sub: 'Hierarchical Software Architecture Profiling', color: '#38bdf8' },
          ],
          tier3Label: 'TIER 3: EVALUATION SANDBOX & AI INTERVIEWER',
          tier3Blocks: [
            { title: 'Docker Micro-Container Execution Sandbox', sub: 'Isolated Real-Time Code Execution & Unit Tests', color: '#38bdf8' },
            { title: 'Multimodal AI Technical Interview Supervisor', sub: 'Standardized Rubric Evaluation without Human Bias', color: '#fbbf24' },
            { title: 'Automated Skill Gap Analysis Engine', sub: 'Recommends Specific Capstone Prep Tasks', color: '#c084fc' },
          ],
          tier4Label: 'TIER 4: CAPSTONE POD DISPATCH & CREDENTIALS',
          tier4Blocks: [
            { title: 'Founder Fast-Track Review Dispatch (24h)', sub: 'Direct Architectural Review by Jeff Boggs', color: '#10b981' },
            { title: 'Mutual Digital NDA & IP Signing Engine', sub: 'Immediate Git Push Permissions Provisioned', color: '#38bdf8' },
            { title: 'W3C Verifiable Credential Cryptographic Issuer', sub: 'Tamper-Evident Digital Capstone Project Badges', color: '#a855f7' },
          ],
        };
    }
  };

  const data = getSubsystemData(systemId);

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

      {/* Tier 1 */}
      <g transform="translate(40, 360)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="260" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">{data.tier1Label}</text>
        
        {data.tier1Blocks.map((b, idx) => (
          <g key={idx} transform={`translate(${20 + idx * 290}, 34)`}>
            <rect x="0" y="0" width="260" height="40" rx="6" fill="#1e293b" stroke={b.color} strokeWidth="1" />
            <text x="10" y="18" fill="#ffffff" fontSize="11" fontWeight="700">{b.title}</text>
            <text x="10" y="32" fill="#94a3b8" fontSize="9">{b.sub}</text>
          </g>
        ))}
      </g>

      {/* Tier 2 */}
      <g transform="translate(40, 245)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="260" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">{data.tier2Label}</text>

        {data.tier2Blocks.map((b, idx) => (
          <g key={idx} transform={`translate(${20 + idx * 290}, 34)`}>
            <rect x="0" y="0" width="260" height="40" rx="6" fill="#1e293b" stroke={b.color} strokeWidth="1" />
            <text x="10" y="18" fill="#ffffff" fontSize="11" fontWeight="700">{b.title}</text>
            <text x="10" y="32" fill={idx === 0 ? '#38bdf8' : '#94a3b8'} fontSize="9">{b.sub}</text>
          </g>
        ))}
      </g>

      {/* Tier 3 */}
      <g transform="translate(40, 130)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="260" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">{data.tier3Label}</text>

        {data.tier3Blocks.map((b, idx) => (
          <g key={idx} transform={`translate(${20 + idx * 290}, 34)`}>
            <rect x="0" y="0" width="260" height="40" rx="6" fill="#1e293b" stroke={b.color} strokeWidth="1" />
            <text x="10" y="18" fill="#ffffff" fontSize="11" fontWeight="700">{b.title}</text>
            <text x="10" y="32" fill={idx === 0 ? '#c084fc' : '#94a3b8'} fontSize="9">{b.sub}</text>
          </g>
        ))}
      </g>

      {/* Tier 4 */}
      <g transform="translate(40, 15)">
        <rect x="0" y="0" width="880" height="85" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="0" y="0" width="260" height="24" rx="4" fill="#1e293b" />
        <text x="12" y="16" fill="#94a3b8" fontSize="10" fontWeight="800">{data.tier4Label}</text>

        {data.tier4Blocks.map((b, idx) => (
          <g key={idx} transform={`translate(${20 + idx * 290}, 34)`}>
            <rect x="0" y="0" width="260" height="40" rx="6" fill="#1e293b" stroke={b.color} strokeWidth="1" />
            <text x="10" y="18" fill="#ffffff" fontSize="11" fontWeight="700">{b.title}</text>
            <text x="10" y="32" fill={idx === 0 ? '#10b981' : '#94a3b8'} fontSize="9">{b.sub}</text>
          </g>
        ))}
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
  const getUmlClasses = (id: string) => {
    switch (id) {
      case 'smart-mohs':
        return {
          c1: { title: 'IScannerSubsystem', st: '<<Interface / HAL>>', m: ['+ calibrate_reference_arm(): bool', '+ arm_raster_scan(): TaskHandle', '+ stream_raw_fringes(): void'], a: ['+ sample_rate_hz: uint32_t', '+ is_armed: atomic<bool>'] },
          c2: { title: 'VolumetricScanner', st: '<<HardwareController>>', m: ['+ arm_raster_scan(): TaskHandle', '+ stream_raw_fringes(): void', '+ trigger_hardware_estop(): void'], a: ['- spectrometer_dev: ISpectrometer*', '- galvo_driver: GalvoHardwareInterface', '- scan_bounds: SpatialBBox3D'] },
          c3: { title: 'OctDataBuffer', st: '<<RingBuffer / DMA>>', m: ['+ push_fringe_batch(): bool', '+ acquire_gpu_view(): CudaStreamView', '+ reset_buffer(): void'], a: ['- dma_ring_buffer: uint16_t*', '- head_idx: atomic<size_t>', '- tail_idx: atomic<size_t>'] },
          c4: { title: 'AiMarginPredictor', st: '<<InferenceEngine>>', m: ['+ segment_3d_volume(): MarginMesh', '+ compute_cell_preservation(): f32'], a: ['- trt_runtime: IRuntime*', '- cuda_stream: cudaStream_t', '- confidence_threshold: 0.92'] },
          c5: { title: 'GalvoLaserController', st: '<<ActuationEngine>>', m: ['+ execute_ablation(): Report', '+ verify_position_feedback(): Telemetry', '+ emergency_shutter_clamp(): void'], a: ['- mirror_x: ClosedLoopGalvo', '- mirror_y: ClosedLoopGalvo', '- laser_qswitch: PulseSource'] },
          c6: { title: 'SafetyInterlockWatchdog', st: '<<SafetyMonitor>>', m: ['+ verify_heartbeat(): bool', '+ clamp_shutter_hardware(): void', '+ register_fault(): void'], a: ['- dual_shutter_pin: GPIOPin[2]', '- heartbeat: atomic<u64>', '- max_tracking_err: 4.0 um'] },
          pattern: 'PATTERN: Double-Buffered DMA Arena',
          patternDesc: 'Zero-copy static memory arena in 20 kHz loop',
        };
      case 'borealis-pods':
        return {
          c1: { title: 'IVehicleMotionControl', st: '<<Interface / HAL>>', m: ['+ dispatch_trajectory(): void', '+ engage_failsafe_stop(): void', '+ read_wheel_odometry(): Pose2D'], a: ['+ pod_id: PodIdentifier', '+ is_autonomous_active: bool'] },
          c2: { title: 'RoadPodMasterController', st: '<<VehicleSupervisor>>', m: ['+ dispatch_trajectory(): void', '+ execute_minimum_risk_stop(): void', '+ update_kinematics(): void'], a: ['- dbw_actuator: IDriveByWire*', '- active_mission: MissionPlan', '- asil_watchdog: ASIL_D_Watchdog'] },
          c3: { title: 'PerceptionPipeline', st: '<<SensorFusionEngine>>', m: ['+ fuse_sensor_frames(): WorldModel3D', '+ predict_obstacle_intent(): VelocityProfile', '+ flag_hazards(): HazardMask'], a: ['- lidar_sub: ros2::Subscriber', '- camera_rig: CameraRig<8>', '- tracked_objects: ObjectTable'] },
          c4: { title: 'SpacetimePathPlanner', st: '<<TrajectoryPlanner>>', m: ['+ plan_quintic_spline(): Trajectory', '+ check_collision_horizon(): bool'], a: ['- costmap_layer: Costmap3D', '- max_lateral_accel_g: 0.25', '- collision_horizon_sec: 4.0'] },
          c5: { title: 'V2XCorridorAgent', st: '<<ProtocolHandler>>', m: ['+ ingest_spat_message(): void', '+ negotiate_platoon_slot(): Slot', '+ request_signal_priority(): bool'], a: ['- cv2x_device: CV2XHardware', '- security_store: CertStore', '- green_wave_target_speed: f32'] },
          c6: { title: 'UwbPrecisionBerthingModule', st: '<<DockingController>>', m: ['+ acquire_berth_anchors(): bool', '+ compute_docking_vector(): Pose3D', '+ lock_platform_brake(): void'], a: ['- uwb_antennas: UwbTransceiver[4]', '- target_dock: PlatformBerthID', '- tolerance_mm: 12.0'] },
          pattern: 'PATTERN: Fail-Operational Dual Lockstep',
          patternDesc: 'Secondary core assumes steering on fault',
        };
      case 'borealis-maglev':
        return {
          c1: { title: 'IFlightControlSupervisor', st: '<<Interface / SIL-4>>', m: ['+ execute_control_cycle_1khz(): Vote', '+ deploy_eddy_brake(): void', '+ stream_telemetry_to_occ(): void'], a: ['+ capsule_velocity_mps: f64', '+ target_gap_mm: f32 = 15.0'] },
          c2: { title: 'FlightComputer', st: '<<TripleModularRedundant>>', m: ['+ execute_control_cycle_1khz(): Vote', '+ dispatch_bogie_power(): Result', '+ trigger_eddy_brake(): void'], a: ['- vote_channel_a: QnxIpcChannel', '- vote_channel_b: QnxIpcChannel', '- vote_channel_c: QnxIpcChannel'] },
          c3: { title: 'GapControlSubsystem', st: '<<HardRealTimeActuator>>', m: ['+ read_gap_sensors(): [f32; 32]', '+ calculate_pid_flux(): [f32; 32]', '+ assert_thermal_limits(): Result'], a: ['- gap_sensors: [GapSensor; 32]', '- ems_choppers: [HBridge; 32]', '- target_clearance: 15.0mm'] },
          c4: { title: 'OccMovingBlockATP', st: '<<AutomaticTrainProtection>>', m: ['+ verify_movement_authority(): bool', '+ enforce_dynamic_speed(): void', '+ trip_vital_relay(): void'], a: ['- movement_authority: Authority', '- transponder_id: u32', '- safe_braking_distance_m: f32'] },
          c5: { title: 'GuidewayPylonIoT', st: '<<InfrastructureTelemetry>>', m: ['+ sample_structural_health(): Report', '+ flag_guideway_leak(): bool'], a: ['- pylon_index: u32', '- vacuum_pressure_pa: f32', '- strain_tension_mpa: f32'] },
          c6: { title: 'EddyCurrentFailsafeBrake', st: '<<PassiveFailsafe>>', m: ['+ release_permanent_skids(): void', '+ verify_brake_deceleration(): f32'], a: ['- mechanical_retention_latch: Pin', '- decel_force_kn: f32 = 180.0', '- thermal_dissipation: HeatSink'] },
          pattern: 'PATTERN: Triple Modular Redundancy (TMR)',
          patternDesc: '2-out-of-3 majority voting across 3 Rust cores',
        };
      case 'sovereign-mesh':
        return {
          c1: { title: 'IGridEdgeNodeController', st: '<<Interface / SEP2.0>>', m: ['+ sample_phasors(): PhasorMeasurement', '+ dispatch_inverter_curtailment(): void', '+ initiate_island_disconnect(): bool'], a: ['+ node_uuid: GridNodeUuid', '+ is_islanded: bool'] },
          c2: { title: 'GridEdgeNode', st: '<<AutonomousAgent>>', m: ['+ sample_phasors(): PhasorMeasurement', '+ initiate_island_disconnect(): bool', '+ broadcast_mesh_telemetry(): void'], a: ['- droop_controller: DroopController', '- bms_bridge: BmsBridge', '- mesh_router: PeerMeshRouter'] },
          c3: { title: 'FrequencyDroopController', st: '<<SubCycleController>>', m: ['+ compute_reactive_injection(): Setpoint', '+ trigger_synthetic_inertia(): void'], a: ['- nominal_frequency_hz: 60.0', '- droop_slope: 4.0%', '- sampling_interval_us: 250'] },
          c4: { title: 'BmsTelemetryBridge', st: '<<BatterySupervisor>>', m: ['+ query_cell_voltages(): VoltTable', '+ enforce_soc_limits(): bool'], a: ['- inverter_interface: ModbusTCP', '- battery_capacity_kwh: f64', '- max_charge_rate_kw: f64'] },
          c5: { title: 'PeerMeshRouter', st: '<<FaultTolerantNetworking>>', m: ['+ forward_teleprotection(): void', '+ elect_mesh_cluster_leader(): NodeId', '+ audit_energy_settlement(): Hash'], a: ['- active_peers: HashMap<NodeId, Cost>', '- fallback_lora: LoRaTransceiver', '- signature_key: Ed25519Key'] },
          c6: { title: 'ByzantineConsensusSettlement', st: '<<AuditedAccounting>>', m: ['+ verify_kwh_transfer_signature(): bool', '+ append_immutable_block(): HashDigest'], a: ['- merkle_tree_root: HashDigest', '- hsm_slot_index: u32', '- settlement_epoch_sec: 900'] },
          pattern: 'PATTERN: Consensus-Free Local Optimization',
          patternDesc: '< 2ms sub-cycle local droop without consensus',
        };
      case 'digitpop':
        return {
          c1: { title: 'IShoppableVideoPlayer', st: '<<Interface / WebSDK>>', m: ['+ attach_to_dom_container(): void', '+ load_interactive_manifest(): Promise<void>', '+ open_quick_checkout(): void'], a: ['+ version: string = "2.9.0"', '+ is_playing: boolean'] },
          c2: { title: 'ShoppableVideoPlayer', st: '<<PlayerRuntime>>', m: ['+ attach_to_dom_container(): void', '+ load_interactive_manifest(): Promise<void>', '+ register_hotspot_click(): void'], a: ['- video_element: HTMLVideoElement', '- overlay_canvas: HTMLCanvasElement', '- wasm_tracker: SpatialTracker'] },
          c3: { title: 'SpatialProductTracker', st: '<<WasmEngine>>', m: ['+ interpolate_bounding_box(): BBox2D', '+ apply_camera_compensation(): void'], a: ['- wasm_memory: WebAssembly.Memory', '- keyframe_table: KeyframeArray', '- optical_flow_matrix: Float32Array'] },
          c4: { title: 'FrameMetadataSync', st: '<<TimeSyncCoordinator>>', m: ['+ sync_video_time_pts(): number', '+ lookup_active_hotspots(): Hotspot[]'], a: ['- presentation_clock: PerformanceClock', '- drift_threshold_ms: 8.0', '- active_manifest: VideoManifest'] },
          c5: { title: 'CheckoutCartBridge', st: '<<PaymentCoordinator>>', m: ['+ initiate_instant_purchase(): Promise<Order>', '+ tokenize_credentials(): boolean'], a: ['- stripe_elements: StripeInstance', '- digital_wallet: ApplePaySession', '- cart_session: CartState'] },
          c6: { title: 'RealtimeAnalyticsBeacon', st: '<<TelemetryDispatcher>>', m: ['+ emit_hover_beacon(): void', '+ emit_conversion_event(): void'], a: ['- beacon_endpoint: string', '- session_uuid: string', '- buffer_queue: TelemetryEvent[]'] },
          pattern: 'PATTERN: Flyweight Hotspot Recycling Pool',
          patternDesc: 'Reuses canvas objects to eliminate GC pauses',
        };
      default: // opportunity-os
        return {
          c1: { title: 'ICandidateProfileGraph', st: '<<Interface / TalentGraph>>', m: ['+ ingest_github_repository(): Promise<Score>', '+ compute_graph_centrality(): Map<Tag, f32>', '+ export_blind_profile(): SanitizedView'], a: ['+ candidate_id: CandidateUuid', '+ is_verified: boolean'] },
          c2: { title: 'CandidateProfileGraph', st: '<<EntityGraph>>', m: ['+ ingest_github_repository(): Promise<Score>', '+ generate_skill_vector(): Float32Array', '+ export_blind_profile(): SanitizedView'], a: ['- skill_vector_embedding: Float32[1536]', '- verified_credentials: Credential[]', '- git_metrics: ContributionScore'] },
          c3: { title: 'SemanticVectorMatcher', st: '<<MatchingEngine>>', m: ['+ rank_candidates_for_pod(): Promise<Ranked[]>', '+ calculate_skill_gap(): SkillGapReport'], a: ['- vector_index: QdrantVectorStore', '- similarity_threshold: 0.85', '- top_k: number = 10'] },
          c4: { title: 'ResumeDeconstructionPipeline', st: '<<ParserEngine>>', m: ['+ parse_ast_patterns(): SyntaxAnalysis', '+ sanitize_demographic_pii(): void'], a: ['- tree_sitter_parser: TreeSitter', '- anonymization_rules: RegexFilter[]'] },
          c5: { title: 'InterviewSimulator', st: '<<AgentWorkflow>>', m: ['+ start_coding_session(): Session', '+ evaluate_code_execution(): TestResult', '+ compile_rubric_feedback(): Report'], a: ['- llm_supervisor: AgentSupervisor', '- scoring_rubric: RubricModel', '- docker_sandbox: SandboxHandle'] },
          c6: { title: 'VerifiableCredentialIssuer', st: '<<TrustAnchor>>', m: ['+ issue_capstone_badge(): SignedCredential', '+ verify_tamper_evidence(): boolean'], a: ['- ed25519_signing_key: CryptoKey', '- w3c_context_url: string', '- registry_endpoint: string'] },
          pattern: 'PATTERN: Hexagonal Architecture (Ports & Adapters)',
          patternDesc: 'Decouples core matching from external enterprise ATS',
        };
    }
  };

  const data = getUmlClasses(systemId);

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

      {/* Class 1 */}
      <g transform="translate(30, 20)">
        <rect x="0" y="0" width="270" height="190" rx="8" fill="#0d1322" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">{data.c1.st}</text>
        <text x="135" y="36" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="800">{data.c1.title}</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        {data.c1.a.map((attr, idx) => (
          <text key={idx} x="12" y={65 + idx * 17} fill="#cbd5e1" fontSize="10" fontFamily="monospace">{attr}</text>
        ))}
        <line x1="0" y1="94" x2="270" y2="94" stroke="#334155" strokeWidth="1" />
        {data.c1.m.map((mth, idx) => (
          <text key={idx} x="12" y={112 + idx * 18} fill="#38bdf8" fontSize="10" fontFamily="monospace">{mth}</text>
        ))}
      </g>

      {/* Class 2 */}
      <g transform="translate(30, 280)">
        <rect x="0" y="0" width="270" height="210" rx="8" fill="#0d1322" stroke={accentColor} strokeWidth="2" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">{data.c2.st}</text>
        <text x="135" y="36" textAnchor="middle" fill={accentColor} fontSize="12" fontWeight="800">{data.c2.title}</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        {data.c2.a.map((attr, idx) => (
          <text key={idx} x="12" y={65 + idx * 17} fill="#cbd5e1" fontSize="10" fontFamily="monospace">{attr}</text>
        ))}
        <line x1="0" y1="110" x2="270" y2="110" stroke="#334155" strokeWidth="1" />
        {data.c2.m.map((mth, idx) => (
          <text key={idx} x="12" y={128 + idx * 18} fill="#38bdf8" fontSize="10" fontFamily="monospace">{mth}</text>
        ))}
      </g>

      {/* Realization Line: C2 implements C1 */}
      <line x1="165" y1="280" x2="165" y2="215" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#uml-triangle)" />
      <text x="175" y="248" fill="#cbd5e1" fontSize="9" fontStyle="italic">&lt;&lt;implements&gt;&gt;</text>

      {/* Class 3 */}
      <g transform="translate(360, 20)">
        <rect x="0" y="0" width="270" height="190" rx="8" fill="#0d1322" stroke="#34d399" strokeWidth="1.5" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">{data.c3.st}</text>
        <text x="135" y="36" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="800">{data.c3.title}</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        {data.c3.a.map((attr, idx) => (
          <text key={idx} x="12" y={65 + idx * 17} fill="#cbd5e1" fontSize="10" fontFamily="monospace">{attr}</text>
        ))}
        <line x1="0" y1="110" x2="270" y2="110" stroke="#334155" strokeWidth="1" />
        {data.c3.m.map((mth, idx) => (
          <text key={idx} x="12" y={128 + idx * 18} fill="#38bdf8" fontSize="10" fontFamily="monospace">{mth}</text>
        ))}
      </g>

      {/* Composition: C2 composes C3 */}
      <path d="M 300 370 L 495 370 L 495 215" fill="none" stroke="#38bdf8" strokeWidth="1.5" markerStart="url(#uml-diamond)" />
      <text x="350" y="362" fill="#38bdf8" fontSize="9">&lt;&lt;composes 1..*&gt;&gt;</text>

      {/* Class 4 */}
      <g transform="translate(670, 20)">
        <rect x="0" y="0" width="260" height="190" rx="8" fill="#0d1322" stroke="#c084fc" strokeWidth="1.5" />
        <rect x="0" y="0" width="260" height="46" rx="8" fill="#1e293b" />
        <text x="130" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">{data.c4.st}</text>
        <text x="130" y="36" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="800">{data.c4.title}</text>
        <line x1="0" y1="46" x2="260" y2="46" stroke="#334155" strokeWidth="1" />
        {data.c4.a.map((attr, idx) => (
          <text key={idx} x="12" y={65 + idx * 17} fill="#cbd5e1" fontSize="10" fontFamily="monospace">{attr}</text>
        ))}
        <line x1="0" y1="110" x2="260" y2="110" stroke="#334155" strokeWidth="1" />
        {data.c4.m.map((mth, idx) => (
          <text key={idx} x="12" y={128 + idx * 18} fill="#38bdf8" fontSize="10" fontFamily="monospace">{mth}</text>
        ))}
      </g>

      <line x1="630" y1="110" x2="665" y2="110" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="635" y="100" fill="#c084fc" fontSize="9">&lt;&lt;uses&gt;&gt;</text>

      {/* Class 5 */}
      <g transform="translate(360, 280)">
        <rect x="0" y="0" width="270" height="210" rx="8" fill="#0d1322" stroke="#fbbf24" strokeWidth="1.5" />
        <rect x="0" y="0" width="270" height="46" rx="8" fill="#1e293b" />
        <text x="135" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">{data.c5.st}</text>
        <text x="135" y="36" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="800">{data.c5.title}</text>
        <line x1="0" y1="46" x2="270" y2="46" stroke="#334155" strokeWidth="1" />
        {data.c5.a.map((attr, idx) => (
          <text key={idx} x="12" y={65 + idx * 17} fill="#cbd5e1" fontSize="10" fontFamily="monospace">{attr}</text>
        ))}
        <line x1="0" y1="110" x2="270" y2="110" stroke="#334155" strokeWidth="1" />
        {data.c5.m.map((mth, idx) => (
          <text key={idx} x="12" y={128 + idx * 18} fill="#38bdf8" fontSize="10" fontFamily="monospace">{mth}</text>
        ))}
      </g>

      {/* Class 6 */}
      <g transform="translate(670, 280)">
        <rect x="0" y="0" width="260" height="210" rx="8" fill="#0d1322" stroke="#f87171" strokeWidth="2" />
        <rect x="0" y="0" width="260" height="46" rx="8" fill="#1e293b" />
        <text x="130" y="18" textAnchor="middle" fill="#f87171" fontSize="10" fontStyle="italic">{data.c6.st}</text>
        <text x="130" y="36" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="800">{data.c6.title}</text>
        <line x1="0" y1="46" x2="260" y2="46" stroke="#334155" strokeWidth="1" />
        {data.c6.a.map((attr, idx) => (
          <text key={idx} x="12" y={65 + idx * 17} fill="#cbd5e1" fontSize="10" fontFamily="monospace">{attr}</text>
        ))}
        <line x1="0" y1="110" x2="260" y2="110" stroke="#334155" strokeWidth="1" />
        {data.c6.m.map((mth, idx) => (
          <text key={idx} x="12" y={128 + idx * 18} fill={idx === 1 ? '#f87171' : '#38bdf8'} fontSize="10" fontFamily="monospace">{mth}</text>
        ))}
      </g>

      {/* Supervisory Connection */}
      <line x1="670" y1="380" x2="635" y2="380" stroke="#f87171" strokeWidth="2" />
      <text x="640" y="370" fill="#f87171" fontSize="9" fontWeight="800">&lt;&lt;clamps&gt;&gt;</text>

      {/* Pattern Badge */}
      <g transform="translate(680, 220)">
        <rect x="0" y="0" width="250" height="46" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        <text x="10" y="18" fill="#f59e0b" fontSize="10" fontWeight="800">{data.pattern}</text>
        <text x="10" y="34" fill="#cbd5e1" fontSize="9">{data.patternDesc}</text>
      </g>
    </svg>
  );
};

/* =========================================================================
   DIAGRAM 4: SEQUENCE & DETERMINISTIC TIMING VERIFICATION (Bespoke Per System)
   ========================================================================= */
const SequenceDiagram: React.FC<{ systemId: string; accentColor: string }> = ({ systemId, accentColor }) => {
  const getSequenceData = (id: string) => {
    switch (id) {
      case 'smart-mohs':
        return {
          l1: 'Mohs Surgeon', l2: 'VolumetricScanner', l3: 'OctDataBuffer', l4: 'AiMarginPredictor', l5: 'GalvoLaser',
          s1: '1. arm_raster_scan(volume_grid)',
          s2: '2. stream_raw_fringes() (100 kHz DMA)',
          t1: 'CUDA k-space FFT Resampling (< 8ms)',
          s3: '3. segment_3d_volume(vol_buffer)',
          t2: 'TensorRT 3D U-Net Inference (< 12ms)',
          s4: '4. execute_ablation_vector(traj)',
          s5Title: '5. Continuous Watchdog Heartbeat',
          s5Sub: 'Clamp Shutter in < 1.5ms if tracking err > 4um',
          s6: '6. 20 kHz Picosecond Pulses',
          s7: '7. Clean Histological Margin Verified ➔ 4K Overlay Display',
        };
      case 'borealis-pods':
        return {
          l1: 'Passenger', l2: 'RoadPodMaster', l3: 'PerceptionPipeline', l4: 'SpacetimePlanner', l5: 'V2X & Berthing',
          s1: '1. dispatch_mission_request(waypoint)',
          s2: '2. stream_lidar_radar_pointclouds()',
          t1: 'BEV Transformer Sensor Fusion (< 20ms)',
          s3: '3. calculate_collision_free_spline()',
          t2: 'SPaT Municipal Green-Wave Pacing (0 stops)',
          s4: '4. execute_drive_by_wire_motion()',
          s5Title: '5. ASIL-D Brake Watchdog Heartbeat',
          s5Sub: 'Pull pod smoothly into shoulder if fault',
          s6: '6. UWB Sub-Centimeter Docking Alignment',
          s7: '7. Zero-Step Transfer Aligned with Maglev Train Platform',
        };
      case 'borealis-maglev':
        return {
          l1: 'OCC Dispatch', l2: 'FlightComputer', l3: 'GapControl', l4: 'MovingBlockATP', l5: 'LSM & EddyBrake',
          s1: '1. request_movement_authority()',
          s2: '2. energize_ems_levitation_coils()',
          t1: '1 kHz Closed-Loop Gap Regulation (15mm ±0.5mm)',
          s3: '3. calculate_dynamic_safe_braking_curve()',
          t2: 'SIL-4 Moving-Block Clearance Verified (< 10ms)',
          s4: '4. pulse_linear_stator_propulsion(0-450 km/h)',
          s5Title: '5. TMR Majority Voter Watchdog',
          s5Sub: 'Deploy eddy-current brakes with 0 power if fail',
          s6: '6. 500 km/h Supercruise Decel Handover',
          s7: '7. Docking Clamps Engaged; Pod Handshake Unlocked',
        };
      case 'sovereign-mesh':
        return {
          l1: 'Grid Operator', l2: 'GridEdgeNode', l3: 'DroopController', l4: 'BmsStorageArray', l5: 'LoRa Mesh & Trip',
          s1: '1. monitor_grid_frequency_hz(60.0 baseline)',
          s2: '2. sample_synchrophasor_pmu_stream()',
          t1: 'Wavelet Anomaly Detection (< 4ms)',
          s3: '3. trip_solid_state_transfer_switch()',
          t2: 'Autonomous Islanding Disconnect (< 8ms)',
          s4: '4. trigger_synthetic_inertia_droop_surge()',
          s5Title: '5. Substation Watchdog Interlock',
          s5Sub: 'Mechanical air-gap bypass drops on overvoltage',
          s6: '6. P2P LoRa Teleprotection Load Balancing',
          s7: '7. Cryptographic Ed25519 Energy Settlement Logged',
        };
      case 'digitpop':
        return {
          l1: 'Video Shopper', l2: 'ShoppablePlayer', l3: 'WasmTracker', l4: 'MetadataSync', l5: 'CheckoutBridge',
          s1: '1. load_interactive_manifest(hls_url)',
          s2: '2. extract_video_frame_pts(WebCodecs)',
          t1: 'WebAssembly Optical Flow Interpolator (< 8ms drift)',
          s3: '3. sync_hotspot_coordinates(60 FPS canvas)',
          t2: 'Shopper Hovers Hotspot ➔ Preview Card Expands',
          s4: '4. initiate_1_click_biometric_purchase()',
          s5Title: '5. PCI-DSS Tokenization Sandbox',
          s5Sub: 'Isolates Apple Pay / Stripe Elements from DOM',
          s6: '6. Instant Tokenized Purchase Confirmation',
          s7: '7. Cryptographic Receipt Emitted; Stream Resumes Unbroken',
        };
      default: // opportunity-os
        return {
          l1: 'Candidate', l2: 'ProfileGraph', l3: 'VectorMatcher', l4: 'AI Simulator', l5: 'Founder & NDA',
          s1: '1. submit_capstone_brief_and_github_url()',
          s2: '2. parse_git_commits_and_ast_patterns()',
          t1: 'Dense Cosine Similarity Search (< 45ms query)',
          s3: '3. match_open_capstone_pod_requisitions()',
          t2: 'Blind Rubric AI Technical Assessment',
          s4: '4. dispatch_to_jeff_boggs(24h review)',
          s5Title: '5. Ethical Bias & Privacy Watchdog',
          s5Sub: 'Sanitizes all demographic PII from evaluation',
          s6: '6. Mutual Digital NDA & IP Assignment Executed',
          s7: '7. Direct GitHub Repo Push Permissions Provisioned',
        };
    }
  };

  const data = getSequenceData(systemId);

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
        <text x="55" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.l1}</text>
        <line x1="55" y1="34" x2="55" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(230, 20)">
        <rect x="0" y="0" width="120" height="34" rx="6" fill="#1e293b" stroke={accentColor} strokeWidth="1" />
        <text x="60" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.l2}</text>
        <line x1="60" y1="34" x2="60" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(410, 20)">
        <rect x="0" y="0" width="110" height="34" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="1" />
        <text x="55" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.l3}</text>
        <line x1="55" y1="34" x2="55" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(580, 20)">
        <rect x="0" y="0" width="120" height="34" rx="6" fill="#1e293b" stroke="#c084fc" strokeWidth="1" />
        <text x="60" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.l4}</text>
        <line x1="60" y1="34" x2="60" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      <g transform="translate(760, 20)">
        <rect x="0" y="0" width="130" height="34" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
        <text x="65" y="22" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{data.l5}</text>
        <line x1="65" y1="34" x2="65" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      {/* Activation Steps */}
      <line x1="115" y1="90" x2="285" y2="90" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="200" y="82" textAnchor="middle" fill="#cbd5e1" fontSize="10">{data.s1}</text>

      <line x1="290" y1="130" x2="460" y2="130" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="375" y="122" textAnchor="middle" fill="#cbd5e1" fontSize="10">{data.s2}</text>

      <rect x="310" y="145" width="260" height="22" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="0.8" />
      <text x="440" y="160" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="700">{data.t1}</text>

      <line x1="465" y1="195" x2="635" y2="195" stroke="#c084fc" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="550" y="187" textAnchor="middle" fill="#c084fc" fontSize="10">{data.s3}</text>

      <rect x="510" y="210" width="260" height="22" rx="4" fill="rgba(192, 132, 252, 0.15)" stroke="#c084fc" strokeWidth="0.8" />
      <text x="640" y="225" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="700">{data.t2}</text>

      <line x1="640" y1="260" x2="820" y2="260" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#sq-arrow)" />
      <text x="730" y="252" textAnchor="middle" fill="#fbbf24" fontSize="10">{data.s4}</text>

      <rect x="700" y="280" width="245" height="42" rx="6" fill="#1e293b" stroke="#f87171" strokeWidth="1" />
      <text x="822" y="298" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="800">{data.s5Title}</text>
      <text x="822" y="314" textAnchor="middle" fill="#cbd5e1" fontSize="9">{data.s5Sub}</text>

      <line x1="825" y1="350" x2="825" y2="390" stroke="#fbbf24" strokeWidth="2" />
      <line x1="825" y1="390" x2="845" y2="390" stroke="#fbbf24" strokeWidth="2" />
      <line x1="845" y1="390" x2="845" y2="365" stroke="#fbbf24" strokeWidth="2" />
      <line x1="845" y1="365" x2="830" y2="365" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#sq-arrow)" />
      <text x="855" y="380" fill="#fbbf24" fontSize="10" fontWeight="700">{data.s6}</text>

      <line x1="825" y1="415" x2="115" y2="415" stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#sq-arrow-green)" />
      <text x="470" y="408" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">{data.s7}</text>
    </svg>
  );
};
