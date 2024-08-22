var $ = require('jquery');
var fabric = require('fabric').fabric;
var inherit = require('../../inherit');
var ShapeTool = require('../shape-tool');
var SelectTool = require('../select-tool');
var Util = require('../../util');
var lineCustomControlPoints = require('../../fabric-extensions/line-custom-control-points');
require('../../fabric-extensions/arrow');

var straight_angle = $('#straight_angle').val();

// Note that this tool supports fabric.Line and all its subclasses (defined
// as part of this code base, not FabricJS itself). Pass 'lineType' argument
// (e.g. "line" or "arrow").

function LineTool(name, drawTool, lineType, lineOptions) {
    ShapeTool.call(this, name, drawTool);
    this._drawingTool = drawTool;
    lineType = lineType || 'line';
    this._lineKlass = fabric.util.getKlass(lineType);
    this._lineOptions = lineOptions;
    lineCustomControlPoints(this.canvas);

}

inherit(LineTool, ShapeTool);

LineTool.prototype.mouseDown = function (e) {
    straight_angle = $('#straight_angle').val();
    //fabric.log("mouse down");
    LineTool.super.mouseDown.call(this, e);
    //fabric.log("Active", this.active)
    if (!this.active) return;

    var loc = this.canvas.getPointer(e.e);
    var x = loc.x;
    var y = loc.y;

    this.curr = new this._lineKlass([x, y, x, y], $.extend(true, {
        originX: 'center', // important due to custom line control points!
        originY: 'center',
        selectable: false,
        stroke: this.master.state.stroke,
        strokeWidth: this.master.state.strokeWidth,
        strokeDashArray: this.master.state.strokeDashArray,
        objectCaching: false,
    }, this._lineOptions));
    this.canvas.add(this.curr);
};
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

LineTool.prototype.mouseMove = function (e) {
    LineTool.super.mouseMove.call(this, e);
    if (this.down === false) {
        return;
    }

    var loc = this.canvas.getPointer(e.e);

    var ang = calculateAngle(this.curr.x1,this.curr.y1,loc.x,loc.y);
    var straightx = false;
    var straighty = false;
    if(!straight_angle){
        straight_angle = 3
    }
    straight_angle = parseFloat(straight_angle)
    if(!!straight_angle){
        if((ang < (0+straight_angle)) || (ang > (360-straight_angle))){
            //fabric.log('xpos')
            straightx = true;
        } else if((ang > (90 - straight_angle)) && (ang < (90 + straight_angle))){
            //fabric.log('yneg')
            straighty = true;
        } else if((ang > (180 - straight_angle)) && (ang < (180 + straight_angle))){
            //fabric.log('xneg')
            straightx = true;
        } else if((ang > (270 - straight_angle)) && (ang < (270 + straight_angle))){
            //fabric.log('yneg')
            straighty = true;
        } else {
            straighty = false
        }
    }

    //fabric.log(straight_angle,ang,straightx,straighty,ang > (90 - straight_angle),ang < (90 + straight_angle))
    var x = (straighty)?this.curr.x1:loc.x;
    var y = (straightx)?this.curr.y1:loc.y;
    // var x = loc.x
    // var y = loc.y
    this.curr.set('x2', x);
    this.curr.set('y2', y);
    this.canvas.renderAll();

};

LineTool.prototype.mouseUp = function (e) {
    //fabric.log('this.curr',this.curr)
    //fabric.log(lineDown)
        LineTool.super.mouseUp.call(this, e);
        this._processNewShape(this.curr);
        this.canvas.renderAll();
        this.actionComplete(this.curr);
        this.curr = undefined;
        this.master.pushToHistory();
        if (!!this._lineOptions && !!this._lineOptions.isDimension) {
            this._drawingTool.chooseTool('select')
        }

};

LineTool.prototype._processNewShape = function (s) {
    var x1 = s.get('x1');
    var y1 = s.get('y1');
    var x2 = s.get('x2');
    var y2 = s.get('y2');
    if (Util.dist(x1 - x2, y1 - y2) < this.minSize) {
        x2 = x1 + this.defSize;
        y2 = y1 + this.defSize;
        s.set('x2', x2);
        s.set('y2', y2);
    }
    s.setCoords();
    //fabric.log(s)
};

module.exports = LineTool;
