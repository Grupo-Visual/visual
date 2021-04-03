# Alejandro Sebastian Alejo Patarroyo

## Bio

Hacker, estudiante de Ingeniería de sistemas y computación de la Universidad Nacional de Colombia, creador y coordinador del semillero de seguridad Uqbar, organizador del evento JCUN2018 y JCUN2019, coorganizador del evento C0r0n4Con y creador de la comunidad ExploitLand.com. Conferencista en eventos de concientización sobre la importancia de la privacidad y el manejo seguro de los datos.

## Interests

Hacking ético, computación forense, hardware hacking, desarrollo frontend.

## Contributions

La importancia de la oscuridad en Internet [Carma Journal]

## Hobbies

Videojuegos, BJJ, ver series, cocinar y enseñar

---

# Ilusión de los Pasos

Aquí podemos observar un fenomeno conocido como la ilusión de los pasos (Stepping feet illusion en inglés). Consiste de dos "buses" (rectangulos) que se van moviendo a lo largo de una "calle" que posee rayas blancas y negras, los buses se mueven a igual vvelocidad, pero su velocidad percibida varia, dando la percepción de que uno se mueve más rápido que otro. 

Para comprobar que ambos se mueven a la misma velocidad dar click en la animación.

> :P5 sketch=/docs/sketches/ilusionAlejo.js, width=720, height=400

Tomado de [aquí](https://p5js.org/es/examples/simulate-stepping-feet-illusion.html)

## Historia

Stuart Anstis demostró la ilusión por primera vez en 2003. Propuso que los conductores experimentaban el efecto en condiciones de niebla en las que la diferencia de brillo entre el automóvil y sus alrededores es menor que en un día soleado. Esto causaba que se juzgara mal la velocidad en la que se movían sus autos, sintiendo que su auto se movía más lento que la velocidad real y los otros autos se volvían menos visibles, en contraste; en un día con niebla los otros autos parecían más lentos de lo que realmente eran.

## Causas 

Esta ilusión es causada por la diferencia de contrastes (luminosidad) entre los objetos en movimiento y su fondo. Mientras que el fondo tiene rayas negras y blancas, el contraste cambia de una linea a la siguiente. Cabe resaltar que no se pueden escoger colores arbitrarios para los "buses", sino que debe haber una diferencia de luminancia entre los dos, uno debe ser brillante y el otro oscuro.

## Código

```js
class Brick{
  constructor(bc, y){
    this.brickColor = bc;
    this.yPos = y;
    this.xPos = 0;
  }

  createBrick(){
    fill(this.brickColor);
    rect(this.xPos, this.yPos, 100, 50);
  }

  setSpeed(){
    this.xSpeed = 1;
  }

  moveBrick(){
    this.xPos+=this.xSpeed;
    if(this.xPos+100 >= width || this.xPos <= 0){
      this.xSpeed*=-1;
    }
  }
}

function setup() {
  createCanvas(720, 300);
  createP("Keep the mouse clicked").style('color','#ffffff');
  createP("to check whether the bricks").style('color','#ffffff');
  createP("are moving at same speed or not").style('color','#ffffff');
}

let brick1 = new Brick("white",100);
let brick2 = new Brick("black",250);

brick1.setSpeed();
brick2.setSpeed();

function draw () {
  background(0);
  if(mouseIsPressed){
    background(50);
  }
  brick1.createBrick();
  brick1.moveBrick();
  if(!mouseIsPressed){
    createBars();
  }
  brick2.createBrick();
  brick2.moveBrick();
}

function createBars() {
  let len = 12;
  for(let i = 0;i<width/len;i++){
    fill("white");
    if(i%2 == 0)
    rect(i*len,height,len,-height);
  }
}
```