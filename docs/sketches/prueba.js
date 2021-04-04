let img;

function setup(){
  createCanvas(640, 400);
  img = loadImage('/visual/docs/sketches/images/escudo.png');
}

function draw(){
  
  image(img, 0, 0, img.width/4, img.height/4);
}