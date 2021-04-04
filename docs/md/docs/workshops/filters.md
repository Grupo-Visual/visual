# Image and video processing

## Propósito
Aplicar a imágenes un filtro de negativo, así como conversión a escala de grises a través de diferentes métodos: RGB, Luma, entre otros.

## Background
Existen diferentes métodos o fórmulas para la conversión de las imágenes según los criterios mencionados. Cada una de ellas tiene sus características particulares, como por ejemplo: algunas resaltan mejor el brillo de las imágenes al realizar la conversión. La fórmula correspondiente a cada uno de los métodos se encuentra presente en el apartado dedicado a los mismos.

## Filtro de negativo
Aplicando un filtro de negativo a una imagen. Para este proceso, se cargaron todos los pixeles de la imagen a través del método loadpixels(), luego, se aplicó la fórmula  RGBNegative =(255 - R, 255 - G, 255 - B) obteniendo los resultados mostrados en la imagen.

![Negative](/docs/sketches/imageNegative.jpg)


#### Código en Processing:

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
        float r = 255 - red(pixels[i]);
        float g = 255 - green(pixels[i]);
        float b = 255 - blue(pixels[i]);
        color c = color(r,g,b);
        pixels[i+halfImage] = c;
    }
    updatePixels();
}
```
## Conversión a escalas grises
La conversión a grises se llevó a cabo a través de diferentes métodos.

### Promedio aritmético RGB
El primer método consiste en hayar un promedio aritmético de cada uno de los pixeles a través de la fórmula  Gray = (R+G+B)/3

Se obtuvo el siguiente resultado
![GreyScaleAvg](/docs/sketches/greyscaleAvg.png)

#### Código en Processing:
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
      float r = red(pixels[i]);
      float g = green(pixels[i]);
      float b = blue(pixels[i]);
      float gray = (r+g+b)/3;
      color c = color(gray,gray,gray);
      pixels[i+halfImage] = c;
  }
  updatePixels();
}
```

### Método Luma
Existen variantes del método Luma, que se basan en los pesos que se le da a cada uno de los componentes en la ecuación, en la implementación realizada, se hace uso de las siguientes variantes:

De arriba hacia abajo:
- Y'601 = (0.2989 * R) + (0.5870 * G)+ (0.1140 * B) SDTV
- Y'240 = (0.212 * R) + (0.701 * G) + (0.087 * B)  Adobe
- Y'709 = (0.2126 * R) + (0.7152 * G) +(0.0722 * B) HDTV
- Y'709 = (0.2627 * R) + (0.6780 * G) + (0.0593 * B ) UHDTV, HDR

Este valor Y' se usa para los valores de R, G y B en cada uno de los pixeles para cada caso.

![GreyScaleLuma](/docs/sketches/grayScaleLuma.png)

#### Código en Processing:
```processing
PImage photo1;

void setup() {
  size(500, 1000);
}

void draw() {
  background(0,0,0);
  int halfImage = width*height/4;
  photo1 = loadImage("fire3.jpg");
  photo1.resize(500,250);
  image(photo1, 0, 0);
  loadPixels();
  for (int i = 0; i < halfImage; i++) {
      float r = red(pixels[i]);
      float g = green(pixels[i]);
      float b = blue(pixels[i]);
      float y601 = (0.2989*r)+(0.5870*g)+(0.1140*b);
      float y240 = (0.212*r)+(0.701*g)+(0.0087*b);
      float y709 = (0.2126*r)+(0.7152*g)+(0.0722*b);
      float y2020 = (0.2627*r)+(0.6780*g)+(0.0593*b);
      color sdtv = color(y601,y601,y601);
      color adobe = color(y240,y240,y240);
      color hdtv = color(y709,y709,y709);
      color uhdtv = color(y2020,y2020,y2020);
      pixels[i+halfImage] =  adobe;
      pixels[i+(halfImage*2)] = hdtv;
      pixels[i+(halfImage*3)] = uhdtv;
      pixels[i] = sdtv;
      
  }
  updatePixels();
}
``` 
### Método HSV
El método HSV consiste en tomar el máximo de los valores entre R,G y B
![GreyScaleHSV](/docs/sketches/greyScaleHSV.png)

#### Código en Processing:
```processing
PImage photo1;

void setup() {
  size(896, 1000);
}

void draw() {
  background(0,0,0);
  int halfImage = width*height/2;
  photo1 = loadImage("fire3.jpg");
  photo1.resize(896,490);
  image(photo1, 0, 0);
  loadPixels();
  for (int i = 0; i < halfImage; i++) {
      float r = red(pixels[i]);
      float g = green(pixels[i]);
      float b = blue(pixels[i]);
      float gray = max(r,g,b);
      color c = color(gray,gray,gray);
      pixels[i+halfImage] = c;
  }
  updatePixels();
}
```

### Método HSL
El método HSL consiste en hallar el promedio de el máximo y el mínimo de los valores entre R,G y B
![GreyScaleHSL](/docs/sketches/greyScaleHSL.png)

#### Código en Processing:
```processing
PImage photo1;

void setup() {
  size(896, 1000);
}

void draw() {
  background(0,0,0);
  int halfImage = width*height/2;
  photo1 = loadImage("fire3.jpg");
  photo1.resize(896,490);
  image(photo1, 0, 0);
  loadPixels();
  for (int i = 0; i < halfImage; i++) {
      float r = red(pixels[i]);
      float g = green(pixels[i]);
      float b = blue(pixels[i]);
      float gray = (max(r,g,b)+min(r,g,b))/2;
      color c = color(gray,gray,gray);
      pixels[i+halfImage] = c;
  }
  updatePixels();
}
```

## Conclusiones y trabajo futuro
Hay bastantes métodos para la conversión de imágenes y/o aplicación de filtros. A pesar de que varias de ellas varían de forma mínimo, como se mencionó anteriormente, cada método tiene sus ventajas en aspectos muy particulares frente a los otros. Resultaría pertinente realizar diversas pruebas con amplios bancos de imágenes que permitieran clasificar de alguna manera los diferentes métodos en términos de el uso apropiado de cada uno en función del resultado que se desea obtener.

> :ToCPrevNext
