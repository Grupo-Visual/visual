# Diego Tovar

## Bio

Estudiante de ingeniería de sistemas y computación.
Estoy interesado en la inteligencia artificial y sus aplicaciones.

## Hobbies

Me gusta el fútbol.

## Ilusión de Ponzo

![Ilusión de Ponzo](/docs/sketches/ilusionDiego.gif)

La ilusión de Ponzo es un tipo de ilusión óptico-geométrica documentada por el psicólogo italiano Mario Ponzo (1882-1960) en 1911.​ Sugiere que la mente humana estima la medida de un objeto basándose en su entorno. Demostró este efecto dibujando dos líneas de igual longitud sobre un par de líneas convergentes, similares a los railes del ferrocarril vistos en perspectiva. La línea superior aparenta ser más larga porque la mente interpreta su tamaño de acuerdo con la perspectiva lineal, en la que las líneas paralelas convergen.

#### Explicación

Una de las explicaciones para la ilusión de Ponzo es la "hipótesis de la perspectiva", que afirma que el efecto de perspectiva en la figura es producido por las líneas convergentes, normalmente asociadas con la percepción de la distancia. Esto es, cuando dos líneas oblicuas aparentan converger hacia el horizonte o un punto de fuga, se asocian subconscientemente con la visión en perspectiva de dos líneas paralelas que se alejan del espectador. 

Otra explicación se basa en la "hipótesis del efecto de enmarcado", que sostiene que la diferencia en la separación de las líneas horizontales situadas entre las dos líneas convergentes puede determinar, o al menos contribuir a reforzar, la magnitud de la distorsión.

#### Código

```java
int w = 700;
int h = 900;

public void settings() {
  size(w, h);
}

void draw() {  
  background(140); 
  strokeWeight(10);
  stroke(0);
  line(int(w/2)-20, 0, 50, h);
  line(int(w/2)+20, 0, w-50, h);
  float x1 = 35;
  float y1 = 0;
  float x2 = 35;
  float y2 = 0;
  int num = 1000;
  for(float i=2;i<num;i=i*1.5){
    line(w/2-x1, 5+y1, w/2+x2, 5+y2);
    x1=x1+10+i;
    y1=y1+10+i;
    x2=x2+10+i;
    y2=y2+10+i;
  }
  
  stroke(255,255,0);
  line(280, 93, 420, 93);
  line(280, 575, 420, 575);
  if (mousePressed == true) {
    strokeWeight(2.5);
    stroke(255,0,0);
    line(275, 0, 275, h);
    line(425, 0, 425, h);
  } 
  
}
```

> :ToCPrevNext