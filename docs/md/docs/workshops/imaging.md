# Image and video processing
Aplicando un filtro de negativo a una imagen

![Negative](/docs/sketches/imageNegative.jpg)


## Código en Processing:

```processing

PImage photo1;
void setup() {
    size(1000, 1000);
}
 
void draw() {
    background(0,0,0);
    int halfImage = width*height/2;
    photo1 = loadImage("landscape.jpg");
    photo1.resize(1000,500);
    image(photo1, 0, 0);
    loadPixels();
    for (int i = 0; i < halfImage; i++) {
        float r = 255-red(pixels[i]);
        float g = 255-green(pixels[i]);
        float b = 255-blue(pixels[i]);
        color c = color(r,g,b);
        pixels[i+halfImage] = c;
    }
    updatePixels();
}
```

> :ToCPrevNext
