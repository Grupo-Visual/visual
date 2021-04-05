# Imagen y Video Convolución

# Image Kernel 

En esta sección presentamos la aplicación de la técnica de procesamiento de imágenes denominada Convolución, Kernel o Máscara para imágenes en la cual mediante una matriz de tamaño impar se logran efectos como enfoque, desenfoque o realce. Estas denominadas máscaras se logran mediante una convolución entre un núcleo (kernel) y una imagen, cambiando la intensidad de un pixel para reflejar las intensidades de los piexeles circundantes.

La convolución también es útil para afinar o mejorar algunas cualidades de las imágenes, estas mejoras son muy útiles cuando se trata de imágenes científicas.


Ejemplo:

El alto y el ancho del kernel no tiene que ser el mismo, sin embargo deben ser impares. Los valores contenidos dentro del kernel son los que determinan un máscara o convolucion, determinando cómo transformar los píxeles de la imagen original en los píxeles de la imagen resultante.

Kernel 3x3

|  |  |  |
| :----: | :----: | :----: |
| -2 | -2 | 0 |
| -2 | 6 | 0 |
| 0 | 0 | 0 |

La convolución es una operación que se realiza píxel a píxel de la imagen, podemos asemejar el kernel como una cuadrícula de número que pasa sobre cada píxel de una imagen realizando los cálculos de convolución a lo largo de todo el camino. Si pensamos en la imagen (original) como una cuadrícula de números por la que pasa nuestro kernel, podemos podemos presentar el siguiente caso:

Se toma una fracción, del mismo mataño que nuestro kernel, de la gran cuadrícula de la imagen original:

|  |  |  |
| :----: | :----: | :----: |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 0 | 1 | 2 |

Con un kernel de convolución :

|  |  |  |
| :----: | :----: | :----: |
| 4 | 0 | 0 |
| 0 | 0 | 0 |
| 0 | 0 | -4 |

Acá el núcleo de la matriz de la imagen (original), es el píxel con valor 1 en la celda (2,2), la operación realizada:

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