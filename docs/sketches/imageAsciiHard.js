var quadrille;
var image;

function preload() {

  //imagen a convertir en Ascii Art
  image = loadImage('/visual/docs/sketches/images/mosaico/gato_mosaico.jpg');

  //Simbolos para la imagen
    sym000 = loadImage("/visual/docs/sketches/images/Ascii/simbolo.png");
    sym001 = loadImage("/visual/docs/sketches/images/Ascii/2.png");
    sym002 = loadImage("/visual/docs/sketches/images/Ascii/3.png");
    sym010 = loadImage("/visual/docs/sketches/images/Ascii/4.png");
    sym011 = loadImage("/visual/docs/sketches/images/Ascii/5.png");
    sym012 = loadImage("/visual/docs/sketches/images/Ascii/6.png");
    sym020 = loadImage("/visual/docs/sketches/images/Ascii/7.png");
    sym021 = loadImage("/visual/docs/sketches/images/Ascii/8.png");
    sym022 = loadImage("/visual/docs/sketches/images/Ascii/9.png");
    sym100 = loadImage("/visual/docs/sketches/images/Ascii/10.png");
    sym101 = loadImage("/visual/docs/sketches/images/Ascii/11.png");
    sym102 = loadImage("/visual/docs/sketches/images/Ascii/12.png");
    sym110 = loadImage("/visual/docs/sketches/images/Ascii/13.png");
    sym111 = loadImage("/visual/docs/sketches/images/Ascii/14.png");
    sym112 = loadImage("/visual/docs/sketches/images/Ascii/15.png");
    sym120 = loadImage("/visual/docs/sketches/images/Ascii/16.png");
    sym121 = loadImage("/visual/docs/sketches/images/Ascii/17.png");
    sym122 = loadImage("/visual/docs/sketches/images/Ascii/18.png");
    sym200 = loadImage("/visual/docs/sketches/images/Ascii/19.png");
    sym201 = loadImage("/visual/docs/sketches/images/Ascii/20.png");
    sym202 = loadImage("/visual/docs/sketches/images/Ascii/21.png");
    sym210 = loadImage("/visual/docs/sketches/images/Ascii/22.png");
    sym211 = loadImage("/visual/docs/sketches/images/Ascii/23.png");
    sym212 = loadImage("/visual/docs/sketches/images/Ascii/24.png");
    sym220 = loadImage("/visual/docs/sketches/images/Ascii/25.png");
    sym221 = loadImage("/visual/docs/sketches/images/Ascii/26.png");
    sym222 = loadImage("/visual/docs/sketches/images/Ascii/27.png");
}

//Función para mapear un color de 0-255 entre 0-2
function mapColor(color) {
  if (color <= 80) {
      return 0;
  }
  else if (color <= 180) {
      return 1;
  }
  else if (color <= 255) {
      return 2;
}
}

function setup() {
  createCanvas(610, 650);
  arregloImagenes = [{ indice: "000", imagen: sym000 }, { indice: "001", imagen: sym001 }, { indice: "002", imagen: sym002 },{ indice: "010", imagen: sym010 }, { indice: "011", imagen: sym011 }, { indice: "012", imagen: sym012 }, { indice: "020", imagen: sym020 }, { indice: "021", imagen: sym021 }, { indice: "022", imagen: sym022 },  { indice: "100", imagen: sym100 }, { indice: "101", imagen: sym101 }, { indice: "102", imagen: sym102 },  { indice: "110", imagen: sym110 }, { indice: "111", imagen: sym111 }, { indice: "112", imagen: sym112 },  { indice: "120", imagen: sym120 }, { indice: "121", imagen: sym121 }, { indice: "122", imagen: sym122 },  { indice: "200", imagen: sym200 }, { indice: "201", imagen: sym201 }, { indice: "202", imagen: sym202 }, { indice: "210", imagen: sym210 }, { indice: "211", imagen: sym211 }, { indice: "212", imagen: sym212 }, { indice: "220", imagen: sym220 }, { indice: "221", imagen: sym221 }, { indice: "222", imagen: sym222 }]
  quadrille = createQuadrille(160, image)
}

function draw() {
  for (i = 0; i < quadrille.width; i++){
    for (j = 0; j < quadrille.height; j++){
      color = quadrille.read(i,j);

      //Cada valor RGB se mapea de 0-255 a uno de 0-2
      r = mapColor(color[0]);
      g = mapColor(color[1]);
      b = mapColor(color[2]);

      //De acuerdo con el valor
      var indice = r.toString() + g.toString() + b.toString();
      var imagen;
      arregloImagenes.forEach((posibleImagen) => {
        if (posibleImagen.indice == indice) {
          imagen = posibleImagen.imagen;
        }
      });
      quadrille.fill(i, j, imagen)
    }
  }

  drawQuadrille(quadrille, 0, 0, 40/10, 1.6/3, "grey");
}
