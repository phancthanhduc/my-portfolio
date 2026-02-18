import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Shape configuration
interface ShapeConfig {
  geometry: THREE.BufferGeometry;
  color: number;
  position: THREE.Vector3;
  name: string;
}

// Shape data for the scene - using monochrome/accent palette that matches site
const createShapes = (): ShapeConfig[] => {
  return [
    {
      geometry: new THREE.BoxGeometry(1.2, 1.2, 1.2),
      color: 0x1a1a1a, // Dark gray
      position: new THREE.Vector3(-2, 0, 0),
      name: 'Cube'
    },
    {
      geometry: new THREE.SphereGeometry(0.7, 32, 32),
      color: 0x333333, // Medium gray
      position: new THREE.Vector3(0, 0, 0),
      name: 'Sphere'
    },
    {
      geometry: new THREE.TorusGeometry(0.5, 0.2, 16, 100),
      color: 0x4d4d4d, // Light gray
      position: new THREE.Vector3(2, 0, 0),
      name: 'Torus'
    },
    {
      geometry: new THREE.IcosahedronGeometry(0.6, 0),
      color: 0x0ea5e9, // Sky blue accent
      position: new THREE.Vector3(1.5, 1.5, 1),
      name: 'Icosahedron'
    },
    {
      geometry: new THREE.OctahedronGeometry(0.6, 0),
      color: 0x64748b, // Slate
      position: new THREE.Vector3(-1.5, 1.5, 1),
      name: 'Octahedron'
    },
    {
      geometry: new THREE.DodecahedronGeometry(0.5, 0),
      color: 0x0f172a, // Dark slate
      position: new THREE.Vector3(0, 1.5, -1),
      name: 'Dodecahedron'
    },
    {
      geometry: new THREE.TetrahedronGeometry(0.7, 0),
      color: 0x475569, // Medium slate
      position: new THREE.Vector3(0, -1.5, 0.5),
      name: 'Tetrahedron'
    },
    {
      geometry: new THREE.ConeGeometry(0.5, 1, 32),
      color: 0x94a3b8, // Light slate accent
      position: new THREE.Vector3(-1, -1, 1.5),
      name: 'Cone'
    }
  ];
};

// Interactive 3D Scene Component
export class InteractiveScene {
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private shapes: THREE.Mesh[] = [];
  private animationFrameId: number | null = null;
  private clock: THREE.Clock;
  private onHover: ((name: string | null) => void) | null = null;
  private onClick: ((name: string | null) => void) | null = null;
  private selectedShape: THREE.Mesh | null = null;
  private hoveredShape: THREE.Mesh | null = null;
  private originalColors: Map<THREE.Mesh, number> = new Map();
  private basePositions: Map<THREE.Mesh, THREE.Vector3> = new Map();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 6);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 15;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clock = new THREE.Clock();

    this.initLights();
    this.initShapes();
    this.initEvents();
  }

  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xe2e8f0, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    this.scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.6, 20);
    pointLight.position.set(0, 3, 0);
    this.scene.add(pointLight);
  }

  private initShapes(): void {
    const shapeConfigs = createShapes();

    shapeConfigs.forEach((config) => {
      const material = new THREE.MeshStandardMaterial({
        color: config.color,
        metalness: 0.3,
        roughness: 0.4,
        emissive: config.color,
        emissiveIntensity: 0.1
      });

      const mesh = new THREE.Mesh(config.geometry, material);
      mesh.position.copy(config.position);
      mesh.userData = { name: config.name, originalColor: config.color };
      this.originalColors.set(mesh, config.color);
      this.basePositions.set(mesh, config.position.clone());

      // Add wireframe overlay
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: config.color,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const wireframe = new THREE.Mesh(config.geometry, wireframeMaterial);
      mesh.add(wireframe);
      mesh.userData.wireframe = wireframe;

      this.shapes.push(mesh);
      this.scene.add(mesh);
    });
  }

  private initEvents(): void {
    const resizeObserver = new ResizeObserver(() => {
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });

    resizeObserver.observe(this.canvas);

    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('click', this.onClickHandler.bind(this));
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private onClickHandler(): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.shapes);

    if (intersects.length > 0) {
      const clickedShape = intersects[0].object as THREE.Mesh;

      // Deselect previous
      if (this.selectedShape && this.selectedShape !== clickedShape) {
        this.resetShapeStyle(this.selectedShape);
      }

      // Toggle selection
      if (this.selectedShape === clickedShape) {
        this.resetShapeStyle(clickedShape);
        this.selectedShape = null;
        this.onClick?.(null);
      } else {
        this.selectShape(clickedShape);
        this.selectedShape = clickedShape;
        this.onClick?.(clickedShape.userData.name);
      }
    } else {
      // Click on empty space - deselect all
      if (this.selectedShape) {
        this.resetShapeStyle(this.selectedShape);
        this.selectedShape = null;
        this.onClick?.(null);
      }
    }
  }

  private selectShape(mesh: THREE.Mesh): void {
    const material = mesh.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.8;
    mesh.scale.setScalar(1.2);

    const wireframe = mesh.userData.wireframe as THREE.Mesh;
    if (wireframe) {
      (wireframe.material as THREE.MeshBasicMaterial).opacity = 0.8;
    }
  }

  private resetShapeStyle(mesh: THREE.Mesh): void {
    const material = mesh.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 0.1;
    mesh.scale.setScalar(1);

    const wireframe = mesh.userData.wireframe as THREE.Mesh;
    if (wireframe) {
      (wireframe.material as THREE.MeshBasicMaterial).opacity = 0.3;
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    const time = this.clock.getElapsedTime();

    // Animate shapes
    this.shapes.forEach((shape, index) => {
      const basePos = this.basePositions.get(shape);

      // Floating animation
      if (basePos) {
        shape.position.y = basePos.y + Math.sin(time * 0.5 + index * 0.5) * 0.15;
      }

      // Subtle rotation
      shape.rotation.x += 0.005;
      shape.rotation.y += 0.005;

      // Pulse effect for selected shape
      if (this.selectedShape === shape) {
        const pulse = Math.sin(time * 3) * 0.05 + 1;
        shape.scale.setScalar(1.2 * pulse);
      }
    });

    // Raycasting for hover
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.shapes);

    if (intersects.length > 0) {
      const hoveredMesh = intersects[0].object as THREE.Mesh;

      if (this.hoveredShape !== hoveredMesh) {
        // Reset previous hover
        if (this.hoveredShape && this.hoveredShape !== this.selectedShape) {
          const mat = this.hoveredShape.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.1;
        }

        this.hoveredShape = hoveredMesh;

        // Highlight new hover
        if (hoveredMesh !== this.selectedShape) {
          const mat = hoveredMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.4;
        }

        this.onHover?.(hoveredMesh.userData.name);
      }
    } else {
      if (this.hoveredShape) {
        if (this.hoveredShape !== this.selectedShape) {
          const mat = this.hoveredShape.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.1;
        }
        this.hoveredShape = null;
        this.onHover?.(null);
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // Public API
  setOnHover(callback: (name: string | null) => void): void {
    this.onHover = callback;
  }

  setOnClick(callback: (name: string | null) => void): void {
    this.onClick = callback;
  }

  setAutoRotate(enabled: boolean): void {
    this.controls.autoRotate = enabled;
  }

  start(): void {
    if (!this.animationFrameId) {
      this.animate();
    }
  }

  stop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  dispose(): void {
    this.stop();
    this.shapes.forEach((shape) => {
      shape.geometry.dispose();
      (shape.material as THREE.Material).dispose();
    });
    this.renderer.dispose();
    this.controls.dispose();
  }
}

export default InteractiveScene;
