CanvasRenderingContext2D.prototype.drawImageGradient = function(img, x, y) {
    var ctx = this;

    // Is this needed?
    if (!img.complete) {
        var err = new Error();
        err.message = "CanvasRenderingContext2D.prototype.drawImageGradient: The image has not loaded."
        throw err;
    }

    var imgWidth = img.width;
    var imgHeight = img.height;
    var imageCanvas = document.createElement("canvas");

    // Handle IE
    if (!imageCanvas.getContext) {
        ctx.drawImage(img, x, y);
        return;
    }

    imageCanvas.width = imgWidth;
    imageCanvas.height = imgHeight;

    var imgCtx = imageCanvas.getContext("2d");
    
    imgCtx.drawImage(img, 0, 0);

    var gradientImageData = imgCtx.getImageData(0, 0, imgWidth, imgHeight);

    var ctxImageData = ctx.getImageData(x, y, imgWidth, imgHeight);

    for (var i = 0; i < ctxImageData.data.length; i += 4) {
        updatePixel(i);
        updatePixel(i + 1);
        updatePixel(i + 2);
    }

    ctx.putImageData(ctxImageData, x, y);

    function updatePixel(index) {
        var opacity = parseInt(i / 4 / (img.width - 1)) / img.height;
        opacity = opacity > 1 ? 1 : opacity;
        
        // Add image pixel value to source pixel value.
        ctxImageData.data[index] =
            (gradientImageData.data[index] * opacity) +
            (ctxImageData.data[index] * (1 - opacity));
    }
}