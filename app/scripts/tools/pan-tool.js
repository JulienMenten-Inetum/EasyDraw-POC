var fabric = require("fabric").fabric;
const Tool = require("../tool");
const inherit = require("../inherit");

// Pan Tool - Inherits from Tool
function PanTool(name, drawTool) {
  Tool.call(this, name, drawTool); // Call the parent constructor

  // Additional properties specific to the PanTool
  this.isDragging = false;
  this.lastPosX = 0;
  this.lastPosY = 0;
}

// Inherit from Tool
PanTool.prototype = Object.create(Tool.prototype);
PanTool.prototype.constructor = PanTool;

// Override activate method
PanTool.prototype.activate = function () {
  // if (!this.active) {
  //     return;
  // }
  this.canvas.defaultCursor = "pointer";

  this.canvas.selection = false;
  this.canvas.discardActiveObject();
  this.canvas.renderAll();
  fabric.Annotations.removeAllControlPoints(this.canvas);

  // Add event listeners specific to the PanTool
  this.addEventListener("mouse:down", this.handleMouseDown.bind(this));
  this.addEventListener("mouse:move", this.handleMouseMove.bind(this));
  this.addEventListener("mouse:up", this.handleMouseUp.bind(this));
  Tool.prototype.activate.call(this);
};

PanTool.prototype.deactivate = function () {
  Tool.prototype.deactivate.call(this);
};

// Mouse down handler
PanTool.prototype.handleMouseDown = function (options) {
  this.canvas.defaultCursor = "grab";
  this.isDragging = true;
  this.lastPosX = options.e.clientX;
  this.lastPosY = options.e.clientY;
};

// Mouse move handler
PanTool.prototype.handleMouseMove = function (options) {
  if (this.isDragging) {
    var e = options.e;
    var vpt = this.canvas.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.canvas.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
  }
};

// Mouse up handler
PanTool.prototype.handleMouseUp = function () {
  this.canvas.defaultCursor = "pointer";

  this.isDragging = false;
};

// Override deactivate method if needed
// ...

module.exports = PanTool;
