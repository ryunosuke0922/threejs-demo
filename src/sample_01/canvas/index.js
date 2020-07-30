import * as THREE from "three";
import img01 from "../../../asset/01.png";
import img02 from "../../../asset/02.png";

export default class Canvas {
  constructor() {
    // ウィンドウサイズ
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // レンダラーを作成
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.w, this.h); // 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio); // ピクセル比

    // #canvas-containerにレンダラーのcanvasを追加
    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, this.w / this.h, 1, 10000);
    // カメラの位置（z軸をプラスが手前？多分）
    this.camera.position.set(0, 0, +1000);

    // シーンを作成
    this.scene = new THREE.Scene();

    // メッシュをシーンに追加
    // this.scene.add(this.mesh);

    // ロード用のオブジェクトを作成
    const loader = new THREE.TextureLoader();
    // テクスチャ画像を読み込む
    const texture = loader.load(img01); // テクスチャのパス
    // テクスチャをマテリアルに設定
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      alphaTest: 0.2,
    });

    // ジオメトリを作って、マテリアル設定して、シーンに追加
    const geometry1 = new THREE.PlaneGeometry(94, 56, 1, 0);
    const polygon = new THREE.Mesh(geometry1, material);
    polygon.position.set(40, 23, 0);

    this.scene.add(polygon);

    const polygon2 = new THREE.Mesh(geometry1, material);
    polygon2.position.set(0, 0, 0);

    this.scene.add(polygon2);

    const texture2 = loader.load(img02); // テクスチャのパス
    // テクスチャをマテリアルに設定
    const material2 = new THREE.MeshBasicMaterial({
      map: texture2,
      alphaTest: 0.2,
    });

    const geometry3 = new THREE.PlaneGeometry(46, 98, 1, 0);
    const polygon3 = new THREE.Mesh(geometry3, material2);
    polygon3.position.set(30, 0, 0);

    this.scene.add(polygon3);

    const geometry4 = new THREE.PlaneGeometry(46, 98, 1, 0);
    const polygon4 = new THREE.Mesh(geometry4, material2);
    polygon4.position.set(-55, 50, 0);

    this.scene.add(polygon4);

    // DirectionalLightは平行光源
    // ライトもシーンに追加することで反映されます。
    const directionalLight = new THREE.DirectionalLight(0xffffff);

    // 光源が斜めから差し込むように位置を変更
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // マウス座標
    this.mouse = new THREE.Vector2(0, 0);

    // 画面に表示
    this.render();
  }

  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render();
    });

    // ミリ秒から秒に変換

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }

  mouseMoved(x, y) {
    this.mouse.x = x - this.w / 2; // 原点を中心に持ってくる
    this.mouse.y = -y + this.h / 2; // 軸を反転して原点を中心に持ってくる

    // ライトの xy座標 をマウス位置にする
    this.light.position.x = this.mouse.x;
    this.light.position.y = this.mouse.y;
  }
}
