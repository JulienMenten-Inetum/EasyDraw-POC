var fabric = require("fabric");
var inherit = require("../inherit");
var Tool = require("../tool");

function PipetteTool(name, drawTool, colorType) {
  Tool.call(this, name, drawTool);
  var self = this;
  this.currentColor_ = this.getCurrentColor(this.master, colorType);
  this.addEventListener("mouse:down", function (e) {
    self.mouseDown(e, colorType);
  });
}
inherit(PipetteTool, Tool);

PipetteTool.prototype.getColor = function (e, canvas) {
  const canvasContext = canvas.getContext("2d");
  const pointer = canvas.getPointer(e.e);

  const zoom = canvas.getZoom();
  const offsetX = canvas.viewportTransform[4];
  const offsetY = canvas.viewportTransform[5];

  const pixel = canvasContext.getImageData(
    pointer.x * zoom + offsetX,
    pointer.y * zoom + offsetY,
    1,
    1
  ).data;
  const color = [pixel[0], pixel[1], pixel[2], pixel[3]];

  return color;
};

PipetteTool.prototype.getCurrentColor = function (drawingTool, colorType) {
  if (colorType === "stroke") {
    return drawingTool.state.stroke;
  } else {
    return drawingTool.state.fill;
  }
};

PipetteTool.prototype.use = function () {};

PipetteTool.prototype.activate = function () {
  PipetteTool.super.activate.call(this);
  this.canvas.defaultCursor = "crosshair";
};

PipetteTool.prototype.deactivate = function () {
  PipetteTool.super.deactivate.call(this);
  this.canvas.defaultCursor = "default";
  this.master.changeOutOfTool();
};

PipetteTool.prototype.exit = function () {
  this.down = false;
  this.master.changeOutOfTool();
};

PipetteTool.prototype.mouseDown = function (e, colorType) {
  if (colorType === "stroke") {
    this.setStrokeColor(e);
  } else {
    this.setFillColor(e);
  }
  this.deactivate();
};

PipetteTool.prototype.setStrokeColor = function (e) {
  let color = this.convertToHEX(this.getColor(e, this.canvas));
  this.master.setStrokeColor(color);
  this.master.setSelectionStrokeColor(color);
};

PipetteTool.prototype.setFillColor = function (e) {
  let color = this.convertToHEX(this.getColor(e, this.canvas));
  this.master.setFillColor(color);
  this.master.setSelectionFillColor(color);
};

PipetteTool.prototype.convertToHEX = function (rgbColor) {
  let hexColor = `#${rgbColor
    .map((d) => d.toString(16).padStart(2, "0"))
    .join("")}`;
  return hexColor;
};

module.exports = PipetteTool;
