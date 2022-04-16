// Spotify Duotone Filter with HTML Canvas and Javascript
// by Anthony Teo
/* 
This function generates a duotone version of an image on an HTML Canvas element using Javascript.
It makes use of the newer canvas functions, including filter and the globalCompositeOperations, making it
less code-heavy compared to existing implementations in canvas.
The benefit of using this method compared to CSS filters is the ability to convert the canvas to an image to be saved.
Libraries like HTMLtoCanvas state in their documentation that CSS filters are not supported, so it is probably not possible
to do so in CSS. This is a purely JS and Canvas implementation.
*/
import Vue from "vue";

export default function Duotone(
  id,
  src,
  primaryClr,
  secondaryClr,
  actions = (ctx) => null
) {
  let canvas = Vue.$refs[id];
  console.log("canvas", canvas);
  let ctx = canvas.getContext("2d");

  let downloadedImg = new Image();
  downloadedImg.crossOrigin = ""; // to allow us to manipulate the image without tainting canvas
  downloadedImg.onload = function () {
    ctx.drawImage(downloadedImg, 0, 0, canvas.width, canvas.height); // draws image to canvas on load
    // Converts to grayscale by averaging the values of each pixel
    let imageData = ctx.getImageData(0, 0, 800, 800);
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      // Using relative luminance to convert to grayscale
      const avg = Math.round((0.299 * red + 0.587 * green + 0.114 * blue) * 1);
      pixels[i] = avg;
      pixels[i + 1] = avg;
      pixels[i + 2] = avg;
    }
    // Puts the grayscaled image data back into the canvas
    ctx.putImageData(imageData, 0, 0);
    // puts the duotone image into canvas with multiply and lighten
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = primaryClr; // colour for highlights
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // lighten
    ctx.globalCompositeOperation = "lighten";
    ctx.fillStyle = secondaryClr; // colour for shadows
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // calls any other draws that you want through the function parameter passed in
    actions(ctx);
  };
  downloadedImg.src = src; // source for the image
}
