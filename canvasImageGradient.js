﻿CanvasRenderingContext2D.prototype.drawImageGradient = function(img, x, y, gradient) {
    var ctx = this;

    // Is this needed?
    if (!img.complete) {
        var err = new Error();
        err.message = "CanvasRenderingContext2D.prototype.drawImageGradient: The image has not loaded."
        throw err;
    }

    var imgWidth = img.width;
    var imgHeight = img.height;

    if (!this.imageGradientCanvas) {
        this.imageGradientCanvas = document.createElement("canvas");
    }
    
    this.imageGradientCanvas.width = imgWidth;
    this.imageGradientCanvas.height = imgHeight;

    var imgCtx = this.imageGradientCanvas.getContext("2d");

    // Create default gradient.
    if (!gradient) {
        var gradient = imgCtx.createLinearGradient(0, 0, 0, imgHeight);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "#000");
    }

    var gradientImageData = createRectangularGradientImageData();

    imgCtx.drawImage(img, 0, 0);

    var imageImageData = imgCtx.getImageData(0, 0, imgWidth, imgHeight);

    var ctxImageData = ctx.getImageData(x, y, imgWidth, imgHeight);

    var opacity = 1;

    var time1 = new Date().getTime();

    var ctxImageDataData = ctxImageData.data;
    var imageImageDataData = imageImageData.data;
    var gradientImageDataData = gradientImageData.data;
    var ctxImageDataDataLength = ctxImageData.data.length;
    
    for (var i = 0; i < ctxImageDataDataLength; i += 4) {
        opacity = gradientImageDataData[i + 3] / 255;

        // Update rgb values of context image data.
        ctxImageDataData[i] =
            (imageImageDataData[i] * opacity) +
            (ctxImageDataData[i] * (1 - opacity));

        ctxImageDataData[i + 1] =
            (imageImageDataData[i + 1] * opacity) +
            (ctxImageDataData[i + 1] * (1 - opacity));

        ctxImageDataData[i + 2] =
            (imageImageDataData[i + 2] * opacity) +
            (ctxImageDataData[i + 2] * (1 - opacity));

    }

    $("#main").prepend("<p>End: " + (new Date().getTime() - time1) + "</p>");

    ctx.putImageData(ctxImageData, x, y);

    function createRectangularGradientImageData() {
        imgCtx.fillStyle = gradient;
        imgCtx.fillRect(0, 0, imgWidth, imgHeight);

        return imgCtx.getImageData(0, 0, imgWidth, imgHeight);
    }
}