var fabric = require("fabric").fabric;
var inherit = require("../inherit");
var Tool = require("../tool");
var lineCustomControlPoints = require("../fabric-extensions/line-custom-control-points");

var BASIC_SELECTION_PROPERTIES = {
  cornerSize: fabric.isTouchSupported ? 22 : 12,
  transparentCorners: false,
};

var POINT_SELECTION_PROPERTIES = {
  isPointSelection: true,
};

/**
 * Defacto default tool for DrawingTool.
 * When activated it puts the canvas into a selectable state so objects
 * can be moved and manipulated.
 */
function SelectionTool(name, drawTool) {
  Tool.call(this, name, drawTool);
  var that = this;

  this.canvas.on(
    "selection:created",
    function (opt) {
      opt.target.set(BASIC_SELECTION_PROPERTIES);
      this.canvas.renderAll();
      if (opt.target.isDimension) {
        const showText = document.getElementById("dimension_text_div_id");
        const showTextInput = document.getElementById("dimension_text_id");
        showTextInput.value = !!opt.target.isDimension
          ? opt.target.text.text
          : opt.target.text;
        showText.style.display = "block";
      }
      if (!(opt.target.isDimensionText || opt.target.isDimensionRect)) {
        this._setLastObject(opt.target);
      }
    }.bind(this)
  );

  this.canvas.on(
    "selection:updated",
    function (opt) {
      if (!opt.target.isControlPoint) {
        opt.target.set(BASIC_SELECTION_PROPERTIES);
        this.canvas.renderAll();
        this.master.clearSelection();
        this._setLastObject(opt.target);
        this.selectLastObject();
      }
    }.bind(this)
  );

  this.canvas.on(
    "before:selection:cleared",
    function () {
      const showText = document.getElementById("dimension_text_div_id");
      const showTextInput = document.getElementById("dimension_text_id");
      showTextInput.value = "";
      showText.style.display = "none";
    }.bind(this)
  );

  this._lastObject = null;
  this.canvas.on(
    "object:added",
    function (opt) {
      if (!opt.target.isDimensionText && !opt.target.isDimensionRect) {
        this._setLastObject(opt.target);
      }
    }.bind(this)
  );
  this.canvas.on(
    "object:removed",
    function (opt) {
      if (opt.target.isDimension) {
        this.canvas.remove(opt.target.text);
      }
      this._checkLastObject(opt.target);
    }.bind(this)
  );

  // Bind Ctrl / Cmd + A to select all action.
  this.master.$element.on(
    "keydown",
    function (e) {
      if (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) {
        this.selectAll();
        e.preventDefault();
      }
    }.bind(this)
  );

  // Set visual options of custom line control points.
  lineCustomControlPoints.controlPointColor = "#bcd2ff";
  lineCustomControlPoints.cornerSize = BASIC_SELECTION_PROPERTIES.cornerSize;
}

inherit(SelectionTool, Tool);

SelectionTool.BASIC_SELECTION_PROPERTIES = BASIC_SELECTION_PROPERTIES;

SelectionTool.prototype.activate = function () {
  //fabric.log('activate')
  this.canvas.defaultCursor = "default";

  SelectionTool.super.activate.call(this);
  // if(this.canvas.getObjects().length > 0) {
  //   let tmp = this._lastObject
  //   this.selectAll()
  //   this.master.clearSelection()
  //   this._setLastObject(tmp)
  // }

  this.setSelectable(true);
  this.selectLastObject();

  // activate all the annotation control points
  fabric.Annotations.addAllControlPoints(this.canvas);
};

SelectionTool.prototype.activateAgain = function () {
  //fabric.log('activateagain')
  // activate all the annotation control points
  fabric.Annotations.addAllControlPoints(this.canvas);
};

SelectionTool.prototype.deactivate = function () {
  //fabric.log('deactivate')
  SelectionTool.super.deactivate.call(this);
  this.setSelectable(false);

  // deactivate all the annotation control points
  fabric.Annotations.removeAllControlPoints(this.canvas);
};

SelectionTool.prototype.setSelectable = function (selectable) {
  let last_obj = this._lastObject;
  this.canvas.selection = selectable;
  //fabric.log('setSelectable', selectable)
  var items = this.canvas.getObjects();
  for (var i = items.length - 1; i >= 0; i--) {
    if (items[i].lock_selection !== true) {
      items[i].selectable = selectable;
      if (items[i].isDimension) {
        items[i].text.selectable = false;
        items[i].rect.selectable = false;
      }
    }
  }
  this._lastObject = last_obj;
};

SelectionTool.prototype.selectAll = function () {
  //fabric.log('selectAll')
  this.master.chooseTool("select");
  this.master.clearSelection();
  this.master.select(this.canvas.getObjects());
};

SelectionTool.prototype.selectLastObject = function () {
  //fabric.log('selectLastObject')
  if (this._lastObject && this._lastObject.lock_selection !== true) {
    this.canvas.setActiveObject(this._lastObject);
  }
};

SelectionTool.prototype._setLastObject = function (obj) {
  if (obj._dt_sourceObj && obj.annotationId) {
    // Ignore custom control points and annotations.
    return;
  }
  //fabric.log(obj)
  this._lastObject = obj;
};

SelectionTool.prototype._checkLastObject = function (removedObj) {
  if (removedObj === this._lastObject) {
    var remainingObjects = this.canvas.getObjects();
    if (!!remainingObjects[remainingObjects.length - 1].dim) {
      this._lastObject = remainingObjects[remainingObjects.length - 3];
    } else {
      this._lastObject = remainingObjects[remainingObjects.length - 1];
    }
  }
};

module.exports = SelectionTool;
