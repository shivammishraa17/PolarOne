import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Box, 
  RotateCw, 
  Layers, 
  Camera, 
  Eye, 
  Zap, 
  Thermometer, 
  Users, 
  Droplet, 
  Info,
  Maximize2
} from 'lucide-react';
import { useMission } from '../../context/MissionContext';
import { AssetInspectorModal } from './AssetInspectorModal';

export const StationDigitalTwin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    activeStationId, 
    activeStation, 
    assets, 
    selectedAssetId, 
    setSelectedAssetId 
  } = useMission();

  const [activeLayer, setActiveLayer] = useState<'all' | 'thermal' | 'power' | 'fuel' | 'personnel'>('all');
  const [cameraPreset, setCameraPreset] = useState<string>('orbit');
  const [hoveredAssetName, setHoveredAssetName] = useState<string | null>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const interactiveObjectsRef = useRef<{ mesh: THREE.Object3D; assetId: string; name: string }[]>([]);
  const turbinesRef = useRef<THREE.Group[]>([]);
  const powerLinesRef = useRef<THREE.Line[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup & Station-specific Environmental Palette
    let groundColor = 0xD8ECF8;
    let bgColor = 0x070D1E;
    let fogColor = 0x0A152E;
    if (activeStationId === 'maitri') {
      groundColor = 0x7E8793; // Schirmacher Oasis rocky permafrost & moraine gravel
      bgColor = 0x0A1324;
      fogColor = 0x0F1B30;
    } else if (activeStationId === 'mcmurdo') {
      groundColor = 0x484F59; // Volcanic basalt rock & coastal ice
      bgColor = 0x08101E;
      fogColor = 0x0C182E;
    } else if (activeStationId === 'southpole') {
      groundColor = 0xEDF5FC; // High plateau cryo ice
      bgColor = 0x040514;     // Thin cryo atmosphere & cosmic black sky
      fogColor = 0x080A20;
    } else if (activeStationId === 'neumayer') {
      groundColor = 0xD0E5FC; // Floating ice shelf
      bgColor = 0x0C1830;     // Stormy maritime sky
      fogColor = 0x122240;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(fogColor, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 500);
    camera.position.set(38, 26, 48);
    camera.lookAt(0, 2, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // 4. Lighting (Polar sun low on horizon)
    const ambientLight = new THREE.AmbientLight(0x8bc5ff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
    dirLight.position.set(40, 25, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const cyanPoint = new THREE.PointLight(0x00E5FF, 2, 35);
    cyanPoint.position.set(0, 6, 0);
    scene.add(cyanPoint);

    // 5. Antarctic Terrain Plane
    const groundGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
    // Add procedural topography
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const z = Math.sin(vx * 0.08) * Math.cos(vy * 0.08) * 1.5 - Math.sin(vx * 0.03) * 1.8;
      pos.setZ(i, z);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: groundColor,
      roughness: 0.85,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // 6. Buildings & Modular Station Hub
    interactiveObjectsRef.current = [];

    // Main Station Hab Module (Elevated on Hydraulic Stilts like Bharati Station)
    const habGroup = new THREE.Group();
    const habCoreGeo = new THREE.BoxGeometry(14, 5, 8);
    const habMat = new THREE.MeshStandardMaterial({
      color: 0x1E3A6E,
      roughness: 0.4,
      metalness: 0.6,
      emissive: 0x051329
    });
    const habCore = new THREE.Mesh(habCoreGeo, habMat);
    habCore.position.y = 4.5;
    habCore.castShadow = true;
    habCore.receiveShadow = true;
    habGroup.add(habCore);

    // Panoramic Observation Windows (Glowing Cyan)
    const windowGeo = new THREE.BoxGeometry(10, 1.2, 8.2);
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0x00E5FF,
      emissive: 0x00A3CC,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const habWindow = new THREE.Mesh(windowGeo, windowMat);
    habWindow.position.y = 5.2;
    habGroup.add(habWindow);

    // Hydraulic Elevation Stilts (Red/Steel)
    const stiltMat = new THREE.MeshStandardMaterial({ color: 0x882222, metalness: 0.8, roughness: 0.3 });
    const stiltOffsets = [
      [-6, -3], [-6, 3], [6, -3], [6, 3],
      [-2, -3], [-2, 3], [2, -3], [2, 3]
    ];
    stiltOffsets.forEach(([sx, sz]) => {
      const stiltGeo = new THREE.CylinderGeometry(0.35, 0.45, 4.5, 12);
      const stilt = new THREE.Mesh(stiltGeo, stiltMat);
      stilt.position.set(sx, 2.2, sz);
      stilt.castShadow = true;
      habGroup.add(stilt);
    });

    scene.add(habGroup);
    interactiveObjectsRef.current.push({
      mesh: habCore,
      assetId: 'AST-HAGG-01',
      name: 'Main Living & Command Habitat Module'
    });

    // Power House (CAT 350 Primary Genset)
    const powerGroup = new THREE.Group();
    powerGroup.position.set(-16, 0, 8);

    const powerGeo = new THREE.BoxGeometry(8, 4.5, 6);
    const powerMat = new THREE.MeshStandardMaterial({
      color: 0x2A3E5C,
      roughness: 0.5,
      metalness: 0.4,
      emissive: 0x0B1E38
    });
    const powerMesh = new THREE.Mesh(powerGeo, powerMat);
    powerMesh.position.y = 2.25;
    powerMesh.castShadow = true;
    powerGroup.add(powerMesh);

    // Generator exhaust stacks
    const exhaustGeo = new THREE.CylinderGeometry(0.25, 0.25, 3, 8);
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.9 });
    const exhaust1 = new THREE.Mesh(exhaustGeo, exhaustMat);
    exhaust1.position.set(1.5, 5, 1);
    powerGroup.add(exhaust1);

    scene.add(powerGroup);
    interactiveObjectsRef.current.push({
      mesh: powerMesh,
      assetId: 'AST-GEN-CAT350',
      name: 'Caterpillar 350kVA Primary Power Genset'
    });

    // Fuel Depot Farm (Cylindrical Tanks with Fuel Level LEDs)
    const fuelGroup = new THREE.Group();
    fuelGroup.position.set(-16, 0, -8);

    const tankMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.7,
      roughness: 0.3
    });

    [-3, 3].forEach((tx, idx) => {
      const tankGeo = new THREE.CylinderGeometry(2.4, 2.4, 4.5, 24);
      const tankMesh = new THREE.Mesh(tankGeo, tankMat);
      tankMesh.position.set(tx, 2.25, 0);
      tankMesh.castShadow = true;
      fuelGroup.add(tankMesh);

      // Liquid level LED indicator bar
      const ledGeo = new THREE.BoxGeometry(0.3, 3.2, 0.3);
      const ledMat = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0xEF4444 : 0x10B981,
        emissive: idx === 0 ? 0xEF4444 : 0x10B981
      });
      const ledBar = new THREE.Mesh(ledGeo, ledMat);
      ledBar.position.set(tx, 2.25, 2.5);
      fuelGroup.add(ledBar);

      interactiveObjectsRef.current.push({
        mesh: tankMesh,
        assetId: idx === 0 ? 'AST-GEN-CUM250' : 'AST-GEN-CAT350',
        name: idx === 0 ? 'Fuel Tank 01 (Jet A-1 - Critical 12d)' : 'Bulk Tank 02 (Polar Diesel)'
      });
    });

    scene.add(fuelGroup);

    // Wind Micro-Turbine Array
    turbinesRef.current = [];
    const turbinePositions = [[18, 0, -14], [22, 0, -8], [26, 0, -2]];
    turbinePositions.forEach((pos, idx) => {
      const tGroup = new THREE.Group();
      tGroup.position.set(pos[0], pos[1], pos[2]);

      // Mast
      const mastGeo = new THREE.CylinderGeometry(0.2, 0.4, 11, 12);
      const mastMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, metalness: 0.8 });
      const mast = new THREE.Mesh(mastGeo, mastMat);
      mast.position.y = 5.5;
      mast.castShadow = true;
      tGroup.add(mast);

      // Nacelle & Rotor
      const rotorGroup = new THREE.Group();
      rotorGroup.position.set(0, 11, 0.3);

      const hubGeo = new THREE.SphereGeometry(0.4, 12, 12);
      const hub = new THREE.Mesh(hubGeo, mastMat);
      rotorGroup.add(hub);

      // 3 blades
      for (let b = 0; b < 3; b++) {
        const bladeGeo = new THREE.BoxGeometry(0.25, 4.5, 0.08);
        const bladeMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC });
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.rotation.z = (b * Math.PI * 2) / 3;
        blade.position.y = Math.sin((b * Math.PI * 2) / 3) * 2;
        blade.position.x = Math.cos((b * Math.PI * 2) / 3) * 2;
        rotorGroup.add(blade);
      }

      tGroup.add(rotorGroup);
      scene.add(tGroup);
      turbinesRef.current.push(rotorGroup);

      interactiveObjectsRef.current.push({
        mesh: mast,
        assetId: 'AST-WIND-01',
        name: `Polar Wind Micro-Turbine #${idx + 1}`
      });
    });

    // Satellite Radome Communications Dish
    const domeGroup = new THREE.Group();
    domeGroup.position.set(12, 0, 14);

    const radomeGeo = new THREE.IcosahedronGeometry(2.8, 2);
    const radomeMat = new THREE.MeshStandardMaterial({
      color: 0xEEF2F6,
      wireframe: false,
      roughness: 0.2,
      metalness: 0.3
    });
    const radome = new THREE.Mesh(radomeGeo, radomeMat);
    radome.position.y = 4.5;
    radome.castShadow = true;
    domeGroup.add(radome);

    // Tower base
    const towerGeo = new THREE.CylinderGeometry(1.2, 1.8, 3.2, 8);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 1.6;
    domeGroup.add(tower);

    scene.add(domeGroup);
    interactiveObjectsRef.current.push({
      mesh: radome,
      assetId: 'AST-SAT-RADOME',
      name: 'Iridium & Deep Space Telemetry Dome'
    });

    // Heavy Snowcat Vehicle (PistenBully 600 Polar)
    const snowcatGroup = new THREE.Group();
    snowcatGroup.position.set(4, 0, -12);

    const cabinGeo = new THREE.BoxGeometry(4.2, 2.2, 3.2);
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0xEF4444, metalness: 0.5, roughness: 0.4 });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.y = 1.8;
    cabin.castShadow = true;
    snowcatGroup.add(cabin);

    // Tracks (Black)
    const trackGeo = new THREE.BoxGeometry(4.8, 0.9, 0.8);
    const trackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const leftTrack = new THREE.Mesh(trackGeo, trackMat);
    leftTrack.position.set(0, 0.5, 1.5);
    const rightTrack = new THREE.Mesh(trackGeo, trackMat);
    rightTrack.position.set(0, 0.5, -1.5);
    snowcatGroup.add(leftTrack, rightTrack);

    scene.add(snowcatGroup);
    interactiveObjectsRef.current.push({
      mesh: cabin,
      assetId: 'AST-PB-600',
      name: 'PistenBully 600 Polar Heavy Traverse Tractor'
    });

    // ISO Shipping Containers (Logistics Storage Zone)
    const containerColors = [0x0284C7, 0xF59E0B, 0x10B981, 0x6366F1];
    [-2, 2].forEach((cz, i) => {
      [-5, -1, 3].forEach((cx, j) => {
        const cGeo = new THREE.BoxGeometry(3.6, 1.6, 1.6);
        const cMat = new THREE.MeshStandardMaterial({
          color: containerColors[(i + j) % containerColors.length],
          roughness: 0.6,
          metalness: 0.3
        });
        const containerMesh = new THREE.Mesh(cGeo, cMat);
        containerMesh.position.set(-6 + cx, 0.8, 16 + cz);
        containerMesh.castShadow = true;
        scene.add(containerMesh);
      });
    });

    // 7. Power Grid Connection Lines (Pulsing Cyan)
    powerLinesRef.current = [];
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00E5FF, linewidth: 2 });
    const powerHubPos = new THREE.Vector3(-16, 2, 8);
    const habPos = new THREE.Vector3(0, 3, 0);
    const radomePos = new THREE.Vector3(12, 2, 14);

    const geo1 = new THREE.BufferGeometry().setFromPoints([powerHubPos, habPos]);
    const line1 = new THREE.Line(geo1, lineMat);
    scene.add(line1);
    powerLinesRef.current.push(line1);

    const geo2 = new THREE.BufferGeometry().setFromPoints([habPos, radomePos]);
    const line2 = new THREE.Line(geo2, lineMat);
    scene.add(line2);
    powerLinesRef.current.push(line2);

    // 8. Blizzard Snow Particles (1,500 snowflakes)
    const particleCount = 1500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 120;
      particlePositions[p + 1] = Math.random() * 40;
      particlePositions[p + 2] = (Math.random() - 0.5) * 120;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xE2F8FF,
      size: 0.35,
      transparent: true,
      opacity: 0.65
    });
    const snowParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(snowParticles);

    // 9. Interactive Mouse Drag Orbit & Raycasting
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraAngle = { theta: 0.8, phi: 0.55, radius: 55 };

    const updateCameraPos = () => {
      camera.position.x = cameraAngle.radius * Math.sin(cameraAngle.phi) * Math.cos(cameraAngle.theta);
      camera.position.y = Math.max(3, cameraAngle.radius * Math.cos(cameraAngle.phi));
      camera.position.z = cameraAngle.radius * Math.sin(cameraAngle.phi) * Math.sin(cameraAngle.theta);
      camera.lookAt(0, 2, 0);
    };
    updateCameraPos();

    const domElement = renderer.domElement;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = domElement.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        cameraAngle.theta += deltaX * 0.008;
        cameraAngle.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, cameraAngle.phi - deltaY * 0.008));
        updateCameraPos();
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        // Raycasting on hover
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

        const meshes = interactiveObjectsRef.current.map(o => o.mesh);
        const intersects = raycaster.intersectObjects(meshes, true);

        if (intersects.length > 0) {
          const hit = intersects[0].object;
          const found = interactiveObjectsRef.current.find(o => o.mesh === hit || o.mesh.children.includes(hit));
          if (found) {
            setHoveredAssetName(found.name);
            domElement.style.cursor = 'pointer';
          }
        } else {
          setHoveredAssetName(null);
          domElement.style.cursor = 'grab';
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraAngle.radius = Math.max(15, Math.min(95, cameraAngle.radius + e.deltaY * 0.05));
      updateCameraPos();
    };

    const onClick = (e: MouseEvent) => {
      const rect = domElement.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const meshes = interactiveObjectsRef.current.map(o => o.mesh);
      const intersects = raycaster.intersectObjects(meshes, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const found = interactiveObjectsRef.current.find(o => o.mesh === hit || o.mesh.children.includes(hit));
        if (found) {
          setSelectedAssetId(found.assetId);
        }
      }
    };

    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('click', onClick);

    // 10. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Rotate wind turbines
      turbinesRef.current.forEach(t => {
        t.rotation.z += delta * 4;
      });

      // Animate blowing snowflakes
      const pPos = particleGeo.attributes.position.array as Float32Array;
      for (let p = 0; p < particleCount * 3; p += 3) {
        pPos[p + 1] -= delta * 6; // fall down
        pPos[p] -= delta * 12;    // blow left in Katabatic wind
        if (pPos[p + 1] < 0) {
          pPos[p + 1] = 40;
          pPos[p] = (Math.random() - 0.5) * 120 + 30;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Pulse power grid lines
      powerLinesRef.current.forEach(l => {
        const mat = l.material as THREE.LineBasicMaterial;
        mat.color.setHSL(0.52, 1, 0.4 + Math.sin(clock.getElapsedTime() * 4) * 0.2);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeStationId, assets]);

  // Camera preset switches
  const applyCameraPreset = (preset: string) => {
    setCameraPreset(preset);
    if (!cameraRef.current) return;
    if (preset === 'orbit') {
      cameraRef.current.position.set(38, 26, 48);
      cameraRef.current.lookAt(0, 2, 0);
    } else if (preset === 'core') {
      cameraRef.current.position.set(0, 10, 20);
      cameraRef.current.lookAt(0, 4, 0);
    } else if (preset === 'energy') {
      cameraRef.current.position.set(-24, 12, 10);
      cameraRef.current.lookAt(-16, 2, 0);
    } else if (preset === 'logistics') {
      cameraRef.current.position.set(-8, 14, 28);
      cameraRef.current.lookAt(-6, 1, 16);
    } else if (preset === 'top') {
      cameraRef.current.position.set(0, 65, 0.1);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  // Dynamic layer styling for 3D digital twin
  useEffect(() => {
    interactiveObjectsRef.current.forEach(item => {
      const mesh = item.mesh as THREE.Mesh;
      if (!mesh || !mesh.material) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;

      if (activeLayer === 'thermal') {
        if (item.assetId === 'AST-GEN-CAT350' || item.assetId === 'AST-GEN-CUM250') {
          mat.color.setHex(0xFF3300);
          mat.emissive.setHex(0x991100);
        } else if (item.name.includes('Living') || item.assetId === 'AST-HAGG-01') {
          mat.color.setHex(0xF59E0B);
          mat.emissive.setHex(0x552200);
        } else {
          mat.color.setHex(0x1E3566);
          mat.emissive.setHex(0x000000);
        }
      } else if (activeLayer === 'power') {
        if (item.assetId === 'AST-GEN-CAT350' || item.assetId === 'AST-WIND-01') {
          mat.color.setHex(0x00E5FF);
          mat.emissive.setHex(0x0088AA);
        } else {
          mat.color.setHex(0x0D1B3A);
          mat.emissive.setHex(0x000000);
        }
      } else if (activeLayer === 'fuel') {
        if (item.name.includes('Fuel Tank') || item.name.includes('Bulk Tank')) {
          mat.color.setHex(0x38BDF8);
          mat.emissive.setHex(0x005588);
        } else {
          mat.color.setHex(0x0D1B3A);
          mat.emissive.setHex(0x000000);
        }
      } else {
        // Normal material restore
        if (item.assetId === 'AST-PB-600') {
          mat.color.setHex(0xEF4444);
          mat.emissive.setHex(0x000000);
        } else if (item.assetId === 'AST-GEN-CAT350') {
          mat.color.setHex(0x2A3E5C);
          mat.emissive.setHex(0x0B1E38);
        } else if (item.name.includes('Fuel Tank')) {
          mat.color.setHex(0xE2E8F0);
          mat.emissive.setHex(0x000000);
        } else {
          mat.color.setHex(0x1E3A6E);
          mat.emissive.setHex(0x051329);
        }
      }
    });

    // Control power lines visibility in layer
    powerLinesRef.current.forEach(line => {
      line.visible = activeLayer === 'all' || activeLayer === 'power';
    });
  }, [activeLayer]);

  return (
    <div className="space-y-4">
      {/* 3D Viewport Controls & Status Header */}
      <div className="polar-panel rounded-2xl p-4 border border-polar-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700 text-cyan-400">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
              <span>{activeStation.name.toUpperCase()} 3D DIGITAL TWIN</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-700">
                {activeStation.statusBadge}
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              {activeStation.flagEmoji} {activeStation.region} • {activeStation.operator} • Elev: {activeStation.elevationM}m • Temp: {activeStation.weather.tempC}°C
            </p>
          </div>
        </div>

        {/* Camera Views & Operational Layers */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {/* Camera Angles */}
          <div className="flex items-center gap-1 bg-[#09142C] p-1 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 px-2 flex items-center gap-1">
              <Camera className="w-3 h-3 text-cyan-400" /> View:
            </span>
            <button
              onClick={() => applyCameraPreset('orbit')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                cameraPreset === 'orbit' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Survey
            </button>
            <button
              onClick={() => applyCameraPreset('core')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                cameraPreset === 'core' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Hab Core
            </button>
            <button
              onClick={() => applyCameraPreset('energy')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                cameraPreset === 'energy' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Power & Fuel
            </button>
            <button
              onClick={() => applyCameraPreset('logistics')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                cameraPreset === 'logistics' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Cargo Apron
            </button>
            <button
              onClick={() => applyCameraPreset('top')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                cameraPreset === 'top' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Top-Down
            </button>
          </div>

          {/* Layer Filter Buttons */}
          <div className="flex items-center gap-1 bg-[#09142C] p-1 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 px-2 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" /> Layer:
            </span>
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-2 py-1 rounded text-[11px] ${
                activeLayer === 'all' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveLayer('thermal')}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                activeLayer === 'thermal' ? 'bg-amber-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Thermometer className="w-3 h-3" /> Thermal
            </button>
            <button
              onClick={() => setActiveLayer('power')}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                activeLayer === 'power' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" /> Power Grid
            </button>
            <button
              onClick={() => setActiveLayer('fuel')}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                activeLayer === 'fuel' ? 'bg-blue-500 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Droplet className="w-3 h-3" /> Fuel Depot
            </button>
          </div>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-[580px] rounded-2xl overflow-hidden polar-panel border border-cyan-500/40 shadow-2xl">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Hover Asset Tooltip HUD */}
        {hoveredAssetName && (
          <div className="absolute top-4 left-4 pointer-events-none p-3 rounded-xl bg-black/85 backdrop-blur-md border border-cyan-400 font-mono text-xs text-white shadow-2xl animate-fade-in">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              IDENTIFIED 3D ASSET
            </div>
            <div className="font-bold text-sm mt-1">{hoveredAssetName}</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Click asset to inspect full sensor telemetry</div>
          </div>
        )}

        {/* 3D Scene Controls HUD (Bottom Left) */}
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1 pointer-events-none">
          <div className="text-cyan-400 font-bold">CONTROLS GUIDE</div>
          <div>• <strong>Left Click + Drag:</strong> 360° Free Orbit</div>
          <div>• <strong>Scroll Wheel:</strong> Zoom In / Out</div>
          <div>• <strong>Left Click Mesh:</strong> Open Telemetry Inspector</div>
        </div>

        {/* Station Key Indicators HUD (Bottom Right) */}
        <div className="absolute bottom-4 right-4 p-3.5 rounded-xl bg-[#08122A]/90 backdrop-blur-md border border-cyan-500/50 text-xs font-mono text-slate-200 shadow-xl pointer-events-none space-y-1.5">
          {activeStationId === 'bharati' && (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Main Habitation:</span>
                <span className="text-emerald-400 font-bold">OPERATIONAL (+20.5°C)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">CAT 350 Genset:</span>
                <span className="text-emerald-400 font-bold">240 kW (68% Load)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Aux Genset Cummins:</span>
                <span className="text-amber-400 font-bold">INJECTOR SERVICE DUE</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Jet A-1 Fuel Depot:</span>
                <span className="text-rose-400 font-bold animate-pulse">4,200L (12d RUNWAY)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Wind Turbine Output:</span>
                <span className="text-cyan-400 font-bold">58 kW Peak</span>
              </div>
            </>
          )}

          {activeStationId === 'maitri' && (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Maitri Habitation:</span>
                <span className="text-emerald-400 font-bold">OPERATIONAL (+19.8°C)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Priyadarshini Lake:</span>
                <span className="text-amber-400 font-bold animate-pulse">TRACE HEAT FAULT (+2°C)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Kirloskar 250kVA:</span>
                <span className="text-emerald-400 font-bold">175 kW (62% Load)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Novo Skiway Status:</span>
                <span className="text-emerald-400 font-bold">CLEAR FOR BASLER</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Winter Polar Diesel:</span>
                <span className="text-cyan-400 font-bold">22,000L (57d RUNWAY)</span>
              </div>
            </>
          )}

          {activeStationId === 'mcmurdo' && (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Building 155 Core:</span>
                <span className="text-emerald-400 font-bold">NOMINAL (+21.2°C)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">CAT 3516 Mega-Genset:</span>
                <span className="text-emerald-400 font-bold">850 kW (71% Load)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Phoenix Ice Runway:</span>
                <span className="text-emerald-400 font-bold">OPEN (C-17 AIRLIFT)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Pegasus Ice Roadway:</span>
                <span className="text-amber-400 font-bold">SOLAR WARMING CAUTION</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Bulk Tank Farm:</span>
                <span className="text-emerald-400 font-bold">188,000L (72d RUNWAY)</span>
              </div>
            </>
          )}

          {activeStationId === 'southpole' && (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Elevated Station:</span>
                <span className="text-emerald-400 font-bold">HYDRAULIC LEVEL (+21°C)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">SPT Telescope Cryo:</span>
                <span className="text-rose-400 font-bold animate-pulse">HE VENTING ALARM</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Cummins QSK60 High-Alt:</span>
                <span className="text-amber-400 font-bold">320 kW (78% Load)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Skiway Cold Lockout:</span>
                <span className="text-rose-400 font-bold">ACTIVE (&lt; -50°C LOCK)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Underground AN-8 Fuel:</span>
                <span className="text-amber-400 font-bold">14,200L (22d RUNWAY)</span>
              </div>
            </>
          )}

          {activeStationId === 'neumayer' && (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">16 Hydraulic Stilts:</span>
                <span className="text-emerald-400 font-bold">AUTO-LEVEL (+4.2 cm/yr)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Scania Cogeneration:</span>
                <span className="text-emerald-400 font-bold">145 kW (88% Recovery)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Atka Bay Calving Fissure:</span>
                <span className="text-amber-400 font-bold animate-pulse">0.8 cm/day SPREAD</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Met Balloon Hall:</span>
                <span className="text-cyan-400 font-bold">48 BOTTLES HELIUM</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Ekström Storm Front:</span>
                <span className="text-rose-400 font-bold">42kt NE BLIZZARD</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Asset Inspector Modal */}
      <AssetInspectorModal
        assetId={selectedAssetId}
        onClose={() => setSelectedAssetId(null)}
      />
    </div>
  );
};
