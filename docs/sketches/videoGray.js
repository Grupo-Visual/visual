/*
* Código tomado y adaptado de: https://editor.p5js.org/leftlife/sketches/cFD-TFQqe
* y https://idmnyu.github.io/p5.js-image/Filters/index.html#neg
*/

let capture;
let newCapture;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.hide();
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
      var a = pixels[index+3];     
              
      pixels[index+0] = (r+g+b)/3;
      pixels[index+1] = (r+g+b)/3;
      pixels[index+2] = (r+g+b)/3;
    }
  }
  updatePixels();
}