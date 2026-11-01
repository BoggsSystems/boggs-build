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
  Users,
} from 'lucide-react';
import { SystemArchitectureDiagrams } from './SystemArchitectureDiagrams';

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


  'robot-fleet': {
    id: 'robot-fleet',
    name: 'Robot Fleet: Heterogeneous Humanoid & Quadruped Orchestration',
    shortName: 'Robot Fleet',
    badge: 'CycloneDDS • MuJoCo • Unitree SDK2 • DTDL v3',
    accentColor: '#06b6d4',
    repo: 'BoggsSystems/robot_fleet',
    architectureTier: 'Distributed Multi-Agent Architecture • Real-Time Physical Embodiment',
    overview:
      'Autonomous embodied multi-agent platform coordinating teams of Unitree G1 humanoids, Go2 quadrupeds, and PX4 aerial drones across enterprise fulfillment and harsh remote operational domains. Couples physics-accurate MuJoCo sim-to-real embodied training with real-time CycloneDDS joint telemetry and live Azure Digital Twins spatial graph management.',
    standards: [
      { name: 'ISO 13482:2014', desc: 'Robots and robotic devices — Safety requirements for personal care and industrial mobile handling robots.' },
      { name: 'OMG DDS-RTPS / ROS 2', desc: 'Deterministic microsecond publish-subscribe middleware standard for distributed real-time control.' },
      { name: 'IEEE 1872 / DTDL v3', desc: 'Standard ontologies for robotics, automation, and Azure Digital Twin spatial boundary graphs.' },
      { name: 'MAVLink 2.0 / PX4', desc: 'Micro Air Vehicle Communication Protocol for mission autopilot guidance and geofenced waypoint enforcement.' },
    ],
    functionalReqs: [
      'Coordinate Unitree G1 33-DOF joint kinematics for bipedal locomotion and dual-arm dexterous manipulation.',
      'Stream real-time 60 FPS video frames and YOLOv8 3D bounding boxes over low-latency ZeroMQ PUB/SUB pipelines.',
      'Execute sequential tri-modal rendezvous workflows transferring payloads from humanoid pickers to quadruped carrier saddles.',
      'Synchronize dynamic robot positions and topological zone occupancy into Azure Digital Twins within 45ms.',
      'Trigger autonomous return-to-base and docking when battery state of charge (BMS) falls below 18%.',
    ],
    nonFunctionalReqs: [
      'Maintain sub-10ms motor command loop jitter over CycloneDDS to avoid kinematic instability or oscillation.',
      'Enforce hardwired hardware emergency stop relays halting all joint actuators within < 5ms of safety boundary breach.',
      'Constrain sim-to-real joint impedance tracking error in MuJoCo to <= 4.5% during high-load cargo transport.',
      'Ensure zero-trust cryptographic mutual TLS authentication across all cloud-to-device Azure IoT Hub command channels.',
    ],
    umlPackage: 'BoggsSystems::EmbodiedRobotics::FleetOrchestrator',
    umlClasses: [
      {
        name: 'RobotFleetManager',
        stereotype: '<<CentralMediator>>',
        description: 'Central fleet dispatcher coordinating multi-agent task allocations, priority queuing, and spatial collision avoidance.',
        attributes: [
          '- active_agents: Map<string, IRobotAdapter>',
          '- mission_queue: PriorityQueue<TaskWorkflow>',
          '- spatial_grid: TopologicalSpatialIndex',
        ],
        methods: [
          '+ register_robot(agent: IRobotAdapter): void',
          '+ dispatch_mission(mission: MissionSpec): Promise<void>',
          '+ trigger_global_estop(): void',
        ],
        relations: ['1 ──* IRobotAdapter', '1 ──1 CollaborationWorkflows'],
      },
      {
        name: 'IRobotAdapter',
        stereotype: '<<Interface / HAL>>',
        description: 'Abstract hardware abstraction layer standardizing commands across humanoids, quadrupeds, and aerial drones.',
        attributes: [
          '+ agent_id: string',
          '+ battery_soc: float',
          '+ operational_state: AgentState',
        ],
        methods: [
          '+ move_to_waypoint(pos: Vector3D): Promise<bool>',
          '+ execute_primitive(action: PrimitiveAction): void',
          '+ get_joint_states(): JointTelemetry',
        ],
        relations: ['Generalization for G1, Go2, and PX4 adapters'],
      },
      {
        name: 'G1HumanoidAdapter',
        stereotype: '<<DexterousManipulator>>',
        description: 'Unitree G1 33-DOF humanoid kinematics controller handling fine object grasping and shelf manipulation.',
        attributes: [
          '- dds_lowcmd_pub: DdsPublisher<LowCmd>',
          '- dds_lowstate_sub: DdsSubscriber<LowState>',
          '- mujoco_impedance_solver: KinematicsSolver',
        ],
        methods: [
          '+ execute_bipedal_step(gait: GaitConfig): void',
          '+ grasp_object(box: BoundingBox3D): Promise<bool>',
          '+ latch_to_quadruped(target: Go2CarrierAdapter): void',
        ],
        relations: ['Implements IRobotAdapter', 'Uses MuJoCo Physics Model'],
      },
      {
        name: 'Go2CarrierAdapter',
        stereotype: '<<RoughTerrainMule>>',
        description: 'Unitree Go2 quadruped transport mule controller handling high-payload stability and curbside delivery.',
        attributes: [
          '- payload_weight_kg: float',
          '- terrain_mode: TerrainProfile',
          '- contact_sensors: FootContactArray',
        ],
        methods: [
          '+ traverse_rough_terrain(path: Waypoint[]): void',
          '+ lock_saddle_cargo(): void',
          '+ release_saddle_cargo(): void',
        ],
        relations: ['Implements IRobotAdapter', 'Collaborates with G1HumanoidAdapter'],
      },
      {
        name: 'CollaborationWorkflows',
        stereotype: '<<StateOrchestrator>>',
        description: 'Sequential multi-robot handoff state machine executing tri-modal delivery and fulfillment protocols.',
        attributes: [
          '- active_workflows: List<TriModalWorkflow>',
          '- synchronization_barrier: RendezvousBarrier',
        ],
        methods: [
          '+ initiate_handoff(picker: G1, carrier: Go2): void',
          '+ verify_aerial_clearance(drone: PX4): bool',
          '+ commit_handshake_state(): void',
        ],
        relations: ['Controlled by RobotFleetManager'],
      },
      {
        name: 'DigitalTwinClient',
        stereotype: '<<DTDLv3Client>>',
        description: 'Azure Digital Twins graph synchronization client mapping live robot coordinates into enterprise WMS digital twins.',
        attributes: [
          '- adt_endpoint: Uri',
          '- dtdl_model_cache: ModelDirectory',
          '- telemetry_batch_queue: Queue<TwinUpdate>',
        ],
        methods: [
          '+ update_robot_twin(telemetry: JointTelemetry): void',
          '+ query_zone_occupancy(zoneId: string): TwinNode[]',
          '+ patch_relationship(source: string, target: string): void',
        ],
        relations: ['Bridges Fleet to Azure Digital Twins'],
      },
    ],
    designPatterns: [
      { name: 'Mediator Pattern', usage: 'RobotFleetManager orchestrates message dispatch and priority queuing between heterogeneous agents.' },
      { name: 'Adapter Pattern', usage: 'IRobotAdapter normalizes CycloneDDS, MAVLink, and ZMQ topics into uniform high-level primitives.' },
      { name: 'State Pattern', usage: 'Strict hierarchical state machines govern robot rendezvous and prevent uncalibrated motion.' },
    ],
    stateMachine: {
      title: 'Embodied Fleet Multi-Agent Rendezvous & Mission State Machine',
      states: [
        { name: 'IDLE_CHARGING', tag: 'State 0', desc: 'Inductive docking station engagement with BMS health verification.' },
        { name: 'MISSION_DISPATCH', tag: 'State 1', desc: 'WMS order receipt, DTDL zone reservation, and multi-agent assignment.' },
        { name: 'AERIAL_CLEARANCE', tag: 'State 2', desc: 'PX4 drone waypoint scan verifying collision-free path for ground agents.' },
        { name: 'BIPEDAL_MANIPULATION', tag: 'State 3', desc: 'G1 humanoid identifies payload via YOLOv8 and executes 33-DOF grasping.' },
        { name: 'COLLABORATIVE_LATCH', tag: 'State 4', desc: 'G1 transfers cargo to Go2 quadruped saddle with physical latch confirmation.' },
        { name: 'TRANSIT_DELIVERY', tag: 'State 5', desc: 'Go2 transports cargo over terrain to destination curbside or shelf dock.' },
      ],
      failsafe: 'Immediate transition to SAFE_STANCE: Quadruped locks 4-point low center-of-mass crouch, Humanoid engages zero-velocity joint damping, and Drone enters geofenced hover.',
    },
    currentMilestones: [
      { title: 'Tri-Modal Multi-Robot Architecture Implemented', status: 'completed', details: 'Full Unitree G1, Go2, and PX4 Python adapters with CycloneDDS low-level command loops.' },
      { title: 'MuJoCo Sim-to-Real Embodied Physics Suite', status: 'completed', details: 'Headless MJCF simulation environments with joint-level impedance verification.' },
      { title: 'Azure Digital Twins DTDL v3 Integration', status: 'completed', details: 'C# .NET 8 digital twin services mapping 3D warehouse and remote site topologies.' },
      { title: 'Student Pod Task: Vision-Guided Intermodal Latching', status: 'pod-backlog', details: 'Implement sub-millimeter vision alignment between G1 arms and Go2 cargo saddles in MuJoCo & physical hardware.' },
      { title: 'Student Pod Task: CycloneDDS-to-C-V2X Teleoperation Bridge', status: 'pod-backlog', details: 'Convert Unitree DDS topics to 3GPP Rel-18 C-V2X messages to synchronize robot deployment with Borealis Pods.' },
      { title: 'Student Pod Task: Edge-Native YOLOv8 on Jetson Orin', status: 'pod-backlog', details: 'Accelerate YOLOv8 3D spatial bounding box inference in TensorRT for sub-15ms edge processing.' },
    ],
  },

  'digital-twin-appliance': {
    id: 'digital-twin-appliance',
    name: 'Digital Twin Appliance & Bare-Metal UE5 Cockpit',
    shortName: 'Digital Twin Appliance',
    badge: 'C++20 • Unreal Engine 5 • Vulkan DRM/KMS • CycloneDDS',
    accentColor: '#38bdf8',
    repo: 'BoggsSystems/borealis-twin-appliance & ue5-cockpit-runtime',
    architectureTier: 'Bare-Metal Edge Appliance • Direct Hardware Framebuffer • HIL Cockpit',
    overview:
      'Physical command-and-control substrate for Boggs Systems autonomous transit and robotic fleets. Bypasses consumer desktop display servers to render photorealistic Unreal Engine 5 digital twins directly to multi-display cockpit arrays via Vulkan DRM/KMS at sub-25ms ingestion-to-photon latency.',
    standards: [
      { name: 'Direct Rendering Manager (DRM / KMS)', desc: 'Linux kernel subsystem for direct GPU modesetting and buffer flipping without X11 or Wayland display server overhead.' },
      { name: 'Vulkan 1.3 Specification', desc: 'Low-overhead, explicit GPU compute and graphics API driving multi-viewport 4K cockpit rendering.' },
      { name: 'OMG DDS (Data Distribution Service)', desc: 'Eclipse CycloneDDS pub/sub standard delivering deterministic kinematic telemetry with sub-millisecond jitter.' },
      { name: 'IEEE 1588 Precision Time Protocol (PTP)', desc: 'Hardware-timestamped clock synchronization ensuring sub-microsecond correlation between physical vehicle and digital twin.' },
    ],
    functionalReqs: [
      'Ingest continuous high-frequency CycloneDDS telemetry topics from Borealis Pods and Robot Fleet into UE5 at ≥ 120 Hz.',
      'Drive triple synchronized 4K panoramic cockpit displays (Sensor Voxel View, Photorealistic World Twin, Intermodal Hub).',
      'Synthesize real-time Canadian winter conditions (Lumen snow accumulation, icing friction reduction, volumetric fog).',
      'Interface with physical cockpit hardware: tactile rotary encoders, CAN-bus emergency interlocks, and OLED status panels.',
      'Support bidirectional hardware-in-the-loop (HIL) manual override injection for simulated corridor hazard resolution.',
    ],
    nonFunctionalReqs: [
      'Ingestion-to-photon display latency guaranteed ≤ 25 ms across all active viewport cameras.',
      'Cold boot to active full-screen interactive twin within ≤ 6 seconds via immutable Linux appliance rootfs.',
      'Zero display tearing and frame drop jitter using triple-buffered Vulkan swapchains locked to 120 FPS display refreshes.',
      'Hardware watchdog safety interlock: Automated fallback to local sensor failover plane if network DDS telemetry drops for > 150 ms.',
    ],
    umlPackage: 'BoggsSystems::Appliance::CockpitCore',
    umlClasses: [
      {
        name: 'ApplianceKmsCompositor',
        stereotype: '<<BareMetalDriver>>',
        description: 'Allocates direct DRM planes and manages Vulkan frame flips across multi-head monitor connectors without desktop compositors.',
        attributes: [
          '- drmCardFd: int',
          '- crtcControllers: Vector<DrmCrtc>',
          '- swapchains: Array<VkSwapchainKHR, 3>',
        ],
        methods: [
          '+ initializeDrmKms(): Result<void>',
          '+ presentPlaneBuffer(displayIndex: int, buffer: DrmFb): void',
          '+ handleVBlankInterrupt(): void',
        ],
        relations: ['Composes -> Ue5ViewportRenderer'],
      },
      {
        name: 'DdsTelemetryRingBuffer',
        stereotype: '<<LockFreeQueue>>',
        description: 'Ingests high-rate CycloneDDS vehicle kinematics and V2X SPaT packets into lock-free shared memory.',
        attributes: [
          '- ringBufferPtr: atomic<uint8_t*>',
          '- writeCursor: atomic<uint64_t>',
          '- vehicleStateTopic: dds_entity_t',
        ],
        methods: [
          '+ onTelemetryPacket(packet: PodKinematicsMsg): void',
          '+ readLatestState(podId: PodId): VehicleStateSnapshot',
        ],
        relations: ['Feeds -> Ue5WorldModelBridge'],
      },
      {
        name: 'Ue5WorldModelBridge',
        stereotype: '<<SimulationBridge>>',
        description: 'Translates physical telemetry snapshots into CARLA/UE5 actor transforms, sensor meshes, and winter shaders.',
        attributes: [
          '- worldContext: UWorld*',
          '- carlaVehicleActors: Map<PodId, AActor*>',
          '- weatherController: AWeatherSubsystem*',
        ],
        methods: [
          '+ syncActorTransforms(state: VehicleStateSnapshot): void',
          '+ updateLidarPointCloudVoxel(cloud: LidarScanBuffer): void',
          '+ applyFrictionTensors(roadCondition: WinterFrictionCoeff): void',
        ],
        relations: ['Controls -> ApplianceKmsCompositor'],
      },
      {
        name: 'TactileHmiController',
        stereotype: '<<HardwareInterface>>',
        description: 'Communicates with physical cockpit dials, emergency kill-switches, and status OLED via USB HID and CAN-bus.',
        attributes: [
          '- canInterfaceName: string',
          '- dialRotationTicks: int32_t',
          '- safetyInterlockState: bool',
        ],
        methods: [
          '+ pollRotaryDials(): HmiEvent',
          '+ updateOledDiagnostics(fps: float, ddsLatencyMs: float): void',
          '+ triggerEmergencyDisengage(): void',
        ],
        relations: ['Signals -> Ue5WorldModelBridge'],
      },
    ],
    designPatterns: [
      { name: 'Hardware Direct Framebuffer (DRM/KMS)', usage: 'Bypasses X11/Wayland window managers to render multi-head 4K views straight to GPU framebuffers.' },
      { name: 'Lock-Free SPSC Ring Buffer', usage: 'Decouples DDS telemetry reception threads from UE5 120 FPS rendering loops, eliminating mutex stalls.' },
      { name: 'Digital Twin Observer Pattern', usage: 'Subscribes physical vehicle state topics to synchronously update virtual actor kinematics in the simulation world.' },
    ],
    stateMachine: {
      title: 'Digital Twin Cockpit Appliance Lifecycle',
      states: [
        { name: 'BOOT_DRM_INIT', tag: 'State 1', desc: 'Minimal kernel boots, detects monitor EDIDs, and binds Vulkan swapchain to DRM/KMS display planes.' },
        { name: 'DDS_MESH_DISCOVERY', tag: 'State 2', desc: 'CycloneDDS joins the local/V2X autonomous vehicle domain and synchronizes PTP hardware clocks.' },
        { name: 'RUN_TWIN_RENDER', tag: 'State 3', desc: 'Continuous 120 FPS multi-display rendering of photorealistic UE5 twin, LIDAR voxels, and maglev docking.' },
        { name: 'HIL_OPERATOR_INTERVENE', tag: 'State 4', desc: 'Tactile hardware dials or override triggers seize manual teleoperation or reroute simulated pods.' },
        { name: 'FAILSAFE_LOCAL_CACHE', tag: 'State 5', desc: 'Network telemetry timeout engages local physics dead-reckoning and alerts operator via OLED strip.' },
      ],
      failsafe: 'Immediate transition to FAILSAFE_LOCAL_CACHE: Continues deterministic dead-reckoning trajectory display, flashes red status beacons, and locks autonomous assets in geofenced safe holding patterns.',
    },
    currentMilestones: [
      { title: 'Bare-Metal Vulkan DRM/KMS Proof-of-Concept', status: 'completed', details: 'Direct-to-display frame presenting verified on Linux kernel without window manager overhead.' },
      { title: 'CycloneDDS Telemetry Ring-Buffer Pipeline', status: 'completed', details: 'Sub-10ms lock-free ingestion linking vehicle kinematics to simulation bridge.' },
      { title: 'UE5 & CARLA Winter Sensor Shader Suite', status: 'completed', details: 'Procedural snow and road friction degradation model validated in synthetic Canadian corridors.' },
      { title: 'Student Pod Task: Multi-Monitor Viewport Synchronizer', status: 'pod-backlog', details: 'Implement frame-accurate Genlock synchronization across 3x 4K DisplayPort outputs in Vulkan.' },
      { title: 'Student Pod Task: Physical Cockpit CAN-Bus Rotary Controller', status: 'pod-backlog', details: 'Program embedded micro-controller (STM32/RP2040) firmware to map tactile dials to UE5 camera controls.' },
      { title: 'Student Pod Task: WebRTC Pixel Streaming Fallback Bridge', status: 'pod-backlog', details: 'Enable seamless handoff between local bare-metal appliance rendering and remote browser streaming.' },
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
    name: 'Opportunity OS (1-Click ATS Co-Pilot & Proof-of-Work Engine)',
    shortName: 'Opportunity OS',
    badge: 'TypeScript • Manifest V3 • Local AI • DOM Injection',
    accentColor: '#fbbf24',
    repo: 'BoggsSystems/opportunity-os',
    architectureTier: 'Client-Side Extension Engine • Sub-10ms DOM Form Injection & Evidence Grounding',
    overview:
      'Engineered to cure the soul-crushing modern job search headache. Replaces 45-minute repetitive ATS application forms (Workday, Taleo, Greenhouse, Lever) and black-box keyword shredders with a client-side Chrome extension that injects verified portfolio evidence, executes automated form autofill in sub-10ms, and guarantees zero server data exfiltration.',
    standards: [
      { name: 'W3C WebExtensions Manifest V3', desc: 'Secure service-worker architecture with isolated content scripts and zero remote executable code injection.' },
      { name: 'W3C Verifiable Credentials', desc: 'Cryptographically verifiable skill attestations and capstone project completion certificates.' },
      { name: 'Zero-Knowledge Client Storage', desc: '100% on-device IndexedDB / WebCrypto encryption ensuring candidate resumes and PII never leave the local browser.' },
      { name: 'WCAG 2.2 AA Accessibility', desc: 'Accessible modal and keyboard-driven autofill overlays compliant with high-velocity candidate workflows.' },
    ],
    functionalReqs: [
      'Inspect and classify complex DOM form trees across Workday, Greenhouse, Ashby, and Lever in sub-10ms.',
      'Autofill multi-step job applications with 100% contextual accuracy without manual candidate re-typing.',
      'Synthesize candidate claims directly against verified GitHub commit graphs, patents, and system artifacts rather than generic AI keyword hallucination.',
      'Execute 1-click application submission with instant confirmation telemetry and tracking.',
      'Provide on-device resume PDF tailoring matching specific requisition technical requirements without exfiltrating data.',
    ],
    nonFunctionalReqs: [
      'Zero server exfiltration: All resume parsing, credential matching, and DOM autofill happen strictly inside the local browser.',
      'DOM injection and mutation response latency under 10ms across dynamic single-page web applications.',
      'Memory footprint under 35MB for background service worker and content script isolates.',
      'Universal compatibility across Chrome, Brave, Edge, and Arc browsers running Manifest V3.',
    ],
    umlPackage: 'OpportunityOS::AtsCoPilot::Core',
    umlClasses: [
      {
        name: 'AtsDomParser',
        stereotype: '<<DomInspector>>',
        description: 'Inspects active applicant portals, identifying input fields, select menus, radio buttons, file dropzones, and multi-step pagination.',
        attributes: [
          '- portal_type: AtsVendorType',
          '- input_node_map: Map<string, HTMLElement>',
          '- mutation_observer: MutationObserver',
        ],
        methods: [
          '+ detect_ats_vendor(): AtsVendorType',
          '+ map_form_hierarchy(): FormFieldSchema',
          '+ observe_dynamic_steps(callback: StepChangeHandler): void',
        ],
        relations: ['Feeds FormFieldSchema to AutofillInjectionController'],
      },
      {
        name: 'EvidenceGroundingEngine',
        stereotype: '<<MatchingEngine>>',
        description: 'Extracts verifiable project milestones, GitHub repositories, and patent claims from local encrypted vaults without keyword spam.',
        attributes: [
          '- local_vault: WebCryptoVault',
          '- claim_verifier: VerifiableCredentialVerifier',
          '- similarity_scorer: CosineSimilarityModel',
        ],
        methods: [
          '+ extract_grounded_claims(requisitionText: string): Array<VerifiedClaim>',
          '+ tailor_resume_context(claims: Array<VerifiedClaim>): TailoredResumeJson',
          '+ generate_ats_friendly_pdf(): Uint8Array',
        ],
        relations: ['Supplies TailoredResume to AutofillInjectionController'],
      },
      {
        name: 'AutofillInjectionController',
        stereotype: '<<DomMutator>>',
        description: 'Dispatches synthetic trusted DOM events populating fields, uploading tailored PDFs, and handling radio button groups in sub-10ms.',
        attributes: [
          '- injection_latency_ms: number',
          '- rollback_stack: Array<FieldSnapshot>',
        ],
        methods: [
          '+ execute_autofill(schema: FormFieldSchema, data: TailoredResumeJson): Promise<FillSummary>',
          '+ dispatch_trusted_input(element: HTMLElement, val: string): void',
          '+ attach_tailored_resume_blob(dropzone: HTMLElement, pdf: Uint8Array): void',
        ],
        relations: ['Executes against AtsDomParser nodes'],
      },
    ],
    designPatterns: [
      { name: 'Observer Pattern (DOM MutationObserver)', usage: 'Tracks dynamic field additions and SPA view transitions across corporate career portals in real-time.' },
      { name: 'Command Pattern with Rollback', usage: 'Encapsulates form-fill operations into reversible, atomic command queues with instant candidate rollback.' },
      { name: 'Local Zero-Knowledge Vault Pattern', usage: 'Encrypts candidate resumes and credentials using WebCrypto AES-GCM before writing to local IndexedDB.' },
    ],
    stateMachine: {
      title: 'Opportunity OS 1-Click ATS Co-Pilot State Machine',
      states: [
        { name: 'PORTAL_DOM_DETECTION', tag: 'State 0', desc: 'Identifies ATS vendor e.g. Workday, Greenhouse, Ashby, or Lever from DOM signatures.' },
        { name: 'FORM_SCHEMA_PARSING', tag: 'State 1', desc: 'Traverses form tree, mapping input names, validation rules, required attachments, and multi-step pagination.' },
        { name: 'LOCAL_VAULT_QUERY', tag: 'State 2', desc: 'Retrieves encrypted candidate credentials and verified portfolio evidence from on-device IndexedDB.' },
        { name: 'EVIDENCE_MATCHING', tag: 'State 3', desc: 'Aligns verified git commits and technical achievements with role specs without AI hallucination.' },
        { name: 'SUB_10MS_INJECTION', tag: 'State 4', desc: 'Fires synthetic trusted DOM events, populating all form steps and attaching tailored PDF proof.' },
        { name: 'SUBMISSION_VERIFICATION', tag: 'State 5', desc: 'Detects submission confirmation event, records application telemetry to local encrypted tracker.' },
      ],
      failsafe: 'Manual override drawer opens immediately if high-confidence field matching falls below 95% threshold.',
    },
    currentMilestones: [
      { title: 'Manifest V3 Background Service Worker & Content Script Bridge', status: 'completed', details: 'Full bi-directional message bus between extension popup and active webpage tabs.' },
      { title: 'Greenhouse & Ashby DOM Field Parsing Engine', status: 'completed', details: 'Automated 1-click form fill across standard enterprise ATS portals.' },
      { title: 'Student Pod Task: Workday Multi-Step SPA Mutation Resolver', status: 'pod-backlog', details: 'Build robust DOM observer handling asynchronous iframe loads and shadow-root inputs.' },
      { title: 'Student Pod Task: On-Device WASM PDF Evidence Generator', status: 'pod-backlog', details: 'Compile tailored single-page PDF resumes locally in WebAssembly with embedded verifiable credentials.' },
    ],
  },

  'civic-campus': {
    id: 'civic-campus',
    name: 'Sovereign Civic Campuses (Pine Street Model & Pod Transit)',
    shortName: 'Civic Campuses',
    badge: 'Robotics • ROS 2 • Transit Mesh • Civic Infrastructure',
    accentColor: '#10b981',
    repo: 'BoggsSystems/civic-campus-mesh',
    architectureTier: 'Regional Infrastructure Platform • Automated Modular Build & High-Speed Transit Mesh',
    overview:
      'Inspired by Boston’s Pine Street Inn model of dignified supportive communities and workforce development. Solves the urban housing crisis by unlocking abundant regional land, constructing modern modular shelter campuses via autonomous heavy robot fleets, and connecting residents to urban economic centers in 12 minutes via Borealis autonomous pod corridors.',
    standards: [
      { name: 'WELL Building Standard v2 & Passive House', desc: 'High-performance mass-timber envelope, continuous fresh-air filtration, and daylight optimization for trauma-informed healing.' },
      { name: 'ISO 21542 & Universal Accessibility', desc: 'Zero-barrier human-scale mobility throughout residential pavilions, dining halls, and transit portals.' },
      { name: 'ROS 2 / CycloneDDS Autonomous Robotics', desc: 'Real-time multi-agent heavy equipment coordination for site grading, excavation, and modular pod placement.' },
      { name: 'IEEE 1588 PTP & OpenUSD Digital Twins', desc: 'Sub-microsecond synchronous telemetry between transit pod dispatch, microgrid energy management, and campus facilities.' },
    ],
    functionalReqs: [
      'Autonomously coordinate heavy equipment fleets (excavators, pavers, mobile cranes) to prepare regional sites in days.',
      'Assemble precision factory-built modular mass-timber residential pods with plug-and-play mechanical, electrical, and plumbing (MEP) connections.',
      'Provide seamless, grade-separated Borealis transit pod portal on-campus connecting residents to downtown hubs in under 15 minutes.',
      'Integrate rooftop solar microgrids and battery storage providing 100% net-zero sovereign electrical and thermal resilience.',
      'Operate on-campus Digital Twin training cockpits and Opportunity OS labs, transitioning residents into high-wage autonomous dispatch and robotics maintenance careers.',
    ],
    nonFunctionalReqs: [
      '70% reduction in civic capital construction cost per residential unit compared to traditional urban concrete builds.',
      'Zero-emission operations across transit pod corridors, thermal heat pumps, and campus microgrid generation.',
      'Structural durability rating exceeding 75 years using cross-laminated timber (CLT) and low-carbon geopolymer foundations.',
      'Sub-15 minute transit travel time to metropolitan core employers and tertiary medical facilities.',
    ],
    umlPackage: 'CivicCampus::Infrastructure::Mesh',
    umlClasses: [
      {
        name: 'CivicCampusMasterPlan',
        stereotype: '<<MasterLayout>>',
        description: 'Defines spatial zoning, residential pavilion layouts, communal culinary facilities, and open green courtyards.',
        attributes: [
          '- campus_id: CampusUuid',
          '- regional_parcel_acres: float = 45.0',
          '- residential_pod_capacity: int = 120',
          '- microgrid_solar_kw: float = 650.0',
        ],
        methods: [
          '+ calculate_density_envelope(): ZoningEnvelope',
          '+ simulate_microclimate_airflow(): ThermalProfile',
          '+ export_openusd_twin(): UsdStageRef',
        ],
        relations: ['Orchestrates ModularPodAssemblyAgent', 'Integrates with TransitCorridorPortal'],
      },
      {
        name: 'ModularPodAssemblyAgent',
        stereotype: '<<RoboticCoordinator>>',
        description: 'Directs autonomous robot fleet in precision placement and structural fastening of mass-timber living modules.',
        attributes: [
          '- fleet_dds_domain: DomainId = 42',
          '- crane_telemetry_stream: RtpStream',
          '- torque_verification_sensor: I2cArray',
        ],
        methods: [
          '+ dispatch_pod_crane_sequence(podId: string): Promise<bool>',
          '+ verify_structural_seals(podId: string): SealTelemetry',
          '+ calibrate_mep_connectors(): AlignmentReport',
        ],
        relations: ['Monitored by DigitalTwinAppliance'],
      },
      {
        name: 'TransitCorridorPortal',
        stereotype: '<<TransitNexus>>',
        description: 'Manages on-campus Borealis pod arrival/departure berths, passenger flow, and high-speed tube headways.',
        attributes: [
          '- berth_count: int = 4',
          '- headway_seconds: int = 90',
          '- route_to_metro_hub_km: float = 18.5',
        ],
        methods: [
          '+ dispatch_express_pod(destinationStation: string): PodDispatchId',
          '+ monitor_passenger_throughput(): FlowMetrics',
          '+ sync_ptp_clock(): PtpStatus',
        ],
        relations: ['Communicates with BorealisPodDispatcher'],
      },
      {
        name: 'ResidentEmpowermentPipeline',
        stereotype: '<<WorkforceEngine>>',
        description: 'Integrates Pine Street Inn supportive care workflows with on-campus Opportunity OS labs and vocational trades.',
        attributes: [
          '- culinary_training_seats: int = 40',
          '- robotics_cockpit_seats: int = 24',
          '- placement_success_rate: float',
        ],
        methods: [
          '+ enroll_resident(residentId: string, track: string): TrainingPlan',
          '+ schedule_pod_apprenticeship(): ApprenticeshipSlot',
          '+ track_sovereignty_milestones(): SovereigntyReport',
        ],
        relations: ['Powered by OpportunityOSExtension'],
      },
    ],
    designPatterns: [
      { name: 'Modular Off-Site Prefabrication Pattern', usage: 'Decouples precision indoor module fabrication from on-site robotic assembly, ensuring zero weather delay and millimeter tolerance.' },
      { name: 'Transit-Oriented Micro-City Pattern', usage: 'Clusters residential living, healthcare, education, and nutrition within 2-minute walking rings centered around the Borealis transit portal.' },
      { name: 'Trauma-Informed Environmental Design', usage: 'Maximizes natural biophilic lighting, acoustic dampening, personal private sanctuary spaces, and communal gathering greens.' },
    ],
    stateMachine: {
      title: 'Sovereign Civic Campus Lifecycle State Machine',
      states: [
        { name: 'REGIONAL_LAND_SURVEY', tag: 'State 0', desc: 'Site topographic scanning, geotechnical verification, and solar irradiance modeling.' },
        { name: 'ROBOTIC_SITE_PREPARATION', tag: 'State 1', desc: 'Autonomous heavy fleet earth-moving, trenching, and geopolymer foundation pouring.' },
        { name: 'TRANSIT_CORRIDOR_INTEGRATION', tag: 'State 2', desc: 'Borealis pod guideway extension and on-campus terminal portal commissioning.' },
        { name: 'MODULAR_POD_ASSEMBLY', tag: 'State 3', desc: 'Robotic crane placement and structural locking of cross-laminated timber living units.' },
        { name: 'MICROGRID_COMMISSIONING', tag: 'State 4', desc: 'Rooftop solar PV arrays and battery energy storage system (BESS) activation.' },
        { name: 'COMMUNITY_OPERATION', tag: 'State 5', desc: 'Pine Street dignity housing, culinary kitchens, and Opportunity OS training cockpits online.' },
      ],
      failsafe: 'Dual-redundant microgrid islanding and emergency diesel-free thermal backup ensure continuous warmth and life-safety.',
    },
    currentMilestones: [
      { title: 'Campus Master Plan OpenUSD Digital Twin', status: 'completed', details: 'Full 3D geospatial twin modeling 120-unit mass-timber campus, solar microgrid, and pod station.' },
      { title: 'Borealis Transit Corridor Terminal Interface Spec', status: 'completed', details: 'Engineered 90-second pod headway docking station and passenger accessibility corridors.' },
      { title: 'Student Pod Task: Autonomous Robot Crane Fastening Controller', status: 'pod-backlog', details: 'Develop ROS 2 computer-vision visual-servoing node for aligning modular pod MEP connectors.' },
      { title: 'Student Pod Task: Resident Workforce Training Simulator', status: 'pod-backlog', details: 'Build on-site Digital Twin appliance simulator training residents in autonomous pod fleet teleoperation.' },
    ],
  },
};


interface SubsystemInfra {
  busesTitle: string;
  buses: Array<{ code: string; title: string; desc: string }>;
  isolationTitle: string;
  isolations: Array<{ code: string; title: string; desc: string }>;
}

const SUBSYSTEM_INFRA_DATA: Record<string, SubsystemInfra> = {
  'smart-mohs': {
    busesTitle: "Real-Time Communications & Optical Buses",
    buses: [
      {
        code: "BUS-1",
        title: "Zero-Copy PCIe DMA Ring Buffer",
        desc: "High-bandwidth dual-ring buffers streaming 100 kHz raw 1310nm OCT interferograms directly to GPU pinned memory.",
      },
      {
        code: "BUS-2",
        title: "Deterministic Galvo Control Bus",
        desc: "Microsecond-latency SPI/EtherCAT trajectory feed driving Thorlabs dual-axis mirrors at 20 kHz update rates.",
      },
      {
        code: "BUS-3",
        title: "Isolated Hardware Laser Interlock",
        desc: "Dedicated hardwired optical shutter coil line bypassing OS kernel to collapse laser beam in < 1.5ms on fault.",
      },
    ],
    isolationTitle: "Fault Domains & Optical Isolation",
    isolations: [
      {
        code: "ISO-1",
        title: "Dual-Channel Thermal & Power Redundancy",
        desc: "Independent laser diode chillers and redundant DC power lines preventing wavelength drift or thermal runaway.",
      },
      {
        code: "ISO-2",
        title: "Galvanic & Opto-Coupled Isolation",
        desc: "Optoisolated digital I/O lines preventing high-voltage galvo piezo back-EMF feedback into the control plane.",
      },
      {
        code: "ISO-3",
        title: "Passive Fail-Closed Laser Shutter",
        desc: "Physical solenoid-driven aperture held open actively; drops shut mechanically via spring return upon power loss.",
      },
    ],
  },
  'borealis-pods': {
    busesTitle: "Real-Time Vehicular Communications & Buses",
    buses: [
      {
        code: "BUS-1",
        title: "Dual-Redundant CAN-FD & 1000BASE-T1",
        desc: "Deterministic 1 Gbps automotive ethernet backplane routing raw 32-beam LiDAR and 4D radar point clouds.",
      },
      {
        code: "BUS-2",
        title: "Cyclone DDS / ROS 2 Real-Time Middleware",
        desc: "Sub-millisecond publish/subscribe fabric linking BEV perception, MPC trajectory, and drive-by-wire controllers.",
      },
      {
        code: "BUS-3",
        title: "C-V2X & Private 5G Teleoperation Link",
        desc: "Ultra-Reliable Low-Latency Communication (< 15ms latency) with deterministic fallback to safe-stop pull-over.",
      },
    ],
    isolationTitle: "Fault Domains & Drive-by-Wire Isolation",
    isolations: [
      {
        code: "ISO-1",
        title: "Lockstep ASIL-D Drive-by-Wire Core",
        desc: "Dual-core lockstep Infineon Aurix MCU continuously cross-checking steering and braking torques.",
      },
      {
        code: "ISO-2",
        title: "High-Voltage ESS Pyro-Fuse Disconnect",
        desc: "Solid-state contactor isolating the 400V traction battery within 2ms of impact or thermal threshold trip.",
      },
      {
        code: "ISO-3",
        title: "Dual-Rail Hydraulic Brake Actuation",
        desc: "Mechanically decoupled dual-circuit braking system delivering 1.2g stopping power even on electrical bus collapse.",
      },
    ],
  },
  'borealis-maglev': {
    busesTitle: "High-Speed Guideway & Synchronous Inverter Buses",
    buses: [
      {
        code: "BUS-1",
        title: "Sub-Millisecond EtherCAT Levitation Ring",
        desc: "Deterministic 1 kHz loop synchronizing 16 distributed EMS bogie controllers and inductive gap sensors.",
      },
      {
        code: "BUS-2",
        title: "Time-Sensitive Networking (TSN IEEE 802.1Qbv)",
        desc: "Jitter-free trackside telemetry synchronizing linear synchronous motor (LSM) stator inverters with guideway position.",
      },
      {
        code: "BUS-3",
        title: "Fail-Safe Moving-Block ATP Radio",
        desc: "Redundant trackside radio broadcasting continuously updated movement authority limits (MAL) per SIL-4 standards.",
      },
    ],
    isolationTitle: "Fault Domains & Electromagnetic Isolation",
    isolations: [
      {
        code: "ISO-1",
        title: "Triple Modular Redundancy (TMR) QNX Cores",
        desc: "2-out-of-3 voting architecture across independent levitation controllers guarding against SEU radiation or compute faults.",
      },
      {
        code: "ISO-2",
        title: "Electromagnetic Coil Galvanic Isolation",
        desc: "1500V opto-coupled gate drivers shielding low-voltage DSP control logic from stator back-EMF spikes.",
      },
      {
        code: "ISO-3",
        title: "Passive Permanent-Magnet Skid Safe Landing",
        desc: "Self-centering aerodynamic flaps and ceramic eddy-current skids safely decelerating pod to rest without guideway power.",
      },
    ],
  },

  'robot-fleet': {
    busesTitle: "Real-Time Robotics Telemetry & Vision Buses",
    buses: [
      {
        code: "BUS-1",
        title: "CycloneDDS Real-Time Telemetry Bus",
        desc: "Microsecond-cadence joint command and sensor state publisher linking Unitree G1 and Go2 motor controllers.",
      },
      {
        code: "BUS-2",
        title: "ZeroMQ High-Throughput Spatial Frame Bus",
        desc: "Sub-millisecond PUB/SUB socket fabric broadcasting 60 FPS video streams and YOLOv8 3D bounding boxes to AI workers.",
      },
      {
        code: "BUS-3",
        title: "Azure IoT Hub & DTDL v3 Graph Sync Link",
        desc: "Bidirectional cloud-to-device MQTT/AMQP telemetry sync updating 3D topological zones in Azure Digital Twins.",
      },
    ],
    isolationTitle: "Safety Domains & Physical Hazard Isolation",
    isolations: [
      {
        code: "ISO-1",
        title: "Hardwired Hardware Emergency Stop Interlock",
        desc: "Physical safety relays instantly disconnecting motor driver bus power rails upon boundary breach, bypassing OS kernels.",
      },
      {
        code: "ISO-2",
        title: "Sim-to-Real Impedance Boundary Clamping",
        desc: "Software safety envelopes clamping joint velocity and torque vectors to pre-verified MuJoCo simulation limits.",
      },
      {
        code: "ISO-3",
        title: "Dynamic Geofencing & Pedestrian Exclusion Enclaves",
        desc: "Real-time LiDAR/UWB polygon barriers prohibiting autonomous motion within 2.5m of unauthenticated human workers.",
      },
    ],
  },
  'digitpop': {
    busesTitle: "Streaming Video & Interactive Event Buses",
    buses: [
      {
        code: "BUS-1",
        title: "W3C WebCodecs VideoFrame Ring Buffer",
        desc: "Zero-copy GPU texture bridge passing decoded 60 FPS video frames to WebAssembly optical flow tracker with zero GC pauses.",
      },
      {
        code: "BUS-2",
        title: "Wasm SharedArrayBuffer Coordinate Bus",
        desc: "High-frequency bidirectional spatial bounding box dispatch between Rust/C++ tracking engine and WebGL canvas overlay.",
      },
      {
        code: "BUS-3",
        title: "Tokenized 1-Click Checkout Bridge",
        desc: "Secure PostMessage and Web Workers bus bridging user click events with Stripe Elements and Apple/Google Pay sessions.",
      },
    ],
    isolationTitle: "Sandbox Boundaries & Security Isolation",
    isolations: [
      {
        code: "ISO-1",
        title: "PCI-DSS Level 1 Sandboxed Iframe Isolation",
        desc: "Payment credential tokenization and payment method collection strictly encapsulated in isolated iframe origins.",
      },
      {
        code: "ISO-2",
        title: "WebGL Context Loss Auto-Recovery",
        desc: "Graceful fall-back to hardware-accelerated CSS DOM matrix hotspots if GPU context is lost or reallocated.",
      },
      {
        code: "ISO-3",
        title: "WebAssembly Memory Boundary Sandbox",
        desc: "Rigid Wasm linear memory bounds preventing malformed video metadata payloads from corrupting browser UI state.",
      },
    ],
  },
  'opportunity-os': {
    busesTitle: "Client Extension & DOM Injection Buses",
    buses: [
      {
        code: "BUS-1",
        title: "Manifest V3 Chrome Runtime Message Bus",
        desc: "Isolated async message channels connecting browser popup, background service workers, and injected content script frames.",
      },
      {
        code: "BUS-2",
        title: "Trusted DOM Synthetic Event Bus",
        desc: "Sub-10ms event dispatcher simulating user keystrokes, change events, and focus transitions across complex ATS DOM elements.",
      },
      {
        code: "BUS-3",
        title: "WebCrypto AES-GCM Vault Bus",
        desc: "Hardware-accelerated encryption pipeline securing local candidate profiles and verifiable project proofs inside on-device IndexedDB.",
      },
    ],
    isolationTitle: "Sandbox Isolation & Zero-Exfiltration Boundaries",
    isolations: [
      {
        code: "ISO-1",
        title: "Content Script World Isolation",
        desc: "Strict Chrome runtime isolation preventing target web page scripts from tampering with or accessing the extension's execution context.",
      },
      {
        code: "ISO-2",
        title: "Zero-Exfiltration Network Airgap",
        desc: "Content scripts are forbidden from initiating external telemetry calls; 100% of candidate parsing runs within the client browser.",
      },
      {
        code: "ISO-3",
        title: "WebAssembly PDF Sanitization Sandbox",
        desc: "Memory-safe WebAssembly runtime compiling tailored single-page resumes without invoking host system binaries or shell wrappers.",
      },
    ],
  },
  'civic-campus': {
    busesTitle: "Campus Robotics, Transit & Microgrid Buses",
    buses: [
      {
        code: "BUS-1",
        title: "CycloneDDS / ROS 2 Autonomous Construction Bus",
        desc: "Deterministic peer-to-peer DDS pub/sub spine orchestrating autonomous site graders, excavators, and modular pod placement cranes.",
      },
      {
        code: "BUS-2",
        title: "IEEE 1588 PTP Transit Synchronization Bus",
        desc: "Sub-microsecond deterministic clock synchronizing on-campus pod station arrival berths with Borealis high-speed corridor headways.",
      },
      {
        code: "BUS-3",
        title: "Modbus / CAN Microgrid Energy Management Bus",
        desc: "Dynamic load-balancing bus interconnecting 650 kW rooftop solar PV arrays, BESS batteries, and thermal heat pump loops.",
      },
    ],
    isolationTitle: "Life-Safety, Tenant Privacy & Critical Infrastructure Isolation",
    isolations: [
      {
        code: "ISO-1",
        title: "Grade-Separated Transit Corridor Guideway",
        desc: "Physical grade separation and structural glass-canopied terminal portals completely isolating autonomous pods from pedestrian walkways.",
      },
      {
        code: "ISO-2",
        title: "Mass-Timber Acoustic Sanctuary Decoupling",
        desc: "Cross-laminated timber (CLT) multi-layer air cavities achieving STC 60+ acoustic isolation for resident healing and privacy.",
      },
      {
        code: "ISO-3",
        title: "Autonomous Microgrid Islanding Enclave",
        desc: "Fast-acting solid-state transfer switches allowing the campus to seamlessly island and maintain 100% life-safety power during regional grid failures.",
      },
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
  const [activeTab, setActiveTab] = useState<'requirements' | 'subsystem' | 'uml' | 'lifecycle' | 'backlog'>('requirements');

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
  const subsystemInfra = SUBSYSTEM_INFRA_DATA[currentSystem.id] || SUBSYSTEM_INFRA_DATA['smart-mohs'];

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
            <Shield size={15} /> 1. Requirements &amp; Actors
          </button>
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'subsystem' ? 'active' : ''}`}
            onClick={() => setActiveTab('subsystem')}
          >
            <Layers size={15} /> 2. Subsystem Architecture
          </button>
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'uml' ? 'active' : ''}`}
            onClick={() => setActiveTab('uml')}
          >
            <FileCode2 size={15} /> 3. UML Class Model &amp; Patterns
          </button>
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'lifecycle' ? 'active' : ''}`}
            onClick={() => setActiveTab('lifecycle')}
          >
            <Activity size={15} /> 4. Lifecycle &amp; State Machine
          </button>
          <button
            className={`boggs-arch-tab-btn ${activeTab === 'backlog' ? 'active' : ''}`}
            onClick={() => setActiveTab('backlog')}
          >
            <GraduationCap size={15} /> 5. Capstone Pod Backlog
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="boggs-arch-body">
          {/* TAB 1: REQUIREMENTS & ACTORS */}
          {activeTab === 'requirements' && (
            <div className="boggs-arch-tab-content">
              <div className="boggs-arch-overview-box">
                <p>{currentSystem.overview}</p>
              </div>

              {/* Actors & System Boundary Model Diagram */}
              <div className="boggs-arch-section">
                <h3 className="boggs-arch-section-heading">
                  <Users size={17} style={{ color: currentSystem.accentColor }} /> Actors &amp; System Boundary Model
                </h3>
                <SystemArchitectureDiagrams
                  systemId={currentSystem.id}
                  accentColor={currentSystem.accentColor}
                  initialView="actors"
                />
              </div>

              <div className="boggs-arch-section">
                <h3 className="boggs-arch-section-heading">
                  <Shield size={17} style={{ color: currentSystem.accentColor }} /> Regulatory &amp; Industry Standards
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
                    <Zap size={16} color="#f59e0b" /> Non-Functional &amp; Safety Requirements (NFR)
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

          {/* TAB 2: SUBSYSTEM ARCHITECTURE */}
          {activeTab === 'subsystem' && (
            <div className="boggs-arch-tab-content">
              <div className="boggs-arch-package-header">
                <span className="boggs-arch-package-label">Subsystem Tiering:</span>
                <code>4-Tier Real-Time Architecture &amp; Data Buses</code>
              </div>

              <div className="boggs-arch-section">
                <h3 className="boggs-arch-section-heading">
                  <Layers size={17} style={{ color: currentSystem.accentColor }} /> Subsystem Block Decomposition &amp; Dataflow
                </h3>
                <SystemArchitectureDiagrams
                  systemId={currentSystem.id}
                  accentColor={currentSystem.accentColor}
                  initialView="subsystem"
                />
              </div>

              <div className="boggs-arch-grid-two">
                <div className="boggs-arch-section">
                  <h3 className="boggs-arch-section-heading">
                    <CheckCircle2 size={16} color="#38bdf8" /> {subsystemInfra.busesTitle}
                  </h3>
                  <ul className="boggs-arch-req-list">
                    {subsystemInfra.buses.map((bus, idx) => (
                      <li key={idx} className="boggs-arch-req-item">
                        <span className="boggs-arch-req-num">{bus.code}</span>
                        <span><strong>{bus.title}:</strong> {bus.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="boggs-arch-section">
                  <h3 className="boggs-arch-section-heading">
                    <Zap size={16} color="#f59e0b" /> {subsystemInfra.isolationTitle}
                  </h3>
                  <ul className="boggs-arch-req-list">
                    {subsystemInfra.isolations.map((iso, idx) => (
                      <li key={idx} className="boggs-arch-req-item">
                        <span className="boggs-arch-req-num" style={{ color: "#f59e0b" }}>{iso.code}</span>
                        <span><strong>{iso.title}:</strong> {iso.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UML CLASS MODEL & DESIGN */}
          {activeTab === 'uml' && (
            <div className="boggs-arch-tab-content">
              <div className="boggs-arch-package-header">
                <span className="boggs-arch-package-label">Package Scope:</span>
                <code>{currentSystem.umlPackage}</code>
              </div>

              {/* UML Class Diagram Visual */}
              <div className="boggs-arch-section">
                <h3 className="boggs-arch-section-heading">
                  <FileCode2 size={17} style={{ color: currentSystem.accentColor }} /> Formal UML Object-Oriented Class Hierarchy &amp; Design Patterns
                </h3>
                <SystemArchitectureDiagrams
                  systemId={currentSystem.id}
                  accentColor={currentSystem.accentColor}
                  initialView="uml-class"
                />
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
                          <div className="boggs-arch-member-title">Relationships &amp; Constraints</div>
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

          {/* TAB 4: LIFECYCLE & STATE MACHINE */}
          {activeTab === 'lifecycle' && (
            <div className="boggs-arch-tab-content">
              {/* Sequence Diagram Visual */}
              <div className="boggs-arch-section">
                <h3 className="boggs-arch-section-heading">
                  <Activity size={17} style={{ color: currentSystem.accentColor }} /> Runtime Sequence &amp; Deterministic Timing Verification
                </h3>
                <SystemArchitectureDiagrams
                  systemId={currentSystem.id}
                  accentColor={currentSystem.accentColor}
                  initialView="sequence"
                />
              </div>

              <div className="boggs-arch-state-header" style={{ marginTop: '16px' }}>
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
                  <Shield size={16} /> Autonomous Failsafe &amp; Safe-State Protocol
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
