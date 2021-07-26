let ashader;
let image;
let symbol = [];

let symbols = [
    "/visual/docs/sketches/images/ascii/1.png",
    "/visual/docs/sketches/images/ascii/1.png",
    "/visual/docs/sketches/images/ascii/2.png",
    "/visual/docs/sketches/images/ascii/3.png",
    "/visual/docs/sketches/images/ascii/4.png",
    "/visual/docs/sketches/images/ascii/5.png",
    "/visual/docs/sketches/images/ascii/6.png",
    "/visual/docs/sketches/images/ascii/7.png",
    "/visual/docs/sketches/images/ascii/8.png",
    "/visual/docs/sketches/images/ascii/9.png",
    "/visual/docs/sketches/images/ascii/10.png",
    "/visual/docs/sketches/images/ascii/11.png",
    "/visual/docs/sketches/images/ascii/12.png",
    "/visual/docs/sketches/images/ascii/13.png",
    "/visual/docs/sketches/images/ascii/14.png",
    "/visual/docs/sketches/images/ascii/15.png",
    "/visual/docs/sketches/images/ascii/16.png",
    "/visual/docs/sketches/images/ascii/17.png",
    "/visual/docs/sketches/images/ascii/18.png",
    "/visual/docs/sketches/images/ascii/19.png",
    "/visual/docs/sketches/images/ascii/20.png",
    "/visual/docs/sketches/images/ascii/21.png",
    "/visual/docs/sketches/images/ascii/22.png",
    "/visual/docs/sketches/images/ascii/23.png",
    "/visual/docs/sketches/images/ascii/24.png",
    "/visual/docs/sketches/images/ascii/25.png",
    "/visual/docs/sketches/images/ascii/26.png",
    "/visual/docs/sketches/images/ascii/27.png"
]

function preload() {
    image = loadImage('/visual/docs/sketches/images/ascii/gato_mosaico.jpg');
    for (let i = 1; i < 28; i++) {
        symbol[i] = loadImage(symbols[i]);
    }
    ashader = loadShader('/visual/docs/sketches/shaders/paraTodos.vert', '/visual/docs/sketches/shaders/photomosaic.frag');
}


function setup() {
    createCanvas(600, 600, WEBGL);
    textureMode(NORMAL);
    noStroke();
    shader(ashader);
    ashader.setUniform('image', image);
    for (let i = 1; i < Object.keys(symbol).length; i++) {
        ashader.setUniform('symbol' + i, symbol[i]);
    }
    ashader.setUniform('resolution', 400);
    console.log("Hola");
}


function draw() {
    background(33);
    beginShape();
    vertex(-width / 2, -height / 2, 0, 0, 0);
    vertex(width / 2, -height / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 0, 1, 1);
    vertex(-width / 2, height / 2, 0, 0, 1);
    endShape();
}