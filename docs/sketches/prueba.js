let img;

function setup(){
  createCanvas(640, 400);
  img = loadImage('/visual/docs/sketches/images/000.jfif');
}

function draw(){
  
  image(img, 0, 0, img.width, img.height);
}