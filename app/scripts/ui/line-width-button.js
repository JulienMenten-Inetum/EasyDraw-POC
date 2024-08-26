var $ = require("jquery");
var inherit = require("../inherit");
var BasicButton = require("./basic-button");

function LineWidthButton(options, ui, drawingTool, extraClasses) {
  options.onClick = function () {
    this.dt.setStrokeWidth(options.width);
    this.dt.setSelectionStrokeWidth(options.width);

    const strokeType = options.type === "solid" ? null : options.type;
    this.dt.setStrokeType(strokeType);
    this.dt.setSelectionStrokeType(strokeType);
  };
  options.onStateChange = function (state) {
    //fabric.log('state:',state.strokeDashArray)
    //fabric.log('options:',options.type)
    if (
      state.strokeWidth === options.width &&
      !!state.strokeDashArray === (options.type !== "solid")
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
