const TextTool = require("../tools/shape-tools/text-tool");
var fabric = require('fabric').fabric;

function calculatePointOnLine(point1, point2, distance,width) {
  const midpointX = (point1[0] + point2[0]) / 2;
  const midpointY = (point1[1] + point2[1]) / 2;

  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  const unitX = dx / magnitude;
  const unitY = dy / magnitude;

  const offsetX = unitY * distance;
  const offsetY = -unitX * distance;

    const textOffsetX = unitX * (width / 2) // / magnitude;
    const textOffsetY = unitY * (width / 2) // / magnitude;

  const x = midpointX + offsetX - textOffsetX;
  const y = midpointY + offsetY - textOffsetY;

  return [x, y];
}



(function() {

  'use strict';

  var extend = fabric.util.object.extend;

  if (fabric.Arrow) {
    fabric.warn('fabric.Arrow is already defined');
    return;
  }

  /**
   * Arrow class
   * @class fabric.Arrow
   * @extends fabric.Line
   * @see {@link fabric.Arrow#initialize} for constructor definition
   */
  fabric.Arrow = fabric.util.createClass(fabric.Line, /** @lends fabric.Arrow.prototype */ {

    /**
     * Type of an object
     * @type String
     * @default
     */
    type: 'arrow',

    /**
     * Type of the arrow (double or single)
     * @type Boolean
     * @default
     */
    doubleArrowhead: false,
    text: null,

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function(ctx) {
      ctx.beginPath();

      var isInPathGroup = this.group && this.group.type === 'path-group';
      if (isInPathGroup && !this.transformMatrix) {
        //  Line coords are distances from left-top of canvas to origin of line.
        //
        //  To render line in a path-group, we need to translate them to
        //  distances from center of path-group to center of line.
        var cp = this.getCenterPoint();
        ctx.translate(
          -this.group.width/2 + cp.x,
          -this.group.height / 2 + cp.y
        );
      }
      if(this.isDimension){
       // if (!this.strokeDashArray) {
          // Move from center (of virtual box) to its left/top corner,
          // we can't assume x1, y1 is top left and x2, y2 is bottom right.
          var xMult = this.x1 <= this.x2 ? -1 : 1,
              yMult = this.y1 <= this.y2 ? -1 : 1;

          // Arrow start point.
          var xs = this.width === 1 ? 0 : (xMult * this.width / 2),
              ys = this.height === 1 ? 0 : (yMult * this.height / 2);
          // Arrow end point.
          var xe = this.width === 1 ? 0 : (xMult * -1 * this.width / 2),
              ye = this.height === 1 ? 0 : (yMult * -1 * this.height / 2);
          // Helper variables.
          var dx = xe - xs,
              dy = ye - ys,
              l = Math.sqrt(dx * dx + dy * dy);
          // Arrow width.
          var s = this.strokeWidth * 0.5;
          // Arrowhead width.
          var ls = Math.min(s * 3, l * (this.doubleArrowhead ? 0.21 : 0.35));
          // Arrowhead length.
          var ahlx = ls * 2 * dx / l,
              ahly = ls * 2 * dy / l;
          var mx = s  * dx / l,
              my = s  * dy / l;
          // Arrowhead position 1 (points close to the line).
          var xm1 = xe - ahlx,
              ym1 = ye - ahly;
          // Arrowhead position 2 (the most outer points).
          var xm2 = xe - ahlx * 1.0,
              ym2 = ye - ahly * 1.0;
          // Outline of the arrow.
          var points;
          if (!this.doubleArrowhead) {
            points = [
              this._perpCoords(xs, ys, xe, ye, xs, ys, s * 0.5, 1),
              this._perpCoords(xs, ys, xe, ye, xs, ys, s * 0.5, -1),
            ];
          } else {
            // Second arrowhead.
            var xm3 = xs + ahlx,
                ym3 = ys + ahly;
            var xm4 = xs + ahlx * 1.0,
                ym4 = ys + ahly * 1.0;
            var xm5 = xs,
                ym5 = ys;
            var xm6 = xs -mx,
                ym6 = ys - my;
            var xm7 = xe,
                ym7 = ye;
            var xm8 = xe + mx,
                ym8 = ye + my;

            points = [
                this._perpCoords(xs, ys, xe, ye, xm3, ym3, s, 1),
                this._perpCoords(xs, ys, xe, ye, xm4, ym4, ls, 1),
                [xs, ys],
                this._perpCoords(xs, ys, xe, ye, xm5, ym5, ls*5, 1),
                this._perpCoords(xs, ys, xe, ye, xm6, ym6, ls*5, 1),
                this._perpCoords(xs, ys, xe, ye, xm6, ym6, ls*2, -1),
                this._perpCoords(xs, ys, xe, ye, xm5, ym5, ls*2, -1),
                [xs, ys],
                this._perpCoords(xs, ys, xe, ye, xm4, ym4, ls, -1),
                this._perpCoords(xs, ys, xe, ye, xm3, ym3, s, -1),
            ];
          }
          // Common part of the outline.
          points.push(
              this._perpCoords(xs, ys, xe, ye, xm1, ym1, s, -1),
              this._perpCoords(xs, ys, xe, ye, xm2, ym2, ls, -1),
              [xe, ye],
              this._perpCoords(xs, ys, xe, ye, xm7, ym7, ls*5, 1),
              this._perpCoords(xs, ys, xe, ye, xm8, ym8, ls*5, 1),
              this._perpCoords(xs, ys, xe, ye, xm8, ym8, ls*2, -1),
              this._perpCoords(xs, ys, xe, ye, xm7, ym7, ls*2, -1),
              [xe, ye],
              this._perpCoords(xs, ys, xe, ye, xm2, ym2, ls, 1),
              this._perpCoords(xs, ys, xe, ye, xm1, ym1, s, 1)
          );

          ctx.moveTo(points[0][0], points[0][1]);
          points.forEach(function (p) {
            ctx.lineTo(p[0], p[1]);
          });


          var angleDeg = Math.atan2(this.y2 - this.y1, this.x2 - this.x1) * 180 / Math.PI;
          var xc = (this.x1 + this.x2) / 2
          var yc = (this.y1 + this.y2) / 2
          if (!this.text) {
              this.rect =  new fabric.Rect({
                  width: 0,
                  height: 0,
                  left: this.canvas.width/2,
                  top: this.canvas.height/2,
                  fill: 'rgba(255,255,255,0.9)',
                  isDimensionRect: true,
                  selectable: false,

              });
                this.text = new fabric.IText(this.dim, {
                  left: (this.canvas.width-50)/2,
                  top: (this.canvas.height-50)/2,
                  lockUniScaling: true,
                  fontFamily: 'Lato, Arial, Helvetica, sans-serif',
                  fontSize: 30,
                  // Yes, looks strange, but I guess stroke color should be used (as it would be the "main" one).
                  fill: '#000000',
                  angle: angleDeg,
                  isDimensionText: true,
                  textBackgroundColor: "white",
                  selectable: false,
                });
                this.canvas.add(this.rect);
                this.canvas.add(this.text);

          } else {
              let text_width = this.text.width
              let distance = -20
            let additional = 0
            if(angleDeg <= -90 ){
              additional = 180
                distance = -40
                text_width = -text_width
            } else if(angleDeg <= -90){
              additional = 0
            }else if(angleDeg <= 45){
              additional = 0
            } else if(angleDeg <= 90){
              additional = 0
            } else if(angleDeg <= 135){
              additional = 180
                distance = -40
                text_width = -text_width
            } else if(angleDeg <= 180){
              additional = 180
                distance = -40
                text_width = -text_width
            }
            let result = calculatePointOnLine([this.x1,this.y1], [this.x2,this.y2], distance, text_width);
            let dist = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
            this.text.left = result[0]
            this.text.top = result[1]
            this.text.angle = angleDeg + additional;
            this.rect.top = this.y1
            this.rect.left = this.x1
            //fabric.log(angleDeg,result)
            this.rect.angle = angleDeg
            this.rect.width = dist
            //this.strokeDashArray = null
            //this.type = null
          }
        //}

        if (this.stroke) {
          // Note that we actually use fill instead of stroke.
          // Stroke width is included in outline calulcations above.
          var origFillStyle = ctx.fillStyle;
          ctx.fillStyle = this.stroke;
          this._renderFill(ctx);
          ctx.fillStyle = origFillStyle;
        }

      } else {
          //fabric.log('arr',this)
        //if (!this.strokeDashArray) {
          // Move from center (of virtual box) to its left/top corner,
          // we can't assume x1, y1 is top left and x2, y2 is bottom right.
          var xMult = this.x1 <= this.x2 ? -1 : 1,
              yMult = this.y1 <= this.y2 ? -1 : 1;

          // Arrow start point.
          var xs = this.width === 1 ? 0 : (xMult * this.width / 2),
              ys = this.height === 1 ? 0 : (yMult * this.height / 2);
          // Arrow end point.
          var xe = this.width === 1 ? 0 : (xMult * -1 * this.width / 2),
              ye = this.height === 1 ? 0 : (yMult * -1 * this.height / 2);
          // Helper variables.
          var dx = xe - xs,
              dy = ye - ys,
              l  = Math.sqrt(dx * dx + dy * dy);
          // Arrow width.
          var s = this.strokeWidth * 0.5;
          // Arrowhead width.
          var ls = Math.min(s * 3, l * (this.doubleArrowhead ? 0.21 : 0.35));
          // Arrowhead length.
          var ahlx = ls * 2 * dx / l,
              ahly = ls * 2 * dy / l;
          // Arrowhead position 1 (points close to the line).
          var xm1 = xe - ahlx,
              ym1 = ye - ahly;
          // Arrowhead position 2 (the most outer points).
          var xm2 = xe - ahlx * 1.1,
              ym2 = ye - ahly * 1.1;

          // Outline of the arrow.
          var points;
          if (!this.doubleArrowhead) {
            points = [
              this._perpCoords(xs, ys, xe, ye, xs, ys, s * 0.5, 1),
              this._perpCoords(xs, ys, xe, ye, xs, ys, s * 0.5, -1),
            ];
          } else {
            // Second arrowhead.
            var xm3 = xs + ahlx,
                ym3 = ys + ahly;
            var xm4 = xs + ahlx * 1.1,
                ym4 = ys + ahly * 1.1;
            points = [
              this._perpCoords(xs, ys, xe, ye, xm3, ym3, s, 1),
              this._perpCoords(xs, ys, xe, ye, xm4, ym4, ls, 1),
              [xs, ys],
              this._perpCoords(xs, ys, xe, ye, xm4, ym4, ls, -1),
              this._perpCoords(xs, ys, xe, ye, xm3, ym3, s, -1),
            ];
          }
          // Common part of the outline.
          points.push(
              this._perpCoords(xs, ys, xe, ye, xm1, ym1, s, -1),
              this._perpCoords(xs, ys, xe, ye, xm2, ym2, ls, -1),
              [xe, ye],
              this._perpCoords(xs, ys, xe, ye, xm2, ym2, ls, 1),
              this._perpCoords(xs, ys, xe, ye, xm1, ym1, s, 1)
          );

          ctx.moveTo(points[0][0], points[0][1]);
          points.forEach(function (p) {
            ctx.lineTo(p[0], p[1]);
          });
        }

        if (this.stroke) {
          // Note that we actually use fill instead of stroke.
          // Stroke width is included in outline calulcations above.
          var origFillStyle = ctx.fillStyle;
          ctx.fillStyle = this.stroke;
          this._renderFill(ctx);
          ctx.fillStyle = origFillStyle;
        }
     // }


    },

    /**
     * @private
     * Given coordinates of segment AB and point X, returns coordinates
     * of point C where CX is prependicular to AB and |CX| = l.
     */
    _perpCoords: function (xa, ya, xb, yb, x, y, l, dir) {
      var dx = xb - xa,
          dy = yb - ya,
          k = l / Math.sqrt(dx * dx + dy * dy);
      return [x + k * -dy * dir, y + k * dx * dir];
    },

    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject: function(propertiesToInclude) {
      const extraProperties = {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        doubleArrowhead: this.get('doubleArrowhead')
      }
      return extend(this.callSuper('toObject', propertiesToInclude), extraProperties);
    }

    // WARN:
    // Note that #toSVG now returns LINE representation (as it's not overwritten).
    // The same applies to #complexity (TODO: what is it used for?).
  });

  // WARN:
  // Note that deserialization from SVG element expects LINE element. See above.

  /* _FROM_SVG_START_ */
  /**
   * List of attribute names to account for when parsing SVG element (used by {@link fabric.Arrow.fromElement})
   * @static
   * @memberOf fabric.Arrow
   * @see http://www.w3.org/TR/SVG/shapes.html#LineElement
   */
  fabric.Arrow.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat('x1 y1 x2 y2'.split(' '));

  /**
   * Returns fabric.Arrow instance from an SVG element
   * @static
   * @memberOf fabric.Arrow
   * @param {SVGElement} element Element to parse
   * @param {Object} [options] Options object
   * @return {fabric.Arrow} instance of fabric.Arrow
   */
  fabric.Arrow.fromElement = function(element, options) {
    var parsedAttributes = fabric.parseAttributes(element, fabric.Line.ATTRIBUTE_NAMES),
        points = [
          parsedAttributes.x1 || 0,
          parsedAttributes.y1 || 0,
          parsedAttributes.x2 || 0,
          parsedAttributes.y2 || 0
        ];
    return new fabric.Arrow(points, extend(parsedAttributes, options));
  };
  /* _FROM_SVG_END_ */

  /**
   * Returns fabric.Arrow instance from an object representation
   * @static
   * @memberOf fabric.Arrow
   * @param {Object} object Object to create an instance from
   * @return {fabric.Arrow} instance of fabric.Arrow
   */
  fabric.Arrow.fromObject = function(object, callback) {
    object.points = [object.x1, object.y1, object.x2, object.y2];
    return fabric.Object._fromObject('Arrow', object, callback, 'points');
  };

})();
