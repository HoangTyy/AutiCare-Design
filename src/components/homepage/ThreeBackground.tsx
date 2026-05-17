import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    
    // Perspective Camera focusing on central workspace plane
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // 2. Generate Neural Network / Constellation Nodes
    const nodeCount = window.innerWidth < 768 ? 60 : 110;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    
    const nodes: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      color: THREE.Color;
    }[] = [];

    // Premium AutiCare theme colors
    const colorPalette = [
      new THREE.Color('#0084FF'), // Cyber Blue
      new THREE.Color('#2AC176'), // Mint Teal
      new THREE.Color('#FF6B6B'), // Coral Red
      new THREE.Color('#FFD215'), // Golden Warning Yellow
    ];

    // Populate nodes scattered in a 3D volume
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 12;
      
      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      
      nodes.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.01,
        color: chosenColor,
      });

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create custom smooth circle glowing particle canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const nodeMaterial = new THREE.PointsMaterial({
      size: 1.1,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // 3. Constellation Dynamic Line Segment Mesh Setup
    const maxConnections = window.innerWidth < 768 ? 100 : 260;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
      opacity: 0.5
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 4. Mouse Move Event Handler
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize coordinates to [-1, 1]
      mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth lag interpolation for mouse coordinates
      targetX.current += (mouseX.current - targetX.current) * 0.06;
      targetY.current += (mouseY.current - targetY.current) * 0.06;

      // Project virtual 3D attractor point for the cursor
      const mouse3D = new THREE.Vector3(
        targetX.current * 18,
        targetY.current * 11,
        0
      );

      const positionsAttr = nodeGeometry.attributes.position as THREE.BufferAttribute;

      // Move nodes and check boundaries
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        // Drift
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Bounce
        if (Math.abs(node.x) > 18) node.vx *= -1;
        if (Math.abs(node.y) > 11) node.vy *= -1;
        if (Math.abs(node.z) > 6) node.vz *= -1;

        // Mouse attraction force
        const dxMouse = mouse3D.x - node.x;
        const dyMouse = mouse3D.y - node.y;
        const dzMouse = mouse3D.z - node.z;
        const distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse + dzMouse * dzMouse);

        if (distToMouse < 9) {
          const attractionForce = (9 - distToMouse) * 0.002;
          node.x += dxMouse * attractionForce;
          node.y += dyMouse * attractionForce;
          node.z += dzMouse * attractionForce;
        }

        // Apply updated coordinates to buffer using standard setXYZ
        positionsAttr.setXYZ(i, node.x, node.y, node.z);
      }
      positionsAttr.needsUpdate = true;

      // Reset and Populate connection lines
      let lineIndex = 0;
      const maxDistance = 4.8;

      for (let i = 0; i < nodeCount; i++) {
        const nodeA = nodes[i];

        // Connection A: Mouse Attractor Hub to Node A
        const dxM = mouse3D.x - nodeA.x;
        const dyM = mouse3D.y - nodeA.y;
        const dzM = mouse3D.z - nodeA.z;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM + dzM * dzM);

        if (distM < 6.8 && lineIndex < maxConnections) {
          const alpha = (1.0 - (distM / 6.8)) * 0.85;

          linePositions[lineIndex * 6] = mouse3D.x;
          linePositions[lineIndex * 6 + 1] = mouse3D.y;
          linePositions[lineIndex * 6 + 2] = mouse3D.z;

          linePositions[lineIndex * 6 + 3] = nodeA.x;
          linePositions[lineIndex * 6 + 4] = nodeA.y;
          linePositions[lineIndex * 6 + 5] = nodeA.z;

          const startColor = new THREE.Color('#FFFFFF');
          const endColor = nodeA.color;

          lineColors[lineIndex * 6] = startColor.r * alpha;
          lineColors[lineIndex * 6 + 1] = startColor.g * alpha;
          lineColors[lineIndex * 6 + 2] = startColor.b * alpha;

          lineColors[lineIndex * 6 + 3] = endColor.r * alpha;
          lineColors[lineIndex * 6 + 4] = endColor.g * alpha;
          lineColors[lineIndex * 6 + 5] = endColor.b * alpha;

          lineIndex++;
        }

        for (let j = i + 1; j < nodeCount; j++) {
          const nodeB = nodes[j];

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dz = nodeB.z - nodeA.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance && lineIndex < maxConnections) {
            const alpha = (1.0 - (dist / maxDistance)) * 0.42;

            linePositions[lineIndex * 6] = nodeA.x;
            linePositions[lineIndex * 6 + 1] = nodeA.y;
            linePositions[lineIndex * 6 + 2] = nodeA.z;

            linePositions[lineIndex * 6 + 3] = nodeB.x;
            linePositions[lineIndex * 6 + 4] = nodeB.y;
            linePositions[lineIndex * 6 + 5] = nodeB.z;

            lineColors[lineIndex * 6] = nodeA.color.r * alpha;
            lineColors[lineIndex * 6 + 1] = nodeA.color.g * alpha;
            lineColors[lineIndex * 6 + 2] = nodeA.color.b * alpha;

            lineColors[lineIndex * 6 + 3] = nodeB.color.r * alpha;
            lineColors[lineIndex * 6 + 4] = nodeB.color.g * alpha;
            lineColors[lineIndex * 6 + 5] = nodeB.color.b * alpha;

            lineIndex++;
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      nodeMaterial.size = 1.0 + Math.sin(elapsed * 1.6) * 0.25;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Cleanups
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      texture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-bg-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.82
      }}
    />
  );
};

export default ThreeBackground;
