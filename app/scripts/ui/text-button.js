var $ = require("jquery");
var inherit = require("../inherit");
var BasicButton = require("./basic-button");

function TextButton(options, ui, drawingTool, extraClasses) {
  BasicButton.call(this, options, ui, drawingTool, extraClasses);

  this.$element.addClass("dt-text-button");
  this.$textSize = $("<span>")
    .addClass("dt-text-size-label")
    .html(0)
    .appendTo(this.$element);
}

inherit(TextButton, BasicButton);

TextButton.prototype.setTextSize = function (textSize) {
  this.$textSize.html(textSize);
};

module.exports = TextButton;
