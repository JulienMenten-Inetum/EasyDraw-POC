var $ = require("jquery");
var inherit = require("../inherit");
var BasicButton = require("./basic-button");

function StrokeButton(options, ui, drawingTool, extraClasses) {
  BasicButton.call(this, options, ui, drawingTool, extraClasses);
}

inherit(StrokeButton, BasicButton);

StrokeButton.prototype.setColor = function (color) {
  color = color || "none";

  $("#stroke_color_bar").css("fill", color);
  if (color === "none" || color === "#fff") {
    $("#stroke_color_bar").attr("stroke", "#545454");
  } else {
    $("#stroke_color_bar").attr("stroke", "none");
  }
};

module.exports = StrokeButton;
