# Imagen - Filtros

[Volver al informe](/docs/workshops/informImagingAndVideo)

Aplicando el filtro de negativo en una imagen, se obtuvo el siguiente resultado:

> :Tabs
> > :Tab title=Filtro de Negativo
> > 
> > ![Negative](/docs/sketches/imageNegative.jpg)
>
> > :Tab title=Processing
> >
> > ```processing
> > PImage photo1;
> > void setup() {
> >    size(1000, 1000);
> > }
> > 
> > void draw() {
> >     background(0,0,0);
> >     int halfImage = width*height/2;
> >     photo1 = loadImage("landscape.jpg");
> >     photo1.resize(1000,500);
> >     image(photo1, 0, 0);
> >     loadPixels();
> >     for (int i = 0; i < halfImage; i++) {
> >         float r = 255 - red(pixels[i]);
> >         float g = 255 - green(pixels[i]);
> >         float b = 255 - blue(pixels[i]);
> >         color c = color(r,g,b);
> >         pixels[i+halfImage] = c;
> >     }
> >     updatePixels();
> > }
> > ```


## Conversión a escalas grises
La conversión a grises se llevó a cabo a través de diferentes métodos.

### Promedio aritmético RGB
Se obtuvo el siguiente resultado

> :Tabs
> > :Tab title=Promedio aritmético RGB
> > 
> > ![GreyScaleAvg](/docs/sketches/greyscaleAvg.png)
>
> > :Tab title=Processing
> >
> > ```processing
> > PImage photo1;
> > 
> > void setup() {
> >   size(1000, 1000);
> > }
> > 
> > void draw() {
> >   background(0,0,0);
> >   int halfImage = width*height/2;
> >   photo1 = loadImage("landscape.jpg");
> >   photo1.resize(1000,500);
> >   image(photo1, 0, 0);
> >   loadPixels();
> >   for (int i = 0; i < halfImage; i++) {
> >       float r = red(pixels[i]);
> >       float g = green(pixels[i]);
> >       float b = blue(pixels[i]);
> >       float gray = (r+g+b)/3;
> >       color c = color(gray,gray,gray);
> >       pixels[i+halfImage] = c;
> >   }
> >   updatePixels();
> > } 

### Método Luma
Se obtuvo el siguiente resultado

> :Tabs
> > :Tab title=Luma
> > 
> > ![GreyScaleLuma](/docs/sketches/grayScaleLuma.png)
>
> > :Tab title=Processing
> >
> > ```processing
> > PImage photo1;
> > 
> > void setup() {
> >   size(500, 1000);
> > }
> > 
> > void draw() {
> >   background(0,0,0);
> >   int halfImage = width*height/4;
> >   photo1 = loadImage("fire3.jpg");
> >   photo1.resize(500,250);
> >   image(photo1, 0, 0);
> >   loadPixels();
> >   for (int i = 0; i < halfImage; i++) {
> >       float r = red(pixels[i]);
> >       float g = green(pixels[i]);
> >       float b = blue(pixels[i]);
> >       float y601 = (0.2989*r)+(0.5870*g)+(0.1140*b);
> >       float y240 = (0.212*r)+(0.701*g)+(0.0087*b);
> >       float y709 = (0.2126*r)+(0.7152*g)+(0.0722*b);
> >       float y2020 = (0.2627*r)+(0.6780*g)+(0.0593*b);
> >       color sdtv = color(y601,y601,y601);
> >       color adobe = color(y240,y240,y240);
> >       color hdtv = color(y709,y709,y709);
> >       color uhdtv = color(y2020,y2020,y2020);
> >       pixels[i+halfImage] =  adobe;
> >       pixels[i+(halfImage*2)] = hdtv;
> >       pixels[i+(halfImage*3)] = uhdtv;
> >       pixels[i] = sdtv;
> >       
> >   }
> >   updatePixels();
> > }

### Método HSV
Se obtuvo el siguiente resultado

> :Tabs
> > :Tab title=HSV
> > 
> > ![GreyScaleHSV](/docs/sketches/greyScaleHSV.png)
>
> > :Tab title=Processing
> >
> > ```processing
> > PImage photo1;
> > 
> > void setup() {
> >   size(896, 1000);
> > }
> > 
> > void draw() {
> >   background(0,0,0);
> >   int halfImage = width*height/2;
> >   photo1 = loadImage("fire3.jpg");
> >   photo1.resize(896,490);
> >   image(photo1, 0, 0);
> >   loadPixels();
> >   for (int i = 0; i < halfImage; i++) {
> >       float r = red(pixels[i]);
> >       float g = green(pixels[i]);
> >       float b = blue(pixels[i]);
> >       float gray = max(r,g,b);
> >       color c = color(gray,gray,gray);
> >       pixels[i+halfImage] = c;
> >   }
> >   updatePixels();
> > }

### Método HSL
Se obtuvo el siguiente resultado

> :Tabs
> > :Tab title=HSL
> > 
> > ![GreyScaleHSL](/docs/sketches/greyScaleHSL.png)
>
> > :Tab title=Processing
> >
> > ```processing
> > PImage photo1;
> > 
> > void setup() {
> >   size(896, 1000);
> > }
> > 
> > void draw() {
> >   background(0,0,0);
> >   int halfImage = width*height/2;
> >   photo1 = loadImage("fire3.jpg");
> >   photo1.resize(896,490);
> >   image(photo1, 0, 0);
> >   loadPixels();
> >   for (int i = 0; i < halfImage; i++) {
> >       float r = red(pixels[i]);
> >       float g = green(pixels[i]);
> >       float b = blue(pixels[i]);
> >       float gray = (max(r,g,b)+min(r,g,b))/2;
> >       color c = color(gray,gray,gray);
> >       pixels[i+halfImage] = c;
> >   }
> >   updatePixels();
> > }


> :ToCPrevNext
