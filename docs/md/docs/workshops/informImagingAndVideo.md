# Taller 1 - Imaging & Video
Para el primer taller, se llevaron a cabo las siguientes tareas:
* (Imágenes/video) [Conversión a negativo y escala de grises][]
* (Imágenes) [Aplicación de algunas máscaras de convolución][]
* (Imágenes) [Conversión de la imagen a ascii art][]
* (Vídeo) [Conversión a foto-mosaico][]

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
### Propósito

Se plantea crear un programa que permita construir un fotomosaico de una imagen o serie de imágenes (vídeo), dividiendo la imagen en secciones y remplazando cada una de estas secciones por una nueva imagen que coincida con el color de la sección.

### Background

Un mosaico fotográfico o fotomosaico se construye a partir de un banco de imágenes cuyos colores posean una alta similitud con los colores de la imagen original, estas imágenes se van reemplazando en la fotografía objetivo hasta "rellenar" el total de la imagen. Al observar la imagen resultante con bajo o nulo aumento se debe apreciar la imagen original con cierto parecido; sin embargo, al observarla en detalle se revela que está construida con cientos o miles de imágenes pequeñas.

Este tipo de creación artística generada por computadora se le atribuye a Joseph Francis [1](https://en.wikipedia.org/wiki/Photographic_mosaic), quien creó el poster "Live from Bell Labs" en 1993 utilizando fotografías con temáticas de computadora, para construir un rostro.

Principalmente hay dos técnias utilizadas para crear los mosaicos. El primero, es promediando el color de la parte de la imagen a reemplazar y reemplazarla por una imagen lo más parecida a ese promedio, esta técnica reduce la resolución y se producen un efecto de pixelado considerable. En el segundo, no se reduce la resolución, por lo cual el remplazo se realiza comparando pixel por pixel, esta técnica es más costosa computacionalmente, sin embargo, puede generar mejores resultados y mantener la resolución original [1](https://en.wikipedia.org/wiki/Photographic_mosaic).

Actualmente existe un debate de si los mosaicos son un arte o una técnica, se compara a veces con formas de apropición artística como el ensamble literario. Algunos artístas siguen trabajando y desarrollando este tema, creando diferentes técnicas para construir un fotomosaico, tal es el caso de Christopher Kates y Pep Ventosa [1](https://en.wikipedia.org/wiki/Photographic_mosaic).

### Solución y código

#### Idea base

Para no limitarnos a una única imagen o video y que este proyecto sea más dinámico, hemos querido utilizar la camara del dispositivo como recurso de generación de imágenes, por lo cual, se deben dar los permisos necesarios en el navegador.

Para nuestra implementación hemos utilizado la técnica de reducir el número de pixeles por una escala de 5 (sin embargo, este valor es variable y se puede aumentar o disminuir), a partir de esta reducción se obtienen los valores RGB de dicha sección y se realiza un mapeo para convertir los valores de una escla de 0 a 255 a nuestra propia escala de 0 a 4. A continuación, se busca en nuestro banco de imágenes la imagen correspondiente al código de color mapeado y se reemplaza por la sección original.

#### Nuestra escala de color

Como construir un banco de imagenes para todos los ***16.777.216*** colores que se pueden representar con el sistema RGB es casi imposible en el tiempo límitado del proyecto, se ha optado por construir un sistema de **125** colores basado en una representación reducida del sistema RGB en base 5.

El código de cada color R, G y B es mapeado de 0 a 255 a un rango de 0 a 4. Se han dividido los 256 valores de cada color en 3 intervalos de 50 valores cada uno, uno de 51 y un intervalo de 55 valores; cada color en esos rangos es remplazado por el valor medio de esos intervalos y despues por un valor entre 0 y 4, en la siguiente imagen se aprecia mejor esta transformación.

![CodigoColor](/docs/sketches/codigoColor.png)

Así, por ejemplo, el color RGB(123,34,204) se convertiría en RGB(125, 25, 225) y posteriormente en RGB_5(2,0,4), este último se representará en el mosaico mediante la imagen "img204", que se muestra a continuación:

![imagen204](/docs/sketches/images/204.jfif)

* Las imágenes del banco han sido descargadas del sitio [TinEye](https://labs.tineye.com/multicolr)

### Resultado
Los resultados pueden ser encontrados en la sección [Imagen y vídeo - Mosaico](/docs/workshops/mosaico)


## Conclusiones y trabajo futuro
Hay bastantes métodos para la conversión de imágenes y/o aplicación de filtros. A pesar de que varias de ellas varían de forma mínimo, como se mencionó anteriormente, cada método tiene sus ventajas en aspectos muy particulares frente a los otros. Resultaría pertinente realizar diversas pruebas con amplios bancos de imágenes que permitieran clasificar de alguna manera los diferentes métodos en términos de el uso apropiado de cada uno en función del resultado que se desea obtener.


El Arte ASCII permite representar imágenes a través de caracteres, esto fue útil cuando las impresoras no eran muy avanzadas, además cuando el correo electrónico empezó surge como necesidad de representar una imagen.


Los fotomosaicos son un interesante concepto de arte electrónico que ha cautivado a varias personas y que aún sigue vigente, algunos artististas se encuentran desarrollando más trabajos relacionados con diferentes técnicas.

La técnica utilizada en este proyecto ha permitido obtener resultados bastante cercanos a la imagen original con los parametros usados. Sin embargo, al intentar reducir el valor de la escala de reducción de la imagen para intentar obtener una imagen menos pixelada y más cercana a la original, se produce un problema de rendimiento, los fotogramas de la captura de vídeo se reducen debido al mayor número de cálculos que debe hacer el servidor.

Como trabajo futuro se propone utilizar un método más optimizado para realizar los calculos de la imagen o utilizar un dispositivo con más recursos de computo. Adicionalmente, sería interesante aumentar el banco de imágenes y por ende la escala/gama de colores.



