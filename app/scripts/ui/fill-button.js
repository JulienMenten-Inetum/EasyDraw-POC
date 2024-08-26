var $ = require("jquery");
var inherit = require("../inherit");
var BasicButton = require("./basic-button");

function FillButton(options, ui, drawingTool) {
  BasicButton.call(this, options, ui, drawingTool);
}

inherit(FillButton, BasicButton);

FillButton.prototype.setColor = function (color) {
  let tmp_color = color || undefined;
  if (color === "" || this.isColorWhite(color)) {
    $("#fill_color_bar").css("fill", "#fff");
    $("#fill_color_bar").attr("stroke", "#545454");
  } else {
    $("#fill_color_bar").css("fill", tmp_color);
    $("#fill_color_bar").attr("stroke", "none");
  }
};

FillButton.prototype.isColorWhite = function (color) {
  return color === "#fff" || color === "#ffffffff";
};

module.exports = FillButton;
