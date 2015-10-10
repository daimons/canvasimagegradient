Adds the ability to draw images with a linear or radial transparent gradient effect, to the canvas context.

To use download the canvasImageGradient.js file and reference. This will bind the drawImageGradient function to the CanvasRenderingContext2D object.

## Examples ##

### Linear Gradient ###

```
ctx.drawImage(desertImage, 0, 0);

var linearGradient = ctx.createLinearGradient(0, 0, 0, googleImage.height);
linearGradient.addColorStop(0, "transparent");
linearGradient.addColorStop(1, "#000");

ctx.drawImageGradient(googleImage, 12, 65, linearGradient);
```

![http://canvasimagegradient.googlecode.com/files/linearGradient.jpg](http://canvasimagegradient.googlecode.com/files/linearGradient.jpg)


### Radial Gradient ###

```
ctx.drawImage(desertImage, 0, 0);

var centerX = googleImage.width/2;
var centerY = googleImage.height/2;

var radialGradient = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, centerX);
radialGradient.addColorStop(0, "transparent");
radialGradient.addColorStop(1, "#000");

ctx.drawImageGradient(googleImage, 12, 65, radialGradient);
```

![http://canvasimagegradient.googlecode.com/files/radialGradient.jpg](http://canvasimagegradient.googlecode.com/files/radialGradient.jpg)
