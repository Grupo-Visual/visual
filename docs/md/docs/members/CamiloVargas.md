# Camilo Ernesto Vargas Romero

## Bio

Estudiante de ingenieria en sistemas y computacion, apacionado por el desarrollo de software y las tecnologias de la informacion, en busca de especializar su carrera en el desarrollo de clusters, RPA y CAS

## Hobbies

Desarrollo movil, seguridad informatica, desarrollo de proyectos y cocina.


# Ilusión Phyllotaxis

En botánica, la filotaxis o filotaxia es la disposición de las hojas en el tallo de una planta (del griego antiguo phýllon "hoja" y táxis "disposición"). [1] Las espirales filotácticas forman una clase distintiva de patrones en la naturaleza.. 

Fuente: [Wikipedia](https://en.wikipedia.org/wiki/Phyllotaxis)


## Explicacion 

Esta ilusion fue estudiada por la [Universidad de Calgary en Canada](http://algorithmicbotany.org/papers/abop/abop-ch4.pdf), para describir el patron generado por la Filotaxis en un girasol existe la formala de Vogel’s φ=n∗137.5◦,r=c√n. Esta formula es aplicada en processing y nos dan los siguientes resultados en una animacion movil:


## Resultado

![Resultado 1](/docs/sketches/camilo0.png)
![Resultado 2](/docs/sketches/camilo1.png)
![Resultado 3](/docs/sketches/camilo2.png)


## Código

```processing
ArrayList<Dot> dots = new ArrayList<Dot>();
int n = 0, c=5, frms = 100;
float theta; 
 
void setup() {
  size(540, 540);
  while (n<500) {
    float offSet = PI/500*n;
    c = 2;
    float a = n*137.5;
    float r = c * sqrt(n);
    float x = width/2 + cos(a)*r;
    float y = height/2 + sin(a)*r;
    PVector start = new PVector(x, y);
    c = 8;
    a = n*137.5;
    r = c * sqrt(n);
    x = width/2 + cos(a)*r;
    y = height/2 + sin(a)*r; 
    PVector end = new PVector(x, y);
    dots.add(new Dot(start, end, offSet));
    n++;
  }
}
 
void draw() {
  background(238);
  for (Dot d: dots) {
    d.update();
    d.show();
  }
  
  theta += TWO_PI/frms;
}
 
class Dot {
 
  PVector start, end, v;
  float sz = 20;
  float x, y, lerpValue, offSet;
 
  Dot(PVector _start, PVector _end, float _offSet) {
    start = _start;
    end = _end;
    offSet = _offSet;
  }
 
  void show() {
    stroke(238);
    fill(34);
    ellipse(v.x, v.y, sz, sz);
  }
 
  void update() {
    sz = map(sin(theta+offSet), -1, 1, 10, 30);
    lerpValue = map(sin(theta+offSet), -1, 1, 0, 1);
    v = PVector.lerp(start, end, lerpValue);
  }
}
```