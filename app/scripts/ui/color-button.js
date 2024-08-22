var inherit = require("../inherit");
var BasicButton = require("./basic-button");
var pickr = require("../tools/color-picker");

function ColorButton(options, ui, drawingTool, extraClasses) {
  var callback;
  if (options.type === "stroke") {
    callback = function () {
      //fabric.log('stroke')
      if (options.color == "picker") {
        pickr.setColor(this.dt.state.stroke);
        pickr.show();
        pickr.setColorRepresentation("HEX");
        pickr._eventListener.change = [];
        pickr.on("change", (color, source, instance) => {
          let tmp = color.toHEXA().toString();
          this.dt.setStrokeColor(tmp);
          this.dt.setSelectionStrokeColor(tmp);
        });
      } else if (options.color === "pipette") {
      } else {
        this.dt.setStrokeColor(options.color);
        this.dt.setSelectionStrokeColor(options.color);
      }
    };
  } else {
    callback = function () {
      if (options.color == "picker") {
        pickr.setColor(this.dt.state.fill);
        pickr.show();
        pickr.setColorRepresentation("HEX");
        pickr._eventListener.change = [];
        pickr.on("change", (color) => {
          let tmp = color.toHEXA().toString();
          this.dt.setFillColor(tmp);
          this.dt.setSelectionFillColor(tmp);
        });
      } else if (options.color === "pipette") {
      } else if (!!options.gradient) {
        // fabric.log('gradient')
        //this.dt.setFillColor(options.color);
        this.dt.fillGradient(options.from, options.to);
      } else if (!!options.pattern) {
        // fabric.log('pattern')
        //this.dt.setFillColor(options.color);
        this.dt.fillPattern(options.value);
      } else {
        this.dt.setFillColor(options.color);
        this.dt.setSelectionFillColor(options.color);
      }
    };
  }

  options.onClick = callback;
  options.onStateChange = function (state) {
    if (options.type === "stroke") {
      if (state.stroke === options.color) {
        this.$element.addClass("dt-active");
      } else {
        this.$element.removeClass("dt-active");
      }
    } else {
      if (state.fill === options.color) {
        this.$element.addClass("dt-active");
      } else {
        this.$element.removeClass("dt-active");
      }
    }
  };

  BasicButton.call(this, options, ui, drawingTool, extraClasses);
}

inherit(ColorButton, BasicButton);

ColorButton.prototype.setBackground = function (color) {
  if (!color) {
    this.$element.addClass("dt-transparent");
    return;
  }
  this.$element.css("background", color);
};

module.exports = ColorButton;
