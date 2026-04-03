import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import PlantModel from './PlantModel';
import SpraySimulation from './SpraySimulation';
import './PlantScene.css';

const PlantScene = ({ diseaseData, isSprayingEnabled, selectedDisease }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const plantRef = useRef(null);
  const sprayRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 100, 200);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);
    cameraRef.current = camera;

    // Renderer with high quality settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - Enhanced
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(8, 12, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    // Point lights for accent
    const pointLight1 = new THREE.PointLight(0x667eea, 0.5, 30);
    pointLight1.position.set(5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x764ba2, 0.3, 30);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1f3a,
      metalness: 0.1,
      roughness: 0.8,
      envMapIntensity: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create plant
    const plant = new PlantModel(diseaseData);
    scene.add(plant.mesh);
    plantRef.current = plant;

    // Create spray simulation
    const spray = new SpraySimulation(scene);
    sprayRef.current = spray;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Mouse controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener('mousemove', (e) => {
      if (isDragging && plantRef.current) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        plantRef.current.mesh.rotation.y += deltaX * 0.01;
        plantRef.current.mesh.rotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Zoom with mouse wheel
    renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? 0.1 : -0.1;
      camera.position.z += scrollAmount;
      camera.position.z = Math.max(2, Math.min(8, camera.position.z));
    }, { passive: false });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth camera following mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (plantRef.current) {
        plantRef.current.mesh.rotation.x += mouseRef.current.y * 0.0001;
      }

      if (isSprayingEnabled && sprayRef.current) {
        sprayRef.current.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update disease visualization
  useEffect(() => {
    if (plantRef.current && diseaseData) {
      plantRef.current.setDiseaseLevel(diseaseData.disease_id || 1);
    }
  }, [diseaseData]);

  // Control spraying
  useEffect(() => {
    if (sprayRef.current) {
      if (isSprayingEnabled) {
        sprayRef.current.start();
      } else {
        sprayRef.current.stop();
      }
    }
  }, [isSprayingEnabled]);

  return (
    <div ref={containerRef} className="plant-scene">
      <div className="glow-effect"></div>
    </div>
  );
};

export default PlantScene;
