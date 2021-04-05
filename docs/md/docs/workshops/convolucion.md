# Imagen y Video Convolucion

# Image Kernel 

En esta seccion presentamos la apliacion de la tecnica de procesamiento de imagenes denominada Convolucion, Kernel o Máscara para imagenes que mediante una matriz de tamaño impar se logran efectos como enfoque, desenfoque o realce. Estas denominadas marcas se logran mediante una convolucion entre un nucleo (kernel) y una imagen, cambia la intensidad de un pixel para reflejar las intencidades de los piexeles circundantes.

La convolucion tambien es util para afinar o mejorar algunas cualidades de las imagenes, estas mejoras son muy utiles cuandos se trata de imagenes cientificas.


Ejemplo:

El alto y el ancho del kernel no tiene que se el mismo, sin embargo si deben ser impares. Los valores contenidos dentro del kernel son los que determinan un mascara o convolucion, determinan como transformar los pixeles de la imagen original en los pixeles de la imagen resultante.

Kernel 3x3

|  |  |  |
| :----: | :----: | :----: |
| -2 | -2 | 0 |
| -2 | 6 | 0 |
| 0 | 0 | 0 |

La convolucion es una operacion que se realiza pixel a pixel de la imagen, podemos acemejar el kernel como una cuadricula de numero que pasa sobre cada pixel de una imagen realizando los calculos de convolucion a lo largo de todo el camino. Si pensamos en la imagen (original) como una cuadricula de numeros por la que pasa nuestro kernel, podemos podemos presentar el siguiente caso:

Se toma una fraccion, del mismo mataño que nuestro kernel, de la gran cuadricula de la imagen original:

|  |  |  |
| :----: | :----: | :----: |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 0 | 1 | 2 |

Con un kernel de convolucion :

|  |  |  |
| :----: | :----: | :----: |
| 4 | 0 | 0 |
| 0 | 0 | 0 |
| 0 | 0 | -4 |

Aca el nucleo de la matriz de la imagen (original), es el pixel con valor 1 en la celda (2,2), la operacion realizada:

(4 x 0) + (0 x 0) + (0 x 0) + (0 x 0) + (0 x 1) + (0 x 1) + (0 x 0) + (-4 x 2) = -8

Ahora el resultado del pixel nucleo de la matriz de la imagen original es -8.

## Código

```processing
float[][] kernel = {{ -1, -1, -1}, 
                    { -1,  8, -1}, 
                    { -1, -1, -1}};
                    
PImage img;

void setup() { 
  size(1000, 400);
  img = loadImage("/home/pc1/Desktop/image2.jpg");
  noLoop();
}

void draw() {
  image(img, 0, 0);
  img.loadPixels();
  PImage edgeImg = createImage(img.width, img.height, RGB);

  for (int y = 1; y < img.height-1; y++) { 

    for (int x = 1; x < img.width-1; x++) { 

      float sum = 0; // Kernel sum for this pixel

      for (int ky = -1; ky <= 1; ky++) {

        for (int kx = -1; kx <= 1; kx++) {

          int pos = (y + ky)*img.width + (x + kx);
          float val = red(img.pixels[pos]);
          sum += kernel[ky+1][kx+1] * val;

        }

      }

      edgeImg.pixels[y*img.width + x] = color(sum, sum, sum);
    }
  }
  edgeImg.updatePixels();
  image(edgeImg, width/2, 0);
}
```

## Resultado

Con:

|  |  |  |
| :----: | :----: | :----: |
| -1 | -1 | -1 |
| -1 | 8 | -1 |
| -1 | -1 | -1 |

<p align="center"><img src="/docs/sketches/convo1.png"/></p>


Con:

|  |  |  |
| :----: | :----: | :----: |
| -1 | -1 | -1 |
| -1 | 9 | -1 |
| -1 | -1 | -1 |

<p align="center"><img src="/docs/sketches/convo2.png"/></p>

Con:

|  |  |  |
| :----: | :----: | :----: |
| -2 | -1 | 0 |
| -1 | 1 | 1 |
| 0 | 1 | 2 |

<p align="center"><img src="/docs/sketches/convo3.png"/></p>



> :ToCPrevNext