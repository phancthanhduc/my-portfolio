import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Cyberpunk 3D Scene with Grid Floor
export class CyberpunkScene {
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
  private gridLines: THREE.Line[] = [];
  private particles: THREE.Points | null = null;
  private onHover: ((name: string | null) => void) | null = null;
  private onClick: ((name: string | null) => void) | null = null;

  // Cyberpunk colors
  private readonly colors = {
    pink: 0xff00ff,
    cyan: 0x00ffff,
    purple: 0x8b5cf6,
    yellow: 0xf59e0b,
    grid: 0x8b5cf6
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.015);

    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 12);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x0a0a0f);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 20;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.3;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clock = new THREE.Clock();

    this.initLights();
    this.initGridFloor();
    this.initFloatingShapes();
    this.initParticles();
    this.initEvents();
  }

  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 5);
    this.scene.add(mainLight);

    // Neon accent lights
    const pinkLight = new THREE.PointLight(this.colors.pink, 2, 20);
    pinkLight.position.set(-5, 3, 0);
    this.scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(this.colors.cyan, 2, 20);
    cyanLight.position.set(5, 3, 0);
    this.scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(this.colors.purple, 1.5, 25);
    purpleLight.position.set(0, 5, -5);
    this.scene.add(purpleLight);
  }

  private initGridFloor(): void {
    // Create animated grid floor
    const gridSize = 40;
    const gridDivisions = 40;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, this.colors.purple, this.colors.grid);
    gridHelper.position.y = -3;
    this.scene.add(gridHelper);
    this.gridLines.push(gridHelper);

  }

  private initFloatingShapes(): void {
    const shapeConfigs = [
      { geo: new THREE.IcosahedronGeometry(0.5, 0), color: this.colors.pink, pos: [-4, 0, 0], name: 'Pink Gem' },
      { geo: new THREE.OctahedronGeometry(0.4, 0), color: this.colors.cyan, pos: [4, 1, -2], name: 'Cyan Crystal' },
      { geo: new THREE.TorusGeometry(0.3, 0.1, 8, 30), color: this.colors.purple, pos: [-3, 2, -1], name: 'Purple Ring' },
      { geo: new THREE.TetrahedronGeometry(0.5, 0), color: this.colors.yellow, pos: [3, -1, 1], name: 'Yellow Core' },
      { geo: new THREE.DodecahedronGeometry(0.35, 0), color: this.colors.pink, pos: [0, 3, -3], name: 'Pink Star' },
      { geo: new THREE.BoxGeometry(0.4, 0.4, 0.4), color: this.colors.cyan, pos: [-2, -2, 2], name: 'Cyan Cube' },
      { geo: new THREE.ConeGeometry(0.3, 0.6, 6), color: this.colors.purple, pos: [2, 2, 0], name: 'Purple Cone' },
      { geo: new THREE.TorusKnotGeometry(0.25, 0.08, 64, 8), color: this.colors.pink, pos: [0, 0, -4], name: 'Pink Knot' },
    ];

    shapeConfigs.forEach((config, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: config.color,
        metalness: 0.8,
        roughness: 0.2,
        emissive: config.color,
        emissiveIntensity: 0.4,
        wireframe: false
      });

      const mesh = new THREE.Mesh(config.geo, material);
      mesh.position.set(...config.pos as [number, number, number]);
      mesh.userData = { name: config.name, originalPos: [...config.pos], index };
      this.shapes.push(mesh);
      this.scene.add(mesh);

      // Wireframe overlay
      const wireMat = new THREE.MeshBasicMaterial({
        color: config.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const wireframe = new THREE.Mesh(config.geo, wireMat);
      mesh.add(wireframe);
      mesh.userData.wireframe = wireframe;
    });
  }

  private initParticles(): void {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const color = [this.colors.pink, this.colors.cyan, this.colors.purple][Math.floor(Math.random() * 3)];
      const c = new THREE.Color(color);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
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
      this.onClick?.(clickedShape.userData.name);
    } else {
      this.onClick?.(null);
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    const time = this.clock.getElapsedTime();

    // Animate floating shapes
    this.shapes.forEach((shape, index) => {
      // Floating animation
      const basePos = shape.userData.originalPos;
      shape.position.y = basePos[1] + Math.sin(time * 0.5 + index) * 0.3;
      shape.position.x = basePos[0] + Math.sin(time * 0.3 + index) * 0.1;

      // Rotation
      shape.rotation.x += 0.01;
      shape.rotation.y += 0.015;

      // Pulse emissive
      const material = shape.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(time * 2 + index) * 0.2;
    });

    // Animate particles
    if (this.particles) {
      this.particles.rotation.y += 0.001;
      this.particles.position.y = Math.sin(time * 0.1) * 0.5;
    }

    // Hover detection
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.shapes);

    // Reset all shapes
    this.shapes.forEach((shape) => {
      const mat = shape.material as THREE.MeshStandardMaterial;
      if (intersects.length === 0 || intersects[0].object !== shape) {
        mat.emissiveIntensity *= 0.95;
      }
    });

    if (intersects.length > 0) {
      const hoveredShape = intersects[0].object as THREE.Mesh;
      const mat = hoveredShape.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8;
      this.canvas.style.cursor = 'pointer';
      this.onHover?.(hoveredShape.userData.name);
    } else {
      this.canvas.style.cursor = 'default';
      this.onHover?.(null);
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
    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
    }
    this.renderer.dispose();
    this.controls.dispose();
  }
}

export default CyberpunkScene;
