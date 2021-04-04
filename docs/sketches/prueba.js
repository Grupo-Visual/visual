let img;

function setup(){
  createCanvas(720, 400);
  img = loadImage('/images/000.jfif');
}

function draw(){
  
  image(img, 0, 0, img.width, img.height);
}