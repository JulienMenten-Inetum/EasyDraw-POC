var fabric    = require('fabric').fabric;
var inherit   = require('../../inherit');
var ShapeTool = require('../shape-tool');
var Util      = require('../../util');



function PolygonDrawTool(name, drawTool, type) {
  ShapeTool.call(this, name, drawTool);

  this._shapeKlass = fabric.util.getKlass('polygon');
  this.points = [];
  // this.max = {x: 0, y:0}
  // this.min = {x: 0, y:0}

}

inherit(PolygonDrawTool, ShapeTool);
PolygonDrawTool.prototype.deactivate = function () {
  PolygonDrawTool.super.deactivate.call(this);
  if(this.points.length > 0){
    this.curr.initialize(this.points, {})
    this.curr.setCoords()
    this._processNewShape(this.curr);
    this.canvas.renderAll();
    this.actionComplete(this.curr);
    this.curr = undefined;
    this.points = [];
    if(!!this.p_circle){
      this.canvas.remove(this.p_circle)
    }
    }
  this.master.pushToHistory();
  //this.master.workAround1()
};

PolygonDrawTool.prototype.mouseDown = function (e) {
  PolygonDrawTool.super.mouseDown.call(this, e);
  if (!this.active) { return; }

  var loc = this.canvas.getPointer(e.e);

  var x = loc.x;
  var y = loc.y;

  if(this.points.length > 0 && Util.dist(x - this.points[this.points.length-1].x, y - this.points[this.points.length-1].y) < 10){
    this._processNewShape(this.curr);
    this.curr.initialize(this.points, {})
    this.curr.setCoords()
    this.curr = undefined;
    this.points = [];
    if(!!this.p_circle){
      this.canvas.remove(this.p_circle)
    }
    this.master.pushToHistory();
  } else{
    this.points.push({x:x,y:y});

    if(!this.curr) {
      this.originX = x;
      this.originY = y;
      this.curr = new this._shapeKlass(this.points, {
        top: this.originY,
        left: this.originX,
        fill: this.master.state.fill,
        stroke: this.master.state.stroke,
        strokeWidth: this.master.state.strokeWidth,
        objectCaching: false,
        width: 0,
        height: 0,
      });
      this.canvas.add(this.curr);
    } else {
      //this.curr.initialize(this.points, {})
      this.curr.setCoords()
      //this.curr.set('points', this.points);
      this.endPolygon(x,y)
      this.canvas.dirty = true;
      this.canvas.renderAll();
    }
  }

};

PolygonDrawTool.prototype.mouseMove = function (e) {
  PolygonDrawTool.super.mouseMove.call(this, e);

};

PolygonDrawTool.prototype.endPolygon = function (x,y) {
  if(!!this.p_circle){
    this.canvas.remove(this.p_circle)
  }
  this.p_circle  = new fabric.Circle({
    left:x-5,
    top:y-5,
    radius:5,
    stroke:'blue',
    strokeWidth:0,
    fill:'#ca13e7',
  });
  this.canvas.add(this.p_circle);
}

function sign(num) {
  return num >= 0 ? 1 : -1;
}

PolygonDrawTool.prototype.mouseUp = function (e) {

};

PolygonDrawTool.prototype._processNewShape = function (s) {
  s.setCoords()
};

module.exports = PolygonDrawTool;
