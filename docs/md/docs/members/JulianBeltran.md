# Julián Beltrán	

## Bio
Estudiante de ingeniería de Sistemas y Computación de la Universidad Nacional de Colombia, Sede Bogotá. 25 años.

## Intereses
Interesado en la arquitectura de software y las arquitecturas en la nube.

## Hobbies
Me gustan los videojuegos, viajar y la música.


## Ilusión de  Ebbinghaus

![Ebbinghaus](/docs/sketches/Ebbinghaus.jpg)

&nbsp;

### Historia
La ilusión de Ebbinghaus (o círculos de Titchener) es una ilusión óptica de percepción de tamaño relativo. Fue descubierta por el psicólogo Hermann Ebbinghaus (1850-1909), de quien obstuvo su nombre. Su nombre alternativo, círculos de Titchener, se debe a Edward B. Titchener, quien lo popularizó en el mundo de habla inglesa.


### Explicación
En su versión más conocida, consiste en dos círculos de tamaño idénticos que son situados cerca el uno del otro, uno de ellos es rodeado por círculos más grandes mientras que el otro es rodeado por círculos más pequeños. Como resultado, el círculo central rodeado por círculos grandes parece ser más pequeño que el círculo central rodeados por círculos pequeños.

Dos factores críticos invloucrados en la percepción de la ilusión de Ebbinghaus son la distancia de los círculos del arededor respecto al círculo central, y la completitud del anillo. Independientemente del tamaño relativo, si los círculos del alrededor están lejos, el círculo central parece más pequeño; y si los círculos del alrededor están cerca, el círculo central parece más grande.

Fuente: [Wikipedia](https://en.wikipedia.org/wiki/Ebbinghaus_illusion)

### Código en Processing:
```processing
void setup(){
  size(1200,800);
 }

void draw(){
  background(0);
  strokeWeight(0);
  int xCoordL = 200;
  int xCoordR = 800;
  int yCoord = 400;

  //Left circles 1
  fill(244,198,82);
  ellipse(xCoordL,yCoord,80,80);
  fill(0,0,255);
  ellipse(xCoordL,yCoord - 90,40,40);
  ellipse(xCoordL,yCoord + 90,40,40);
  ellipse(xCoordL + 90 ,yCoord,40,40);
  ellipse(xCoordL - 90 ,yCoord,40,40);
  ellipse(xCoordL + (90/sqrt(2)),yCoord + (90/sqrt(2)),40,40);
  ellipse(xCoordL - (90/sqrt(2)),yCoord - (90/sqrt(2)),40,40);
  ellipse(xCoordL + (90/sqrt(2)),yCoord - (90/sqrt(2)),40,40);
  ellipse(xCoordL - (90/sqrt(2)),yCoord + (90/sqrt(2)),40,40);
  
  //Right circles 1
  fill(244,198,82);
  ellipse(xCoordR,yCoord,80,80);
  fill(0,0,255);
  ellipse(xCoordR,yCoord + 200,120,120);
  ellipse(xCoordR, yCoord -200,120,120);
  ellipse(xCoordR + 200 ,yCoord,120,120);
  ellipse(xCoordR - 200,yCoord,120,120);
  ellipse(xCoordR + (200/sqrt(2)),yCoord + (200/sqrt(2)),120,120);
  ellipse(xCoordR - (200/sqrt(2)),yCoord - (200/sqrt(2)),120,120);
  ellipse(xCoordR + (200/sqrt(2)),yCoord - (200/sqrt(2)),120,120);
  ellipse(xCoordR - (200/sqrt(2)),yCoord + (200/sqrt(2)),120,120);
 
}
//Código propio
```

&nbsp;