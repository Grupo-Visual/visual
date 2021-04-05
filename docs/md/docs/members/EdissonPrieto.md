# Edisson Prieto	

## Bio

Estudiante de ingeniería de sistemas y computación de la Universidad Nacional de Colombia Sede Bogotá.

## Interests

Arquitectura y desarrollo de software

Analisis de datos 

## Hobbies

Me gusta el aprendizaje de idiomas, por el momento estoy aprendiendo francés 
el cúal espero llevar a un nivel avanzado.


> A continuación comparto la explicación de una ilusión óptica:

## Ilusión de la pared de la cafetería

![CafeWallIllusion](/docs/sketches/wall.gif)

&nbsp;

Fue notado por uno de los miembros del Brain and Perception Laboratory de la Universidad de Bristol, en las baldosas de la pared de una cafetería de la colina de Saint Michael, en Brístol (Reino Unido), en las cuales las lineas parecian no ser paralelas como realmente lo eran y parecian converger en una dirección alterna generando la ilusión de irse ensanchando hacia uno de los extremos, es decir que parecen oblicuas.

>A continuación se puede apreciar el diseño de los muros de la cafetería:


&nbsp;

![Cafetería](/docs/sketches/cafeteria.jpg)
&nbsp;

#### Explicación:

Una de las teorías que intenta explicar este fenómeno podría ser que el cerebro no procesa la información como un todo, sino que hace una separación entre baldosas claras y oscuras de modo que para evitar el contraste entre el blanco y el negro, las neuronas tienden a convertir los claros en oscuros y los oscuros en claros.

Hay una teoría llamada del bloqueo del borde y esta dice que las características visuales como luminancia, color y movimiento son mapeadas en regiones corticales separadas y que si las separaciones entre baldosas son muy delgadas están dadas las condiciones de contraste extremo en las cuales los tiempos de respuesta de los receptores retinales tienen tiempos de respuesta muy diferentes.

&nbsp;

#### Código en Processing:

```processing
int s=89;
color black=color(0);
color white=color(255);
Line l[];
float update=0;

void setup() {
  size(810, 680);
  stroke(89, 89, 89);
  strokeWeight(2);
  l=new Line[8];

  for (int i=0; i<8; i++) {
    l[i]=new Line(i*90);
  }
}

void draw() {

  for (int i=0; i<8; i++) {
    if (i%2==0)
      l[i].drawL(-270+update);
    else
      l[i].drawL(-270-update);
  }
  update=update+0.5;
  //println(update+"");
  if (update==180)
    update=0;
}

class Line {

  int n=20;
  float posY;

  Line(float posY) {
    this.posY=posY;
  }

  void drawL(float diff) {

    for (int i=0; i<16; i++) {
      float posX=i*90 +diff;
      if (i%2==0) {
        fill(0);
        rect(posX, posY, s, s);
      } else {
        fill(255);
        rect(posX, posY, s, s);
      }
    }
  }
}
//Código tomado de: http://nrajansblog.blogspot.com/2018/05/cafe-wall-illusion-using-processing.html
```





> :ToCPrevNext