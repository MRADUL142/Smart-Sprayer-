import * as THREE from 'three';

class PlantModel {
  constructor(diseaseData = null) {
    this.mesh = new THREE.Group();
    this.diseaseLevel = 0;
    this.stems = [];
    this.leaves = [];
    this.diseaseColor = new THREE.Color(0xff4444); // Red for disease
    this.healthyColor = new THREE.Color(0x2d5016); // Dark green for healthy
    
    this.createCornPlant();
  }

  createCornPlant() {
    // Main stalk
    const stalkGeometry = new THREE.CylinderGeometry(0.12, 0.15, 3, 8);
    const stalkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x6b8e23,
      roughness: 0.7,
      metalness: 0.0
    });
    const mainStalk = new THREE.Mesh(stalkGeometry, stalkMaterial);
    mainStalk.position.y = 1.5;
    mainStalk.castShadow = true;
    mainStalk.receiveShadow = true;
    this.mesh.add(mainStalk);

    // Create large corn leaves at different heights
    const leafHeights = [0.3, 0.8, 1.2, 1.6, 2.0, 2.4];
    const leafColors = [0x2d5016, 0x3d6b1f, 0x4a7d28, 0x4a7d28, 0x3d6b1f, 0x2d5016];
    
    leafHeights.forEach((height, index) => {
      const angle = (index * 60) * Math.PI / 180;
      const leaf = this.createCornLeaf(0.4 + Math.random() * 0.1);
      leaf.position.y = height;
      leaf.position.x = Math.cos(angle) * 0.3;
      leaf.position.z = Math.sin(angle) * 0.3;
      leaf.rotation.y = angle;
      leaf.rotation.x = Math.PI / 8 + Math.random() * 0.2;
      
      // Store leaf for disease coloring
      this.leaves.push({
        mesh: leaf,
        color: leafColors[index]
      });
      
      this.mesh.add(leaf);
    });

    // Add secondary stalk with secondary leaves
    this.createSecondaryStalk();

    // Roots/base
    this.createRoots();

    // Corn ear (optional detail)
    this.createCornEar();
  }

  createCornLeaf(scale = 0.4) {
    const leafGeometry = new THREE.BufferGeometry();
    
    // Create a more complex leaf shape with curve
    const vertices = [];
    const indices = [];
    
    // Width and length of leaf
    const width = 0.3 * scale;
    const length = 1.5 * scale;
    const segments = 16;
    
    // Create leaf with a curve
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      
      // Left edge
      vertices.push(
        -width * (1 - Math.pow(1 - t, 2)),
        t * length,
        0
      );
      
      // Right edge
      vertices.push(
        width * (1 - Math.pow(1 - t, 2)),
        t * length,
        0.1 * Math.sin(t * Math.PI)
      );
    }
    
    // Create triangles
    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = (i + 1) * 2;
      const d = c + 1;
      
      indices.push(a, c, b);
      indices.push(b, c, d);
    }
    
    leafGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    leafGeometry.setIndex(indices);
    leafGeometry.computeVertexNormals();

    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d5016,
      roughness: 0.5,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.castShadow = true;
    leaf.receiveShadow = true;
    
    return leaf;
  }

  createSecondaryStalk() {
    const angle = Math.PI * 0.7;
    const secondaryGroup = new THREE.Group();
    secondaryGroup.position.y = 1.0;
    secondaryGroup.position.x = Math.cos(angle) * 0.4;
    secondaryGroup.position.z = Math.sin(angle) * 0.4;
    secondaryGroup.rotation.x = Math.PI / 12;
    secondaryGroup.rotation.z = angle;

    // Secondary stalk
    const stalkGeometry = new THREE.CylinderGeometry(0.08, 0.1, 1.5, 8);
    const stalkMaterial = new THREE.MeshStandardMaterial({ color: 0x7b9e2e });
    const stalk = new THREE.Mesh(stalkGeometry, stalkMaterial);
    stalk.castShadow = true;
    stalk.receiveShadow = true;
    secondaryGroup.add(stalk);

    // Leaves on secondary stalk
    const leafHeights = [0.2, 0.6, 1.0];
    leafHeights.forEach((height, idx) => {
      const leaf = this.createCornLeaf(0.35);
      leaf.position.y = height;
      leaf.position.x = 0.15;
      leaf.rotation.x = -Math.PI / 6 + Math.random() * 0.3;
      leaf.rotation.z = (idx % 2) * Math.PI / 3;
      this.leaves.push({ mesh: leaf });
      secondaryGroup.add(leaf);
    });

    this.mesh.add(secondaryGroup);
  }

  createRoots() {
    const rootGroup = new THREE.Group();
    rootGroup.position.y = -0.05;

    // Create root bundle
    const rootCount = 6;
    for (let i = 0; i < rootCount; i++) {
      const angle = (i / rootCount) * Math.PI * 2;
      const rootGeometry = new THREE.CylinderGeometry(0.04, 0.06, 0.5, 4);
      const rootMaterial = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
      const root = new THREE.Mesh(rootGeometry, rootMaterial);
      
      root.position.x = Math.cos(angle) * 0.2;
      root.position.z = Math.sin(angle) * 0.2;
      root.position.y = -0.25;
      root.rotation.x = angle;
      root.castShadow = true;
      root.receiveShadow = true;
      
      rootGroup.add(root);
    }

    this.mesh.add(rootGroup);
  }

  createCornEar() {
    const earGroup = new THREE.Group();
    earGroup.position.y = 1.4;
    earGroup.position.x = 0.35;
    earGroup.rotation.z = Math.PI / 6;

    // Husk (wrapper)
    const huskGeometry = new THREE.ConeGeometry(0.15, 0.8, 8);
    const huskMaterial = new THREE.MeshStandardMaterial({ color: 0x9d8043 });
    const husk = new THREE.Mesh(huskGeometry, huskMaterial);
    husk.castShadow = true;
    husk.receiveShadow = true;
    earGroup.add(husk);

    // Corn kernels (inside)
    const kernelGeometry = new THREE.ConeGeometry(0.12, 0.7, 8);
    const kernelMaterial = new THREE.MeshStandardMaterial({ color: 0xf4d03f });
    const kernels = new THREE.Mesh(kernelGeometry, kernelMaterial);
    kernels.position.z = 0.02;
    kernels.castShadow = true;
    kernels.receiveShadow = true;
    earGroup.add(kernels);

    this.mesh.add(earGroup);
  }

  setDiseaseLevel(diseaseLevel) {
    this.diseaseLevel = Math.min(diseaseLevel / 100, 1);
    
    // Update leaf colors based on disease level
    const affectedLeavesCount = Math.floor(this.leaves.length * this.diseaseLevel);
    
    this.leaves.forEach((leafObj, index) => {
      const leaf = leafObj.mesh;
      const color = index < affectedLeavesCount ? this.diseaseColor : this.healthyColor;
      leaf.material.color.copy(color);
      
      if (index < affectedLeavesCount) {
        leaf.material.emissive.copy(new THREE.Color(0xff2222));
        leaf.material.emissiveIntensity = 0.3;
      } else {
        leaf.material.emissive.copy(new THREE.Color(0x000000));
        leaf.material.emissiveIntensity = 0;
      }
    });
  }
}

export default PlantModel;
