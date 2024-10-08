var inherit   = require('../../inherit');
var ShapeTool = require('../shape-tool');

function Eraser(name, drawTool) {
  ShapeTool.call(this, name, drawTool);

  var self = this;

  self.canvas.freeDrawingBrush.color = "#fff";
  self.canvas.freeDrawingBrush.width = this.master.state.strokeWidth;
}

inherit(Eraser, ShapeTool);

Eraser.prototype.mouseDown = function (opt) {
  this.canvas.freeDrawingBrush.color = "#fff";
  Eraser.super.mouseDown.call(this, opt);
  if (!this.active) { return; }
  if (!this.canvas.isDrawingMode) {
    // If we are here, it means the handler is called for the first time.
    // Activate drawing mode and call manually FabricJS handler to handle
    // mouse down in drawing mode correctly.
    //
    // If you take look at FabricJS's methods like:
    // - _onMouseDownInDrawingMode
    // - _onMouseMoveInDrawingMode
    // - _onMouseUpInDrawingMode
    // it's visible that we could implement whole functionality using public
    // `freeDrawingBrush` object. That would be better solution if these methods
    // didn't handle clipping too. It would force us to literally copy the same
    // code. So unless almost everything is handled in brush class, IMHO it's


    // better to use this solution which is at least short and simple.
    this.canvas.fill = false;

    this.canvas.isDrawingMode = true;
    this.canvas._onMouseDownInDrawingMode(opt.e);
  }
};

Eraser.prototype.mouseUp = function (opt) {
  var objects = this.canvas.getObjects();
  var lastObject = objects[objects.length - 1];
  this.curr = lastObject;
  // Empty string == transparent
  // Null or missing values for fill default to rbg(0,0,0)
  // this.curr.fill = this.master.state.fill;
  this.curr.objectCaching = false;
  Eraser.super.mouseUp.call(this, opt);
  if (!this._locked) {
    this.canvas.isDrawingMode = false;
  }
  this.actionComplete(lastObject);
  this.curr = undefined;
  this.master.pushToHistory();
};

Eraser.prototype.deactivate = function () {
  this.canvas.freeDrawingBrush.color = this.master.state.stroke;
  Eraser.super.deactivate.call(this);
  this.canvas.isDrawingMode = false;
};

module.exports = Eraser;
