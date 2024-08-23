var DrawingTool = require("./scripts/drawing-tool");
var style = require("./styles/drawing-tool.scss");

var drawingTool = new DrawingTool("#drawing-tool", {
  parseSVG: true,
  separatorsAfter: ["stamp", "strokeWidthPalette"],
});

var state = null;
$("#dimension_text_id").on("keyup", function () {
  drawingTool.setDimensionText($("#dimension_text_id").val());
});
$("#set-background").on("click", function () {
  drawingTool.setBackgroundImage($("#background-src").val());
});
$("#resize-background").on("click", function () {
  drawingTool.resizeBackgroundToCanvas();
});
$("#resize-canvas").on("click", function () {
  drawingTool.resizeCanvasToBackground();
});
$("#shrink-background").on("click", function () {
  drawingTool.shrinkBackgroundToCanvas();
});
$("#clear").on("click", function () {
  // drawingTool.clear(true);
  drawingTool.clear(false); // don't remove the background
});
$("#save").on("click", function () {
  state = drawingTool.save();
  console.log(state);
  $("#load").removeAttr("disabled");
});
$("#load").on("click", function () {
  if (state === null) return;
  drawingTool.load(state);
});

$("#doorcolor-btn").on("click", function (e) {
  //my_state.canvas.objects[0].objects[0].fill = $('#doorcolor').val();
  //state = drawingTool.save();
  drawingTool.load(my_state);
  //drawingTool.load(state);
});
$("#ungroup").click(function () {
  drawingTool.unGroup();
});

$("#gradient").click(function () {
  drawingTool.fillGradient("#000000", "#ffffff");
});

$("#picture").click(function () {
  drawingTool.loadImage("picture.png");
});
$("#pdf").on("change", function (event) {
  var file = event.target.files[0];
  var fileReader = new FileReader();

  fileReader.onload = function () {
    var typedarray = new Uint8Array(this.result);
    pdfjsLib.workerSrc = "pdf.worker.js";

    var loadingTask = pdfjsLib.getDocument(typedarray);
    loadingTask.promise.then(function (pdf) {
      // you can now use *pdf* here
      pdf.getPage(1).then(function (page) {
        // you can now use *page* here
        var viewport = page.getViewport({ scale: 2 });
        var canvas = document.createElement("canvas");

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.visibility = "hidden";

        var renderTask = page.render({
          canvasContext: canvas.getContext("2d"),
          viewport: viewport,
        });

        renderTask.promise.then(function () {
          let image = canvas.toDataURL();
          canvas.height = 0;
          canvas.width = 0;
          fabric.Image.fromURL(image, function (img) {
            var widthRatio = my_state.dt.width / img.width;
            var heightRatio = my_state.dt.height / img.height;
            var minRatio = Math.min(widthRatio, heightRatio);
            // fabric.log(my_state.dt.width);
            // fabric.log(widthRatio);
            // fabric.log(my_state.dt.height);
            // fabric.log(heightRatio);
            if (minRatio < 1) {
              img.set({
                // width: img.width * minRatio,
                // height: img.height * minRatio,
                scaleX: minRatio,
                scaleY: minRatio,
              });
            }
            var posX = my_state.dt.width;
            var posY = 0;

            posX = posX - img.width / 2;

            img.set({ left: posX, top: posY });

            drawingTool.canvas.add(img);
            drawingTool.pushToHistory();
            drawingTool.chooseTool("select");
          });
        });
      });
    });
  };

  fileReader.readAsArrayBuffer(file);
});

// limit zooming to the canvas only
const easydrawCanvas = document.getElementsByClassName("canvas-container")[0];
var in_zoom_pan = false;
var x0, y0;

easydrawCanvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  event.stopPropagation();
  var delta = event.deltaY;
  var zoom = drawingTool.canvas.getZoom();
  if (!!zoom) {
    zoom = zoom + delta / 200;
    if (zoom > 20) zoom = 20;
    // if (zoom < 0.01) zoom = 0.01; // original
    if (zoom < 1) zoom = 1; // disabled zooming out, not used in Connect
    drawingTool.canvas.zoomToPoint(
      { x: event.offsetX, y: event.offsetY },
      zoom
    );
  }
});
easydrawCanvas.addEventListener("gesturestart", (event) => {
  // event.preventDefault();
  // event.stopPropagation();
  // console.log(event)
  x0 = event.screenX;
  y0 = event.screenY;
  drawingTool.currentTool.setActive(false);
  drawingTool.undo();
  drawingTool.redo();
  in_zoom_pan = true;
});

easydrawCanvas.addEventListener("gesturechange", (event) => {
  event.preventDefault();
  event.stopPropagation();
  var delta = event.deltaY;
  var zoom = drawingTool.canvas.getZoom();
  var scale = 1;
  if (zoom.isNaN) {
    zoom = zoom + delta / 20;
    if (zoom > 20) zoom = 20;
    // if (zoom < 0.01) zoom = 0.01; // original
    if (zoom < 1) zoom = 1; // disabled zooming out, not used in Connect
    drawingTool.canvas.zoomToPoint(
      { x: event.offsetX, y: event.offsetY },
      zoom
    );
  } else {
    scale = event.scale;
    drawingTool.canvas.zoomToPoint({ x: event.layerX, y: event.layerY }, scale);
    var x = event.screenX,
      y = event.screenY;
    drawingTool.canvas.relativePan({ x: x - x0, y: y - y0 });
    x0 = x;
    y0 = y;
  }
  drawingTool.startPan(event, drawingTool.canvas, true);
});

// easydrawCanvas.addEventListener("wheel", (event) => {
//     event.preventDefault();
//     const scale = 2;
//     var offsetX = (event.clientX - drawingTool.canvas._offset.left) / scale;
//     var offsetY = (event.clientY - drawingTool.canvas._offset.top) / scale;
//     if (event.clientX / scale > drawingTool.canvas._offset.left && event.clientY / scale > drawingTool.canvas._offset.top && event.clientX / scale < drawingTool.canvas._offset.left + drawingTool.canvas.width && event.clientY / scale < drawingTool.canvas._offset.top + drawingTool.canvas.height) {
//         var delta = event.deltaY * -1; // disable this -1 for 'natural zoom'
//         var zoom = drawingTool.canvas.getZoom();
//         zoom = zoom + delta / 200;
//         if (zoom > 10) zoom = 10;
//         if (zoom < 0) zoom = 0;
//         fabric.log('zoom',zoom)
//         if (delta > 0) {
//             drawingTool.canvas.zoomToPoint({ x: offsetX, y: offsetY }, zoom);
//             console.log(offsetX, offsetY, drawingTool.canvas.viewportTransform[4], drawingTool.canvas.viewportTransform[0]);
//         } else {
//             drawingTool.canvas.zoomToPoint({ x: offsetX, y: offsetY }, zoom);
//             if (drawingTool.canvas.viewportTransform[4] > 0) {
//                 drawingTool.canvas.viewportTransform[4] = 0;
//             }
//             if (drawingTool.canvas.viewportTransform[5] > 0) {
//                 drawingTool.canvas.viewportTransform[5] = 0;
//             }
//             if (drawingTool.canvas.viewportTransform[4] < drawingTool.canvas.width - drawingTool.canvas.width * zoom) {
//                 drawingTool.canvas.viewportTransform[4] = drawingTool.canvas.width - drawingTool.canvas.width * zoom;
//             }
//             if (drawingTool.canvas.viewportTransform[5] < drawingTool.canvas.height - drawingTool.canvas.height * zoom) {
//                 drawingTool.canvas.viewportTransform[5] = drawingTool.canvas.height - drawingTool.canvas.height * zoom;
//             }
//         }
//         event.stopPropagation();
//     }
// });

// easydrawCanvas.addEventListener(
//     "gesturechange",
//     (event) => {
//         event.preventDefault();
//         var panX;
//         var panY;
//
//         const scale = 2;
//         var offsetX = (event.clientX - drawingTool.canvas._offset.left) / scale;
//         var offsetY = (event.clientY - drawingTool.canvas._offset.top) / scale;
//
//         if (panX == "" && panY == "") {
//             panX = event.clientX / scale;
//             panY = event.clientY / scale;
//         } else {
//             var panDeltaX = panX - event.clientX / scale;
//             var panDeltaY = panY - event.clientY / scale;
//             drawingTool.canvas.viewportTransform[4] = drawingTool.canvas.viewportTransform[4] - panDeltaX;
//             drawingTool.canvas.viewportTransform[5] = drawingTool.canvas.viewportTransform[5] - panDeltaY;
//             panX = event.clientX / scale;
//             panY = event.clientY / scale;
//         }
//
//         if (event.clientX / scale > drawingTool.canvas._offset.left && event.clientY / scale > drawingTool.canvas._offset.top && event.clientX / scale < drawingTool.canvas._offset.left + drawingTool.canvas.width && event.clientY / scale < drawingTool.canvas._offset.top + drawingTool.canvas.height) {
//             var zoom = 100 * event.scale;
//             if (zoom > 10) zoom = 10;
//             if (zoom < 1) zoom = 1;
//
//             drawingTool.canvas.zoomToPoint({ x: offsetX, y: offsetY }, zoom);
//             if (drawingTool.canvas.viewportTransform[4] > 0) {
//                 drawingTool.canvas.viewportTransform[4] = 0;
//             }
//             if (drawingTool.canvas.viewportTransform[5] > 0) {
//                 drawingTool.canvas.viewportTransform[5] = 0;
//             }
//             if (drawingTool.canvas.viewportTransform[4] < drawingTool.canvas.width - drawingTool.canvas.width * zoom) {
//                 drawingTool.canvas.viewportTransform[4] = drawingTool.canvas.width - drawingTool.canvas.width * zoom;
//             }
//             if (drawingTool.canvas.viewportTransform[5] < drawingTool.canvas.height - drawingTool.canvas.height * zoom) {
//                 drawingTool.canvas.viewportTransform[5] = drawingTool.canvas.height - drawingTool.canvas.height * zoom;
//             }
//
//             event.stopPropagation();
//         }
//     },
//     { passive: false }
// );
window.addEventListener(
  "gestureend",
  function (e) {
    in_zoom_pan = false;
    var panX = "";
    var panY = "";

    drawingTool.currentTool.setActive(true);
  },
  { passive: false }
);

// Prevents window from moving on touch on newer browsers.
document.addEventListener(
  "touchmove",
  function (event) {
    console.log("touchmove");
    if (in_zoom_pan) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      if (drawingTool.currentTool.name == "Pan Tool") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!!event.touches) {
          var x = event.touches[0].screenX,
            y = event.touches[0].screenY;
          console.log(x, y);
          drawingTool.canvas.relativePan({
            x: x - lastPosX,
            y: y - lastPosY,
          });
          lastPosX = x;
          lastPosY = y;
        }
      }
    }
  },
  { passive: false }
);
document.addEventListener("touchstart", function (event) {
  console.log("touchstart");
  if (in_zoom_pan) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    if (drawingTool.currentTool.name == "Pan Tool") {
      event.preventDefault();
      event.stopPropagation();
      if (!!event.touches) {
        (lastPosX = event.touches[0].screenX),
          (lastPosY = event.touches[0].screenY);
      }
    }
  }
});

// FIX issue where canvas loads in empty in FileMaker
window.onload = function () {
  drawingTool.undo();
  drawingTool.redo();
  drawingTool.resetHistory();
};

// canvas resizing
const onResize = () => {
  drawingTool.canvas.setDimensions({
    width: window.innerWidth - 60,
    height: window.innerHeight - 20,
  });
  // update devicePixelRatio
  fabric.devicePixelRatio =
    fabric.window.devicePixelRatio ||
    fabric.window.webkitDevicePixelRatio ||
    fabric.window.mozDevicePixelRatio ||
    1;
  drawingTool.canvas._initRetinaScaling();

  // re-render canvas with new quality
  drawingTool.canvas.requestRenderAll();
};

window.addEventListener("resize", onResize);
window.addEventListener("load", onResize);

// Create new DrawingTool

module.exports = DrawingTool;
