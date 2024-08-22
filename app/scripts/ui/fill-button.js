var $ = require("jquery");
var inherit = require("../inherit");
var BasicButton = require("./basic-button");

function FillButton(options, ui, drawingTool) {
  BasicButton.call(this, options, ui, drawingTool);
  this.setColor(undefined);
}

inherit(FillButton, BasicButton);

FillButton.prototype.setColor = function (color) {
  let tmp_color = color || undefined;

  if (tmp_color === undefined || tmp_color === "#fff") {
    $("#fill_color_bar").css("fill", "#fff");

    $("#fill_color_bar").attr("stroke", "#545454");
  } else {
    $("#fill_color_bar").css("fill", tmp_color);

    $("#fill_color_bar").attr("stroke", "none");
  }
};

module.exports = FillButton;
