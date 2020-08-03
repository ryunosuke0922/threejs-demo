import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

import image from "../../images/points_billboards/disc.png";

export default class Canvas {
  camera: any;
  scene: any;
  renderer: any;
  stats: any;
  material: any;
  mouseX: number;
  mouseY: number;

  windowHalfX: number;
  windowHalfY: number;

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.init();
    this.animate();
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      2,
      2000
    );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.001);

    var geometry = new THREE.BufferGeometry();
    var vertices = [];

    var sprite = new THREE.TextureLoader().load(image);

    for (var i = 0; i < 10000; i++) {
      var x = 2000 * Math.random() - 1000;
      var y = 2000 * Math.random() - 1000;
      var z = 2000 * Math.random() - 1000;

      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    this.material = new THREE.PointsMaterial({
      size: 35,
      sizeAttenuation: false,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });
    this.material.color.setHSL(1.0, 0.3, 0.7);

    var particles = new THREE.Points(geometry, this.material);
    this.scene.add(particles);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // fps
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });

    this.render();
    this.stats.update();
  }

  render() {
    var time = Date.now() * 0.00005;

    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;

    this.camera.lookAt(this.scene.position);

    var h = ((360 * (1.0 + time)) % 360) / 360;
    this.material.color.setHSL(h, 0.5, 0.5);

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onDocumentMouseMove(event) {
    this.mouseX = event.clientX - this.windowHalfX;
    this.mouseY = event.clientY - this.windowHalfY;
  }

  onDocumentTouchStart(event) {}

  onDocumentTouchMove(event) {}
}
