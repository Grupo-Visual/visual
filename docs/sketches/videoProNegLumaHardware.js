let theShader;
let img;
let sel;
var opcion = 1;

function preload(){
  theShader = loadShader('/visual/docs/sketches/shaders/paraTodos.vert','/visual/docs/sketches/shaders/imaProNegLuma.frag');
}
function setup() {
  createCanvas(700, 550, WEBGL);
  sel = createSelect();
  sel.position(620, 20);
  sel.option('Promedio');
  sel.option('Negativo');
  sel.option('Luma');
  sel.changed(function () {
    let val = sel.value();
    if(val == 'Promedio'){
      opcion = 1;
    } else if(val == 'Negativo'){
      opcion = 2;
    } else if(val == 'Luma'){
      opcion = 3; 
    }
  });
  textureMode(NORMAL);
  shader(theShader);
  capture = createCapture(VIDEO);
  capture.hide();
  theShader.setUniform("img", capture);
  background(0);
  noStroke();
}
function draw() {
  theShader.setUniform("opcion", opcion);
  beginShape();
  vertex(-width/2, -height/2, 0, 0);
  vertex(width/2, -height/2, 1, 0); 
  vertex(width/2, height/2, 1, 1); 
  vertex(-width/2, height/2, 0, 1); 
  endShape(CLOSE);
}