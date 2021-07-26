# Taller 2 - Image and video processing (Hardware)
Para el segundo taller, de forma análoga, se llevaron a cabo las siguientes tareas. Esta vez, utilizando implementaciones por Hardware (shaders)
* (Imágenes/video) [Conversión a negativo y escala de grises](/docs/workshops/imaHardware)
* (Imágenes/vídeo) [Aplicación de algunas máscaras de convolución](/docs/workshops/convoMasks)
* (Imágenes) Conversión de la imagen a ascii art
* (Imágenes) Conversión a foto-mosaico

## Propósito
Uno de los principales objetivos de realizar la implementación por Hardware, además de los motivos académicos relacionados con el trabajo alrededor del concepto de Shaders, es realizar una comparación del rendimiento de los mismos procedimientos al ser implementados por Software y Hardware. Dicha comparación se hace visible, en especial, en el caso de las implementaciones relacionadas con el vídeo.

## Shaders
Los shaders también son un conjunto de instrucciones, pero las instrucciones se ejecutan todas a la vez para cada píxel de la pantalla. Eso significa que el código que escribas tiene que comportarse de forma diferente según la posición del píxel en la pantalla. Como una prensa de tipo, su programa funcionará como una función que recibe una posición y devuelve un color, y cuando se compila se ejecuta extraordinariamente rápido.

Como se mencionó, todas las implementaciones fueron realizadas mediante el uso de shaders, estos se definen en este apartado ya que aplican a todas las implementaciones realizadas:

## Vídeo - Comparación
En pocas palabras, la implementación con shaders (o por hardware) mejora el rendimiento ya que esta permite el uso de la GPU además de la CPU. Mientras que la implementación con software depende únicamente de la CPU para su funcionamiento.

Podemos usar los FPS (Frames per second) para ilustrar esta mejora en el rendimiento en las implementaciones realizadas. Ambas implementaciones están configuradas para ser mostradas con un valor de FPS de 60, que es el valor por defecto. Sin embargo, veremos que los resultados varían dependiendo el tipo de implementación.

Si se dirige a la página de la implementación por software de los filtros de vídeo: [Video - Software](/docs/workshops/filtersVideo). Al abrir la consola de desarrollo en el navegador, se encontrará con unas salida constante de valores, que corresponden a los FPS de las dos salidas de vídeo de esa página, tal como se ve en la siguiente imagen:

![FPSSoftware](/docs/sketches/FPSVideoSoftware.png)

De manera análoga, en la página de la implementación por hardware [Vídeo - Hardware](/docs/workshops/convoMasks),en la misma consola, se encuentra el siguiente resultado:

![FPSHardware](/docs/sketches/FPSVideoHardware.png)

Como se puede apreciar, a pesar de que ambas implementaciones están diseñadas para correar a 60 FPS, la implementación por Software tiene problemas para alcanzar dicho valor, y oscila entre los 20 y 50 FPS aproximadamente la mayoría del tiempo. En cambio, en la imagen de la implementación por Hardware, se puede apreciar cómo todos los valores se encuentran muy cerca a los 60 FPS deseados.

Los resultados de estas cantidades pueden variar dependiendo la arquitectura de la máquina en que se visualice la página, ya que estos dependen de la disponibilida de CPU y GPU de la misma.

## [Fotomosaico](/visual/docs/workshops/FotoMosaicoH)
 
El fotomosaico es un montaje en el que se redimensiona una imagen de su tamaño original a una menor resolución deseada con el fin de buscar una pixelación en cuadros de la imagen, para este trabajo realizamos este proceso con la librería quadrille. Se cargan cerca de 132 imágenes diferentes que se reasignan a cada uno de los nuevos píxeles de mayor tamaño de la imagen original
 
La técnica utilizada en este proyecto ha permitido obtener resultados bastante cercanos a la imagen original con los parámetros usados. Sin embargo, al intentar reducir el valor de la escala de reducción de la imagen para intentar obtener una imagen menos pixelada y más cercana a la original, se produce un problema de rendimiento, los fotogramas de la captura de vídeo se reducen debido al mayor número de cálculos que debe hacer el servidor.
 
Como trabajo futuro se propone utilizar un método más optimizado para realizar los cálculos de la imagen o utilizar un dispositivo con más recursos de cómputo. Adicionalmente, sería interesante aumentar el banco de imágenes y por ende la escala/gama de colores.

<img src="/docs/sketches/images/mosaico/gato_mosaico.jpg" width="250" />
<img src="/docs/sketches/images/mosaico/mosaico_cat.png" width="250" />
