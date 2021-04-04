/*
* Código tomado y adaptado de: https://editor.p5js.org/leftlife/sketches/cFD-TFQqe
* y https://idmnyu.github.io/p5.js-image/Filters/index.html#neg
*/

let capture;
let newCapture;

function setup() {
  createCanvas(500, 500);
  capture = createCapture(VIDEO);
  //capture.hide();
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
  loadPixels();
  for (var y = 0; y < 750; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width)*4;
      var r = pixels[index+0];
      var g = pixels[index+1];
      var b = pixels[index+2];
   
              
      pixels[index+0] = 255 - r;
      pixels[index+1] = 255 - g;
      pixels[index+2] = 255 - b;
    }
  }
  updatePixels();
}