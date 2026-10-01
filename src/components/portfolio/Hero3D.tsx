import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      return; // gracefully fallback
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Laptop Base & Screen
    const laptopGroup = new THREE.Group();

    // Base
    const baseGeo = new THREE.BoxGeometry(3.2, 0.12, 2.2);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25
    });
    const baseMesh = new THREE.Mesh(baseGeo, metalMat);
    baseMesh.position.y = -0.6;
    laptopGroup.add(baseMesh);

    // Trackpad
    const padGeo = new THREE.PlaneGeometry(0.8, 0.5);
    const padMat = new THREE.MeshBasicMaterial({ color: 0x1e293b, side: THREE.DoubleSide });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.rotation.x = -Math.PI / 2;
    padMesh.position.set(0, -0.53, 0.6);
    laptopGroup.add(padMesh);

    // Keyboard area
    const kbGeo = new THREE.PlaneGeometry(2.8, 1.2);
    const kbMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.rotation.x = -Math.PI / 2;
    kbMesh.position.set(0, -0.53, -0.2);
    laptopGroup.add(kbMesh);

    // Screen Lid (angled up)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, -0.54, -1.1);

    const lidBackGeo = new THREE.BoxGeometry(3.2, 2.1, 0.08);
    const lidBackMesh = new THREE.Mesh(lidBackGeo, metalMat);
    lidBackMesh.position.set(0, 1.05, 0);
    lidGroup.add(lidBackMesh);

    // Screen display (Canvas texture with code lines and glowing UI)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 340;
    const sCtx = screenCanvas.getContext('2d');
    if (sCtx) {
      sCtx.fillStyle = '#020617';
      sCtx.fillRect(0, 0, 512, 340);
      
      // Top bar
      sCtx.fillStyle = '#0f172a';
      sCtx.fillRect(0, 0, 512, 30);
      sCtx.fillStyle = '#ef4444';
      sCtx.beginPath(); sCtx.arc(20, 15, 5, 0, Math.PI * 2); sCtx.fill();
      sCtx.fillStyle = '#f59e0b';
      sCtx.beginPath(); sCtx.arc(36, 15, 5, 0, Math.PI * 2); sCtx.fill();
      sCtx.fillStyle = '#10b981';
      sCtx.beginPath(); sCtx.arc(52, 15, 5, 0, Math.PI * 2); sCtx.fill();

      // Code editor lines
      sCtx.font = '14px monospace';
      sCtx.fillStyle = '#06b6d4';
      sCtx.fillText('const agency = new AlAminWebEngine({', 30, 70);
      sCtx.fillStyle = '#38bdf8';
      sCtx.fillText('  mission: "Scale local businesses",', 30, 95);
      sCtx.fillStyle = '#a855f7';
      sCtx.fillText('  stack: ["NextJS", "TypeScript", "ThreeJS"],', 30, 120);
      sCtx.fillStyle = '#34d399';
      sCtx.fillText('  securityAudit: "OWASP Hardened",', 30, 145);
      sCtx.fillStyle = '#f59e0b';
      sCtx.fillText('  realtimeOrders: true,', 30, 170);
      sCtx.fillStyle = '#06b6d4';
      sCtx.fillText('});', 30, 195);
      sCtx.fillStyle = '#64748b';
      sCtx.fillText('// Live status: 100% operational', 30, 230);
      sCtx.fillStyle = '#38bdf8';
      sCtx.fillText('agency.launchHighConvertingDemos();', 30, 260);

      // Glowing metric chip
      sCtx.fillStyle = 'rgba(6, 182, 212, 0.2)';
      sCtx.fillRect(320, 240, 160, 60);
      sCtx.strokeStyle = '#06b6d4';
      sCtx.strokeRect(320, 240, 160, 60);
      sCtx.fillStyle = '#38bdf8';
      sCtx.fillText('Lighthouse: 99', 335, 275);
    }
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.05, 1.95), screenMat);
    screenMesh.position.set(0, 1.05, 0.05);
    lidGroup.add(screenMesh);

    // Tilt lid back ~ 105 degrees
    lidGroup.rotation.x = -Math.PI * 0.08;
    laptopGroup.add(lidGroup);

    mainGroup.add(laptopGroup);

    // 2. Floating Browser Cards
    const createFloatingWindow = (w: number, h: number, title: string, color: number) => {
      const g = new THREE.Group();
      const geom = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        transmission: 0.6,
        opacity: 0.85,
        transparent: true,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 1
      });
      const mesh = new THREE.Mesh(geom, mat);
      g.add(mesh);

      // Frame border
      const wireGeo = new THREE.EdgesGeometry(geom);
      const wireMat = new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.6 });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      g.add(wire);

      return g;
    };

    const windowLeft = createFloatingWindow(2.2, 1.4, 'E-Commerce Live', 0x06b6d4);
    windowLeft.position.set(-3.2, 1.2, 0.5);
    windowLeft.rotation.y = 0.28;
    mainGroup.add(windowLeft);

    const windowRight = createFloatingWindow(2.0, 1.3, 'QR Kitchen Ticket', 0xf59e0b);
    windowRight.position.set(3.1, -0.2, 0.8);
    windowRight.rotation.y = -0.32;
    mainGroup.add(windowRight);

    // 3. Floating Particles (Code dust & cyber nodes)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x06b6d4); // cyan
    const colorB = new THREE.Color(0x3b82f6); // blue
    const colorC = new THREE.Color(0x10b981); // emerald

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x06b6d4, 3, 12);
    blueLight.position.set(-3, 2, 2);
    scene.add(blueLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2.5, 10);
    amberLight.position.set(3, -2, 2);
    scene.add(amberLight);

    // Interactive Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.6;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Pause rendering when Hero is offscreen to preserve 100% smooth scrolling performance
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible || document.hidden) return; // Skip WebGL draw when scrolled away or tab hidden!

      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle floating animation
      laptopGroup.rotation.y = mouseX * 0.8 + Math.sin(elapsed * 0.8) * 0.05;
      laptopGroup.rotation.x = -mouseY * 0.6 + Math.cos(elapsed * 0.6) * 0.03 + 0.15;
      laptopGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;

      // Floating windows orbit/breathe
      windowLeft.position.y = 1.2 + Math.sin(elapsed * 1.1 + 1) * 0.15;
      windowLeft.rotation.z = Math.sin(elapsed * 0.7) * 0.04;

      windowRight.position.y = -0.2 + Math.cos(elapsed * 1.3 + 2) * 0.15;
      windowRight.rotation.z = -Math.cos(elapsed * 0.8) * 0.04;

      // Rotate particles slowly
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[550px] flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Status Badges Overlaid Cleanly */}
      <div className="absolute -bottom-2 sm:bottom-4 left-4 sm:left-6 px-3.5 py-2 rounded-xl glass-panel border border-slate-800/80 shadow-2xl flex items-center gap-2.5 text-xs pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
        <span className="text-slate-300 font-medium">BSc CSE, DIU · Cybersecurity Intern</span>
      </div>

      <div className="absolute top-4 right-4 sm:right-6 px-3.5 py-2 rounded-xl glass-panel border border-cyan-500/20 shadow-2xl flex items-center gap-2 text-xs pointer-events-none">
        <span className="text-cyan-400 font-mono">OWASP Tested</span>
        <span className="text-slate-500">·</span>
        <span className="text-slate-300">Fast 3D & Full-Stack</span>
      </div>
    </div>
  );
};
