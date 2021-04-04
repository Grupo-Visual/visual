let img;

function setup(){
  createCanvas(720, 400);
  img = loadImage('/images/escudo.png');
}

function draw(){
  
  image(img, 0, 0, img.width, img.height);
}