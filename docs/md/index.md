# Visual Computing Template

Welcome to the [UN / DISI](http://www.ingenieria.unal.edu.co/dependencias/departamentos/departamento-de-ingenieria-de-sistemas-e-industrial) _visual computing_ course template site.

## Goal

Learn the rendering and manipulation processes of a digital image using a modern PC arch which comprises a CPU and a GPU.

 of  Estudiar el proceso de producción y manipulación de una imagen digital que sirve para dar sustento a una aplicación visual moderna, empleando una arquitectura actual de computador. Respecto de dicho proceso buscamos discernir:

* La relación con la visión humana.
* Sus entradas: modelos geométricos, datos, imágenes y gestos.
* Sus etapas, identificando las programables y el modo de hacerlo.

Applications

## Methodology

[Activa](https://en.wikipedia.org/wiki/Active_learning)-[colaborativa](https://github.com/VisualComputing/Introduction) en el estudio y desarrollo de:

* [Presentaciones](https://github.com/orgs/VisualComputing/teams/presentations/repositories).
* [Software](https://github.com/remixlab/proscene).
* [Colaboraciones](collaborations.md).
* Texto referencia (pendiente).

## Grading

* Workshops: código, presentación oral _in situ_, apropiada atribución de las fuentes (código y literatura)  e informe.
* Quizzes.

<!---  
Observaciones:

* Los quizzes se evaluan cuantitativamente.
* Los talleres, cualitativamente como _completados_.
* Un taller se completa mediante sustentación oral _in situ_.
--->

## Outline

| References | Subject                                                                         | Taller                                                       |
|----------|----------------------------------------------------------------------------------------|--------------------------------------------------------------|
|       | [Introduction](https://github.com/VisualComputing/Introduction)                           |                                                              |
| [git-book -- chs. 1-3](https://git-scm.com/book/en/v2), [gh-pages](https://pages.github.com/) | [git](https://github.com/VisualComputing/git) |                                                              |
| [Polygonal meshes](https://en.wikipedia.org/wiki/Polygon_mesh), [Bitmaps](https://en.wikipedia.org/wiki/Bitmap) | [Processing](https://processing.org/)                                                     | [acá](https://github.com/VisualComputing/soft-imaging_ws)    |
| [Do we see reality as it is?](http://y2u.be/oYp5XuGYqqY), [simulation argument](https://www.simulation-argument.com/simulation.html) | [Cognitive](https://github.com/VisualComputing/Cognitive)                                 | [acá](https://github.com/VisualComputing/Illusions_ws)       |
| [The barycentric conspiracy](https://fgiesen.wordpress.com/2013/02/06/the-barycentric-conspirac/) | [Rendering](https://github.com/VisualComputing/Rendering)                                 | [acá](https://github.com/VisualComputing/Raster_ws)          |
| [Shaders tutorial](https://processing.org/tutorials/pshader/) | [Fragment Shaders](https://github.com/VisualComputing/FragmentShaders)                 | --
| [3D Math primer for Graphics and Game Development -- chs. 8 & 9](https://tfetimes.com/wp-content/uploads/2015/04/F.Dunn-I.Parberry-3D-Math-Primer-for-Graphics-and-Game-Development.pdf), [Projection matrix](http://www.songho.ca/opengl/gl_projectionmatrix.html) | [Affine Transformations](https://github.com/VisualComputing/Transformations) | --                                                           |
| [nub](https://github.com/VisualComputing/nub) | [SceneGraphs](https://github.com/VisualComputing/SceneGraphs)    | --                                                           |
| [A Survey of Interaction Techniques](https://hal.inria.fr/hal-00789413/document) | [Interaction](https://github.com/VisualComputing/Interaction)                             | --                                                           |
|         | [Inverse kinematics](https://github.com/VisualComputing/IK)                               | [acá](https://github.com/VisualComputing/HCI-IK_ws)          |                                                           |
| [Shaders tutorial](https://processing.org/tutorials/pshader/) | [Vertex Shaders](https://github.com/VisualComputing/VertexShaders)                    | --                                                           |
| [Visualizing Data](http://media.espora.org/mgoblin_media/media_entries/1633/Visualizing_Data.pdf), [Network Science -- ch. 2](http://networksciencebook.com/chapter/2) | Data Visualization | --  |

## Hacking

1. Install [codedoc](https://codedoc.cc/).
   ```shell | terminal
   npm i -g @codedoc/cli
   ```
2. Clone the [vc repo](https://github.com/VisualComputing/vc/).
   ```shell | terminal
   git clone https://github.com/VisualComputing/vc
   ```
   Note that the cloned repo already contains the [codedoc-p5-plugin](https://github.com/VisualComputing/vc/tree/main/.codedoc/components/p5) which is been developed separately [here](https://github.com/VisualComputing/codedoc-p5-plugin).
3. Install  `codedoc` dependencies.
   ```shell | terminal
   cd vc
   codedoc install
   ```
4. Edit 

> :ToCPrevNext