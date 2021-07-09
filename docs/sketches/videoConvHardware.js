let img;
let sha;
let identidad;
let borde;
let agu;
let boxBlur;
let gaussBlur;
let colores;
var siColor = false;
var kernel = [0, 0, 0, 0, 1, 0, 0, 0, 0];

function preload(){
  sha = loadShader('/visual/docs/sketches/shaders/paraTodos.vert','/visual/docs/sketches/shaders/imaConv.frag');
}
function setup() {
  createCanvas(700, 550, WEBGL);
  idetindad = createButton('Identity');
  idetindad.position(10, 570);
  idetindad.mousePressed(function () { 
    let aux = [0, 0, 0, 0, 1, 0, 0, 0, 0];
    kernel = aux;
  });
  borde = createButton('Edge detection');
  borde.position(80, 570);
  borde.mousePressed(function () {
    let aux = [-1.0,-1.0,-1.0,-1.0,8.0,-1.0,-1.0,-1.0,-1.0];
    kernel = aux;
  });
  agu = createButton('Sharpen');
  agu.position(195, 570);
  agu.mousePressed(function () {
    let aux = [0.0,-1.0,0.0,-1.0,5.0,-1.0,0.0,-1.0,0.0];
    kernel = aux;
  });
  boxBlur = createButton('Box blur');
  boxBlur.position(270, 570);
  boxBlur.mousePressed(function () {
    let aux = [(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9),(1/9)];
    kernel = aux;
  });
  gaussBlur = createButton('Gaussian blur');
  gaussBlur.position(345, 570);
  gaussBlur.mousePressed(function () {
    let aux = [(1/16),(2/16),(1/16),(2/16),(4/16),(2/16),(1/16),(2/16),(1/16)];
    kernel = aux;
  });
  colores = createButton('Colors');
  colores.position(645, 570);
  colores.mousePressed(function () {
    siColor = !siColor;
  });
  textureMode(NORMAL);
  shader(sha);
  capture = createCapture(VIDEO);
  capture.hide();
  sha.setUniform("offSet", [1.0/img.width, 1.0/img.height]);
  sha.setUniform("img", capture);
  background(0);
  noStroke();
}
function draw() { 
  beginShape();
  siColor ? fill(255,255,0) : fill(255,255,255);
  vertex(-width/2, -height/2, 0, 0);
  siColor ? fill(0,0,255) : fill(255,255,255);
  vertex(width/2, -height/2, 1, 0);
  siColor ? fill(200,0,0) : fill(255,255,255); 
  vertex(width/2, height/2, 1, 1); 
  siColor ? fill(120,60,255) : fill(255,255,255);
  vertex(-width/2, height/2, 0, 1); 
  sha.setUniform("kernel", kernel);
  endShape(CLOSE);
}