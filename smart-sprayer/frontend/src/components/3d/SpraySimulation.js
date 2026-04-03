import * as THREE from 'three';

class SpraySimulation {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.isRunning = false;
    this.particleGroup = new THREE.Group();
    scene.add(this.particleGroup);

    this.createParticlePool();
  }

  createParticlePool() {
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x4cccff,
      opacity: 0.8,
      sizeAttenuation: true,
      transparent: true,
    });

    this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    this.particleGroup.add(this.particleSystem);

    // Initialize particle states
    this.particleStates = new Array(particleCount).fill(null).map(() => ({
      active: false,
      x: 0,
      y: 0,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      life: 0,
      maxLife: 1,
    }));
  }

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  update() {
    if (!this.isRunning) return;

    const positions = this.particleSystem.geometry.attributes.position.array;
    let activeCount = 0;

    // Emit new particles
    if (this.isRunning) {
      for (let i = 0; i < 8; i++) {
        const particleIdx = this.findInactiveParticle();
        if (particleIdx === -1) break;

        const state = this.particleStates[particleIdx];
        state.active = true;
        state.x = (Math.random() - 0.5) * 1;
        state.y = 1.5 + Math.random() * 0.5;
        state.z = (Math.random() - 0.5) * 1;
        state.vx = (Math.random() - 0.5) * 2;
        state.vy = -2 - Math.random() * 1;
        state.vz = (Math.random() - 0.5) * 2;
        state.life = 0;
        state.maxLife = 1.5 + Math.random();
      }
    }

    // Update all particles
    this.particleStates.forEach((state, idx) => {
      if (!state.active) return;

      state.life += 0.016; // ~60fps
      
      if (state.life > state.maxLife) {
        state.active = false;
        return;
      }

      // Physics
      state.vy -= 0.015; // gravity
      state.vx *= 0.98; // air resistance
      state.vy *= 0.98;
      state.vz *= 0.98;

      state.x += state.vx;
      state.y += state.vy;
      state.z += state.vz;

      // Update position
      positions[idx * 3] = state.x;
      positions[idx * 3 + 1] = state.y;
      positions[idx * 3 + 2] = state.z;

      if (state.active) {
        // Particle is active
      }
    });

    this.particleSystem.geometry.attributes.position.needsUpdate = true;
  }

  findInactiveParticle() {
    for (let i = 0; i < this.particleStates.length; i++) {
      if (!this.particleStates[i].active) return i;
    }
    return -1;
  }
}

export default SpraySimulation;
