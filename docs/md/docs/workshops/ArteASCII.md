# Arte ASCII

#### Propósito

Arte ASCII consiste en la formación de imágenes o arte a partir de los caracteres disponibles en la tabla ASCII.

#### Background

Existen varias formas de hacer arte con imágenes siguiendo esta idea, al igual que la tabla ASCII es útil, se puede utilizar una tabla que cumpla con la misma finalidad de codificar caracteres, por ejemplo, la tabla ANSI que es otro estándar de codificación.

#### Código

```java
PImage img;

int resolution = 7;
 
char[] ascii;
 
public void settings(){
  size(700,700);
}
 
void setup() {
  img = loadImage("leon.jpg");
  background(255);
  fill(0);
  
  ascii = new char[256];
  String letters = "ABSHDB-MN@#$o;:,. ";
  for (int i = 0; i < 256; i++) {
    int index = int(map(i, 0, 256, 0, letters.length()));
    ascii[i] = letters.charAt(index);
    System.out.println(ascii[i]);
  }
 
  PFont mono = createFont("Courier", resolution + 2);
  textFont(mono);
 
  asciify();
}

void asciify() {
 
  img.filter(GRAY);
  img.loadPixels();
  
  for (int y = 0; y < img.height; y += resolution) {
    for (int x = 0; x < img.width; x += resolution) {
      color pixel = img.pixels[y * img.width + x];
      text(ascii[int(brightness(pixel))], x, y);
    }
  }
  
}
```

#### Resultado

![Resultado Arte Ascii](/docs/sketches/ResultadoArteAscii.PNG)

<p align="center"><img src="/docs/sketches/ResultadoArteAscii2.PNG"/></p>

#### Conclusiones y trabajo futuro

El Arte ASCII permite representar imágenes a través de caracteres, esto fue útil cuando las impresoras no eran muy avanzadas, además cuando el correo electrónico empezó surge como necesidad de representar una imagen.


> :ToCPrevNext