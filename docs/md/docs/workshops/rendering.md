# Rendering

## Introducción

## Usos

## Funcionamiento
Los algoritmos de rasterización proyectan triángulos en la pantalla pasando de una representación en 3D a una en 2D, luego de esto el algoritmo busca llenar los píxeles de la imagen que están cubiertos por el triángulo en 2D.

![Funcionamiento1](/docs/sketches/rendering/Funcionamiento1.png)

Este proceso es complicado de realizar pues cuando un píxel se superpone a un punto lo que realmente vemos es una área pequeña en la superficie del triángulo P. Cada pixel pixel cubre una parte del triángulo, cuando un pixel cubre más de un triángulo entonces tendremos varios puntos dentro del mismo pixel, el problema cuando esto sucede es encontrar cual de esos puntos es realmente visible.

![Funcionamiento2](/docs/sketches/rendering/Funcionamiento2.png)

Para determinar esto debemos encontrar la profundidad Z en la que se encuentran los puntos P de los triángulos dentro de cada píxel de la pantalla.

![Funcionamiento3](/docs/sketches/rendering/Funcionamiento3.png)


Cuando la profundidad Z del punto P1 (del triángulo verde) es menos que la profundidad Z del punto P2 (del triángulo rojo) quiere decir que el punto P1 (triángulo verde) es el punto que será visible en el píxel seleccionado. El algoritmo recorre todos los píxeles que contienen la imagen en cuestión para determinar cuál de los triángulos presentes dentro del píxel debe verse y cuál debe estar oculto, lo cual se denomina Prueba de Cobertura.

Para realizar este proceso se podría ordenar los triángulos en orden de profundidad, sin embargo, esto no funciona cuando los triángulos se cruzan entre sí. Generalmente se evalúa la profundidad de forma aleatoria y para hacerlo de forma correcta se emplean algoritmos de visibilidad o algoritmos de eliminación de superficie oculta como el algoritmo de Z-Buffer

El algoritmo de Depth-Buffer o Z-Buffer no es más que una matriz bidimensional que tiene la misma dimensión que el buffer de fotogramas y que se utiliza para almacenar los objetos a medida que se rasterizan los triángulos. Cuando se crea esta matriz se inicializa cada píxel de la matriz con un número muy grande. En el caso en el que se encuentre un pixel que se superpone al triángulo actual:

Se calcula la coordenada x o la profundidad del punto en el triángulo que se superpone
se compara la profundidad del triángulo actual con el valor almacenado en búfer de profundidad para ese pixel
Si encontramos que el valor almacenado en el búfer de profundidad es mayor que la profundidad del punto en el triángulo, entonces el nuevo punto está más cerca de la cámara y el punto almacenado en búfer de profundidad está más cerca del observador o de la cámara y el valor almacenado se reemplaza por el nuevo y más cercano.

De esta forma el algoritmo Z-Buffer encuentra una forma más óptima de realizar el proceso para toda la matriz de píxeles que componen la imagen proyectada del triángulo de 3D a 2D en la pantalla.


## Conclusiones
- El algoritmo del buffer Z es un estándar en todas las tarjetas gráficas, debido principalmente a su generalidad y simplicidad.
- A pesar de que el principal uso del algoritmo es el "hidden surface removal" o visualización de superficies, tiene otras aplicaciones en las que resulta muy útil como la composición de imágenes, el mapeo de sombras, el CSG rendering, entre otros.
- 

## Referencias
- Theoharis, T., Papaioannou, G., & Karabassi, E. (n.d.). THE MAGIC OF THE Z-BUFFER : A SURVEY. Disponible en: http://cgi.di.uoa.gr/~graphics/Downloads/papers/conferences/s15.pdf
- An Overview of the Rendering Process: Visibility and Shading. Scratchapixel 2.0. Disponible en: https://www.scratchapixel.com/lessons/3d-basic-rendering/rendering-3d-scene-overview/3d-rendering-overview
- Wikipedia Contributors. (2021, July 10). Rasterisation. Wikipedia. Disponible en: https://en.wikipedia.org/wiki/Rasterisation

> :ToCPrevNext