var $ = require("jquery");
var inherit = require("../inherit");
var BasicButton = require("./basic-button");

function LineWidthButton(options, ui, drawingTool, extraClasses) {
  options.onClick = function () {
    this.dt.setStrokeWidth(options.width);
    this.dt.setSelectionStrokeWidth(options.width);
    if (options.type !== undefined) {
      this.dt.setStrokeType(options.type);
      this.dt.setSelectionStrokeType(options.type);
    }
  };
  options.onStateChange = function (state) {
    //fabric.log('state:',state.strokeDashArray)
    //fabric.log('options:',options.type)
    if (
      state.strokeWidth === options.width &&
      !!state.strokeDashArray === !!options.type
    ) {
      this.$element.addClass("dt-active");
    } else {
      this.$element.removeClass("dt-active");
    }
  };
  BasicButton.call(this, options, ui, drawingTool, extraClasses);
}

inherit(LineWidthButton, BasicButton);

module.exports = LineWidthButton;
