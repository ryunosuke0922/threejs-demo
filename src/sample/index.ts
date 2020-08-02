import Canvas from "./canvas";

export default class Sample {
  constructor() {
    const canvas = new Canvas();

    window.addEventListener("mousemove", (e) => {
      canvas.mouseMoved(e.clientX, e.clientY);
    });

    window.addEventListener(
      "resize",
      () => {
        canvas.onWindowResize();
      },
      false
    );
  }
}
