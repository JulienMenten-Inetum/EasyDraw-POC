var $ = require("jquery");
var inherit = require("../inherit");
var BasicButton = require("./basic-button");

function StrokeButton(options, ui, drawingTool, extraClasses) {
  BasicButton.call(this, options, ui, drawingTool, extraClasses);
}

inherit(StrokeButton, BasicButton);

StrokeButton.prototype.setColor = function (color) {
  let tmp_color = color || undefined;

  if (tmp_color === undefined || this.isColorWhite(color)) {
    $("#stroke_color_bar").css("fill", "#fff");

    $("#stroke_color_bar").attr("stroke", "#545454");
  } else {
    $("#stroke_color_bar").css("fill", tmp_color);

    $("#stroke_color_bar").attr("stroke", "none");
  }
};

StrokeButton.prototype.isColorWhite = function (color) {
  return color === "#fff" || color === "#ffffffff";
};

module.exports = StrokeButton;
