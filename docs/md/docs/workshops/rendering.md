# Indagación teórica Z-buffering

## Introducción

La rasterización es la tarea de tomar una imagen descrita en un formato de gráficos vectoriales (Imágenes informáticas definidas en términos de puntos en un plano cartesiano, que se conectan mediante líneas y curvas para formar polígonos y otras formas) y convertirla en una imagen rasterizada (una serie de píxeles, puntos o líneas que al mostrarse juntos crean la imagen que se puede visualizar).

Para recrear la escena 3D en un plano 2D se hace uso del efecto de escorzo, efecto por el cual dos objetos del mismo tamaño se ven más pequeños o más grandes al estar uno más alejado del otro. El método básico para realizar la simulación de un cubo, por ejemplo, es trazar rectas desde las esquinas del objeto hasta el “ojo” o punto de visión, encontrando posteriormente los puntos de intersección en un plano que se encuentra entre el objeto y el “ojo”, para trazar luego los bordes del objeto y así generar un wireframe, este método se conoce como proyección en perspectiva.

<p align="center"> <img src="/docs/sketches/rendering/proyeccion3d.PNG"/> </p>
<p align="center"> Proyección de una escena 3D en un plano 2D. </p>

La rasterización intenta resolver el problema de la visibilidad o de la superficie oculta, utilizando técnicas geométricas trata de solucionar el conflicto de profundidad entre objetos. Uno de los enfoques más sencillos y comúnmente utilizados en el espacio de la imagen es el algoritmo del buffer Z o del buffer de profundidad, desarrollado por Catmull (1974). Este algoritmo compara las profundidades de la superficie en cada posición de píxel en el plano de proyección, la profundidad de la superficie se mide desde el plano de visión a lo largo del eje z de un sistema de visión. Cuando la descripción del objeto se convierte en coordenadas de proyección (x, y, z), la posición de cada píxel en el plano de la vista se especifica mediante las coordenadas x e y, el valor z proporciona la información de profundidad de los objetos con el cual pueden compararse entre ellos. 

## Funcionamiento

Los algoritmos de rasterización proyectan triángulos en la pantalla pasando de una representación en 3D a una en 2D, luego de esto el algoritmo busca llenar los píxeles de la imagen que están cubiertos por el triángulo en 2D.

<p align="center"> <img src="/docs/sketches/rendering/Funcionamiento1.png"/> </p>

Este proceso es complicado de realizar pues cuando un píxel se superpone a un punto lo que realmente vemos es una área pequeña en la superficie del triángulo P. Cada pixel pixel cubre una parte del triángulo, cuando un pixel cubre más de un triángulo entonces tendremos varios puntos dentro del mismo pixel, el problema cuando esto sucede es encontrar cual de esos puntos es realmente visible.

<p align="center"> <img src="/docs/sketches/rendering/Funcionamiento2.png"/> </p>

Para determinar esto debemos encontrar la profundidad Z en la que se encuentran los puntos P de los triángulos dentro de cada píxel de la pantalla.

<p align="center"> <img src="/docs/sketches/rendering/Funcionamiento3.png"/> </p>

Cuando la profundidad Z del punto P1 (del triángulo verde) es menos que la profundidad Z del punto P2 (del triángulo rojo) quiere decir que el punto P1 (triángulo verde) es el punto que será visible en el píxel seleccionado. El algoritmo recorre todos los píxeles que contienen la imagen en cuestión para determinar cuál de los triángulos presentes dentro del píxel debe verse y cuál debe estar oculto, lo cual se denomina Prueba de Cobertura.

Para realizar este proceso se podría ordenar los triángulos en orden de profundidad, sin embargo, esto no funciona cuando los triángulos se cruzan entre sí. Generalmente se evalúa la profundidad de forma aleatoria y para hacerlo de forma correcta se emplean algoritmos de visibilidad o algoritmos de eliminación de superficie oculta como el algoritmo de Z-Buffer

El algoritmo de Depth-Buffer o Z-Buffer no es más que una matriz bidimensional que tiene la misma dimensión que el buffer de fotogramas y que se utiliza para almacenar los objetos a medida que se rasterizan los triángulos. Cuando se crea esta matriz se inicializa cada píxel de la matriz con un número muy grande. En el caso en el que se encuentre un pixel que se superpone al triángulo actual:

1. Se calcula la coordenada x o la profundidad del punto en el triángulo que se superpone.

2. Se compara la profundidad del triángulo actual con el valor almacenado en búfer de profundidad para ese pixel.

3. Si encontramos que el valor almacenado en el búfer de profundidad es mayor que la profundidad del punto en el triángulo, entonces el  nuevo punto está más cerca de la cámara y el punto almacenado en búfer de profundidad está más cerca del observador o de la cámara y el valor almacenado se reemplaza por el nuevo y más cercano.

De esta forma el algoritmo Z-Buffer encuentra una forma más óptima de realizar el proceso para toda la matriz de píxeles que componen la imagen proyectada del triángulo de 3D a 2D en la pantalla.

Siendo así, el cálculo de la profundidad se lleva a cabo de la siguiente manera:

Se sabe que la fórmula del plano es:
> :Formula align=center
> ```
> ax + by + cz + d = 0
> ```

Lo cual implica 
> :Formula align=center
> ```
> z = - (ax + by + cz + d)/c , c \neq 0
> ```

Si denotamos la profundidad en el punto A como Z, y la profunidad en el punto B como Z'
> :Formula align=center
> ```
> AX + BY + CZ + D = 0
> Z = - \frac{(AX + BY + CZ + D)}{C} \\
> Z^{'} = \frac{(-A(X + 1) - BY -D)}{C}
> ```

Y de estas dos, concluimos:

> :Formula align=center
> ```
> AX + BY + CZ + D = 0 \\
> Z^{'} = Z - \frac{A}{C}
> ```


## Usos

Es útil en situaciones cuando hay:

- Superficies en sentido opuesto
- Superficies ocluidas
- Superficies superpuestas
- Superficies interceptadas

<p align="center"> <img src="/docs/sketches/rendering/usos1.PNG"/> </p>
<p align="center"> Visualización de objetos superpuestos. </p>

El algoritmo tiene su fundamento en el proceso de Eliminación de Superficies Ocultas (HSE) el cual sirve para hacer que en la ventana de visualización no aparezcan los objetos o elementos que no son visibles desde el punto de vista del observador.

El renderizado consume tiempo, por lo tanto no debemos malgastar tiempo y recurso computacional en el renderizado de objetos no visibles en la escena.

Algunas de las aplicaciones del Z-Buffering son:

- COMPOSICIÓN DE IMÁGENES

A menudo es necesario combinar objetos que se renderizan separados en una sola imagen, debido a que para algunos elementos se prefieren unas librerías por sobre otras.Si se respeta la profundidad y el punto de vista, los objetos son renderizados en pares separados de frames y luego combinados en la imagen final y de esta forma eliminando superficies ocultas.

- MAPA DE SOMBRAS

Con el Z-Buffer se generan rápidamente sombras desde focos de luz o proyectores paralelos a la escena, a pesar de que fue introducida por Williams en 1978, sus variaciones son ampliamente usadas en aplicaciones reales como videojuegos.

<p align="center"> <img src="/docs/sketches/rendering/usos2.PNG"/> </p>
<p align="center"> Aplicaciones en videojuegos. </p>

El algoritmo para la generación de sombras está dividido en 2 pasos:

1) Renderizar la escena desde la perspectiva de la fuente de luz y guardar el mapa de profundidad correspondiente.

2) Volver a la vista de cámara normal y renderizar la escena, en la cual un punto en la superficie está en la sombra si está localizado en una distancia mayorque la que indica el mapa de profundidad.

- CSG RENDERING

Constructive Solid Geometry (CSG) es una forma de modelar objetos complejos en 3D a partir de primitivas simples haciendo operaciones booleanas sobre los volúmenes de dichas primitivas. La relación entre las primitivas se describe como un árbol cuyas ramas son los objetos primitivos y los nodos intermedios representan las operaciones booleanas parciales, la raíz del árbol representa el objeto final en 3D.

<p align="center"> <img src="/docs/sketches/rendering/usos3.PNG"/> </p>
<p align="center"> Árbol CSG de una figura 3D. </p>

El renderizado de objetos CSG puede ser hecho después de que sea evaluado el límite superficial del objeto final mostrando los elementos superficiales restantes o en espacio de imagen. Un punto clave para el renderizado Z-buffer es la conversión del árbol CSG arbitrario a uno normalizado, el cual es una transformación en una suma de productos.

<p align="center"> <img src="/docs/sketches/rendering/usos4.PNG"/> </p>
<p align="center"> Árbol CSG normalizado. </p>

Un algoritmo representativo para este tipo de renderizado es el propuesto por Goldfeather e implementado por Wiegand. La renderización CSG permite la previsualización de las operaciones booleanas en objetos 3D antes de que sea computada la superficie geométrica.

## Conclusiones

- El algoritmo del buffer Z es un estándar en todas las tarjetas gráficas, debido principalmente a su generalidad y simplicidad.
- A pesar de que el principal uso del algoritmo es el "hidden surface removal" o visualización de superficies, tiene otras aplicaciones en las que resulta muy útil como la composición de imágenes, el mapeo de sombras, el CSG rendering, entre otros.

## Referencias

- Theoharis, T., Papaioannou, G., & Karabassi, E. (n.d.). THE MAGIC OF THE Z-BUFFER : A SURVEY. Disponible en: http://cgi.di.uoa.gr/~graphics/Downloads/papers/conferences/s15.pdf
- An Overview of the Rendering Process: Visibility and Shading. Scratchapixel 2.0. Disponible en: https://www.scratchapixel.com/lessons/3d-basic-rendering/rendering-3d-scene-overview/3d-rendering-overview
- Wikipedia Contributors. (2021, July 10). Rasterisation. Wikipedia. Disponible en: https://en.wikipedia.org/wiki/Rasterisation

> :ToCPrevNext