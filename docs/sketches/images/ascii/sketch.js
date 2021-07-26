let ashader;
let image;
let symbol = [];

let symbols = [
    "156.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "10.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "16.png",
    "17.png",
    "18.png",
    "19.png",
    "20.png",
    "21.png",
    "22.png",
    "23.png",
    "24.png",
    "25.png",
    "26.png",
    "27.png"
]

function preload() {
    image = loadImage('gato_mosaico.jpg');
    for (let i = 1; i < 28; i++) {
        symbol[i] = loadImage(symbols[i]);
    }
    ashader = loadShader('shader.vert', 'photomosaic.frag');
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