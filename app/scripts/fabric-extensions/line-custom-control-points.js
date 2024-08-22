const $ = require("jquery");
var fabric = require('fabric').fabric;
var SUPPORTED_TYPES = ["line", "arrow"];

var selectedObject = null;

var straight_angle = $('#straight_angle').val();
var prev_this_left
var prev_this_top

function calculateAngle(x1, y1, x2, y2) {
  // Calculate the differences between the points
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  // Calculate the angle using Math.atan2
  const angleRadians = Math.atan2(deltaY, deltaX);

  // Convert the angle to degrees
  const angleDegrees = angleRadians * (180 / Math.PI);

  // Ensure the angle is positive (between 0 and 360 degrees)
  const positiveAngle = (angleDegrees + 360) % 360;

  return positiveAngle;
}

function lineCustomControlPoints(canvas) {
  // Make sure that listeners aren't added multiple times.
  if (canvas.lineCustomControlPointsEnabled) return;

  canvas.on("object:selected", function (e) {
    var newTarget = e.target
    if (selectedObject && isLine(selectedObject) && !isControlPoint(newTarget, selectedObject)) {
      lineDeselected.call(selectedObject);
    } else if (selectedObject && selectedObject.type == 'polygon' && !isControlPoint(newTarget, selectedObject)) {
      polygonDeselected.call(selectedObject);
    }
    if (!isControlPoint(newTarget, selectedObject)) {
      selectedObject = newTarget;
      if (isLine(newTarget) && !newTarget.annotationId) {
        lineSelected.call(newTarget);
      } else if (newTarget.type == 'polygon' && !newTarget.annotationId){
        polygonSelected.call(newTarget)
      }
    }
  });
  canvas.on("selection:cleared", function (e) {
    var newTarget = e.target
    if (selectedObject && isLine(selectedObject) && !isControlPoint(newTarget, selectedObject)) {
      lineDeselected.call(selectedObject);
    } else if (selectedObject && selectedObject.type == 'polygon' && !isControlPoint(newTarget, selectedObject)) {
      polygonDeselected.call(selectedObject);
    }
    selectedObject = null;
  });
  canvas.lineCustomControlPointsEnabled = true;
}

// Options.
lineCustomControlPoints.controlPointColor = '#bcd2ff';
lineCustomControlPoints.cornerSize = 12;

function isControlPoint(object, line) {
  return line && line._dt_controlPoints && (line._dt_controlPoints[0] === object || line._dt_controlPoints[1] === object);
}

function isLine(object) {
  for (var i = 0; i < SUPPORTED_TYPES.length; i++) {
    if (object.type === SUPPORTED_TYPES[i]) return true;
  }
  return false;
}

// Handlers

function lineSelected() {
  // Disable typical control points.
  this.set({
    hasControls: false,
    hasBorders: false
  });
  // Create custom ones.
  var sidelen = lineCustomControlPoints.cornerSize;
  this._dt_controlPoints = [
    makeControlPoint(sidelen, this, 0),
    makeControlPoint(sidelen, this, 1)
  ];
  this.hasCustomControlPoints = true;
  updateLineControlPoints.call(this);
  this.on('moving', lineMoving);
  this.on('removed', lineDeleted);
  // And finally re-render (perhaps it's redundant).
  this.canvas.renderAll();
}

function lineDeselected() {
  // Very important - set _dt_sourceObj property to null / undefined,
  // as otherwise control point will remove line as well!
  this._dt_controlPoints[0]._dt_sourceObj = null;
  this._dt_controlPoints[1]._dt_sourceObj = null;
  this.canvas.remove(this._dt_controlPoints[1]);
  this.canvas.remove(this._dt_controlPoints[0]);
  this._dt_controlPoints = undefined;
  this.hasCustomControlPoints = false;
  this.off('moving');
  this.off('removed');
}

function polygonSelected() {
  // Disable typical control points.
  this.set({
    hasControls: false,
    hasBorders: false
  });
  // Create custom ones.
  var sidelen = lineCustomControlPoints.cornerSize;
  this._dt_controlPoints = [];
  for(const i in this.points){
    this._dt_controlPoints.push(makeControlPoint(sidelen, this, i));
  }

  this.hasCustomControlPoints = true;
  prev_this_left = this.left
  prev_this_top = this.top
  updatePolygonControlPoints.call(this);
  this.on('moving', polygonMoving);
  this.on('removed', polygonDeleted);
  // And finally re-render (perhaps it's redundant).
  this.canvas.renderAll();

}

function polygonDeselected() {
  fabric.log('polygonDeselected')
  // Very important - set _dt_sourceObj property to null / undefined,
  // as otherwise control point will remove line as well!
  let add_left = (prev_this_left-this.left)*-1
  let add_top = (prev_this_top-this.top)*-1
  for(const i in this.points) {
    this.points[i].x += add_left
    this.points[i].y += add_top
    // this.left = prev_this_left
    // this.top = prev_this_top
    this._dt_controlPoints[i]._dt_sourceObj = null;
    this.canvas.remove(this._dt_controlPoints[i]);
  }
  this.initialize(this.points,{})
    this.hasCustomControlPoints = false;
    this.off('moving');
    this.off('removed');
  prev_this_left = null
  prev_this_top = null
}

function lineMoving() {
  updateLineControlPoints.call(this);
}
function polygonMoving() {
  updatePolygonControlPoints.call(this);
}



function lineDeleted() {
  // Do nothing if there are no control points.
  if (!this._dt_controlPoints) return;
  // If there are some, just remove one of them
  // It will cause that the second one will be removed as well.
  this._dt_controlPoints[0].remove();
}

function polygonDeleted() {
  // Do nothing if there are no control points.
  if (!this._dt_controlPoints) return;
  // If there are some, just remove one of them
  // It will cause that the second one will be removed as well.
  for(const i in this.points) {
    this._dt_controlPoints[i].remove();
  }
}

function controlPointMoving() {
  if(this._dt_sourceObj.type == 'polygon'){
    var polygon = this._dt_sourceObj;
    var id = this.id
    polygon.points[id] = {
        x: this.left,
        y: this.top
    }
    //polygon.initialize(polygon.points,{})
    polygon.setCoords()
  } else {
    var line = this._dt_sourceObj;
    let id = (this.id == 0)?1:0
    var ang = calculateAngle(this.left,this.top,line._dt_controlPoints[id]._dt_sourceObj.left,line._dt_controlPoints[id]._dt_sourceObj.top);
    var straightx = false;
    var straighty = false;
    if(!straight_angle){
      straight_angle = 3
    }
    straight_angle = parseFloat(straight_angle)
    if(!!straight_angle){
      if((ang < (0+straight_angle)) || (ang > (360-straight_angle))){
        straightx = true;
      } else if((ang > (90 - straight_angle)) && (ang < (90 + straight_angle))){
        straighty = true;
      } else if((ang > (180 - straight_angle)) && (ang < (180 + straight_angle))){
        straightx = true;
      } else if((ang > (270 - straight_angle)) && (ang < (270 + straight_angle))){
        straighty = true;
      } else {
        straighty = false
      }
    }

    let xx = line._dt_controlPoints[id]._dt_sourceObj.left
    let yy = line._dt_controlPoints[id]._dt_sourceObj.top
    var x = (straighty)?xx:this.left;
    var y = (straightx)?yy:this.top;

    line.set('x' + (this.id + 1), x);
    line.set('y' + (this.id + 1), y);
    line.setCoords();
    line.canvas.renderAll();
  }
}

function controlPointMoved(e) {
}

function controlPointDeleted() {
  var line = this._dt_sourceObj;
  // Do nothing if there is no reference to source object (line).
  if (!line) return;
  // Otherwise try to remove second point and finally canvas.
  var secondControlPoint;
  if (line._dt_controlPoints[0] !== this) {
    secondControlPoint = line._dt_controlPoints[0];
  } else {
    secondControlPoint = line._dt_controlPoints[1];
  }
  secondControlPoint.line = null;
  secondControlPoint.remove();
  line.remove();
}

// Helpers

function updateLineControlPoints() {
  translateLineCoords.call(this);
  rotateLineCoords.call(this);
  this._dt_controlPoints[0].set('left', this.get('x1'));
  this._dt_controlPoints[0].set('top', this.get('y1'));
  this._dt_controlPoints[1].set('left', this.get('x2'));
  this._dt_controlPoints[1].set('top', this.get('y2'));
  this._dt_controlPoints[0].setCoords();
  this._dt_controlPoints[1].setCoords();
}
function updatePolygonControlPoints() {
  let move_left = (prev_this_left-this.left)*-1
  let move_top = (prev_this_top-this.top)*-1

  for(const i in this.points){
    this._dt_controlPoints[i].set('left', this.points[i].x + move_left) //- (this.left - prev_this_left)*-1);
    this._dt_controlPoints[i].set('top', this.points[i].y + move_top) //- (this.top - prev_this_top)*-1);
    this._dt_controlPoints[i].setCoords();
  }

  // this.set({
  //   width: maxX - minX,
  //   height: maxY - minY,
  //   originX: 'center',
  //   originY: 'center',
  // })
  // this.setCoords()
}

function getMinMax(points) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

// Iterate over the points to find the min and max of x and y
  points.forEach(point => {
    if (point.x < minX) {
      minX = point.x;
    }
    if (point.x > maxX) {
      maxX = point.x;
    }
    if (point.y < minY) {
      minY = point.y;
    }
    if (point.y > maxY) {
      maxY = point.y;
    }
  });
  return {
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY
  }
}
function translateLineCoords() {
  // It's a bit confusing part of FabricJS. Basically line has (x1, y1), (x2, y2) coordinates
  // and (top, left). When line is moved, only (top, left) are updated. Update rest of
  // coordinates too. Note that there is an assumption that the line has central origin!
  var centerX = this.get('x1') + (this.get('x2') - this.get('x1')) * 0.5;
  var centerY = this.get('y1') + (this.get('y2') - this.get('y1')) * 0.5;
  var dx = this.left - centerX;
  var dy = this.top  - centerY;
  this.set('x1', dx + this.x1);
  this.set('y1', dy + this.y1);
  this.set('x2', dx + this.x2);
  this.set('y2', dy + this.y2);
}

function rotateLineCoords() {
  // Set angle to 0 and apply transform to (x1, y1), (x2, y2). We could also
  // apply this transformation to control points instead. However if we reset
  // line rotation, conversion will have to be applies only once.
  if (this.get('angle') === 0) return;
  var angle = this.get('angle') / 180 * Math.PI;
  var originX = this.get('left');
  var originY = this.get('top');
  var newA = rot(this.get('x1'), this.get('y1'), originX, originY, angle);
  var newB = rot(this.get('x2'), this.get('y2'), originX, originY, angle);
  this.set({
    x1: newA[0],
    y1: newA[1],
    x2: newB[0],
    y2: newB[1],
    angle: 0
  });

  function rot(px, py, ox, oy, theta) {
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    return [
      cos * (px - ox) - sin * (py - oy) + ox,
      sin * (px - ox) + cos * (py - oy) + oy
    ];
  }
}

function makeControlPoint(s, source, i) {
  var point = new fabric.Rect({
    width: s,
    height: s,
    strokeWidth: 0,
    stroke: lineCustomControlPoints.controlPointColor,
    fill: lineCustomControlPoints.controlPointColor,
    hasControls: false,
    hasBorders: false,
    originX: 'center',
    originY: 'center',
    // Custom properties:
    _dt_sourceObj: source,
    id: i,
    isControlPoint: true
  });
  source.canvas.add(point);
  point.on("moving", controlPointMoving);
  point.on("moved", controlPointMoved);
  point.on("removed", controlPointDeleted);
  return point;
}

module.exports = lineCustomControlPoints;
