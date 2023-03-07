
import Canvas, { ContextMaybe } from "../../src/canvas";


window.onload = () => {
    const elem = document.getElementById("myCanvas");
    const canvas = new Canvas(elem);
    canvas.draw(ctx => {
        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 100, 50);
    });
}