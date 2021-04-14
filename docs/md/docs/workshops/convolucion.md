# Imagen - Convolución

## Image Kernel 
A continuación se presentan los resultados obtenidos con los siguientes Kernel:
Kernel 1, con:

|  |  |  |
| :----: | :----: | :----: |
| -1 | -1 | -1 |
| -1 | 8 | -1 |
| -1 | -1 | -1 |

Kernel 2, con:

|  |  |  |
| :----: | :----: | :----: |
| -1 | -1 | -1 |
| -1 | 9 | -1 |
| -1 | -1 | -1 |

Kernel 3, con:

|  |  |  |
| :----: | :----: | :----: |
| -2 | -1 | 0 |
| -1 | 1 | 1 |
| 0 | 1 | 2 |

> :Tabs
> > :Tab title=Kernel 1
> > 
> > <p align="center"><img src="/docs/sketches/convo1.png"/></p>
>
> > :Tab title=Kernel 2
> > 
> > <p align="center"><img src="/docs/sketches/convo2.png"/></p>
>
> > :Tab title=Kernel 3
> > 
> > <p align="center"><img src="/docs/sketches/convo3.png"/></p>
>
> > :Tab title=Processing
> >
> > ```processing
> > float[][] kernel = {{ -1, -1, -1}, 
> >                     { -1,  8, -1}, 
> >                     { -1, -1, -1}};
> >                     
> > PImage img;
> > 
> > void setup() { 
> >   size(1000, 400);
> >   img = loadImage("/home/pc1/Desktop/image2.jpg");
> >   noLoop();
> > }
> > 
> > void draw() {
> >   image(img, 0, 0);
> >   img.loadPixels();
> >   PImage edgeImg = createImage(img.width, img.height, RGB);
> > 
> >   for (int y = 1; y < img.height-1; y++) { 
> >     for (int x = 1; x < img.width-1; x++) { 
> >       float sum = 0; // Kernel sum for this pixel
> > 
> >       for (int ky = -1; ky <= 1; ky++) {
> >         for (int kx = -1; kx <= 1; kx++) {
> >           int pos = (y + ky)*img.width + (x + kx);
> >           float val = red(img.pixels[pos]);
> >           sum += kernel[ky+1][kx+1] * val;
> > 
> >         }
> >       }
> > 
> >       edgeImg.pixels[y*img.width + x] = color(sum, sum, sum);
> >     }
> >   }
> >   edgeImg.updatePixels();
> >   image(edgeImg, width/2, 0);
> > }
> > ```

> :ToCPrevNext