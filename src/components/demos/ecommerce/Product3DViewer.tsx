import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Eye } from 'lucide-react';
import { Product } from '../../../types/demos';

interface Product3DViewerProps {
  product: Product;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ product }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const zoomLevelRef = useRef(4.5);
  const rotationRef = useRef({ x: 0.1, y: 0.2 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, zoomLevelRef.current);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Build specific 3D model based on product.modelType
    const accentColor = new THREE.Color(product.color || '#0284c7');
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 });
    const accentMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.8, roughness: 0.2 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });

    if (product.modelType === 'headphones') {
      // Headband
      const curve = new THREE.EllipseCurve(0, 0, 1.2, 1.3, 0, Math.PI, false, 0);
      const points = curve.getPoints(50);
      const tubeGeo = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p.x, p.y, 0))),
        64,
        0.1,
        16,
        false
      );
      const bandMesh = new THREE.Mesh(tubeGeo, darkMat);
      productGroup.add(bandMesh);

      // Left Ear Cup
      const cupGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 32);
      const leftCup = new THREE.Mesh(cupGeo, accentMat);
      leftCup.rotation.z = Math.PI / 2;
      leftCup.position.set(-1.2, 0, 0);
      productGroup.add(leftCup);

      // Left Cushion
      const cushionGeo = new THREE.TorusGeometry(0.48, 0.18, 16, 32);
      const leftCushion = new THREE.Mesh(cushionGeo, darkMat);
      leftCushion.rotation.y = Math.PI / 2;
      leftCushion.position.set(-1.05, 0, 0);
      productGroup.add(leftCushion);

      // Right Ear Cup
      const rightCup = leftCup.clone();
      rightCup.position.set(1.2, 0, 0);
      productGroup.add(rightCup);

      // Right Cushion
      const rightCushion = leftCushion.clone();
      rightCushion.position.set(1.05, 0, 0);
      productGroup.add(rightCushion);

    } else if (product.modelType === 'smartwatch') {
      // Body case
      const caseGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.22, 48);
      const caseMesh = new THREE.Mesh(caseGeo, chromeMat);
      caseMesh.rotation.x = Math.PI / 2;
      productGroup.add(caseMesh);

      // Glass display
      const screenGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.05, 48);
      const screenMesh = new THREE.Mesh(screenGeo, accentMat);
      screenMesh.rotation.x = Math.PI / 2;
      screenMesh.position.z = 0.1;
      productGroup.add(screenMesh);

      // Straps
      const strapGeo = new THREE.BoxGeometry(0.7, 1.4, 0.1);
      const topStrap = new THREE.Mesh(strapGeo, darkMat);
      topStrap.position.set(0, 1.1, 0);
      productGroup.add(topStrap);

      const botStrap = new THREE.Mesh(strapGeo, darkMat);
      botStrap.position.set(0, -1.1, 0);
      productGroup.add(botStrap);

    } else if (product.modelType === 'keyboard') {
      // Chassis
      const caseGeo = new THREE.BoxGeometry(2.4, 0.22, 1.2);
      const caseMesh = new THREE.Mesh(caseGeo, darkMat);
      productGroup.add(caseMesh);

      // Keycaps layer
      const keysGeo = new THREE.BoxGeometry(2.2, 0.1, 1.0);
      const keysMesh = new THREE.Mesh(keysGeo, accentMat);
      keysMesh.position.y = 0.14;
      productGroup.add(keysMesh);

      // Accent spacebar
      const spaceGeo = new THREE.BoxGeometry(0.8, 0.08, 0.18);
      const spaceMesh = new THREE.Mesh(spaceGeo, chromeMat);
      spaceMesh.position.set(0, 0.2, 0.3);
      productGroup.add(spaceMesh);

    } else {
      // Speaker cylinder
      const cylGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.8, 36);
      const cylMesh = new THREE.Mesh(cylGeo, accentMat);
      productGroup.add(cylMesh);

      // Top cap & bottom ring
      const capGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.15, 36);
      const topCap = new THREE.Mesh(capGeo, darkMat);
      topCap.position.y = 0.9;
      productGroup.add(topCap);

      const botCap = new THREE.Mesh(capGeo, darkMat);
      botCap.position.y = -0.9;
      productGroup.add(botCap);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(accentColor, 2.0);
    dirLight2.position.set(-3, -2, 2);
    scene.add(dirLight2);

    // Interactive mouse orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch controls for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        rotationRef.current.y += deltaX * 0.01;
        rotationRef.current.x += deltaY * 0.01;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    dom.addEventListener('touchstart', handleTouchStart);
    dom.addEventListener('touchmove', handleTouchMove);

    // Animation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        rotationRef.current.y += 0.008;
      }

      productGroup.rotation.x = rotationRef.current.x;
      productGroup.rotation.y = rotationRef.current.y;
      camera.position.z = zoomLevelRef.current;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [product, isRotating]);

  const handleZoom = (delta: number) => {
    zoomLevelRef.current = Math.min(Math.max(zoomLevelRef.current + delta, 2.5), 7.0);
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden flex flex-col items-center justify-center">
      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Controls Overlay */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-cyan-400 font-mono">
        <Eye className="w-3.5 h-3.5" />
        <span>Interactive 3D View (Drag to Orbit)</span>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 shadow-lg">
        <button
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle Auto-Rotate"
          className={`p-2 rounded-lg text-xs transition-colors ${
            isRotating ? 'bg-cyan-500 text-black font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
        </button>
        <button
          onClick={() => handleZoom(-0.5)}
          title="Zoom In"
          className="p-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => handleZoom(0.5)}
          title="Zoom Out"
          className="p-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
