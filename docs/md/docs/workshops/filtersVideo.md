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

&nbsp;

## Conversión de video a escala de grises usando el método de promedio, Luma y HSV.


A continuación se presenta el video original:

![Original](/docs/sketches/original.gif)

&nbsp;

Luego se presenta la conversión a escala de grises usando el método del promedio RGB:

![Promedio](/docs/sketches/grayaverage.gif)

Se convierte a escala de grises medio recuadro (derecho) del video.

Ahora se presenta la conversión a escala de grises usando el método del Luma 601, en el cual se aprecia más claramente el brillo:

![Luma601](/docs/sketches/luma601.gif)


Conversión a escala de grises usando el método del Luma 709:

![Luma709](/docs/sketches/luma7algo.gif)

Por último se presenta la conversión con el metodo HSV, en el cual el brillo es más fuerte que el producido por los métodos anteriores:

![HSV](/docs/sketches/HSV.gif)

Como se dijo anteriormente, los filtros aplicados a imagénes pueden ser aplicados a video, en este apartado, solo se comparte la implementación de algunos de estos.

&nbsp;

## Código en processing 

### - para el método del promedio RGB
```processing
PImage img;
import processing.video.*;
Movie myMovie;

void setup() {
  size(1200, 600);
  background(0);
  myMovie = new Movie(this, "productionID5091624.mp4");
  myMovie.loop();
  myMovie.volume(0);

}

void movieEvent(Movie m) {
  m.read();
}

void draw() {
  image(myMovie, 0, 0, width, height);
  for (int x=0; x<width; x++)
  {
    for (int y=0; y<height; y++)
    {
      color c = get(x, y);
      float red = red(c);
      float green = green(c);
      float blue = blue(c);
      int average = (int)(red+green+blue)/3;
      color Color = color(average, average, average);
      set(x, y, Color);
    }
  }

}
```
&nbsp;

### - para el método Luma 601
```processing

PImage img;
import processing.video.*;
Movie myMovie;

void setup() {
  size(1200, 600);
  background(0);
  myMovie = new Movie(this, "productionID5091624.mp4");
  myMovie.loop();
  myMovie.volume(0);

}

void movieEvent(Movie m) {
  m.read();
}

void draw() {
  image(myMovie, 0, 0, width, height);
  for (int x=width/2; x<width; x++)
  {
    for (int y=0; y<height; y++)
    {
      color c = get(x, y);
      float red = red(c);
      float green = green(c);
      float blue = blue(c);
      float y601 = (0.2627 * red) + (0.6780 * green) + (0.0593 * blue );
      color Color = color(y601, y601, y601);
      set(x, y, Color);
    }
  }

}
```
&nbsp;

### - para el método Luma 709
```processing
PImage img;
import processing.video.*;
Movie myMovie;

void setup() {
  size(1200, 600);
  background(0);
  myMovie = new Movie(this, "productionID5091624.mp4");
  myMovie.loop();
  myMovie.volume(0);

}

void movieEvent(Movie m) {
  m.read();
}

void draw() {
  image(myMovie, 0, 0, width, height);
  for (int x=width/2; x<width; x++)
  {
    for (int y=0; y<height; y++)
    {
      color c = get(x, y);
      float red = red(c);
      float green = green(c);
      float blue = blue(c);
      float y709 = (0.2989*red)+(0.5870*green)+(0.1140*blue);
      color Color = color(y709, y709, y709);
      set(x, y, Color);
    }
  }

}
```

&nbsp;

### - para el método HSV
```processing
PImage img;
import processing.video.*;
Movie myMovie;

void setup() {
  size(1200, 600);
  background(0);
  myMovie = new Movie(this, "productionID5091624.mp4");
  myMovie.loop();
  myMovie.volume(0);

}

void movieEvent(Movie m) {
  m.read();
}

void draw() {
  image(myMovie, 0, 0, width, height);
  for (int x=width/2; x<width; x++)
  {
    for (int y=0; y<height; y++)
    {
      color c = get(x, y);
      float red = red(c);
      float green = green(c);
      float blue = blue(c);
      float gray = max(red,green,blue);
      color Color = color(gray, gray, gray);
      set(x, y, Color);
    }
  }

}
```

&nbsp;

> :ToCPrevNext