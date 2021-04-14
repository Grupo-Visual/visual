# Taller 1 - Imaging & Video
Para el primer taller, se llevaron a cabo las siguientes tareas:
* (Imágenes/video) [Conversión a negativo y escala de grises: promedio rgb y luma.](#conversión-a-negativo-y-escala-de-grises)
* (Imágenes) [Aplicación de algunas máscaras de convolución.](#aplicación-de-máscaras-de-convolución)
* (Imágenes) [Conversión de la imagen a ascii art.](#conversión-de-imagen-a-ascii-art)
* (Vídeo) [Conversión a foto-mosaico.](#conversión-a-foto-mosaico)

## Conversión a negativo y escala de grises
La conversión de grises, así como la aplicación de filtros de negativo, fue llevada a cabo tanto para imágenes como para vídeo, de la misma manera, que es presentada en esta sección.

### Propósito
Aplicar a imágenes un filtro de negativo, así como conversión a escala de grises a través de diferentes métodos: RGB, Luma, entre otros.

### Background
Existen diferentes métodos o fórmulas para la conversión de las imágenes según los criterios mencionados. Cada una de ellas tiene sus características particulares, como por ejemplo: algunas resaltan mejor el brillo de las imágenes al realizar la conversión. La fórmula correspondiente a cada uno de los métodos se encuentra presente en el apartado dedicado a los mismos.

### Filtro de negativo
Aplicando un filtro de negativo a una imagen. Para este proceso, se cargaron todos los pixeles de la imagen a través del método loadpixels(), luego, se aplicó la fórmula

> :Formula align=center
> ``` 
> RGBNegative = (255 - R, 255 - G, 255 - B )
> ```

### Conversión a escala de grises

#### Promedio aritmético RGB
El método del promedio aritmético RGB consiste en hallar un promedio aritmético de cada uno de los pixeles a través de la fórmula
> :Formula align=center
> ```
> Gray = \frac{(R+G+B)}{3}
> ```

#### Método Luma
Existen variantes del método Luma, que se basan en los pesos que se le da a cada uno de los componentes en la ecuación, en la implementación realizada, se hace uso de las siguientes variantes:

De arriba hacia abajo:
> :Formula align=center
> ```
> (SDTV) Y'_{601} = (0.2989 * R) + (0.5870 * G)+ (0.1140 * B) 
> ```

> :Formula align=center
> ```
> (Adobe) Y'_{240} = (0.212 * R) + (0.701 * G) + (0.087 * B)
> ```

> :Formula align=center
> ```
> (HDTV) Y'_{709} = (0.2126 * R) + (0.7152 * G) +(0.0722 * B) 
> ```

> :Formula align=center
> ```
> (UHDTV, HDR) Y'_{709} = (0.2627 * R) + (0.6780 * G) + (0.0593 * B )
> ```

Este valor Y' se usa para los valores de R, G y B en cada uno de los pixeles para cada caso.

#### Método HSV
El método HSV consiste en tomar el máximo de los valores entre R,G y B

#### Método HSL
El método HSL consiste en hallar el promedio de el máximo y el mínimo de los valores entre R,G y B

### Resultados
Los resultados pueden ser encontrados en las secciones [Imagen - Filtros](/docs/workshops/filters) y  [Vídeo - Filtros](/docs/workshops/filtersVideo) para imagen y vídeo correspondientemente.


## Aplicación de máscaras de convolución
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

> :Formula align=center
> ```
> (4 x 0) + (0 x 0) + (0 x 0) + (0 x 0) + (0 x 1) + (0 x 1) + (0 x 0) + (-4 x 2) = -8
> ```

Ahora el resultado del pixel nucleo de la matriz de la imagen original es -8.

### Resultados
Los resultados pueden ser encontrados en la sección [Imagen - Convolución](/docs/workshops/convolucion)

## Conversión de imagen a Ascii art

### Propósito

Arte ASCII consiste en la formación de imágenes o arte a partir de los caracteres disponibles en la tabla ASCII.

### Background

Existen varias formas de hacer arte con imágenes siguiendo esta idea, al igual que la tabla ASCII es útil, se puede utilizar una tabla que cumpla con la misma finalidad de codificar caracteres, por ejemplo, la tabla ANSI que es otro estándar de codificación.

### Resultados
Los resultados pueden ser encontrados en la sección [Imagen - Arte ASCII](/docs/workshops/ArteASCII)

## Conversión a foto-mosaico

## Conclusiones y trabajo futuro
Hay bastantes métodos para la conversión de imágenes y/o aplicación de filtros. A pesar de que varias de ellas varían de forma mínimo, como se mencionó anteriormente, cada método tiene sus ventajas en aspectos muy particulares frente a los otros. Resultaría pertinente realizar diversas pruebas con amplios bancos de imágenes que permitieran clasificar de alguna manera los diferentes métodos en términos de el uso apropiado de cada uno en función del resultado que se desea obtener.


El Arte ASCII permite representar imágenes a través de caracteres, esto fue útil cuando las impresoras no eran muy avanzadas, además cuando el correo electrónico empezó surge como necesidad de representar una imagen.


