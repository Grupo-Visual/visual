# Mosaico de Imagen/video

[Volver al informe](/docs/workshops/informImagingAndVideo)

Se obtuvo el siguiente resultado

> :Tabs
> > :Tab title= Resultado
> > 
> > > :P5 sketch=/docs/sketches/videoMosaic.js, width=650, height=600
>
> > :Tab title=JavaScript
> > 
> > ```js
> > PImage picture;
PImage smaller;
PImage[] allImages;
float[] brightness;
PImage[] brightImages;

int scl = 16;
int w, h;

void setup() {
  size(1400, 1000);
  picture = loadImage("gato.jpg");

  File[] files = listFiles(sketchPath("data/photos"));
  allImages = new PImage[50];
  brightness = new float[allImages.length];
  brightImages = new PImage[256];

  for (int i = 0; i < allImages.length; i++) {
    String filename = files[i+1].toString();
    PImage img = loadImage(filename);

    allImages[i] = createImage(scl, scl, RGB);
    allImages[i].copy(img, 0, 0, img.width, img.height, 0, 0, scl, scl);
    allImages[i].loadPixels();

    float avg = 0;
    for (int j = 0; j < allImages[i].pixels.length; j++) {
      float b =  brightness(allImages[i].pixels[j]);
      avg += b;
    }
    avg /= allImages[i].pixels.length;
    brightness[i] = avg;
  }

  for (int i = 0; i < brightImages.length; i++) {
    float record = 256;
    for (int j = 0; j < brightness.length; j++) {
      float diff = abs(i - brightness[j]);
      if (diff < record) {
        record = diff;
        brightImages[i] = allImages[j];
      }
    }
  }

  w = picture.width/scl;
  h = picture.height/scl;

  smaller = createImage(w, h, RGB);
  smaller.copy(picture, 0, 0, picture.width, picture.height, 0, 0, w, h);
}

void draw() {
  background(0);
  smaller.loadPixels();
  // Columns and rows
  for (int x =0; x < w; x++) {
    for (int y = 0; y < h; y++) {
      int index = x + y * w;
      color c = smaller.pixels[index];
      int imageIndex = int(brightness(c));
      fill(brightness(c));
      noStroke();
      rect(x*scl, y*scl, scl, scl);
      image(brightImages[imageIndex], x*scl, y*scl, scl, scl);
    }
  }
  noLoop();
}

File[] listFiles(String dir) {
  File file = new File(dir);
  if (file.isDirectory()) {
    File[] files = file.listFiles();
    return files;
  } else {
    return null;
  }
}
> > ```

> :ToCPrevNext