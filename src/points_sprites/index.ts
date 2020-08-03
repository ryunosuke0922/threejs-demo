import Canvas from "./canvas";

export default class PointsSprites {
  constructor() {
    const canvas = new Canvas();

    window.addEventListener(
      "resize",
      () => {
        canvas.onWindowResize();
      },
      false
    );

    window.addEventListener("mousemove", (e) => {
      canvas.onDocumentMouseMove(e);
    });

    window.addEventListener("touchstart", (e) => {
      canvas.onDocumentTouchStart(e);
    });

    window.addEventListener("touchmove", (e) => {
      canvas.onDocumentTouchMove(e);
    });
  }
}
