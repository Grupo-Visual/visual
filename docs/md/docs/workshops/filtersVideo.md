# Vídeo - Filtros

De forma similar, todos los métodos mostrados anteriormente pueden ser aplicados también a vídeos. Se mostrarán algunos de ellos como ejemplo, las fórmulas (o métodos) de conversión usados son los mismos a los mostrados en la sección de [Imaging-filter](/docs/workshops/filters)

## Negativo

> :P5 sketch=/docs/sketches/videoNegative.js, width=500, height=500

### Código en P5js
```javascript
let capture;
let newCapture;

function setup() {
  createCanvas(500, 500);
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
   
              
      pixels[index+0] = 255 - r;
      pixels[index+1] = 255 - g;
      pixels[index+2] = 255 - b;
    }
  }
  updatePixels();
}
```


## Conversión a grises

> :P5 sketch=/docs/sketches/videoGray.js, width=500, height=500

### Código en P5js
```javascript
let capture;
let newCapture;

function setup() {
  createCanvas(500, 500);
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
```

## Conversión de video a escala de grises usando el método de promedio, Luma y HSV.



> :ToCPrevNext