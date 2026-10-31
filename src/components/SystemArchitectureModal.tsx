import React, { useState, useEffect } from 'react';
import {
  X,
  FileCode2,
  GraduationCap,
  Layers,
  Activity,
  Shield,
  ArrowRight,
  GitBranch,
  Cpu,
  CheckCircle2,
  Zap,
  Sparkles,
} from 'lucide-react';

export interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSystem?: string;
  onApplyForSystem?: (systemId: string) => void;
}

interface SystemData {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  accentColor: string;
  repo: string;
  architectureTier: string;
  overview: string;
  standards: Array<{ name: string; desc: string }>;
  functionalReqs: string[];
  nonFunctionalReqs: string[];
  umlPackage: string;
  umlClasses: Array<{
    name: string;
    stereotype?: string;
    description: string;
    attributes: string[];
    methods: string[];
    relations: string[];
  }>;
  designPatterns: Array<{ name: string; usage: string }>;
  stateMachine: {
    title: string;
    states: Array<{ name: string; tag: string; desc: string }>;
    failsafe: string;
  };
  currentMilestones: Array<{ title: string; status: 'completed' | 'in-progress' | 'pod-backlog'; details: string }>;
}

export const ARCHITECTURE_DATA: Record<string, SystemData> = {
  'smart-mohs': {
    id: 'smart-mohs',
    name: 'Smart Mohs Surgical Robotics & Wave Optics',
    shortName: 'Smart Mohs',
    badge: 'C++23 • CUDA • Spectral OCT • Laser Galvo',
    accentColor: '#f59e0b',
    repo: 'BoggsSystems/skin-system & boggs-optics-core',
    architectureTier: 'Class C Medical Device (IEC 62304) • Real-Time Deterministic Control',
    overview:
      'Sub-cellular precision optical biopsy and cold laser micro-ablation workstation. Eliminates intraoperative pathology wait times by fusing 100 kHz spectral-domain Optical Coherence Tomography (OCT) with a 20 kHz dual-galvo cold laser ablation array guided by deep neural segmentation.',
    standards: [
      { name: 'IEC 62304 Class C', desc: 'Medical device software life-cycle processes for systems with potential for serious injury.' },
      { name: 'IEC 60601-1 / 60601-2-22', desc: 'Medical electrical equipment safety and essential performance of surgical lasers.' },
      { name: 'IEC 60825-1 Class 1/4', desc: 'Laser product safety with fail-closed optical shutter interlocks operating in < 1.5ms.' },
      { name: 'ISO 14971', desc: 'Formal medical device risk management and deterministic hazard mitigation.' },
    ],
    functionalReqs: [
      'Acquire 100 kHz A-scan OCT spectral interference fringes across a 15mm x 15mm x 3mm scanning volume.',
      'Perform real-time CUDA-accelerated k-space resampling, dispersion compensation, and FFT in < 8ms per B-scan.',
      'Execute 3D U-Net tumor margin boundary inference with Dice coefficient >= 0.94 within 12ms of volumetric reconstruction.',
      'Generate picosecond pulsed laser ablation galvo trajectories targeting only segmented tumor tissue with 5μm lateral margin safety buffer.',
      'Stream low-latency 4K surgical overlay telemetry to surgeon cockpit at 60 FPS with zero jitter.',
    ],
    nonFunctionalReqs: [
      'Dual-redundant hardware watchdog must disengage laser beam delivery in < 1.5ms upon loss of heartbeats or unexpected galvo deviation.',
      'Zero dynamic memory allocations inside the hard-real-time laser trajectory execution loop (C++23 static memory arena).',
      'Deterministic memory bounds: Memory consumption strictly bounded to 2.4 GB during full 3D volume streaming.',
      'Audit logs with cryptographic hash-chaining for every surgical ablation coordinate fired.',
    ],
    umlPackage: 'BoggsOptics::SurgicalRobotics::Core',
    umlClasses: [
      {
        name: 'VolumetricScanner',
        stereotype: '<<HardwareController>>',
        description: 'Manages 1310 nm swept-source laser synchronization, line-scan camera triggers, and galvo raster mirrors.',
        attributes: [
          '- spectrometer_device: ISpectrometerDevice*',
          '- galvo_driver: GalvoHardwareInterface',
          '- sample_rate_hz: uint32_t = 100000',
          '- scan_pattern_bounds: SpatialBBox3D',
        ],
        methods: [
          '+ calibrate_reference_arm(wavelength_nm: float): CalibResult',
          '+ arm_raster_scan(grid_dim: VolumeGrid): TaskHandle',
          '+ stream_raw_fringes(sink: IOctDataSink&): void',
          '+ trigger_hardware_estop(): void',
        ],
        relations: ['Composes OctDataBuffer', 'Implements IScannerSubsystem'],
      },
      {
        name: 'AiMarginPredictor',
        stereotype: '<<InferenceEngine>>',
        description: 'Wraps TensorRT optimized 3D CNN for real-time basal and squamous cell carcinoma margin segmentation.',
        attributes: [
          '- trt_runtime: nvinfer1::IRuntime*',
          '- cuda_stream: cudaStream_t',
          '- confidence_threshold: float = 0.92',
          '- margin_buffer_voxels: uint32_t = 3',
        ],
        methods: [
          '+ load_calibrated_weights(engine_path: Path): bool',
          '+ segment_3d_volume(vol: OctVolumetricBuffer): SegmentedMarginMesh',
          '+ compute_cell_preservation_score(): float',
        ],
        relations: ['Consumes OctDataBuffer', 'Produces SegmentedMarginMesh'],
      },
      {
        name: 'GalvoLaserController',
        stereotype: '<<ActuationEngine>>',
        description: 'Translates segmented tumor 3D meshes into closed-loop 20 kHz galvo position setpoints and laser Q-switch pulses.',
        attributes: [
          '- mirror_x_axis: ClosedLoopGalvoMotor',
          '- mirror_y_axis: ClosedLoopGalvoMotor',
          '- laser_qswitch: PicosecondPulseSource',
          '- pulse_energy_microjoules: float = 24.5',
        ],
        methods: [
          '+ execute_ablation_vector(traj: TrajectoryVector): AblationReport',
          '+ verify_position_feedback(): GalvoFeedbackTelemetry',
          '+ emergency_shutter_clamp(): void',
        ],
        relations: ['Monitored by SafetyInterlockHardwareWatchdog'],
      },
      {
        name: 'SafetyInterlockHardwareWatchdog',
        stereotype: '<<SafetyMonitor>>',
        description: 'IEC 62304 Class C compliant hardware supervisor executing on a dedicated lockstep micro-core.',
        attributes: [
          '- dual_channel_shutter_pin: GPIOPin[2]',
          '- heartbeat_counter: std::atomic<uint64_t>',
          '- max_allowed_tracking_error_um: float = 4.0',
        ],
        methods: [
          '+ verify_continuous_heartbeat(): bool',
          '+ clamp_shutter_hardware(): void',
          '+ register_fault(code: SurgicalErrorCode): void',
        ],
        relations: ['Enforces failsafe on GalvoLaserController'],
      },
    ],
    designPatterns: [
      { name: 'Hardware Abstraction Layer (HAL)', usage: 'Decouples physical Thorlabs galvos and Wasatch spectrometers from simulated test mocks.' },
      { name: 'Double-Buffered Ring Buffer', usage: 'Zero-copy DMA transfer of high-throughput OCT fringe data directly into GPU unified memory.' },
      { name: 'State Pattern with Enforced Transitions', usage: 'Strictly prevents laser actuation unless calibration and 3D segmentation states are verified.' },
    ],
    stateMachine: {
      title: 'Smart Mohs Surgical Lifecycle State Machine',
      states: [
        { name: 'IDLE_STANDBY', tag: 'State 0', desc: 'Hardware initialized, beam shutters mechanically locked closed, reference arm homed.' },
        { name: 'CALIBRATION_SELF_TEST', tag: 'State 1', desc: 'Automated dark-current subtraction, wavelength calibration, galvo step-response verification.' },
        { name: 'OPTICAL_BIOPSY_SCAN', tag: 'State 2', desc: '100 kHz sweep acquiring 3D volumetric tissue fringes across active surgical field.' },
        { name: '3D_AI_SEGMENTATION', tag: 'State 3', desc: 'TensorRT 3D U-Net delineates neoplastic boundary and generates vector ablation geometry.' },
        { name: 'SURGEON_VERIFICATION', tag: 'State 4', desc: 'Cockpit visual confirmation and mechanical foot-pedal arming switch held by surgeon.' },
        { name: 'PICOSECOND_ABLATION', tag: 'State 5', desc: '20 kHz closed-loop galvanic ablation vaporizing tumor cells with sub-cellular precision.' },
        { name: 'RE_SCAN_CONFIRMATION', tag: 'State 6', desc: 'Immediate repeat OCT scan ensuring negative histological margins; returns to Idle on clean margin.' },
      ],
      failsafe: 'Immediate < 1.5ms dual-coil magnetic shutter drop upon any tracking error exceeding 4μm or missed heartbeat.',
    },
    currentMilestones: [
      { title: 'Core Optical Reconstruction Pipeline', status: 'completed', details: 'Full k-space resampling and FFT CUDA kernel streaming at 100 kHz.' },
      { title: 'Synthetic Mohs Tumor Segmentation Model', status: 'completed', details: 'PyTorch trained 3D U-Net exported to ONNX and validated against phantom datasets.' },
      { title: 'Student Pod Task: TensorRT fp16 Production Bridge', status: 'pod-backlog', details: 'Optimize runtime inference engine to guarantee < 12ms 3D segmentation latency on NVIDIA AGX Orin.' },
      { title: 'Student Pod Task: Closed-Loop Galvo Jitter Eliminator', status: 'pod-backlog', details: 'Implement feed-forward PID compensation in C++23 to suppress mechanical galvo resonance during high-speed rastering.' },
    ],
  },

  'borealis-pods': {
    id: 'borealis-pods',
    name: 'Borealis Pods (6-Passenger Autonomous Micro-Transit)',
    shortName: 'Borealis Pods',
    badge: 'C++20 • ROS 2 • ISO 26262 ASIL-D • V2X Corridors',
    accentColor: '#38bdf8',
    repo: 'BoggsSystems/borealis-os/road',
    architectureTier: 'SAE Level 4 Autonomy • Distributed V2X Fleet Management',
    overview:
      'Purpose-built 6-passenger autonomous electric urban transit pods operating in municipal green-wave corridors. Seamlessly connects residential neighborhoods to high-speed Borealis Maglev hubs with zero scheduled headway and sub-centimeter automated docking.',
    standards: [
      { name: 'ISO 26262 ASIL-D', desc: 'Highest automotive functional safety categorization for drive-by-wire and emergency steering.' },
      { name: 'SAE J3016 Level 4', desc: 'High driving automation operating within designated Operational Design Domains (ODD).' },
      { name: 'IEEE 802.11bd / C-V2X', desc: 'Direct cellular-vehicle-to-everything communication for SPaT/MAP traffic signals and platoon pacing.' },
      { name: 'SAE J2735', desc: 'Standardized V2X message dictionary for cooperative perception and collision avoidance.' },
    ],
    functionalReqs: [
      'Fuse 32-beam solid-state LiDAR, 4D imaging radar, and 360-degree cameras at 50 Hz with < 20ms end-to-end perception latency.',
      'Generate spacetime quintic polynomial trajectories navigating mixed-traffic urban intersections with guaranteed collision avoidance.',
      'Negotiate dynamic green-wave speed pacing with municipal traffic controllers (SPaT) to achieve 0 stop-and-go cycles.',
      'Perform sub-centimeter precision berthing alongside Borealis Maglev intermodal transfer platforms via Ultra-Wideband (UWB) beacons.',
      'Manage interior accessibility ramp deployment, passenger manifests, and post-trip automated UV-C sterilization routines.',
    ],
    nonFunctionalReqs: [
      'Dual-redundant ASIL-D lockstep brake-by-wire actuators capable of bringing pod to a controlled minimum-risk stop if primary compute faults.',
      'Cold reboot to operational state in < 4.2 seconds using customized real-time Linux kernel with PREEMPT_RT patches.',
      'End-to-end payload encryption on all V2X communications using IEEE 1609.2 security certificates.',
      'Total pod power consumption for perception and compute bounded under 480 Watts.',
    ],
    umlPackage: 'Borealis::RoadAutonomy::FleetCore',
    umlClasses: [
      {
        name: 'RoadPodMasterController',
        stereotype: '<<Supervisor>>',
        description: 'Dual-channel ASIL-D vehicle motion supervisor coordinating drive-by-wire, braking, and steering actuators.',
        attributes: [
          '- pod_id: PodIdentifier',
          '- kinematic_state: VehiclePose2D',
          '- active_mission: MissionPlan',
          '- watchdog_heartbeat: ASIL_D_Watchdog',
        ],
        methods: [
          '+ dispatch_trajectory(traj: SpacetimeTrajectory): void',
          '+ engage_failsafe_minimum_risk_stop(): void',
          '+ update_odometry(wheel_ticks: WheelEncoders): void',
          '+ broadcast_state_telemetry(): TelemetryPacket',
        ],
        relations: ['Composes SpacetimePathPlanner', 'Monitors DriveByWireActuatorSet'],
      },
      {
        name: 'PerceptionPipeline',
        stereotype: '<<SensorFusionEngine>>',
        description: 'Performs multi-modal sensor fusion across LiDAR point clouds, camera streams, and radar clusters.',
        attributes: [
          '- lidar_listener: ros2::LiDARSubscriber',
          '- camera_cluster: CameraRig<8>',
          '- tracked_objects: ObjectTrackTable',
        ],
        methods: [
          '+ fuse_sensor_frames(timestamp_ns: uint64_t): WorldModel3D',
          '+ predict_obstacle_intent(obj_id: ObjectID): VelocityProfile',
          '+ flag_occluded_hazard_regions(): HazardMask',
        ],
        relations: ['Feeds SpacetimePathPlanner', 'Implements IPerceptionStream'],
      },
      {
        name: 'V2XCorridorAgent',
        stereotype: '<<CommunicationProtocol>>',
        description: 'Implements IEEE 802.11bd / C-V2X direct links with municipal traffic lights (SPaT/MAP) and neighboring pods.',
        attributes: [
          '- cv2x_transceiver: CV2XHardwareDevice',
          '- security_cred_store: IEEE1609CertificateStore',
          '- current_green_wave_target_speed: float',
        ],
        methods: [
          '+ ingest_spat_message(msg: SPaTMessage): void',
          '+ negotiate_platoon_slot(leader_id: PodIdentifier): PlatoonSlot',
          '+ request_signal_priority(intersection_id: uint32_t): bool',
        ],
        relations: ['Coordinates with RoadPodMasterController'],
      },
      {
        name: 'UwbPrecisionBerthingModule',
        stereotype: '<<DockingController>>',
        description: 'Controls micro-positioning within 15mm of high-speed train platform doors for zero-barrier transfer.',
        attributes: [
          '- uwb_antenna_array: UwbTransceiver[4]',
          '- target_dock_berth: PlatformBerthID',
          '- docking_tolerance_mm: float = 12.0',
        ],
        methods: [
          '+ acquire_berth_anchors(berth: PlatformBerthID): bool',
          '+ compute_docking_error_vector(): RelativePose3D',
          '+ lock_platform_handshake_brake(): void',
        ],
        relations: ['Interfaces with StationDeckController'],
      },
    ],
    designPatterns: [
      { name: 'Publish-Subscribe (ROS 2 DDS)', usage: 'Deterministic zero-copy message routing across perception, planning, and control nodes.' },
      { name: 'Behavior Tree Architecture', usage: 'Hierarchical mission planning and edge-case resolution (e.g. stalled vehicles, pedestrian crossings).' },
      { name: 'Fail-Operational Dual Lockstep', usage: 'Secondary independent micro-controller assumes immediate steering control upon primary compute failure.' },
    ],
    stateMachine: {
      title: 'Borealis Autonomous Pod Operational State Machine',
      states: [
        { name: 'STANDBY_DEPOT', tag: 'State 0', desc: 'Battery thermal management active, pre-flight sensor diagnostics, awaiting dispatch.' },
        { name: 'DISPATCH_EN_ROUTE', tag: 'State 1', desc: 'Autonomous transit to pickup waypoint via municipal V2X green-wave corridor.' },
        { name: 'PASSENGER_BOARDING', tag: 'State 2', desc: 'Zero-step ramp deployed, accessibility verified, passenger manifest authenticated.' },
        { name: 'CORRIDOR_TRANSIT', tag: 'State 3', desc: 'Full Level 4 autonomous driving with cooperative platoon coordination.' },
        { name: 'INTERMODAL_HUB_APPROACH', tag: 'State 4', desc: 'Decelerating into dedicated Borealis Maglev multi-modal transfer apron.' },
        { name: 'UWB_BERTH_LOCK', tag: 'State 5', desc: 'Sub-centimeter docking alignment with train car door (< 15 steps cross-platform transfer).' },
        { name: 'POST_TRIP_UV_C_SANITIZE', tag: 'State 6', desc: 'Automated 90-second UV-C air and surface sterilization before subsequent passenger boarding.' },
      ],
      failsafe: 'Immediate transition to Minimum Risk Maneuver (MRM), pulling pod smoothly into shoulder with emergency hazard illumination.',
    },
    currentMilestones: [
      { title: 'ROS 2 Galactic/Humble Simulation Environment', status: 'completed', details: 'Full Gazebo/Ignition simulation with Ottawa urban roadway maps and traffic nodes.' },
      { title: 'V2X SPaT/MAP Protocol Decoders', status: 'completed', details: 'Fully validated SAE J2735 message ingestion and green-wave speed optimization.' },
      { title: 'Student Pod Task: Multi-Camera 3D Bird-Eye-View (BEV) Fusion', status: 'pod-backlog', details: 'Implement transformer-based BEV perception model in C++20/TensorRT achieving >= 30 FPS.' },
      { title: 'Student Pod Task: Intermodal Berth UWB Docking Algorithm', status: 'pod-backlog', details: 'Author sub-centimeter Kalman filter fusion combining wheel odometry, IMU, and UWB ranging.' },
    ],
  },

  'borealis-maglev': {
    id: 'borealis-maglev',
    name: 'Borealis Maglev (500 km/h Intercity Aerodynamic Tube)',
    shortName: 'Borealis Maglev',
    badge: 'Rust • QNX • CENELEC SIL-4 • Active Levitation',
    accentColor: '#0284c7',
    repo: 'BoggsSystems/borealis-os/vehicle, guideway, occ',
    architectureTier: 'CENELEC EN 50128 SIL-4 Certified • Hard Real-Time 1 kHz Control',
    overview:
      'Ultra-high-speed 500 km/h intercity ground transportation system. Operates in low-pressure aerodynamic enclosed tubes powered by active 15mm electromagnetic levitation, linear synchronous motor propulsion, and automated moving-block train control.',
    standards: [
      { name: 'CENELEC EN 50126/50128/50129 SIL-4', desc: 'Functional safety and software certification for high-speed railway signaling and control.' },
      { name: 'IEEE 1474 CBTC', desc: 'Communications-Based Train Control standards for safe moving-block separation and speed regulation.' },
      { name: 'ISO 23875', desc: 'Air quality and cabin pressure envelope management inside enclosed tube environments.' },
      { name: 'ASME Boiler and Pressure Vessel Code', desc: 'Structural integrity standards for continuous low-pressure guideway tubes.' },
    ],
    functionalReqs: [
      'Maintain continuous 15mm +/- 0.5mm levitation gap at 1000 Hz closed-loop control across all 32 magnet bogie poles.',
      'Control Linear Synchronous Motor (LSM) stator switching across guideway sections synchronized with capsule speed up to 500 km/h.',
      'Execute continuous moving-block Automatic Train Protection (ATP) with redundant wireless telemetry to Centralized OCC.',
      'Regulate capsule interior atmospheric pressure to 101.3 kPa with < 0.2 kPa/s pressure variation during tube depressurization.',
      'Manage regenerative deceleration feeding up to 88% of kinetic energy back into regional electrical storage grid.',
    ],
    nonFunctionalReqs: [
      'SIL-4 zero-panic guarantee: Software authored in 100% memory-safe Rust with formal verification proofs.',
      'Triple-modular redundant (TMR) flight computers with 2-out-of-3 majority voting executed on separate physical silicon.',
      'Eddy-current permanent magnet failsafe brakes capable of bringing capsule to a stop with zero electrical power.',
      'Maximum latency for guideway emergency halt command propagation < 10ms.',
    ],
    umlPackage: 'Borealis::MaglevAvionics::VehicleCore',
    umlClasses: [
      {
        name: 'FlightComputer',
        stereotype: '<<TripleModularRedundant>>',
        description: 'SIL-4 certified flight control supervisor executing 2-out-of-3 voting across independent processor cores.',
        attributes: [
          '- vote_channel_a: QnxIpcChannel',
          '- vote_channel_b: QnxIpcChannel',
          '- vote_channel_c: QnxIpcChannel',
          '- capsule_velocity_mps: f64',
          '- target_levitation_gap_mm: f32 = 15.0',
        ],
        methods: [
          '+ execute_control_cycle_1khz(): SafetyVoteResult',
          '+ dispatch_bogie_power_setpoints(setpoints: &[BogiePower]): Result<(), Sil4Fault>',
          '+ trigger_eddy_brake_deployment(): void',
          '+ stream_telemetry_to_occ(): OccPacket',
        ],
        relations: ['Supervises GapControlSubsystem', 'Interfaces with OccMovingBlockATP'],
      },
      {
        name: 'GapControlSubsystem',
        stereotype: '<<HardRealTimeActuator>>',
        description: 'Regulates electromagnetic suspension (EMS) coils to guarantee 15mm clearance from steel guideway.',
        attributes: [
          '- inductive_gap_sensors: [GapSensor; 32]',
          '- ems_coil_choppers: [CoilChopperHBridge; 32]',
          '- target_clearance_mm: f32 = 15.0',
        ],
        methods: [
          '+ read_gap_sensors_microsecond(): [f32; 32]',
          '+ calculate_pid_flux_adjustments(): [f32; 32]',
          '+ assert_thermal_limits(): Result<(), BogieThermalAlarm>',
        ],
        relations: ['Subsystem of FlightComputer'],
      },
      {
        name: 'OccMovingBlockATP',
        stereotype: '<<AutomaticTrainProtection>>',
        description: 'Implements SIL-4 moving-block spacing guaranteeing collision-free operation at 500 km/h with 45-second headways.',
        attributes: [
          '- current_block_authority: MovementAuthority',
          '- guideway_transponder_id: u32',
          '- safe_braking_distance_meters: f32',
        ],
        methods: [
          '+ verify_movement_authority(packet: AtpAuthPacket): bool',
          '+ enforce_dynamic_speed_profile(current_speed: f32): void',
          '+ trip_vital_relay_emergency_stop(): void',
        ],
        relations: ['Interacts with FlightComputer'],
      },
      {
        name: 'GuidewayPylonIoT',
        stereotype: '<<InfrastructureTelemetry>>',
        description: 'Distributed sensor mesh monitoring concrete tube thermal expansion, seismic drift, and vacuum pressure.',
        attributes: [
          '- pylon_index: u32',
          '- vacuum_pressure_pascals: f32',
          '- strain_gauge_tension_mpa: f32',
        ],
        methods: [
          '+ sample_structural_health(): StructuralHealthReport',
          '+ flag_guideway_obstruction_or_leak(): bool',
        ],
        relations: ['Streams to Central OCC Dispatch'],
      },
    ],
    designPatterns: [
      { name: 'Triple Modular Redundancy (TMR)', usage: 'Three independent Rust cores execute in lockstep; majority voter discards faulty telemetry.' },
      { name: 'Type-State Pattern in Rust', usage: 'Compiler statically prevents calling high-speed cruise methods unless levitation state is formally proven.' },
      { name: 'Observer Pattern with Deterministic Ring Buffers', usage: 'Zero-allocation event logging for flight telemetry and Black Box flight recorders.' },
    ],
    stateMachine: {
      title: 'Borealis Maglev Intercity Flight State Machine',
      states: [
        { name: 'STATION_DECK_LOCKED', tag: 'State 0', desc: 'Mechanical dock clamps engaged, platform airlock sealed, passenger boarding active.' },
        { name: 'LEVITATION_ENGAGED', tag: 'State 1', desc: 'EMS electromagnets energized; capsule achieves stable 15mm suspension over guideway.' },
        { name: 'GUIDEWAY_AIRLOCK_DEPRESSURIZE', tag: 'State 2', desc: 'Station berth airlock depressurizes to match tube cruise pressure (~0.05 atm).' },
        { name: 'LINEAR_BOOSTER_PULSE', tag: 'State 3', desc: 'Linear Synchronous Motor (LSM) stator coils accelerate capsule from 0 to 450 km/h in 60s.' },
        { name: 'SUPERCRUISE_500KMH', tag: 'State 4', desc: 'Aerodynamic cruise at 500 km/h under SIL-4 moving-block Automatic Train Protection.' },
        { name: 'REGENERATIVE_DECEL', tag: 'State 5', desc: 'Linear stator acts as generator, recovering 88% kinetic energy back to regional grid.' },
        { name: 'MECHANICAL_BERTH_LOCK', tag: 'State 6', desc: 'Docking clamps engage, airlock repressurizes, door aligns with Borealis Pods in < 15 steps.' },
      ],
      failsafe: 'Permanent magnet eddy-current skids deploy mechanically, decelerating capsule at 1.8G without any external electrical power.',
    },
    currentMilestones: [
      { title: 'Rust Core Vehicle Controller (no_std compliant)', status: 'completed', details: 'Deterministic 1 kHz flight computer logic with 0 heap allocations.' },
      { title: 'LSM Guideway Magnetic Inverter Simulator', status: 'completed', details: 'Full 3-phase inverter timing model validating stator handover at 500 km/h.' },
      { title: 'Student Pod Task: 1 kHz Gap-Control Kalman Filter in Rust', status: 'pod-backlog', details: 'Author real-time state observer rejecting guideway thermal deformation noise on ARM64.' },
      { title: 'Student Pod Task: CBTC Moving-Block Formal Verifier', status: 'pod-backlog', details: 'Implement TLA+ verified safe braking curve algorithms for the OCC dispatch supervisor.' },
    ],
  },

  'sovereign-mesh': {
    id: 'sovereign-mesh',
    name: 'Sovereign Mesh (Clean Energy & Microgrids)',
    shortName: 'Sovereign Mesh',
    badge: 'Rust • Edge IoT • IEEE 1547 • Sub-Cycle Inertia',
    accentColor: '#10b981',
    repo: 'BoggsSystems/helios-core',
    architectureTier: 'Distributed Grid Infrastructure • Sub-Cycle Frequency Control',
    overview:
      'Autonomous microgrid energy management and peer-to-peer load balancing system. Integrates solar arrays, industrial battery storage, and small modular reactors (SMR) with autonomous islanding and sub-cycle 60 Hz frequency droop regulation.',
    standards: [
      { name: 'IEEE 1547-2018', desc: 'Standard for interconnection and interoperability of distributed energy resources with associated electric power systems.' },
      { name: 'IEEE 2030.5 (SEP 2.0)', desc: 'Smart Energy Profile protocol for home/industrial energy management and utility demand response.' },
      { name: 'NERC CIP-002 through CIP-014', desc: 'Critical infrastructure protection standards for cyber security and grid reliability.' },
      { name: 'IEC 61850', desc: 'Communication networks and systems for power utility automation and digital substations.' },
    ],
    functionalReqs: [
      'Perform sub-cycle (16.6ms) frequency droop regulation to synthesize virtual synthetic grid inertia during unexpected generator trips.',
      'Execute seamless autonomous microgrid islanding within 8ms of bulk transmission grid disconnect without power loss to loads.',
      'Aggregate and dispatch battery energy storage systems (BESS) based on real-time locational marginal pricing and weather forecasts.',
      'Maintain resilient P2P packet mesh over encrypted LoRa and optical fiber to ensure teleprotection during commercial internet outages.',
      'Provide cryptographic audit trail of every kilowatt-hour transferred across peer nodes for municipal energy settlement.',
    ],
    nonFunctionalReqs: [
      'FIPS 140-3 Level 3 hardware security module (HSM) key isolation for all grid command authorization signatures.',
      'Mean Time to Islanding Detection < 4.0ms using multi-rate wavelet frequency analysis.',
      'Edge nodes must operate continuously without cloud connectivity for up to 90 days in disconnected island mode.',
      'Telemetry ingestion throughput capable of handling 50,000 smart inverter measurements per second per aggregation node.',
    ],
    umlPackage: 'Helios::GridMesh::DistributedPower',
    umlClasses: [
      {
        name: 'GridEdgeNode',
        stereotype: '<<AutonomousAgent>>',
        description: 'Embedded edge controller deployed at each substation, solar farm, or industrial battery bank.',
        attributes: [
          '- node_id: GridNodeUuid',
          '- active_power_kw: f64',
          '- reactive_power_kvar: f64',
          '- grid_frequency_hz: f32',
          '- islanding_state: IslandingMode',
        ],
        methods: [
          '+ sample_phase_voltage_current(): PhasorMeasurement',
          '+ dispatch_inverter_curtailment(percentage: f32): void',
          '+ initiate_island_disconnect(): bool',
          '+ broadcast_p2p_mesh_telemetry(): void',
        ],
        relations: ['Composes FrequencyDroopController', 'Interacts with BmsTelemetryBridge'],
      },
      {
        name: 'FrequencyDroopController',
        stereotype: '<<SubCycleController>>',
        description: 'Implements synthetic inertia algorithms to stabilize 60 Hz grid frequency during sudden load spikes.',
        attributes: [
          '- nominal_frequency_hz: f32 = 60.0',
          '- droop_slope_percentage: f32 = 4.0',
          '- sampling_interval_us: u32 = 250',
        ],
        methods: [
          '+ compute_reactive_injection(freq_error: f32): PowerSetpoint',
          '+ trigger_synthetic_inertia_surge(dv_dt: f32): void',
        ],
        relations: ['Integrated with InverterHwDriver'],
      },
      {
        name: 'PeerMeshRouter',
        stereotype: '<<FaultTolerantNetworking>>',
        description: 'Maintains an ad-hoc, resilient multi-hop communication fabric across substations over LoRa/Fiber.',
        attributes: [
          '- active_mesh_peers: HashMap<NodeId, RouteCost>',
          '- fallback_lora_transceiver: LoRaDevice',
          '- cryptographic_keypair: Ed25519SignatureKey',
        ],
        methods: [
          '+ forward_teleprotection_packet(pkt: TeleprotectPacket): void',
          '+ elect_mesh_cluster_leader(): NodeId',
          '+ audit_energy_transfer_settlement(): HashDigest',
        ],
        relations: ['Routes for GridEdgeNode'],
      },
    ],
    designPatterns: [
      { name: 'Consensus-Free Local Optimization', usage: 'Each edge node makes autonomous frequency stabilizing decisions in < 2ms without waiting for network consensus.' },
      { name: 'Gossip Protocol Mesh', usage: 'Energy pricing and generation forecasts propagate efficiently across thousands of distributed solar/storage nodes.' },
      { name: 'Hardware Security Boundary', usage: 'All firmware updates and remote curtailment orders require multi-signature cryptographic authorization.' },
    ],
    stateMachine: {
      title: 'Sovereign Mesh Autonomous Microgrid State Machine',
      states: [
        { name: 'GRID_TIED_NORMAL', tag: 'State 0', desc: 'Synchronized with provincial transmission grid; tracking 60 Hz baseline and arbitrage dispatch.' },
        { name: 'FREQUENCY_ANOMALY_SURGE', tag: 'State 1', desc: 'Sub-cycle frequency dip detected; BESS injects synthetic inertia within 12ms to arrest rate of change of frequency (RoCoF).' },
        { name: 'ISLANDING_DISCONNECT', tag: 'State 2', desc: 'Transmission line fault detected; solid-state transfer switch isolates microgrid in < 8ms.' },
        { name: 'ISLANDED_AUTONOMOUS', tag: 'State 3', desc: 'Operating as independent energy island, balancing local generation against critical municipal loads.' },
        { name: 'PEER_LOAD_SHEDDING', tag: 'State 4', desc: 'Algorithmic prioritization sheds non-essential HVAC while preserving hospitals and transit hubs.' },
        { name: 'GRID_RESTORATION_RESYNC', tag: 'State 5', desc: 'Zero-crossing phase lock synchronization re-engages microgrid seamlessly with primary grid.' },
      ],
      failsafe: 'Instantaneous mechanical bypass breaker drops to isolate substation and prevent downstream overvoltage.',
    },
    currentMilestones: [
      { title: 'Sub-Cycle Phasor Measurement Unit (PMU) Ingestion Engine', status: 'completed', details: 'Streams and timestamps 4800 samples/sec synchrophasor data using Rust.' },
      { title: 'Synthetic Grid Inertia Simulation Bench', status: 'completed', details: 'Validated on simulated 100 MW solar + 50 MWh storage microgrid network.' },
      { title: 'Student Pod Task: Encrypted LoRa Teleprotection Protocol', status: 'pod-backlog', details: 'Implement zero-allocation packet framing and cryptographic authentication over 915 MHz LoRa.' },
      { title: 'Student Pod Task: Multi-Agent Dynamic Pricing Arbitrage Engine', status: 'pod-backlog', details: 'Develop reinforcement learning agent for 24-hour predictive battery storage charge/discharge scheduling.' },
    ],
  },

  'digitpop': {
    id: 'digitpop',
    name: 'DigitPop Interactive Shoppable Video & Live Commerce',
    shortName: 'DigitPop',
    badge: 'TypeScript • WebAssembly • WebGL • Sub-10ms Hotspots',
    accentColor: '#c084fc',
    repo: 'BoggsSystems/digitpop-web-sdk & shoppable-video-platform',
    architectureTier: 'Ultra-Low-Latency Client SDK • High-Concurrency Video Streaming',
    overview:
      'Enterprise video monetization engine embedding interactive, clickable hotspots and 1-click tokenized checkout into live and recorded video streams. Delivers sub-frame spatial object tracking without video buffering or frame drops.',
    standards: [
      { name: 'W3C WebCodecs API', desc: 'Direct access to hardware-accelerated video decoders inside modern browser runtimes.' },
      { name: 'W3C Media Source Extensions (MSE)', desc: 'Adaptive bitrate streaming over Low-Latency HLS (LL-HLS) and DASH.' },
      { name: 'IAB VAST 4.2 / VPAID', desc: 'Standardized digital video advertising and interactive overlay communication.' },
      { name: 'PCI-DSS Level 1 / Tokenization', desc: 'Zero-friction payment tokenization isolating sensitive credit credentials from client DOM.' },
    ],
    functionalReqs: [
      'Render dynamic interactive SVG and WebGL overlays synchronized to video timestamps with < 8ms spatial drift.',
      'Compensate for camera pan/tilt/zoom using client-side WebAssembly motion vector tracking.',
      'Enable 1-click instant in-stream checkout via Apple Pay, Google Pay, and Stripe Elements without pausing video playback.',
      'Handle millions of concurrent video viewers streaming live shopping drops with resilient edge caching.',
      'Emit real-time click-stream and hover telemetry with deterministic sub-second ingestion to founder analytics dashboards.',
    ],
    nonFunctionalReqs: [
      'Web SDK bundle size strictly capped under 42 KB gzipped with zero external runtime dependencies.',
      'Zero impact on Core Web Vitals: Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) must stay in the green (< 100ms).',
      'Graceful degradation: If WebAssembly or WebGL are unsupported, transparently fallback to standard DOM SVG overlays.',
      'Cross-browser support for Safari iOS, Chrome Android, Firefox, and Chromium desktop engines.',
    ],
    umlPackage: 'DigitPop::ClientSDK::InteractiveVideo',
    umlClasses: [
      {
        name: 'ShoppableVideoPlayer',
        stereotype: '<<PlayerRuntime>>',
        description: 'Wraps HTML5 video and WebCodecs pipeline with interactive canvas coordinate mapping.',
        attributes: [
          '- video_element: HTMLVideoElement',
          '- overlay_canvas: HTMLCanvasElement',
          '- active_manifest: InteractiveVideoManifest',
          '- current_time_ms: number',
        ],
        methods: [
          '+ attach_to_dom_container(container: HTMLElement): void',
          '+ load_interactive_manifest(url: string): Promise<void>',
          '+ register_hotspot_click_handler(cb: HotspotCallback): void',
          '+ open_quick_checkout(productId: string): void',
        ],
        relations: ['Composes SpatialProductTracker', 'Integrates CheckoutCartBridge'],
      },
      {
        name: 'SpatialProductTracker',
        stereotype: '<<WasmEngine>>',
        description: 'Compiled C++/Rust WebAssembly module performing optical flow tracking on moving video objects.',
        attributes: [
          '- wasm_memory: WebAssembly.Memory',
          '- tracking_keyframes: Array<KeyframeCoordinate>',
        ],
        methods: [
          '+ interpolate_bounding_box(time_ms: number): BoundingBox2D',
          '+ apply_camera_motion_compensation(matrix: Float32Array): void',
        ],
        relations: ['Rendered by ShoppableVideoPlayer'],
      },
      {
        name: 'CheckoutCartBridge',
        stereotype: '<<PaymentCoordinator>>',
        description: 'Manages seamless in-stream tokenized checkout without disrupting the video audio/video stream.',
        attributes: [
          '- stripe_elements_instance: StripeInstance',
          '- digital_wallet_detected: boolean',
          '- active_cart_session: CartSession',
        ],
        methods: [
          '+ initiate_instant_purchase(product: ProductSku): Promise<OrderConfirmation>',
          '+ tokenize_payment_credentials(token: string): boolean',
        ],
        relations: ['Invoked from ShoppableVideoPlayer'],
      },
    ],
    designPatterns: [
      { name: 'Flyweight Pattern', usage: 'Recycles hotspot DOM and WebGL mesh instances to eliminate garbage collection pauses during 60 FPS playback.' },
      { name: 'Observer Pattern', usage: 'Emits decoupled playback, engagement, and conversion events to external analytics and ad attribution networks.' },
      { name: 'Strategy Pattern', usage: 'Dynamically selects optimal video decoder pipeline (WebCodecs vs MSE vs native video) based on client device capabilities.' },
    ],
    stateMachine: {
      title: 'DigitPop Video Interaction State Machine',
      states: [
        { name: 'MANIFEST_FETCH', tag: 'State 0', desc: 'Fetching video stream playlist and interactive JSON coordinates from CDN edge.' },
        { name: 'STREAM_BUFFERING', tag: 'State 1', desc: 'Hardware-accelerated video decoding initialized; WebAssembly tracker instantiated.' },
        { name: 'INTERACTIVE_PLAYBACK', tag: 'State 2', desc: 'Hotspots animating smoothly over moving products at 60 FPS in sync with video time.' },
        { name: 'HOTSPOT_HOVER_EXPAND', tag: 'State 3', desc: 'Product preview card expands non-intrusively displaying live inventory and price.' },
        { name: 'QUICK_CHECKOUT_OVERLAY', tag: 'State 4', desc: 'Biometric 1-click Apple Pay/Google Pay drawer opens over bottom portion of video.' },
        { name: 'ORDER_CONFIRMED', tag: 'State 5', desc: 'Cryptographic transaction receipt displayed; video stream resumes uninterrupted.' },
      ],
      failsafe: 'Automatic fallback to passive video playback if browser hardware acceleration or canvas context is lost.',
    },
    currentMilestones: [
      { title: 'Zero-Dependency TypeScript Embed SDK (< 38 KB)', status: 'completed', details: 'Production embed deployed across live customer web stores.' },
      { title: 'Sub-Frame WebAssembly Interpolator', status: 'completed', details: 'Achieved smooth 60 FPS hotspot tracking across 4K video feeds.' },
      { title: 'Student Pod Task: WebCodecs Hardware Video Frame Synchronizer', status: 'pod-backlog', details: 'Author direct WebCodecs VideoFrame extractor to eliminate timestamp drift during video scrubbing.' },
      { title: 'Student Pod Task: Multi-Platform Shopify / WooCommerce Dynamic Webhooks', status: 'pod-backlog', details: 'Build ultra-fast serverless webhooks syncing inventory stock in real-time to active video overlays.' },
    ],
  },

  'opportunity-os': {
    id: 'opportunity-os',
    name: 'Opportunity OS (Social Plank & Dignity Engine)',
    shortName: 'Opportunity OS',
    badge: 'TypeScript • Next.js • AI Agents • Knowledge Graph',
    accentColor: '#10b981',
    repo: 'BoggsSystems/opportunity-os',
    architectureTier: 'Distributed Graph Engine • Ethical AI Workforce Matching',
    overview:
      'Anti-bias career navigation and skills-based opportunity matching platform. Replaces corporate resume keyword scanners with verifiable project milestones, automated AI skill interviews, and direct engineering pod recruitment for talent.',
    standards: [
      { name: 'W3C Verifiable Credentials', desc: 'Cryptographically verifiable skill attestations and capstone project completion certificates.' },
      { name: 'Open Badges 3.0 / IEEE P1484.20', desc: 'Standardized digital credential metadata for lifelong educational achievements.' },
      { name: 'SOC-2 Type II & GDPR Privacy', desc: 'Strict candidate data protection, complete right-to-be-forgotten, and zero third-party data broker sharing.' },
      { name: 'EEOC & Algorithmic Bias Compliance', desc: 'Formal bias-auditing algorithms eliminating age, gender, and demographic scoring distortion.' },
    ],
    functionalReqs: [
      'Deconstruct unstructured applicant resumes and GitHub code repositories into structured multidimensional skill graphs.',
      'Generate semantic vector embeddings for candidates and match against engineering pod specifications with cosine similarity >= 0.88.',
      'Conduct interactive multimodal AI technical interviews with standardized rubrics, compiling feedback without human evaluator bias.',
      'Facilitate 1-click student applications with zero redundant form entry and immediate 24-hour review dispatch.',
      'Issue tamper-evident cryptographic credentials upon completion of senior capstone software projects.',
    ],
    nonFunctionalReqs: [
      'Zero algorithmic discrimination: Blind evaluation mode hides applicant names, photos, and institutional prestige markers.',
      'Candidate vector search query latency under 45ms across a knowledge graph of 250,000 engineering profiles.',
      'Complete end-to-end encryption for candidate transcripts, source code submissions, and interview recordings.',
      '99.95% API availability with automated horizontal scaling across multi-region serverless clusters.',
    ],
    umlPackage: 'OpportunityOS::TalentEngine::Core',
    umlClasses: [
      {
        name: 'CandidateProfileGraph',
        stereotype: '<<EntityGraph>>',
        description: 'Represents verified competencies, GitHub commits, capstone milestones, and skill nodes.',
        attributes: [
          '- candidate_id: CandidateUuid',
          '- skill_vector_embedding: Float32Array[1536]',
          '- verified_credentials: Array<VerifiableCredential>',
          '- github_metrics: GithubContributionScore',
        ],
        methods: [
          '+ ingest_github_repository(repo_url: string): Promise<SkillAssessment>',
          '+ compute_graph_centrality(): Map<SkillTag, number>',
          '+ export_blind_profile(): SanitizedCandidateView',
        ],
        relations: ['Evaluated by SemanticVectorMatcher', 'Updated by InterviewSimulator'],
      },
      {
        name: 'SemanticVectorMatcher',
        stereotype: '<<MatchingEngine>>',
        description: 'Performs hybrid dense-sparse vector search pairing candidate graphs with open Capstone Pod requisitions.',
        attributes: [
          '- vector_index: QdrantVectorStore',
          '- similarity_threshold: number = 0.85',
        ],
        methods: [
          '+ rank_candidates_for_requisition(reqId: string): Promise<Array<RankedCandidate>>',
          '+ calculate_skill_gap_analysis(cId: string, reqId: string): SkillGapReport',
        ],
        relations: ['Matches with CorporateTalentBridge'],
      },
      {
        name: 'InterviewSimulator',
        stereotype: '<<AgentWorkflow>>',
        description: 'Autonomous technical interviewer that conducts real-time coding assessments and architectural discussions.',
        attributes: [
          '- llm_agent_supervisor: AgentSupervisor',
          '- rubric_evaluator: ScoringRubricModel',
          '- sandbox_environment: DockerExecutionSandbox',
        ],
        methods: [
          '+ start_session(candidateId: string, topic: string): InterviewSession',
          '+ evaluate_code_execution(code: string, tests: string[]): TestResult',
          '+ compile_holistic_feedback(): CandidateEvaluationReport',
        ],
        relations: ['Updates CandidateProfileGraph'],
      },
    ],
    designPatterns: [
      { name: 'Hexagonal Architecture (Ports & Adapters)', usage: 'Isolates core matching and evaluation logic from external ATS systems (Greenhouse, Lever, Workday).' },
      { name: 'CQRS (Command Query Responsibility Segregation)', usage: 'Separates high-frequency skill graph updates from lightning-fast vector similarity queries.' },
      { name: 'Blind Audit Pipeline Pattern', usage: 'Sanitizes and masks candidate PII before feeding into evaluation models to enforce ethical fairness.' },
    ],
    stateMachine: {
      title: 'Opportunity OS Student Onboarding & Matching State Machine',
      states: [
        { name: 'PROFILE_INGESTION', tag: 'State 0', desc: 'Candidate submits GitHub profile, project briefs, and uOttawa academic focus.' },
        { name: 'CODE_REPOSITORY_PARSING', tag: 'State 1', desc: 'Deconstructs Git commits, C++/Rust/TS expertise, and architectural design patterns.' },
        { name: 'VECTOR_GRAPH_EMBEDDING', tag: 'State 2', desc: 'Generates multidimensional skill vector and indexes into sovereign talent graph.' },
        { name: 'POD_REQUIREMENT_MATCHING', tag: 'State 3', desc: 'Matches candidate with Smart Mohs, Borealis Pods, or Maglev senior capstone roles.' },
        { name: 'FOUNDER_24H_REVIEW', tag: 'State 4', desc: 'Direct review by founder Jeff Boggs; fast-track approval without corporate bureaucracy.' },
        { name: 'DIGITAL_NDA_&_REPO_ACCESS', tag: 'State 5', desc: 'Mutual IP agreement signed; candidate onboarded with push permissions to active codebase.' },
      ],
      failsafe: 'Automatic human escalation if algorithmic matching score exhibits edge-case variance or ambiguous skill categorization.',
    },
    currentMilestones: [
      { title: 'Vector Matching Engine (Next.js & Supabase pgvector)', status: 'completed', details: 'Full semantic search indexing candidates against engineering role requisitions.' },
      { title: 'Blind Evaluation Anonymization Pipeline', status: 'completed', details: 'Audited and verified zero-bias profile masking across demographics.' },
      { title: 'Student Pod Task: Multi-Agent Interactive Code Interview Sandbox', status: 'pod-backlog', details: 'Integrate real-time browser WebAssembly code editor with live AI rubric grading.' },
      { title: 'Student Pod Task: W3C Verifiable Credential Issuer', status: 'pod-backlog', details: 'Implement digital signature generation for graduating students completing capstone projects.' },
    ],
  },
};

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({
  isOpen,
  onClose,
  initialSystem = 'smart-mohs',
  onApplyForSystem,
}) => {
  const [selectedSystemId, setSelectedSystemId] = useState<string>(initialSystem);
  const [activeTab, setActiveTab] = useState<'requirements' | 'uml' | 'lifecycle' | 'backlog'>('requirements');

  useEffect(() => {
    if (isOpen && initialSystem) {
      const resolved = initialSystem === 'transit-os' ? 'borealis-pods' : initialSystem;
      if (ARCHITECTURE_DATA[resolved]) {
        setSelectedSystemId(resolved);
      }
    }
  }, [isOpen, initialSystem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSystem = ARCHITECTURE_DATA[selectedSystemId] || ARCHITECTURE_DATA['smart-mohs'];

  const handleApplyClick = () => {
    onClose();
    if (onApplyForSystem) {
      onApplyForSystem(selectedSystemId);
    }
  };

  return (
    <div className="boggs-arch-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="boggs-arch-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="boggs-arch-modal-header">
          <div className="boggs-arch-header-left">
            <div className="boggs-arch-badge" style={{ borderColor: currentSystem.accentColor, color: currentSystem.accentColor }}>
              <FileCode2 size={15} /> Formal Engineering Decomposition
            </div>
            <h2 className="boggs-arch-title">{currentSystem.name}</h2>
            <div className="boggs-arch-submeta">
              <span className="boggs-arch-repo-badge">
                <GitBranch size={13} /> {currentSystem.repo}
              </span>
              <span className="boggs-arch-tier-badge">
                <Shield size={13} /> {currentSystem.architectureTier}
              </span>
            </div>
          </div>
          <button className="boggs-arch-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* System Selector Pills */}
        <div className="boggs-arch-system-pills">
          {Object.values(ARCHITECTURE_DATA).map((sys) => {
            const isSelected = sys.id === selectedSystemId;
            return (
              <button
                key={sys.id}
                onClick={() => setSelectedSystemId(sys.id)}
                className={`boggs-arch-pill-btn ${isSelected ? 'active' : ''}`}
                style={
                  isSelected
                    ? {
                        borderColor: sys.accentColor,
                        background: `${sys.accentColor}18`,
                        color: '#ffffff',
                      }
                    : undefined
                }
              >
                <span
                  className="boggs-arch-pill-dot"
                  style={{ background: isSelected ? sys.accentColor : '#64748b' }}
                />
                {sys.shortName}
              </button>
            );
          })}
        </div>

        {/* Modal Navigation Tabs */}
        <div className="boggs-arch-tabs">
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <Shield size={15} /> 1. Requirements & Standards
          </button>
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'uml' ? 'active' : ''}`}
            onClick={() => setActiveTab('uml')}
          >
            <Layers size={15} /> 2. UML Class Model & Design
          </button>
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'lifecycle' ? 'active' : ''}`}
            onClick={() => setActiveTab('lifecycle')}
          >
            <Activity size={15} /> 3. Lifecycle & State Machine
          </button>
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'backlog' ? 'active' : ''}`}
            onClick={() => setActiveTab('backlog')}
          >
            <GraduationCap size={15} /> 4. Capstone Pod Backlog
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="boggs-arch-body">
          {/* TAB 1: REQUIREMENTS & STANDARDS */}
          {activeTab === 'requirements' && (
            <div className="boggs-arch-tab-content">
              <div className="boggs-arch-overview-box">
                <p>{currentSystem.overview}</p>
              </div>

              <div className="boggs-arch-section">
                <h3 className="boggs-arch-section-heading">
                  <Shield size={17} style={{ color: currentSystem.accentColor }} /> Regulatory & Industry Standards
                </h3>
                <div className="boggs-arch-standards-grid">
                  {currentSystem.standards.map((std, idx) => (
                    <div key={idx} className="boggs-arch-standard-card">
                      <div className="boggs-arch-standard-title" style={{ color: currentSystem.accentColor }}>
                        {std.name}
                      </div>
                      <div className="boggs-arch-standard-desc">{std.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="boggs-arch-grid-two">
                <div className="boggs-arch-section">
                  <h3 className="boggs-arch-section-heading">
                    <CheckCircle2 size={16} color="#38bdf8" /> Functional Requirements (FR)
                  </h3>
                  <ul className="boggs-arch-req-list">
                    {currentSystem.functionalReqs.map((req, idx) => (
                      <li key={idx} className="boggs-arch-req-item">
                        <span className="boggs-arch-req-num">FR-{idx + 1}</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="boggs-arch-section">
                  <h3 className="boggs-arch-section-heading">
                    <Zap size={16} color="#f59e0b" /> Non-Functional & Safety Requirements (NFR)
                  </h3>
                  <ul className="boggs-arch-req-list">
                    {currentSystem.nonFunctionalReqs.map((req, idx) => (
                      <li key={idx} className="boggs-arch-req-item">
                        <span className="boggs-arch-req-num" style={{ color: '#f59e0b' }}>NFR-{idx + 1}</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UML CLASS MODEL & DESIGN */}
          {activeTab === 'uml' && (
            <div className="boggs-arch-tab-content">
              <div className="boggs-arch-package-header">
                <span className="boggs-arch-package-label">Package Scope:</span>
                <code>{currentSystem.umlPackage}</code>
              </div>

              {/* Design Patterns Callout */}
              <div className="boggs-arch-patterns-strip">
                <div className="boggs-arch-patterns-title">
                  <Cpu size={15} /> Architecture Patterns:
                </div>
                <div className="boggs-arch-patterns-pills">
                  {currentSystem.designPatterns.map((pat, idx) => (
                    <div key={idx} className="boggs-arch-pattern-pill" title={pat.usage}>
                      <strong>{pat.name}:</strong> <span>{pat.usage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* UML Classes Decomposition */}
              <div className="boggs-arch-classes-grid">
                {currentSystem.umlClasses.map((cls, idx) => (
                  <div key={idx} className="boggs-arch-class-box">
                    <div className="boggs-arch-class-header">
                      {cls.stereotype && (
                        <span className="boggs-arch-stereotype">{cls.stereotype}</span>
                      )}
                      <div className="boggs-arch-classname" style={{ color: currentSystem.accentColor }}>
                        {cls.name}
                      </div>
                      <p className="boggs-arch-class-desc">{cls.description}</p>
                    </div>

                    <div className="boggs-arch-class-members">
                      <div className="boggs-arch-member-block">
                        <div className="boggs-arch-member-title">Attributes / Fields</div>
                        {cls.attributes.map((attr, aIdx) => (
                          <div key={aIdx} className="boggs-arch-code-line attribute">
                            {attr}
                          </div>
                        ))}
                      </div>

                      <div className="boggs-arch-member-block">
                        <div className="boggs-arch-member-title">Methods / Operations</div>
                        {cls.methods.map((meth, mIdx) => (
                          <div key={mIdx} className="boggs-arch-code-line method">
                            {meth}
                          </div>
                        ))}
                      </div>

                      {cls.relations.length > 0 && (
                        <div className="boggs-arch-member-block relations">
                          <div className="boggs-arch-member-title">Relationships & Constraints</div>
                          {cls.relations.map((rel, rIdx) => (
                            <div key={rIdx} className="boggs-arch-code-line relation">
                              ↳ {rel}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LIFECYCLE & STATE MACHINE */}
          {activeTab === 'lifecycle' && (
            <div className="boggs-arch-tab-content">
              <div className="boggs-arch-state-header">
                <Activity size={18} style={{ color: currentSystem.accentColor }} />
                <h3>{currentSystem.stateMachine.title}</h3>
              </div>

              {/* State Machine Flow Timeline */}
              <div className="boggs-arch-states-timeline">
                {currentSystem.stateMachine.states.map((st, idx) => (
                  <div key={idx} className="boggs-arch-timeline-node">
                    <div className="boggs-arch-node-marker">
                      <div className="boggs-arch-node-circle" style={{ borderColor: currentSystem.accentColor }}>
                        {idx}
                      </div>
                      {idx < currentSystem.stateMachine.states.length - 1 && (
                        <div className="boggs-arch-node-connector" />
                      )}
                    </div>
                    <div className="boggs-arch-node-card">
                      <div className="boggs-arch-node-top">
                        <span className="boggs-arch-state-tag" style={{ background: `${currentSystem.accentColor}22`, color: currentSystem.accentColor }}>
                          {st.tag}
                        </span>
                        <span className="boggs-arch-state-name">{st.name}</span>
                      </div>
                      <p className="boggs-arch-state-desc">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Failsafe Callout */}
              <div className="boggs-arch-failsafe-box">
                <div className="boggs-arch-failsafe-title">
                  <Shield size={16} /> Autonomous Failsafe & Safe-State Protocol
                </div>
                <p className="boggs-arch-failsafe-text">{currentSystem.stateMachine.failsafe}</p>
              </div>
            </div>
          )}

          {/* TAB 4: CAPSTONE POD BACKLOG */}
          {activeTab === 'backlog' && (
            <div className="boggs-arch-tab-content">
              <div className="boggs-arch-backlog-header">
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#f8fafc' }}>
                    uOttawa Senior Capstone / Co-op Work Breakdown
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
                    We do not assign hypothetical homework. Selected students join active engineering repositories with verified CI pipelines, unit test suites, and hardware simulators.
                  </p>
                </div>
              </div>

              <div className="boggs-arch-milestones-list">
                {currentSystem.currentMilestones.map((m, idx) => {
                  const isDone = m.status === 'completed';
                  return (
                    <div
                      key={idx}
                      className={`boggs-arch-milestone-item ${isDone ? 'done' : 'active-pod'}`}
                    >
                      <div className="boggs-arch-milestone-status">
                        {isDone ? (
                          <span className="boggs-arch-status-pill green">
                            <CheckCircle2 size={13} /> Current Baseline (Verified)
                          </span>
                        ) : (
                          <span className="boggs-arch-status-pill amber">
                            <Sparkles size={13} /> Capstone Pod Scope (2026/2027)
                          </span>
                        )}
                      </div>
                      <h4 className="boggs-arch-milestone-title">{m.title}</h4>
                      <p className="boggs-arch-milestone-details">{m.details}</p>
                    </div>
                  );
                })}
              </div>

              {/* Funnel Note */}
              <div className="boggs-arch-funnel-callout">
                <GraduationCap size={20} color="#38bdf8" />
                <div>
                  <strong>Ready to commit code to this system?</strong>
                  <div style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '2px' }}>
                    Submit your application brief below. Jeff Boggs conducts 24h technical reviews, issues our fast-track digital NDA, and provisions direct GitHub repository access.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="boggs-arch-footer">
          <div className="boggs-arch-footer-meta">
            Target Repo: <code>{currentSystem.repo}</code>
          </div>
          <div className="boggs-arch-footer-actions">
            <button className="boggs-arch-secondary-btn" onClick={onClose}>
              Close Blueprint
            </button>
            <button
              className="boggs-arch-primary-btn"
              style={{ background: currentSystem.accentColor, color: currentSystem.id === 'smart-mohs' ? '#000000' : '#ffffff' }}
              onClick={handleApplyClick}
            >
              <GraduationCap size={16} /> Apply for this Pod <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
