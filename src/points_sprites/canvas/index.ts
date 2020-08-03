import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

import image01 from "../../images/points_sprites/snowflake1.png";
import image02 from "../../images/points_sprites/snowflake2.png";
import image03 from "../../images/points_sprites/snowflake3.png";
import image04 from "../../images/points_sprites/snowflake4.png";
import image05 from "../../images/points_sprites/snowflake5.png";

export default class Canvas {
  camera: any;
  scene: any;
  renderer: any;
  stats: any;
  materials: any;
  parameters: any;

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
      75,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    var geometry = new THREE.BufferGeometry();
    var vertices = [];

    var textureLoader = new THREE.TextureLoader();

    var sprite1 = textureLoader.load(image01);
    var sprite2 = textureLoader.load(image02);
    var sprite3 = textureLoader.load(image03);
    var sprite4 = textureLoader.load(image04);
    var sprite5 = textureLoader.load(image05);

    for (var i = 0; i < 10000; i++) {
      var x = Math.random() * 2000 - 1000;
      var y = Math.random() * 2000 - 1000;
      var z = Math.random() * 2000 - 1000;

      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    this.parameters = [
      [[1.0, 0.2, 0.5], sprite2, 20],
      [[0.95, 0.1, 0.5], sprite3, 15],
      [[0.9, 0.05, 0.5], sprite1, 10],
      [[0.85, 0, 0.5], sprite5, 8],
      [[0.8, 0, 0.5], sprite4, 5],
    ];

    this.materials = new Array(this.parameters.length); // （1）
    for (var i = 0; i < this.parameters.length; i++) {
      var color = this.parameters[i][0];
      var sprite = this.parameters[i][1];
      var size = this.parameters[i][2];

      this.materials[i] = new THREE.PointsMaterial({
        size: size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      this.materials[i].color.setHSL(color[0], color[1], color[2]);

      var particles = new THREE.Points(geometry, this.materials[i]);

      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      this.scene.add(particles);
    }

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

    for (var i = 0; i < this.scene.children.length; i++) {
      var object = this.scene.children[i];

      if (object instanceof THREE.Points) {
        object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
      }
    }

    for (var i = 0; i < this.materials.length; i++) {
      var color = this.parameters[i][0];

      var h = ((360 * (color[0] + time)) % 360) / 360;
      this.materials[i].color.setHSL(h, color[1], color[2]);
    }

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
