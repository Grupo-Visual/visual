# Mosaico de Imagen/video

## Propósito

Se plantea crear un programa que permita construir un fotomosaico de una imagen o serie de imágenes (vídeo), dividiendo la imagen en secciones y remplazando cada una de estas secciones por una nueva imagen que coincida con el color de la sección.

## Background

Un mosaico fotográfico o fotomosaico se construye a partir de un banco de imágenes cuyos colores posean una alta similitud con los colores de la imagen original, estas imágenes se van reemplazando en la fotografía objetivo hasta "rellenar" el total de la imagen. Al observar la imagen resultante con bajo o nulo aumento se debe apreciar la imagen original con cierto parecido; sin embargo, al observarla en detalle se revela que está construida con cientos o miles de imágenes pequeñas.

Este tipo de creación artística generada por computadora se le atribuye a Joseph Francis [1](https://en.wikipedia.org/wiki/Photographic_mosaic), quien creó el poster "Live from Bell Labs" en 1993 utilizando fotografías con temáticas de computadora, para construir un rostro.

Principalmente hay dos técnias utilizadas para crear los mosaicos. El primero, es promediando el color de la parte de la imagen a reemplazar y reemplazarla por una imagen lo más parecida a ese promedio, esta técnica reduce la resolución y se producen un efecto de pixelado considerable. En el segundo, no se reduce la resolución, por lo cual el remplazo se realiza comparando pixel por pixel, esta técnica es más costosa computacionalmente, sin embargo, puede generar mejores resultados y mantener la resolución original [1](https://en.wikipedia.org/wiki/Photographic_mosaic).

Actualmente existe un debate de si los mosaicos son un arte o una técnica, se compara a veces con formas de apropición artística como el ensamble literario. Algunos artístas siguen trabajando y desarrollando este tema, creando diferentes técnicas para construir un fotomosaico, tal es el caso de Christopher Kates y Pep Ventosa [1](https://en.wikipedia.org/wiki/Photographic_mosaic).

## Solución y código

### Idea base

Para no limitarnos a una única imagen o video y que este proyecto sea más dinámico, hemos querido utilizar la camara del dispositivo como recurso de generación de imágenes, por lo cual, se deben dar los permisos necesarios en el navegador.

Para nuestra implementación hemos utilizado la técnica de reducir el número de pixeles por una escala de 5 (sin embargo, este valor es variable y se puede aumentar o disminuir), a partir de esta reducción se obtienen los valores RGB de dicha sección y se realiza un mapeo para convertir los valores de una escla de 0 a 255 a nuestra propia escala de 0 a 4. A continuación, se busca en nuestro banco de imágenes la imagen correspondiente al código de color mapeado y se reemplaza por la sección original.

### Nuestra escala de color

Como construir un banco de imagenes para todos los ***16.777.216*** colores que se pueden representar con el sistema RGB es casi imposible en el tiempo límitado del proyecto, se ha optado por construir un sistema de **125** colores basado en una representación reducidad del sistema RGB en base 5.

El código de cada color R, G y B es mapeado de 0 a 255 a un rango de 0 a 4. Se han dividido los 256 valores de cada color en 4 intervalos de 51 valores cada uno y un intervalo de 52 valores; cada color en esos rangos es remplazado por el valor medio de esos intervalos y despues por un valor entre 0 y 4, en la siguiente imagen se aprecia mejor esta transformación.

![CodigoColor](/docs/sketches/codigoColor.png)

Así, por ejemplo, el color RGB(123,34,204) se convertiría en RGB(125, 25, 225) y posteriormente en RGB4(2,0,4), este último se representará en el mosaico mediante la imagen "img204", que se muestra a continuación:

![imagen204](/docs/sketches/images/204.jfif)

* Las imágenes del banco han sido descargadas del sitio [TinEye](https://labs.tineye.com/multicolr)

### Código fuente

```js
/*
* Código tomado y adaptado de: https://editor.p5js.org/leftlife/sketches/cFD-TFQqe
*/

function preload() {
    img000 = loadImage("/visual/docs/sketches/images/000.jfif");
    img001 = loadImage("/visual/docs/sketches/images/001.jfif");
    img002 = loadImage("/visual/docs/sketches/images/002.jfif");
    img003 = loadImage("/visual/docs/sketches/images/003.jfif");
    img004 = loadImage("/visual/docs/sketches/images/004.jfif");
    img010 = loadImage("/visual/docs/sketches/images/010.jfif");
    img011 = loadImage("/visual/docs/sketches/images/011.jfif");
    img012 = loadImage("/visual/docs/sketches/images/012.jfif");
    img013 = loadImage("/visual/docs/sketches/images/013.jfif");
    img014 = loadImage("/visual/docs/sketches/images/014.jfif");
    img020 = loadImage("/visual/docs/sketches/images/020.jfif");
    img021 = loadImage("/visual/docs/sketches/images/021.jfif");
    img022 = loadImage("/visual/docs/sketches/images/022.jfif");
    img023 = loadImage("/visual/docs/sketches/images/023.jfif");
    img024 = loadImage("/visual/docs/sketches/images/024.jfif");
    img030 = loadImage("/visual/docs/sketches/images/030.jfif");
    img031 = loadImage("/visual/docs/sketches/images/031.jfif");
    img032 = loadImage("/visual/docs/sketches/images/032.jfif");
    img033 = loadImage("/visual/docs/sketches/images/033.jfif");
    img034 = loadImage("/visual/docs/sketches/images/034.jfif");
    img040 = loadImage("/visual/docs/sketches/images/040.jfif");
    img041 = loadImage("/visual/docs/sketches/images/041.jfif");
    img042 = loadImage("/visual/docs/sketches/images/042.jfif");
    img043 = loadImage("/visual/docs/sketches/images/043.jfif");
    img044 = loadImage("/visual/docs/sketches/images/044.jfif");
    img100 = loadImage("/visual/docs/sketches/images/100.jfif");
    img101 = loadImage("/visual/docs/sketches/images/101.jfif");
    img102 = loadImage("/visual/docs/sketches/images/102.jfif");
    img103 = loadImage("/visual/docs/sketches/images/103.jfif");
    img104 = loadImage("/visual/docs/sketches/images/104.jfif");
    img110 = loadImage("/visual/docs/sketches/images/110.jfif");
    img111 = loadImage("/visual/docs/sketches/images/111.jfif");
    img112 = loadImage("/visual/docs/sketches/images/112.jfif");
    img113 = loadImage("/visual/docs/sketches/images/113.jfif");
    img114 = loadImage("/visual/docs/sketches/images/114.jfif");
    img120 = loadImage("/visual/docs/sketches/images/120.jfif");
    img121 = loadImage("/visual/docs/sketches/images/121.jfif");
    img122 = loadImage("/visual/docs/sketches/images/122.jfif");
    img123 = loadImage("/visual/docs/sketches/images/123.jfif");
    img124 = loadImage("/visual/docs/sketches/images/124.jfif");
    img130 = loadImage("/visual/docs/sketches/images/130.jfif");
    img131 = loadImage("/visual/docs/sketches/images/131.jfif");
    img132 = loadImage("/visual/docs/sketches/images/132.jfif");
    img133 = loadImage("/visual/docs/sketches/images/133.jfif");
    img134 = loadImage("/visual/docs/sketches/images/134.jfif");
    img140 = loadImage("/visual/docs/sketches/images/140.jfif");
    img141 = loadImage("/visual/docs/sketches/images/141.jfif");
    img142 = loadImage("/visual/docs/sketches/images/142.jfif");
    img143 = loadImage("/visual/docs/sketches/images/143.jfif");
    img144 = loadImage("/visual/docs/sketches/images/144.jfif");
    img200 = loadImage("/visual/docs/sketches/images/200.jfif");
    img201 = loadImage("/visual/docs/sketches/images/201.jfif");
    img202 = loadImage("/visual/docs/sketches/images/202.jfif");
    img203 = loadImage("/visual/docs/sketches/images/203.jfif");
    img204 = loadImage("/visual/docs/sketches/images/204.jfif");
    img210 = loadImage("/visual/docs/sketches/images/210.jfif");
    img211 = loadImage("/visual/docs/sketches/images/211.jfif");
    img212 = loadImage("/visual/docs/sketches/images/212.jfif");
    img213 = loadImage("/visual/docs/sketches/images/213.jfif");
    img214 = loadImage("/visual/docs/sketches/images/214.jfif");
    img220 = loadImage("/visual/docs/sketches/images/220.jfif");
    img221 = loadImage("/visual/docs/sketches/images/221.jfif");
    img222 = loadImage("/visual/docs/sketches/images/222.jfif");
    img223 = loadImage("/visual/docs/sketches/images/223.jfif");
    img224 = loadImage("/visual/docs/sketches/images/224.jfif");
    img230 = loadImage("/visual/docs/sketches/images/230.jfif");
    img231 = loadImage("/visual/docs/sketches/images/231.jfif");
    img232 = loadImage("/visual/docs/sketches/images/232.jfif");
    img233 = loadImage("/visual/docs/sketches/images/233.jfif");
    img234 = loadImage("/visual/docs/sketches/images/234.jfif");
    img240 = loadImage("/visual/docs/sketches/images/240.jfif");
    img241 = loadImage("/visual/docs/sketches/images/241.jfif");
    img242 = loadImage("/visual/docs/sketches/images/242.jfif");
    img243 = loadImage("/visual/docs/sketches/images/243.jfif");
    img244 = loadImage("/visual/docs/sketches/images/244.jfif");
    img300 = loadImage("/visual/docs/sketches/images/300.jfif");
    img301 = loadImage("/visual/docs/sketches/images/301.jfif");
    img302 = loadImage("/visual/docs/sketches/images/302.jfif");
    img303 = loadImage("/visual/docs/sketches/images/303.jfif");
    img304 = loadImage("/visual/docs/sketches/images/304.jfif");
    img310 = loadImage("/visual/docs/sketches/images/310.jfif");
    img311 = loadImage("/visual/docs/sketches/images/311.jfif");
    img312 = loadImage("/visual/docs/sketches/images/312.jfif");
    img313 = loadImage("/visual/docs/sketches/images/313.jfif");
    img314 = loadImage("/visual/docs/sketches/images/314.jfif");
    img320 = loadImage("/visual/docs/sketches/images/320.jfif");
    img321 = loadImage("/visual/docs/sketches/images/321.jfif");
    img322 = loadImage("/visual/docs/sketches/images/322.jfif");
    img323 = loadImage("/visual/docs/sketches/images/323.jfif");
    img324 = loadImage("/visual/docs/sketches/images/324.jfif");
    img330 = loadImage("/visual/docs/sketches/images/330.jfif");
    img331 = loadImage("/visual/docs/sketches/images/331.jfif");
    img332 = loadImage("/visual/docs/sketches/images/332.jfif");
    img333 = loadImage("/visual/docs/sketches/images/333.jfif");
    img334 = loadImage("/visual/docs/sketches/images/334.jfif");
    img340 = loadImage("/visual/docs/sketches/images/340.jfif");
    img341 = loadImage("/visual/docs/sketches/images/341.jfif");
    img342 = loadImage("/visual/docs/sketches/images/342.jfif");
    img343 = loadImage("/visual/docs/sketches/images/343.jfif");
    img344 = loadImage("/visual/docs/sketches/images/344.jfif");
    img400 = loadImage("/visual/docs/sketches/images/400.jfif");
    img401 = loadImage("/visual/docs/sketches/images/401.jfif");
    img402 = loadImage("/visual/docs/sketches/images/402.jfif");
    img403 = loadImage("/visual/docs/sketches/images/403.jfif");
    img404 = loadImage("/visual/docs/sketches/images/404.jfif");
    img410 = loadImage("/visual/docs/sketches/images/410.jfif");
    img411 = loadImage("/visual/docs/sketches/images/411.jfif");
    img412 = loadImage("/visual/docs/sketches/images/412.jfif");
    img413 = loadImage("/visual/docs/sketches/images/413.jfif");
    img414 = loadImage("/visual/docs/sketches/images/414.jfif");
    img420 = loadImage("/visual/docs/sketches/images/420.jfif");
    img421 = loadImage("/visual/docs/sketches/images/421.jfif");
    img422 = loadImage("/visual/docs/sketches/images/422.jfif");
    img423 = loadImage("/visual/docs/sketches/images/423.jfif");
    img424 = loadImage("/visual/docs/sketches/images/424.jfif");
    img430 = loadImage("/visual/docs/sketches/images/430.jfif");
    img431 = loadImage("/visual/docs/sketches/images/431.jfif");
    img432 = loadImage("/visual/docs/sketches/images/432.jfif");
    img433 = loadImage("/visual/docs/sketches/images/433.jfif");
    img434 = loadImage("/visual/docs/sketches/images/434.jfif");
    img440 = loadImage("/visual/docs/sketches/images/440.jfif");
    img441 = loadImage("/visual/docs/sketches/images/441.jfif");
    img442 = loadImage("/visual/docs/sketches/images/442.jfif");
    img443 = loadImage("/visual/docs/sketches/images/443.jfif");
    img444 = loadImage("/visual/docs/sketches/images/444.jfif");
}

function mapColor(color) {
    if (color <= 50) {
        return 0;
    }
    else if (color <= 100) {
        return 1;
    }
    else if (color <= 150) {
        return 2;
    }
    else if (color <= 200) {
        return 3;
    }
    else if (color <= 255) {
        return 4;
    }
}

var video;
var vScale = 5;
var arregloImagenes;

function setup() {
    arregloImagenes = [{ indice: "000", imagen: img000 }, { indice: "001", imagen: img001 }, { indice: "002", imagen: img002 }, { indice: "003", imagen: img003 }, { indice: "004", imagen: img004 }, { indice: "010", imagen: img010 }, { indice: "011", imagen: img011 }, { indice: "012", imagen: img012 }, { indice: "013", imagen: img013 }, { indice: "014", imagen: img014 }, { indice: "020", imagen: img020 }, { indice: "021", imagen: img021 }, { indice: "022", imagen: img022 }, { indice: "023", imagen: img023 }, { indice: "024", imagen: img024 }, { indice: "030", imagen: img030 }, { indice: "031", imagen: img031 }, { indice: "032", imagen: img032 }, { indice: "033", imagen: img033 }, { indice: "034", imagen: img034 }, { indice: "040", imagen: img040 }, { indice: "041", imagen: img041 }, { indice: "042", imagen: img042 }, { indice: "043", imagen: img043 }, { indice: "044", imagen: img044 }, { indice: "100", imagen: img100 }, { indice: "101", imagen: img101 }, { indice: "102", imagen: img102 }, { indice: "103", imagen: img103 }, { indice: "104", imagen: img104 }, { indice: "110", imagen: img110 }, { indice: "111", imagen: img111 }, { indice: "112", imagen: img112 }, { indice: "113", imagen: img113 }, { indice: "114", imagen: img114 }, { indice: "120", imagen: img120 }, { indice: "121", imagen: img121 }, { indice: "122", imagen: img122 }, { indice: "123", imagen: img123 }, { indice: "124", imagen: img124 }, { indice: "130", imagen: img130 }, { indice: "131", imagen: img131 }, { indice: "132", imagen: img132 }, { indice: "133", imagen: img133 }, { indice: "134", imagen: img134 }, { indice: "140", imagen: img140 }, { indice: "141", imagen: img141 }, { indice: "142", imagen: img142 }, { indice: "143", imagen: img143 }, { indice: "144", imagen: img144 }, { indice: "200", imagen: img200 }, { indice: "201", imagen: img201 }, { indice: "202", imagen: img202 }, { indice: "203", imagen: img203 }, { indice: "204", imagen: img204 }, { indice: "210", imagen: img210 }, { indice: "211", imagen: img211 }, { indice: "212", imagen: img212 }, { indice: "213", imagen: img213 }, { indice: "214", imagen: img214 }, { indice: "220", imagen: img220 }, { indice: "221", imagen: img221 }, { indice: "222", imagen: img222 }, { indice: "223", imagen: img223 }, { indice: "224", imagen: img224 }, { indice: "230", imagen: img230 }, { indice: "231", imagen: img231 }, { indice: "232", imagen: img232 }, { indice: "233", imagen: img233 }, { indice: "234", imagen: img234 }, { indice: "240", imagen: img240 }, { indice: "241", imagen: img241 }, { indice: "242", imagen: img242 }, { indice: "243", imagen: img243 }, { indice: "244", imagen: img244 }, { indice: "300", imagen: img300 }, { indice: "301", imagen: img301 }, { indice: "302", imagen: img302 }, { indice: "303", imagen: img303 }, { indice: "304", imagen: img304 }, { indice: "310", imagen: img310 }, { indice: "311", imagen: img311 }, { indice: "312", imagen: img312 }, { indice: "313", imagen: img313 }, { indice: "314", imagen: img314 }, { indice: "320", imagen: img320 }, { indice: "321", imagen: img321 }, { indice: "322", imagen: img322 }, { indice: "323", imagen: img323 }, { indice: "324", imagen: img324 }, { indice: "330", imagen: img330 }, { indice: "331", imagen: img331 }, { indice: "332", imagen: img332 }, { indice: "333", imagen: img333 }, { indice: "334", imagen: img334 }, { indice: "340", imagen: img340 }, { indice: "341", imagen: img341 }, { indice: "342", imagen: img342 }, { indice: "343", imagen: img343 }, { indice: "344", imagen: img344 }, { indice: "400", imagen: img400 }, { indice: "401", imagen: img401 }, { indice: "402", imagen: img402 }, { indice: "403", imagen: img403 }, { indice: "404", imagen: img404 }, { indice: "410", imagen: img410 }, { indice: "411", imagen: img411 }, { indice: "412", imagen: img412 }, { indice: "413", imagen: img413 }, { indice: "414", imagen: img414 }, { indice: "420", imagen: img420 }, { indice: "421", imagen: img421 }, { indice: "422", imagen: img422 }, { indice: "423", imagen: img423 }, { indice: "424", imagen: img424 }, { indice: "430", imagen: img430 }, { indice: "431", imagen: img431 }, { indice: "432", imagen: img432 }, { indice: "433", imagen: img433 }, { indice: "434", imagen: img434 }, { indice: "440", imagen: img440 }, { indice: "441", imagen: img441 }, { indice: "442", imagen: img442 }, { indice: "443", imagen: img443 }, { indice: "444", imagen: img444 }]
    createCanvas(640, 480);
    pixelDensity(3);
    frameRate(15);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);
}

function draw() {
    background(255);
    video.loadPixels();
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {

            var index = (video.width - x + 1 + (y * video.width)) * 4;
            var r = video.pixels[index + 0];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];

            if (isNaN(r)) r = 0;
            if (isNaN(g)) g = 0;
            if (isNaN(b)) b = 0;

            r = mapColor(r);
            g = mapColor(g);
            b = mapColor(b);

            var indice = r.toString() + g.toString() + b.toString();
            var imagen;
            arregloImagenes.forEach((posibleImagen) => {
                if (posibleImagen.indice == indice) {
                    imagen = posibleImagen.imagen;
                }
            });

            noStroke();
            fill(255);
            rectMode(CENTER);
            image(imagen, x * vScale, y * vScale, vScale, vScale);
        }
    }

}
```

## Resultados

A continuación puede apreciar el código anterior en ejecución (recuerde activar la camara).

> :P5 sketch=/docs/sketches/videoMosaic.js, width=650, height=600

## Conclusiones

Los fotomosaicos son un interesante concepto de arte electrónico que ha cautivado a varias personas y que aún sigue vigente, algunos artististas se encuentran desarrollando más trabajos relacionados con diferentes técnicas.

La técnica utilizada en este proyecto ha permitido obtener resultados bastante cercanos a la imagen original con los parametros usados. Sin embargo, al intentar reducir el valor de la escala de reducción de la imagen para intentar obtener una imagen menos pixelada y más cercana a la original, se produce un problema de rendimiento, los fotogramas de la captura de vídeo se reducen debido al mayor número de cálculos que debe hacer el servidor.

Como trabajo futuro se propone utilizar un método más optimizado para realizar los calculos de la imagen o utilizar un dispositivo con más recursos de computo. Adicionalmente, sería interesante aumentar el banco de imágenes y por ende la escala/gama de colores.

> :ToCPrevNext