# Implementación - Resultados
La implementación fue realizada en Processing, tomando como base [código de 'Nabr'](https://forum.processing.org/two/discussion/comment/122724) encontrado en los foros de processing. 

El código lleva a cabo una implementación del algoritmo de Z-buffering, lo cual permite la representación de figuras tridimensionales a las cuales se les asigna, además de las coordenadas (x,y), una tercera coordenada que representa la profunidad de la figura.

De esta manera, en la implementación se grafican tres esferas con diferentes profundidades (-500, -300 y -100), y se puede apreciar fácilmente cómo se ocultan las partes de las esferas que se encuentran detrás de las otras.

![CodigoColor](/docs/sketches/Esferas.png)

La implementación permite también, graficar una cuarta esfera naranja, la cual tiene una profundidad por defecto de -150, que cambia a -300 al mantener presionada cualquier tecla. Las coordenadas están pensadas de manera que la esfera quede en medio de las esferas roja y verde, y verde y azul respectivamente. La movilidad de la esfera nos permite ver cómo esta interactúa con las otras teniendo en cuenta la profundidad.



Finalmente, si mantenemos presionado el botón izquierdo del mouse, se nos mostrará en pantalla la profundidad correspondiente a la coordenada en la que se encuentra el cursor.

> :Tabs
> > :Tab title=Esfera con profundidad variable
> >
> > ![Orange](/docs/sketches/Orange.gif)
>
> > :Tab title=Indicador de Profundidad del pixel
> >
> > ![DepthCoord](/docs/sketches/DepthCoord.gif)
> 
> > :Tab title = Código en Processing:
> >```processing
> > // Tomado y adaptado de: https://forum.processing.org/two/discussion/comment/122724 'Nabr' 2018
> > // Basado en: https://openprocessing.org/sketch/2950#  Alasdair Turner 2009
> >   
> > import com.jogamp.opengl.GL2ES2;
> > import com.jogamp.opengl.util.GLBuffers;
> > import java.nio.FloatBuffer;
> > GL2ES2 gl;
> > 
> > //Se declara el buffer con el que se implementará el Z-Buffering
> > FloatBuffer zbuff;
> > float depth = -150;
> > 
> > void setup() {
> >   //Se incializa el espacio tridimensional para poder hacer uso de la coordenada de profundidad.
> >   size(640, 360, P3D);
> >   noStroke();
> >   //Se inicializa el buffer
> >   zbuff = GLBuffers.newDirectFloatBuffer(new float[]{1f});
> > }
> >  
> > void draw() {
> >   //Se establecen los valores necesarios para los cálculos del Z-Buffering
> >   float fovy =PI/3.; 
> >   float cameraZ =(height/2.0) / tan(degrees(fovy)*PI / 360.0);  
> >   float zNear =  cameraZ/10.0; 
> >   float zFar=cameraZ*10.0;
> >  
> >   //Establecemos el color de fondo, así como la iluminación por defecto
> >   background(255);
> >   lights();
> >   
> >   //Dibujamos una esfera con una profundidad de -500 (La de más atrás) -> ROJA
> >   pushMatrix();
> >   translate(width/3.0, height/2.0, -500 );
> >   fill(255,0,0);
> >   sphere(100);
> >   popMatrix();
> >   
> >   //Dibujamos una esfera con una profundidad de -300 (La del medio) -> VERDE
> >   pushMatrix();
> >   translate(width/3.0 + 100, height/2.0, -300 );
> >   fill(0,255,0);
> >   sphere(100);
> >   popMatrix();
> >   
> >   //Dibujamos una esfera con una profundidad de -100 (La del frente) -> AZUL
> >   pushMatrix();
> >   translate(width/3.0 + 200, height/2.0, -100 );
> >   fill(0,0,255);
> >   sphere(100);
> >   popMatrix();
> >  
> >   gl = ((PJOGL) beginPGL()).gl.getGL2ES2();
> >   endPGL();
> >   
> >   //Si se mantiene el click, se muestra la profundidad de la coordenada del mismo, sino, se 
> >   //muestra la esfera con  profundidad variable
> >   if(mousePressed){
> >     //Se lee la profundidad de la coordenada en la que se encuentra el mouse y se muestra en pantalla
> >     gl.glReadPixels( mouseX, mouseY, 1, 1, GL2ES2.GL_DEPTH_COMPONENT, GL2ES2.GL_FLOAT, zbuff);
> >     float z = 2.0 * ( zbuff.get(0) - 0.5f);
> >     float worldZ =  2.0f*zFar * zNear / (z*(zFar-zNear)-(zFar+zNear) );
> >     fill(0);
> >     textSize(24);
> >     text(nf(cameraZ+worldZ, 0, 1), mouseX, mouseY);
> >   }else{
> >     //Se cambia la profundidad de la esfera naranja manteniendo presionada cualquier tecla   
> >     if (keyPressed == true) {
> >         depth = -300;
> >     } else {
> >         depth = -150;
> >     }
> >     
> >     fill(0);
> >     textSize(18);
> >     text("Orange depth: " + depth, 50, 50);
> >     pushMatrix();
> >     translate(mouseX, mouseY, depth );
> >     fill(255, 165, 0);
> >     sphere(25);
> >     popMatrix();
> >   }  
> > }
> > ```