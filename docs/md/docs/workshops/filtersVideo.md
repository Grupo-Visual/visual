# Vídeo - Filtros

[Volver al informe](/docs/workshops/informImagingAndVideo)

## Para vídeo en vivo 

Se obtuvieron los siguientes resultados

### Negativo
> :Tabs
> > :Tab title=Negativo
> > 
> > > :P5 sketch=/docs/sketches/videoNegative.js, width=500, height=500
>
> > :Tab title=P5js Negativo
> > 
> > ```javascript
> > let capture;
> > let newCapture;
> > 
> > function setup() {
> >   createCanvas(500, 500);
> >   capture = createCapture(VIDEO);
> >   capture.hide();
> > }
> > 
> > function draw() {
> >   image(capture, 0, 0, width, width * capture.height / capture.width);
> >   loadPixels();
> >   for (var y = 0; y < 750; y++) {
> >     for (var x = 0; x < width; x++) {
> >       var index = (x + y * width)*4;
> >       var r = pixels[index+0];
> >       var g = pixels[index+1];
> >       var b = pixels[index+2];
> >              
> >       pixels[index+0] = 255 - r;
> >       pixels[index+1] = 255 - g;
> >       pixels[index+2] = 255 - b;
> >     }
> >   }
> >   updatePixels();
> > }
> > ```


### Conversión a grises por promedio RGB
> :Tabs
> > :Tab title=Promedio RGB
> > 
> > > :P5 sketch=/docs/sketches/videoGray.js, width=500, height=500
>
> > :Tab title=P5js
> > 
> > ```javascript
> > let capture;
> > let newCapture;
> > 
> > function setup() {
> >   createCanvas(500, 500);
> >   capture = createCapture(VIDEO);
> >   capture.hide();
> > }
> > 
> > function draw() {
> >   image(capture, 0, 0, width, width * capture.height / capture.width);
> >   loadPixels();
> >   for (var y = 0; y < 750; y++) {
> >     for (var x = 0; x < width; x++) {
> >       var index = (x + y * width)*4;
> >       var r = pixels[index+0];
> >       var g = pixels[index+1];
> >       var b = pixels[index+2];
> >       var a = pixels[index+3];     
> >               
> >       pixels[index+0] = (r+g+b)/3;
> >       pixels[index+1] = (r+g+b)/3;
> >       pixels[index+2] = (r+g+b)/3;
> >     }
> >   }
> >   updatePixels();
> > }
> > ```


## Para vídeo pregrabado

### Conversión a grises
#### Por promedio RGB
> :Tabs
> > :Tab title= Vídeo original
> >
> > ![Original](/docs/sketches/original.gif)
> 
> > :Tab title=Promedio RGB
> >
> > ![Promedio](/docs/sketches/grayaverage.gif)
>
> > :Tab title=Processing
> >
> > ```processing
> > PImage img;
> > import processing.video.*;
> > Movie myMovie;
> > 
> > void setup() {
> >   size(1200, 600);
> >   background(0);
> >   myMovie = new Movie(this, "productionID5091624.mp4");
> >   myMovie.loop();
> >   myMovie.volume(0);
> > 
> > }
> > 
> > void movieEvent(Movie m) {
> >   m.read();
> > }
> > 
> > void draw() {
> >   image(myMovie, 0, 0, width, height);
> >   for (int x=0; x<width; x++)
> >   {
> >     for (int y=0; y<height; y++)
> >     {
> >       color c = get(x, y);
> >       float red = red(c);
> >       float green = green(c);
> >       float blue = blue(c);
> >       int average = (int)(red+green+blue)/3;
> >       color Color = color(average, average, average);
> >       set(x, y, Color);
> >     }
> >   }
> > }
> > ```


#### Métodos Luma
> :Tabs
> > :Tab title=Luma 601
> >
> > ![Luma601](/docs/sketches/luma601.gif)
>
> > :Tab title=Processing Luma 601
> >
> > ```processing
> > 
> > PImage img;
> > import processing.video.*;
> > Movie myMovie;
> > 
> > void setup() {
> >   size(1200, 600);
> >   background(0);
> >   myMovie = new Movie(this, "productionID5091624.mp4");
> >   myMovie.loop();
> >   myMovie.volume(0);
> > 
> > }
> > 
> > void movieEvent(Movie m) {
> >   m.read();
> > }
> > 
> > void draw() {
> >   image(myMovie, 0, 0, width, height);
> >   for (int x=width/2; x<width; x++)
> >   {
> >     for (int y=0; y<height; y++)
> >     {
> >       color c = get(x, y);
> >       float red = red(c);
> >       float green = green(c);
> >       float blue = blue(c);
> >       float y601 = (0.2627 * red) + (0.6780 * green) + (0.0593 * blue );
> >       color Color = color(y601, y601, y601);
> >       set(x, y, Color);
> >     }
> >   }
> > 
> > }
> > ```
>
> > :Tab title=Luma 709
> >
> > ![Luma709](/docs/sketches/luma7algo.gif)
>
> > :Tab title=Processing Luma 601
> >
> > ```processing
> > PImage img;
> > import processing.video.*;
> > Movie myMovie;
> > 
> > void setup() {
> >   size(1200, 600);
> >   background(0);
> >   myMovie = new Movie(this, "productionID5091624.mp4");
> >   myMovie.loop();
> >   myMovie.volume(0);
> > 
> > }
> > 
> > void movieEvent(Movie m) {
> >   m.read();
> > }
> > 
> > void draw() {
> >   image(myMovie, 0, 0, width, height);
> >   for (int x=width/2; x<width; x++)
> >   {
> >     for (int y=0; y<height; y++)
> >     {
> >       color c = get(x, y);
> >       float red = red(c);
> >       float green = green(c);
> >       float blue = blue(c);
> >       float y709 = (0.2989*red)+(0.5870*green)+(0.1140*blue);
> >       color Color = color(y709, y709, y709);
> >       set(x, y, Color);
> >     }
> >   }
> > 
> > }
> > ```


#### Método HSV
> :Tabs
> > :Tab title=HSV
> >
> > ![HSV](/docs/sketches/HSV.gif)
>
> > :Tab title=Processing HSV
> >
> > ```processing
> > PImage img;
> > import processing.video.*;
> > Movie myMovie;
> > 
> > void setup() {
> >   size(1200, 600);
> >   background(0);
> >   myMovie = new Movie(this, "productionID5091624.mp4");
> >   myMovie.loop();
> >   myMovie.volume(0);
> > 
> > }
> > 
> > void movieEvent(Movie m) {
> >   m.read();
> > }
> > 
> > void draw() {
> >   image(myMovie, 0, 0, width, height);
> >   for (int x=width/2; x<width; x++)
> >   {
> >     for (int y=0; y<height; y++)
> >     {
> >       color c = get(x, y);
> >       float red = red(c);
> >       float green = green(c);
> >       float blue = blue(c);
> >       float gray = max(red,green,blue);
> >       color Color = color(gray, gray, gray);
> >       set(x, y, Color);
> >     }
> >   }
> > }
> > ```


> :ToCPrevNext