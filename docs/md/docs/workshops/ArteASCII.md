# Arte ASCII
Se obtuvo el siguiente resultado

> :Tabs
> > :Tab title=Kernel 1
> > 
> > ![Proceso Imagen a ASCII](/docs/sketches/ResultadoArteAscii.PNG)
>
> > :Tab title=Kernel 2
> > 
> > ![Imagen ASCII](/docs/sketches/ResultadoArteAscii2.PNG)
>
> > :Tab title=Java
> >
> > ```java
> > PImage img;
> > int resolution = 7;
> > char[] ascii;
> >  
> > public void settings(){
> >   size(700,700);
> > }
> >  
> > void setup() {
> >   img = loadImage("leon.jpg");
> >   background(255);
> >   fill(0);
> >   
> >   ascii = new char[256];
> >   String letters = "ABSHDB-MN@#$o;:,. ";
> >   for (int i = 0; i < 256; i++) {
> >     int index = int(map(i, 0, 256, 0, letters.length()));
> >     ascii[i] = letters.charAt(index);
> >     System.out.println(ascii[i]);
> >   }
> >  
> >   PFont mono = createFont("Courier", resolution + 2);
> >   textFont(mono);
> >  
> >   asciify();
> > }
> > 
> > void asciify() {
> >   img.filter(GRAY);
> >   img.loadPixels();
> >   
> >   for (int y = 0; y < img.height; y += resolution) {
> >     for (int x = 0; x < img.width; x += resolution) {
> >       color pixel = img.pixels[y * img.width + x];
> >       text(ascii[int(brightness(pixel))], x, y);
> >     }
> >   }
> >   
> > }
> > ```

> :ToCPrevNext