import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  createLatteArtTexture,
  createSteamTexture,
  createShadowTexture,
  createCoffeeBeanGeometry,
} from './coffee3d/proceduralAssets';
import { Eye, Sparkles, Flame, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export type CameraPreset = 'cinematic' | 'topDown' | 'steam' | 'roast';

interface CoffeeScene3DProps {
  className?: string;
  onExploreClick?: () => void;
}

export const CoffeeScene3D: React.FC<CoffeeScene3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<CameraPreset>('cinematic');
  const [ceramicColor, setCeramicColor] = useState<'espresso' | 'cream' | 'terracotta'>('espresso');
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [steamActive, setSteamActive] = useState(true);

  // Mutable refs to pass UI state into Three.js render loop without recreating the scene
  const targetCameraPos = useRef(new THREE.Vector3(2.8, 2.2, 4.4));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.4, 0));
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const cupMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const steamToggleRef = useRef(true);

  useEffect(() => {
    steamToggleRef.current = steamActive;
  }, [steamActive]);

  // Update camera target when preset changes
  useEffect(() => {
    if (activePreset === 'cinematic') {
      targetCameraPos.current.set(2.6, 2.0, 4.2);
      targetLookAt.current.set(0, 0.35, 0);
    } else if (activePreset === 'topDown') {
      targetCameraPos.current.set(0.1, 4.5, 0.8);
      targetLookAt.current.set(0, 0.4, 0);
    } else if (activePreset === 'steam') {
      targetCameraPos.current.set(1.4, 1.6, 2.8);
      targetLookAt.current.set(0, 0.8, 0);
    } else if (activePreset === 'roast') {
      targetCameraPos.current.set(3.4, 1.2, 3.2);
      targetLookAt.current.set(0, 0.1, 0);
    }
  }, [activePreset]);

  // Update ceramic material color
  useEffect(() => {
    cupMaterialsRef.current.forEach((mat) => {
      if (ceramicColor === 'espresso') {
        mat.color.setHex(0x21140e);
        mat.roughness = 0.2;
      } else if (ceramicColor === 'cream') {
        mat.color.setHex(0xf4ede2);
        mat.roughness = 0.28;
      } else if (ceramicColor === 'terracotta') {
        mat.color.setHex(0x9e5233);
        mat.roughness = 0.32;
      }
    });
  }, [ceramicColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js guidelines
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGlSupported(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x130d0a, 0.04);

    // Studio Environment map via RoomEnvironment
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRoom = new RoomEnvironment();
    scene.environment = pmrem.fromScene(envRoom, 0.04).texture;
    pmrem.dispose();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.copy(targetCameraPos.current);
    const currentLookAt = new THREE.Vector3(0, 0.4, 0);

    // Lights
    const keyLight = new THREE.DirectionalLight(0xffecd6, 2.8);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xb87943, 2.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const warmFill = new THREE.HemisphereLight(0xfff5ea, 0x1a0f0a, 1.2);
    scene.add(warmFill);

    // --- PROCEDURAL 3D COFFEE CUP MODEL ---
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // Ceramic materials
    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0x21140e,
      roughness: 0.2,
      metalness: 0.04,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.6,
    });
    cupMaterialsRef.current = [ceramicMat];

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xc48c48,
      roughness: 0.25,
      metalness: 0.85,
    });

    // 1. Saucer
    const saucerShape = new THREE.CylinderGeometry(1.9, 1.2, 0.18, 64);
    const saucerMesh = new THREE.Mesh(saucerShape, ceramicMat);
    saucerMesh.position.y = -0.58;
    cupGroup.add(saucerMesh);

    // Saucer gold rim
    const saucerRimGeom = new THREE.TorusGeometry(1.9, 0.025, 16, 64);
    saucerRimGeom.rotateX(Math.PI / 2);
    const saucerRimMesh = new THREE.Mesh(saucerRimGeom, goldAccentMat);
    saucerRimMesh.position.y = -0.49;
    cupGroup.add(saucerRimMesh);

    // 2. Cup Body - graceful contoured tapered ceramic vessel
    const cupBodyGeom = new THREE.CylinderGeometry(1.22, 0.88, 1.35, 64, 1, false);
    const cupBodyMesh = new THREE.Mesh(cupBodyGeom, ceramicMat);
    cupBodyMesh.position.y = 0.18;
    cupGroup.add(cupBodyMesh);

    // Cup Rim torus for silky tactile edge
    const cupRimGeom = new THREE.TorusGeometry(1.22, 0.04, 20, 64);
    cupRimGeom.rotateX(Math.PI / 2);
    const cupRimMesh = new THREE.Mesh(cupRimGeom, ceramicMat);
    cupRimMesh.position.y = 0.855;
    cupGroup.add(cupRimMesh);

    // 3. Cup Handle - elegant curved ceramic handle
    const handleGeom = new THREE.TorusGeometry(0.5, 0.09, 24, 48, Math.PI * 1.15);
    const handleMesh = new THREE.Mesh(handleGeom, ceramicMat);
    handleMesh.rotation.z = -Math.PI * 0.45;
    handleMesh.position.set(1.28, 0.18, 0);
    cupGroup.add(handleMesh);

    // 4. Coffee Surface with Latte Art & Crema
    const latteArtTexture = createLatteArtTexture();
    const coffeeGeom = new THREE.CircleGeometry(1.15, 64);
    coffeeGeom.rotateX(-Math.PI / 2);
    const coffeeMat = new THREE.MeshPhysicalMaterial({
      map: latteArtTexture,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });
    const coffeeMesh = new THREE.Mesh(coffeeGeom, coffeeMat);
    coffeeMesh.position.y = 0.76;
    cupGroup.add(coffeeMesh);

    // 5. Contact Shadow underneath saucer
    const shadowTexture = createShadowTexture();
    const shadowGeom = new THREE.PlaneGeometry(4.6, 4.6);
    shadowGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.position.y = -0.66;
    cupGroup.add(shadowMesh);

    // --- STEAM PARTICLES ---
    const steamTexture = createSteamTexture();
    const steamCount = isSoftwareGl ? 8 : 16;
    const steamSprites: {
      sprite: THREE.Sprite;
      baseX: number;
      baseZ: number;
      speed: number;
      rotSpeed: number;
      scaleGrowth: number;
      phase: number;
    }[] = [];

    const steamGroup = new THREE.Group();
    cupGroup.add(steamGroup);

    for (let i = 0; i < steamCount; i++) {
      const sMat = new THREE.SpriteMaterial({
        map: steamTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });
      const sprite = new THREE.Sprite(sMat);
      const angle = Math.random() * Math.PI * 2;
      const rad = Math.random() * 0.45;
      const baseX = Math.cos(angle) * rad;
      const baseZ = Math.sin(angle) * rad;
      const startY = 0.8 + (i / steamCount) * 1.6;

      sprite.position.set(baseX, startY, baseZ);
      sprite.scale.set(0.6, 0.8, 1);
      steamGroup.add(sprite);

      steamSprites.push({
        sprite,
        baseX,
        baseZ,
        speed: 0.007 + Math.random() * 0.006,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        scaleGrowth: 0.005 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // --- FLOATING COFFEE BEANS ---
    const beanGeom = createCoffeeBeanGeometry();
    const beanMat = new THREE.MeshPhysicalMaterial({
      color: 0x3d2012,
      roughness: 0.45,
      metalness: 0.05,
      clearcoat: 0.35,
    });

    const beanCount = isSoftwareGl ? 5 : 8;
    const beans: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      orbitSpeed: number;
      orbitRadius: number;
      angle: number;
      bobFreq: number;
    }[] = [];

    const beansGroup = new THREE.Group();
    scene.add(beansGroup);

    for (let i = 0; i < beanCount; i++) {
      const beanMesh = new THREE.Mesh(beanGeom, beanMat);
      const orbitRadius = 2.4 + Math.random() * 1.5;
      const angle = (i / beanCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const yPos = -0.3 + (i / beanCount) * 2.2 + (Math.random() - 0.5) * 0.4;
      const scale = 0.8 + Math.random() * 0.45;
      beanMesh.scale.set(scale, scale, scale);

      const basePos = new THREE.Vector3(
        Math.cos(angle) * orbitRadius,
        yPos,
        Math.sin(angle) * orbitRadius
      );
      beanMesh.position.copy(basePos);
      beanMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      beansGroup.add(beanMesh);
      beans.push({
        mesh: beanMesh,
        basePos,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.018,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.018
        ),
        orbitSpeed: 0.0025 + Math.random() * 0.002,
        orbitRadius,
        angle,
        bobFreq: 1.2 + Math.random() * 0.8,
      });
    }

    // Pointer move listener for subtle parallax
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = normX * 0.45;
      mousePos.current.targetY = normY * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      // Adjust camera distance for mobile portrait viewports so cup is perfectly framed
      if (width < 768) {
        camera.fov = 48;
        cupGroup.position.set(0, -0.15, 0);
      } else {
        camera.fov = 40;
        cupGroup.position.set(0.35, -0.1, 0); // Slight offset for editorial balance
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop with smooth exponential damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth pointer parallax damping
      mousePos.current.x = THREE.MathUtils.damp(mousePos.current.x, mousePos.current.targetX, 4, delta);
      mousePos.current.y = THREE.MathUtils.damp(mousePos.current.y, mousePos.current.targetY, 4, delta);

      // Camera position damping towards active preset + mouse parallax
      const camTargetWithParallax = targetCameraPos.current.clone();
      camTargetWithParallax.x += mousePos.current.x * 0.8;
      camTargetWithParallax.y += mousePos.current.y * 0.6;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, camTargetWithParallax.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camTargetWithParallax.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camTargetWithParallax.z, 3.5, delta);

      currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, targetLookAt.current.x, 4, delta);
      currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, targetLookAt.current.y, 4, delta);
      currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, targetLookAt.current.z, 4, delta);
      camera.lookAt(currentLookAt);

      // Gentle cup idle breathing rotation
      cupGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.08 + mousePos.current.x * 0.15;
      cupGroup.rotation.x = Math.cos(elapsed * 0.4) * 0.02 - mousePos.current.y * 0.08;

      // Animate Steam
      const isSteamOn = steamToggleRef.current;
      steamSprites.forEach((item) => {
        if (!isSteamOn) {
          (item.sprite.material as THREE.SpriteMaterial).opacity = 0;
          return;
        }

        item.sprite.position.y += item.speed;
        item.sprite.position.x = item.baseX + Math.sin(elapsed * 1.5 + item.phase) * 0.12;
        item.sprite.position.z = item.baseZ + Math.cos(elapsed * 1.2 + item.phase) * 0.12;
        item.sprite.material.rotation += item.rotSpeed;

        const currentY = item.sprite.position.y;
        const progress = (currentY - 0.8) / 1.8;

        if (progress >= 1.0) {
          // Reset to cup rim
          item.sprite.position.y = 0.8 + Math.random() * 0.2;
          item.sprite.scale.set(0.6, 0.8, 1);
          (item.sprite.material as THREE.SpriteMaterial).opacity = 0;
        } else {
          // Fade in and gently fade out
          const opacity = Math.sin(progress * Math.PI) * 0.32;
          (item.sprite.material as THREE.SpriteMaterial).opacity = opacity;
          const s = 0.6 + progress * 0.9;
          item.sprite.scale.set(s, s * 1.2, 1);
        }
      });

      // Animate Floating Beans
      beans.forEach((b) => {
        b.angle += b.orbitSpeed;
        b.mesh.position.x = Math.cos(b.angle) * b.orbitRadius;
        b.mesh.position.z = Math.sin(b.angle) * b.orbitRadius;
        b.mesh.position.y = b.basePos.y + Math.sin(elapsed * b.bobFreq + b.angle) * 0.18;

        b.mesh.rotation.x += b.rotSpeed.x;
        b.mesh.rotation.y += b.rotSpeed.y;
        b.mesh.rotation.z += b.rotSpeed.z;
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      latteArtTexture.dispose();
      steamTexture.dispose();
      shadowTexture.dispose();
      saucerShape.dispose();
      saucerRimGeom.dispose();
      cupBodyGeom.dispose();
      cupRimGeom.dispose();
      handleGeom.dispose();
      coffeeGeom.dispose();
      shadowGeom.dispose();
      beanGeom.dispose();
      ceramicMat.dispose();
      goldAccentMat.dispose();
      coffeeMat.dispose();
      shadowMat.dispose();
      beanMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[460px] lg:min-h-[640px] select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Fallback if WebGL failed */}
      {!webGlSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-[#24150F]/80">
          <div className="max-w-md p-6 rounded-2xl bg-[#130D0A]/90 border border-[#B87943]/30">
            <h3 className="text-xl font-serif text-[#F6F0E6] mb-2">The Warmth of Preeti Coffee</h3>
            <p className="text-sm text-[#D8C3A5]">
              Experience our handcrafted brews made fresh daily from ethically roasted beans.
            </p>
          </div>
        </div>
      )}

      {/* Sleek, Unobtrusive Bottom Control Dock (Follows Ergonomic Three.js Constitution) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[92%] sm:w-auto max-w-xl transition-all duration-300">
        <div className="relative flex flex-col items-center">
          {/* Collapse/Expand Toggle Button */}
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="mb-1.5 px-3 py-1 text-[11px] font-sans uppercase tracking-widest text-[#D8C3A5] hover:text-white bg-[#24150F]/80 hover:bg-[#24150F] border border-[#B87943]/30 rounded-full transition-colors flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer"
            aria-label={isDockCollapsed ? 'Show 3D Studio Controls' : 'Hide 3D Studio Controls'}
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3 h-3 text-[#B87943]" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 text-[#B87943]" />
                <span>Zen Mode</span>
              </>
            )}
          </button>

          {/* Controls Bar */}
          {!isDockCollapsed && (
            <div className="w-full bg-[#1A100B]/90 border border-[#B87943]/25 rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4 text-xs">
              {/* Camera Presets */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#D8C3A5]/60 font-semibold mr-1 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#B87943]" />
                  <span>View:</span>
                </span>
                <button
                  onClick={() => setActivePreset('cinematic')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activePreset === 'cinematic'
                      ? 'bg-[#B87943] text-white font-medium shadow-sm'
                      : 'text-[#D8C3A5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Cinematic
                </button>
                <button
                  onClick={() => setActivePreset('topDown')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activePreset === 'topDown'
                      ? 'bg-[#B87943] text-white font-medium shadow-sm'
                      : 'text-[#D8C3A5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Latte Art
                </button>
                <button
                  onClick={() => setActivePreset('steam')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activePreset === 'steam'
                      ? 'bg-[#B87943] text-white font-medium shadow-sm'
                      : 'text-[#D8C3A5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Steam
                </button>
              </div>

              {/* Ceramic Finishes */}
              <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-[#B87943]/20 pt-1.5 sm:pt-0 sm:pl-3">
                <span className="text-[10px] uppercase tracking-wider text-[#D8C3A5]/60 font-semibold mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#B87943]" />
                  <span>Finish:</span>
                </span>
                <button
                  onClick={() => setCeramicColor('espresso')}
                  title="Dark Espresso Ceramic"
                  className={`w-5 h-5 rounded-full bg-[#21140e] border transition-transform cursor-pointer ${
                    ceramicColor === 'espresso'
                      ? 'border-[#B87943] scale-110 ring-2 ring-[#B87943]/40'
                      : 'border-white/20 hover:scale-105'
                  }`}
                />
                <button
                  onClick={() => setCeramicColor('cream')}
                  title="Warm Cream Ceramic"
                  className={`w-5 h-5 rounded-full bg-[#f4ede2] border transition-transform cursor-pointer ${
                    ceramicColor === 'cream'
                      ? 'border-[#B87943] scale-110 ring-2 ring-[#B87943]/40'
                      : 'border-white/20 hover:scale-105'
                  }`}
                />
                <button
                  onClick={() => setCeramicColor('terracotta')}
                  title="Terracotta Roast Finish"
                  className={`w-5 h-5 rounded-full bg-[#9e5233] border transition-transform cursor-pointer ${
                    ceramicColor === 'terracotta'
                      ? 'border-[#B87943] scale-110 ring-2 ring-[#B87943]/40'
                      : 'border-white/20 hover:scale-105'
                  }`}
                />

                {/* Steam toggle */}
                <button
                  onClick={() => setSteamActive(!steamActive)}
                  className={`ml-2 px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                    steamActive
                      ? 'border-[#B87943]/40 bg-[#B87943]/15 text-[#F6F0E6]'
                      : 'border-white/10 text-[#D8C3A5]/50 hover:text-[#D8C3A5]'
                  }`}
                  title={steamActive ? 'Turn off steam' : 'Turn on steam'}
                >
                  <Flame className="w-3 h-3 text-[#B87943]" />
                  <span>{steamActive ? 'Steam: On' : 'Steam: Off'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
