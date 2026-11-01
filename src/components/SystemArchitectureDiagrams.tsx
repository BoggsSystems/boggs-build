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
      case 'robot-fleet':
        return {
          title: 'SYSTEM BOUNDARY: HETEROGENEOUS ROBOT FLEET ORCHESTRATOR',
          primary: { role: 'Operations Director', sub: 'Fleet Supervisor' },
          actors: [
            { role: 'Unitree G1 Humanoid', sub: '33-DOF Bipedal Manipulator', color: '#06b6d4' },
            { role: 'Unitree Go2 Quadruped', sub: 'Rough-Terrain Cargo Mule', color: '#10b981' },
            { role: 'PX4 Autopilot Drone', sub: 'Aerial Perimeter Scout', color: '#c084fc' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Tri-Modal Mission Dispatch', sub: 'Multi-Agent Task Allocation', color: accentColor },
            { num: 'UC-2', title: 'Kinematic Impedance Latching', sub: 'Picker-to-Saddle Transfer', color: '#06b6d4' },
            { num: 'UC-3', title: 'MuJoCo Sim-to-Real Tuning', sub: 'Dynamic Stance Calibration', color: '#10b981' },
            { num: 'UC-4', title: 'Dynamic 3D Zone Routing', sub: 'DTDL v3 Graph Synchronization', color: '#38bdf8' },
            { num: 'UC-5', title: 'Emergency Stance Clamping', sub: '< 5ms Hardware E-Stop Interlock', color: '#fbbf24' },
          ],
        };
      case 'digital-twin-appliance':
        return {
          title: 'SYSTEM BOUNDARY: DIGITAL TWIN BARE-METAL APPLIANCE & COCKPIT',
          primary: { role: 'Fleet Controller', sub: 'Tactical Cockpit Lead' },
          actors: [
            { role: 'Borealis AV Pods', sub: 'C-V2X / SPaT Ingestion', color: '#38bdf8' },
            { role: 'Vulkan KMS Compositor', sub: 'Direct Direct-to-Display', color: '#10b981' },
            { role: 'Tactile Rotary HMI', sub: 'Hardware CAN-Bus Controls', color: '#fbbf24' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Bare-Metal KMS Modesetting', sub: 'Lock 120 FPS Direct Framebuffer', color: accentColor },
            { num: 'UC-2', title: 'CycloneDDS Telemetry Sync', sub: 'Sub-10ms Kinematic Ring Buffer', color: '#38bdf8' },
            { num: 'UC-3', title: 'Lumen Canadian Winter Sim', sub: 'Real-Time Snow & Ice Friction', color: '#10b981' },
            { num: 'UC-4', title: 'Multi-Monitor Genlock Flip', sub: 'Synchronized 3x 4K Viewports', color: '#c084fc' },
            { num: 'UC-5', title: 'Tactile HIL Interlock Override', sub: 'Sub-5ms Rotary Intervention', color: '#fbbf24' },
          ],
        };
      case 'civic-campus':
        return {
          title: 'SYSTEM BOUNDARY: SOVEREIGN CIVIC CAMPUS & TRANSIT CORRIDOR MESH',
          primary: { role: 'Campus Operations Lead', sub: 'Civil Systems Director' },
          actors: [
            { role: 'Borealis AV Pods', sub: 'High-Speed Metro Link', color: '#38bdf8' },
            { role: 'Robot Fleet Crane/Paver', sub: 'Modular Mass-Timber Assembly', color: '#fbbf24' },
            { role: 'Pine Street Care Mesh', sub: 'Supportive Dignity & Trades', color: '#10b981' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Autonomous Site Topography', sub: 'LiDAR Earthmoving & Trenching', color: accentColor },
            { num: 'UC-2', title: 'Robotic Pod Assembly', sub: 'Millimeter Timber Locking & MEP', color: '#fbbf24' },
            { num: 'UC-3', title: 'Grade-Separated Transit Link', sub: '12-Minute Express to Metro Hub', color: '#38bdf8' },
            { num: 'UC-4', title: 'Solar Microgrid Islanding', sub: '650 kW Net-Zero Battery Storage', color: '#10b981' },
            { num: 'UC-5', title: 'Workforce Sovereignty Ladder', sub: 'Cockpit Training & Direct Placement', color: '#c084fc' },
          ],
        };
      default: // opportunity-os
        return {
          title: 'SYSTEM BOUNDARY: OPPORTUNITY OS ATS CO-PILOT & PROOF ENGINE',
          primary: { role: 'Job Candidate', sub: 'Applicant Co-Pilot' },
          actors: [
            { role: 'Corporate ATS Portals', sub: 'Workday / Greenhouse / Lever', color: '#fbbf24' },
            { role: 'Local Chrome Extension', sub: 'Sub-10ms DOM Form Inject', color: '#38bdf8' },
            { role: 'Local Encrypted Vault', sub: 'Zero-Exfiltration Proofs', color: '#10b981' },
          ],
          useCases: [
            { num: 'UC-1', title: 'Inspect Multi-Step DOM Trees', sub: 'Map Form Fields & Dropzones', color: accentColor },
            { num: 'UC-2', title: 'Query Local Encrypted Vault', sub: 'Extract Verified Project Proofs', color: '#c084fc' },
            { num: 'UC-3', title: 'Grounded Evidence Matching', sub: 'Eliminate Keyword Stuffing', color: '#38bdf8' },
            { num: 'UC-4', title: 'Sub-10ms Automated Autofill', sub: 'Dispatch Trusted Synthetic Events', color: '#10b981' },
            { num: 'UC-5', title: '1-Click Submission & Log', sub: 'Record Local Confidential Telemetry', color: '#fbbf24' },
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
      case 'robot-fleet':
        return {
          tier1Label: 'TIER 1: ROBOT HARDWARE & LOW-LEVEL MOTOR BUS',
          tier1Blocks: [
            { title: 'Unitree SDK2 LowCmd / LowState C++', sub: 'CycloneDDS Microsecond Joint Actuation', color: '#06b6d4' },
            { title: 'PX4 Autopilot & MAVLink UDP Bus', sub: 'Geofenced Waypoint Navigation at 100 Hz', color: '#c084fc' },
            { title: 'ZeroMQ High-Throughput Video Socket', sub: '60 FPS Edge Camera & Depth Cloud PUB/SUB', color: '#38bdf8' },
          ],
          tier2Label: 'TIER 2: REAL-TIME DETERMINISTIC CONTROL & SAFETY',
          tier2Blocks: [
            { title: 'CycloneDDS Distributed Middleware', sub: 'Multi-Robot Peer-to-Peer Telemetry Fabric', color: '#06b6d4' },
            { title: 'MuJoCo Sim-to-Real Impedance Solver', sub: 'Phase 1 Whole-Body Joint Torque Envelopes', color: accentColor },
            { title: 'Hardware Relayed Emergency Stop Bus', sub: 'Sub-5ms Actuator Power Cutoff on Breach', color: '#fbbf24' },
          ],
          tier3Label: 'TIER 3: AI EMBODIED INFERENCE & SPATIAL SLAM',
          tier3Blocks: [
            { title: 'Edge-Native YOLOv8 3D Spatial Vision', sub: 'Sub-15ms Object & Saddle Bounding Boxes', color: '#10b981' },
            { title: 'Azure OpenAI RAG Action Tree Planner', sub: 'Natural Language to Multi-Robot Tasks', color: '#38bdf8' },
            { title: 'Multi-Agent Sequential Rendezvous', sub: 'Picker-to-Carrier Dynamic Coordination', color: '#c084fc' },
          ],
          tier4Label: 'TIER 4: ENTERPRISE DIGITAL TWIN & FLEET CONSOLE',
          tier4Blocks: [
            { title: 'Azure Digital Twins DTDL v3 Graph Core', sub: 'Real-Time 3D Topological Zone Tracking', color: '#06b6d4' },
            { title: 'Enterprise WMS / ERP Order Connector', sub: 'Automated Restock & Cargo Dispatch Flow', color: '#38bdf8' },
            { title: 'Multi-Role Operations & Tele-Op Console', sub: 'Live Telemetry, Battery SOC & 3D Visualizer', color: '#a855f7' },
          ],
        };
      case 'digital-twin-appliance':
        return {
          tier1Label: 'TIER 1: PHYSICAL VEHICLE TELEMETRY & V2X INGESTION',
          tier1Blocks: [
            { title: 'Borealis Pod Kinematics & Sensors', sub: '360° LIDAR, 4D Radar & UWB Docking', color: '#38bdf8' },
            { title: 'Municipal C-V2X (3GPP Rel-18)', sub: 'Live SPaT Green-Wave Corridor Packets', color: '#10b981' },
            { title: 'PTP IEEE 1588 Hardware Clock', sub: 'Sub-Microsecond Timestamp Correlation', color: '#fbbf24' },
          ],
          tier2Label: 'TIER 2: REAL-TIME DETERMINISTIC BUS & QUEUE',
          tier2Blocks: [
            { title: 'Eclipse CycloneDDS Middleware', sub: 'Deterministic State Consensus Fabric', color: '#38bdf8' },
            { title: 'Lock-Free SPSC Ring Buffer', sub: 'Sub-10ms Shared-Memory Frame Queue', color: accentColor },
            { title: 'Hardware Watchdog Safety Node', sub: '150ms Telemetry Drop Dead-Reckoning', color: '#fbbf24' },
          ],
          tier3Label: 'TIER 3: UNREAL ENGINE 5 SIMULATION CORE',
          tier3Blocks: [
            { title: 'CARLA AV Ground-Truth World', sub: 'Dynamic Traffic & Winter Weather Shaders', color: '#10b981' },
            { title: 'Nanite & Lumen Ray-Traced Twin', sub: 'Elevated Maglev & Urban Corridor Assets', color: '#38bdf8' },
            { title: 'Synthetic Sensor Generation Core', sub: 'Real-Time Voxel Point Cloud Simulation', color: '#c084fc' },
          ],
          tier4Label: 'TIER 4: APPLIANCE OS & MULTI-DISPLAY KMS',
          tier4Blocks: [
            { title: 'Bare-Metal Vulkan KMS Driver', sub: 'Direct Framebuffer Display Flip at 120 FPS', color: '#38bdf8' },
            { title: '3x Synchronized 4K Cockpit Array', sub: 'Sensor Voxels • Photoreal Twin • Hub Docking', color: '#06b6d4' },
            { title: 'Tactile Rotary USB/CAN Interface', sub: 'Aerospace Dials, E-Stop & OLED Telemetry', color: '#fbbf24' },
          ],
        };
      case 'civic-campus':
        return {
          tier1Label: 'TIER 1: REGIONAL LAND & EARTH-MOVING TELEMETRY',
          tier1Blocks: [
            { title: 'Autonomous Heavy Excavator & Paver Fleet', sub: 'LiDAR GPS-RTK Precision Grading & Trenching', color: '#fbbf24' },
            { title: 'Geotechnical Soil & Microclimate Sensor Array', sub: 'Thermal Airflow & Structural Sub-Grade Telemetry', color: '#38bdf8' },
            { title: 'Solar Irradiance & Microgrid Generation Sensors', sub: 'Real-Time Photovoltaic & Inverter Tracking', color: '#10b981' },
          ],
          tier2Label: 'TIER 2: REAL-TIME CAMPUS BUS & ROBOTIC COORDINATION',
          tier2Blocks: [
            { title: 'CycloneDDS / ROS 2 Autonomous Construction Spine', sub: 'Deterministic Peer-to-Peer Heavy Machine Sync', color: '#fbbf24' },
            { title: 'OpenUSD Geospatial Campus Twin Bridge', sub: 'Real-Time 3D Building Information Modeling (BIM)', color: accentColor },
            { title: 'Microgrid Energy Management System (EMS)', sub: 'Dynamic Battery Load-Balancing & Thermal Pumps', color: '#10b981' },
          ],
          tier3Label: 'TIER 3: HIGH-SPEED BOREALIS TRANSIT PORTAL',
          tier3Blocks: [
            { title: '4-Berth Grade-Separated Transit Portal', sub: '90-Second Headway Glass-Canopied Pod Station', color: '#38bdf8' },
            { title: 'IEEE 1588 PTP Mainline Synchronization Node', sub: 'Sub-Microsecond Tube Injection Time-Slotting', color: '#c084fc' },
            { title: 'Autonomous Passenger Flow & Accessible Gates', sub: 'ISO 21542 Universal Level-Boarding Infrastructure', color: '#38bdf8' },
          ],
          tier4Label: 'TIER 4: PINE STREET DIGNITY & WORKFORCE COCKPITS',
          tier4Blocks: [
            { title: 'Mass-Timber Modular Residential Pods', sub: 'WELL Building v2 Certified Passive Sanctuary Units', color: '#10b981' },
            { title: 'Commercial Culinary Arts & Facilities Center', sub: 'Pine Street Model Community Dining & Trade Labs', color: '#fbbf24' },
            { title: 'On-Campus Digital Twin & Opportunity OS Labs', sub: 'Vocational Autonomous Dispatch & Flight Cockpits', color: '#06b6d4' },
          ],
        };
      default: // opportunity-os
        return {
          tier1Label: 'TIER 1: CLIENT-SIDE ATS DOM INSPECTION ENGINE',
          tier1Blocks: [
            { title: 'Tree-Sitter DOM Field & Mutation Inspector', sub: 'Maps Complex Forms Across Workday & Greenhouse', color: '#38bdf8' },
            { title: 'Contextual Multi-Step Form Pagination Watcher', sub: 'Detects Next-Step Transitions & Hidden Shadow-DOM', color: '#fbbf24' },
            { title: 'Zero-Exfiltration Network Isolation Layer', sub: 'Guarantees Zero Server Logging of Candidate PII', color: '#10b981' },
          ],
          tier2Label: 'TIER 2: ON-DEVICE ZERO-KNOWLEDGE EVIDENCE VAULT',
          tier2Blocks: [
            { title: 'WebCrypto AES-GCM Encrypted Local Store', sub: 'Secures Verified Work, Patents & Code Commits', color: '#c084fc' },
            { title: 'Semantic Requisition Evidence Matcher', sub: 'Sub-10ms Alignment of Verified Proof to Job Specs', color: accentColor },
            { title: 'Anti-Hallucination Content Grounding Guard', sub: 'Prevents Generic AI Keyword Stuffing Distortions', color: '#38bdf8' },
          ],
          tier3Label: 'TIER 3: HIGH-SPEED DOM INJECTION CONTROLLER',
          tier3Blocks: [
            { title: 'Trusted Synthetic DOM Event Dispatcher', sub: 'Simulates Native User Typing & Select Transitions', color: '#38bdf8' },
            { title: 'Dynamic File Dropzone & Resume Attacher', sub: 'Injects On-Device Tailored PDF Application Proofs', color: '#fbbf24' },
            { title: 'Reversible Form-Fill Command Queue', sub: 'Instant Single-Click Undo & Candidate Oversight', color: '#10b981' },
          ],
          tier4Label: 'TIER 4: CANDIDATE CAREER DASHBOARD & TELEMETRY',
          tier4Blocks: [
            { title: 'Local Application Velocity & Funnel Tracker', sub: 'Tracks Interview Conversion Rates & Response Latency', color: '#06b6d4' },
            { title: 'W3C Verifiable Credential Digital Signer', sub: 'Embeds Tamper-Evident Proof in Resume Exports', color: '#38bdf8' },
            { title: 'Direct Founder & Engineering Fast-Track Pipeline', sub: '24h Technical Brief Review & Direct Repo Access', color: '#a855f7' },
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
      case 'robot-fleet':
        return {
          c1: { title: 'IRobotAdapter', st: '<<Interface / HAL>>', m: ['+ move_to_waypoint(pos: Vector3D): Promise<bool>', '+ execute_primitive(action: PrimitiveAction): void', '+ get_joint_states(): JointTelemetry'], a: ['+ agent_id: string', '+ battery_soc: float', '+ operational_state: AgentState'] },
          c2: { title: 'RobotFleetManager', st: '<<CentralMediator>>', m: ['+ register_robot(agent: IRobotAdapter): void', '+ dispatch_mission(mission: MissionSpec): Promise<void>', '+ trigger_global_estop(): void'], a: ['- active_agents: Map<string, IRobotAdapter>', '- mission_queue: PriorityQueue<TaskWorkflow>', '- spatial_grid: TopologicalSpatialIndex'] },
          c3: { title: 'G1HumanoidAdapter', st: '<<DexterousManipulator>>', m: ['+ execute_bipedal_step(gait: GaitConfig): void', '+ grasp_object(box: BoundingBox3D): Promise<bool>', '+ latch_to_quadruped(target: Go2CarrierAdapter): void'], a: ['- dds_lowcmd_pub: DdsPublisher<LowCmd>', '- dds_lowstate_sub: DdsSubscriber<LowState>', '- mujoco_impedance_solver: KinematicsSolver'] },
          c4: { title: 'Go2CarrierAdapter', st: '<<RoughTerrainMule>>', m: ['+ traverse_rough_terrain(path: Waypoint[]): void', '+ lock_saddle_cargo(): void', '+ release_saddle_cargo(): void'], a: ['- payload_weight_kg: float', '- terrain_mode: TerrainProfile', '- contact_sensors: FootContactArray'] },
          c5: { title: 'CollaborationWorkflows', st: '<<StateOrchestrator>>', m: ['+ initiate_handoff(picker: G1, carrier: Go2): void', '+ verify_aerial_clearance(drone: PX4): bool', '+ commit_handshake_state(): void'], a: ['- active_workflows: List<TriModalWorkflow>', '- synchronization_barrier: RendezvousBarrier'] },
          c6: { title: 'DigitalTwinClient', st: '<<DTDLv3Client>>', m: ['+ update_robot_twin(telemetry: JointTelemetry): void', '+ query_zone_occupancy(zoneId: string): TwinNode[]', '+ patch_relationship(source: string, target: string): void'], a: ['- adt_endpoint: Uri', '- dtdl_model_cache: ModelDirectory', '- telemetry_batch_queue: Queue<TwinUpdate>'] },
          pattern: 'PATTERN: Mediator & State Hierarchies',
          patternDesc: 'Normalizes CycloneDDS, MAVLink, and DTDL topics',
        };
      case 'digital-twin-appliance':
        return {
          c1: { title: 'ApplianceKmsCompositor', st: '<<BareMetalDriver>>', m: ['+ initializeDrmKms(): Result<void>', '+ presentPlaneBuffer(displayIndex: int): void', '+ handleVBlankInterrupt(): void'], a: ['- drmCardFd: int', '- crtcControllers: Vector<DrmCrtc>', '- swapchains: Array<VkSwapchainKHR, 3>'] },
          c2: { title: 'DdsTelemetryRingBuffer', st: '<<LockFreeQueue>>', m: ['+ onTelemetryPacket(packet: PodMsg): void', '+ readLatestState(podId: PodId): StateSnapshot'], a: ['- ringBufferPtr: atomic<uint8_t*>', '- writeCursor: atomic<uint64_t>', '- vehicleStateTopic: dds_entity_t'] },
          c3: { title: 'Ue5WorldModelBridge', st: '<<SimulationBridge>>', m: ['+ syncActorTransforms(state: StateSnapshot): void', '+ updateLidarPointCloudVoxel(): void', '+ applyFrictionTensors(): void'], a: ['- worldContext: UWorld*', '- carlaVehicleActors: Map<PodId, AActor*>', '- weatherController: AWeatherSubsystem*'] },
          c4: { title: 'TactileHmiController', st: '<<HardwareInterface>>', m: ['+ pollRotaryDials(): HmiEvent', '+ updateOledDiagnostics(fps: float): void', '+ triggerEmergencyDisengage(): void'], a: ['- canInterfaceName: string', '- dialRotationTicks: int32_t', '- safetyInterlockState: bool'] },
          c5: { title: 'MultiViewportGenlock', st: '<<DisplaySync>>', m: ['+ alignDisplayBlankIntervals(): void', '+ lockFrameRate(hz: int = 120): void'], a: ['- activeDisplays: DisplayPort[3]', '- tearFreeVBlankEnabled: bool'] },
          c6: { title: 'WebRtcStreamingBridge', st: '<<RemoteStreamer>>', m: ['+ captureNvencFrame(): VideoFrame', '+ broadcastDataChannelTelemetry(): void'], a: ['- webrtcPeerConnection: PeerHandle', '- av1BitrateKbps: int = 25000'] },
          pattern: 'PATTERN: Hardware Direct Framebuffer & Lock-Free SPSC',
          patternDesc: 'Eliminates desktop window manager overhead and mutex contention',
        };
      case 'civic-campus':
        return {
          c1: { title: 'CivicCampusMasterPlan', st: '<<MasterLayout>>', m: ['+ calculate_density_envelope(): ZoningEnvelope', '+ simulate_microclimate_airflow(): ThermalProfile', '+ export_openusd_twin(): UsdStageRef'], a: ['- campus_id: CampusUuid', '- regional_parcel_acres: float = 45.0', '- residential_pod_capacity: int = 120'] },
          c2: { title: 'ModularPodAssemblyAgent', st: '<<RoboticCoordinator>>', m: ['+ dispatch_pod_crane_sequence(podId: string): bool', '+ verify_structural_seals(podId: string): SealTelemetry', '+ calibrate_mep_connectors(): AlignmentReport'], a: ['- fleet_dds_domain: DomainId = 42', '- crane_telemetry_stream: RtpStream', '- torque_verification_sensor: I2cArray'] },
          c3: { title: 'TransitCorridorPortal', st: '<<TransitNexus>>', m: ['+ dispatch_express_pod(dest: string): PodDispatchId', '+ monitor_passenger_throughput(): FlowMetrics', '+ sync_ptp_clock(): PtpStatus'], a: ['- berth_count: int = 4', '- headway_seconds: int = 90', '- route_to_metro_hub_km: float = 18.5'] },
          c4: { title: 'MicrogridEnergyManager', st: '<<PowerGovernor>>', m: ['+ balance_solar_battery_flows(): LoadState', '+ execute_island_decoupling(): bool', '+ cycle_thermal_heat_pumps(): void'], a: ['- solar_pv_capacity_kw: float = 650.0', '- battery_bess_kwh: float = 2400.0', '- is_grid_islanded: bool'] },
          c5: { title: 'ResidentEmpowermentPipeline', st: '<<WorkforceEngine>>', m: ['+ enroll_resident(id: string, track: string): Plan', '+ schedule_pod_apprenticeship(): Slot', '+ track_sovereignty_milestones(): Report'], a: ['- culinary_training_seats: int = 40', '- robotics_cockpit_seats: int = 24', '- placement_success_rate: float'] },
          c6: { title: 'OpenUsdCampusVisualizer', st: '<<DigitalTwin>>', m: ['+ render_photoreal_viewport(): FrameBuffer', '+ stream_sensor_overlay_to_cockpit(): void'], a: ['- usd_stage: UsdStagePtr', '- omniverse_connector: OmniverseLiveSync'] },
          pattern: 'PATTERN: Transit-Oriented Micro-City & Modular Assembly',
          patternDesc: 'Combines off-site mass timber prefabrication with high-speed pod links',
        };
      default: // opportunity-os
        return {
          c1: { title: 'AtsDomParser', st: '<<DomInspector>>', m: ['+ detect_ats_vendor(): AtsVendorType', '+ map_form_hierarchy(): FormFieldSchema', '+ observe_dynamic_steps(): void'], a: ['- portal_type: AtsVendorType', '- input_node_map: Map<string, HTMLElement>', '- mutation_observer: MutationObserver'] },
          c2: { title: 'EvidenceGroundingEngine', st: '<<MatchingEngine>>', m: ['+ extract_grounded_claims(): VerifiedClaim[]', '+ tailor_resume_context(): TailoredResumeJson', '+ generate_ats_friendly_pdf(): Uint8Array'], a: ['- local_vault: WebCryptoVault', '- claim_verifier: CredentialVerifier', '- similarity_scorer: CosineModel'] },
          c3: { title: 'AutofillInjectionController', st: '<<DomMutator>>', m: ['+ execute_autofill(): Promise<FillSummary>', '+ dispatch_trusted_input(el, val): void', '+ attach_tailored_resume_blob(): void'], a: ['- injection_latency_ms: number', '- rollback_stack: FieldSnapshot[]'] },
          c4: { title: 'LocalVaultManager', st: '<<EncryptedStorage>>', m: ['+ read_encrypted_profile(): ProfileRecord', '+ write_encrypted_profile(): void', '+ wipe_candidate_storage(): void'], a: ['- indexed_db_handle: IDBDatabase', '- encryption_key: CryptoKey'] },
          c5: { title: 'WasmPdfCompiler', st: '<<WasmEngine>>', m: ['+ compile_resume_pdf(): Uint8Array', '+ sign_verifiable_credential(): string'], a: ['- wasm_module_bytes: Uint8Array', '- ed25519_key_pair: KeyPair'] },
          c6: { title: 'ApplicationTracker', st: '<<AnalyticsLedger>>', m: ['+ log_submission_event(company: string): void', '+ calculate_funnel_velocity(): VelocityReport'], a: ['- local_telemetry_log: SubmissionRecord[]'] },
          pattern: 'PATTERN: Command & Observer with Local Zero-Knowledge Vault',
          patternDesc: 'Sub-10ms DOM mutation handling with strict client-side privacy',
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
      case 'robot-fleet':
        return {
          l1: 'OpsDirector', l2: 'FleetManager', l3: 'PX4Drone', l4: 'G1Humanoid', l5: 'Go2Quadruped',
          s1: '1. dispatch_tri_modal_order(sku_id, destination)',
          s2: '2. scan_corridor_waypoints(MAVLink)',
          t1: 'Aerial Path Clearance Confirmed (< 35ms)',
          s3: '3. grasp_and_lift_payload(YOLOv8 + 33-DOF)',
          t2: 'Saddle Rendezvous Latch (< 180ms confirm)',
          s4: '4. traverse_rough_terrain(CycloneDDS)',
          s5Title: '5. Hardware Emergency Stop Interlock',
          s5Sub: 'Sub-5ms relay cuts motor power on boundary breach',
          s6: '6. Destination Curbside Docking Completed',
          s7: '7. Azure Digital Twins DTDL v3 Graph Updated (< 45ms)',
        };
      case 'digital-twin-appliance':
        return {
          l1: 'BorealisPod', l2: 'CycloneDDS', l3: 'Ue5WorldBridge', l4: 'VulkanDRM', l5: 'CockpitHMI',
          s1: '1. emit_pod_kinematics_and_c_v2x_spat()',
          s2: '2. push_to_lock_free_ring_buffer(< 4ms)',
          t1: 'PTP IEEE 1588 Microsecond Timestamp Sync',
          s3: '3. update_actor_kinematics_and_winter_mesh()',
          t2: 'Lumen & CARLA Ground-Truth Raymarch',
          s4: '4. present_planes_to_3x_4k_framebuffers()',
          s5Title: '5. Hardware CAN-Bus Override Interlock',
          s5Sub: 'Tactile aerospace rotary dial adjusts corridor focus',
          s6: '6. Ingestion-to-Photon Frame Latency Locked <= 25ms',
          s7: '7. OLED Diagnostic Telemetry Strip Updated (120 FPS)',
        };
      case 'civic-campus':
        return {
          l1: 'RegionalSite', l2: 'RobotCrane', l3: 'TimberPod', l4: 'TransitPortal', l5: 'Resident',
          s1: '1. autonomous_grading_and_foundation_scan()',
          s2: '2. robotic_crane_picks_modular_mass_timber_pod()',
          t1: 'CycloneDDS Millimeter Precision Locking (< 5ms)',
          s3: '3. seal_structural_joints_and_connect_mep()',
          t2: 'IEEE 1588 PTP Transit Guideway Sync',
          s4: '4. borealis_express_pod_links_campus_to_metro(12m)',
          s5Title: '5. Net-Zero Microgrid Power Islanding',
          s5Sub: '650 kW solar array & BESS battery buffer activate',
          s6: '6. Pine Street Dignity Housing & Trades Ready',
          s7: '7. Resident Enrolled in Digital Twin Career Cockpit',
        };
      default: // opportunity-os
        return {
          l1: 'JobHunter', l2: 'ChromeExt', l3: 'AtsDomParser', l4: 'LocalVault', l5: 'ATS Portal',
          s1: '1. navigate_to_workday_or_greenhouse_job()',
          s2: '2. inspect_dom_and_extract_form_schema(< 10ms)',
          t1: 'WebCrypto Local Vault Decryption (Zero Exfiltration)',
          s3: '3. match_verified_github_commits_and_proof()',
          t2: 'Synthetic Trusted DOM Events Fired',
          s4: '4. autofill_all_form_fields_and_attach_pdf()',
          s5Title: '5. Candidate Review & Verification Lock',
          s5Sub: '1-click human verification prior to HTTP dispatch',
          s6: '6. Application Submitted Successfully to ATS',
          s7: '7. Confirmation Telemetry Logged to Encrypted Tracker',
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
