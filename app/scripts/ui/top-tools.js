var $ = require("jquery");
var inherit = require("../inherit");
const BasicButton = require("./basic-button");
const Palette = require("./palette");
const uiDefinition = require("./ui-definition.js");

function TopToolBar(drawingTool) {
  this.drawingTool = drawingTool;
  this._palettes = {};
  this._buttons = {};
  // This shows the buttons allowed on the toolbar
  this._paletteActiveButton = {};
  // Creates the new top toolbar
  this.$topToolBar = $("<aside>")
    .addClass("dt-top-toolbar")
    .prependTo(drawingTool.$element);

  this.processUIDefinition(uiDefinition.topToolUi);
  for (var name in this._buttons) {
    var btn = this._buttons[name];
    if (btn.onInit) {
      btn.onInit.call(btn, this, drawingTool);
    }
  }
}

TopToolBar.prototype.processUIDefinition = function (uiDef) {
  let firstMainButton = -1;
  let lastMainButton = -1;
  for (let i = 0; i < uiDef.buttons.length; i++) {
    if (!!uiDef.buttons[i] && uiDef.buttons[i].palette === "main") {
      if (firstMainButton === -1) {
        firstMainButton = i;
      } else {
        lastMainButton = i;
      }
    }
  }
  //this.$topToolBar.empty();
  uiDef.palettes.forEach(this._createPalette.bind(this));
  uiDef.buttons.forEach((button, index) => {
    this._createButton(button, index, firstMainButton, lastMainButton);
  });
};

TopToolBar.prototype._createButton = function (buttonOptions) {
  let BtnClass = buttonOptions.buttonClass || BasicButton;
  let button = new BtnClass(buttonOptions, this, this.drawingTool, "");

  let buttonName = button.name;
  this._buttons[buttonName] = button;

  this._setupPaletteActiveButton(button);
};

TopToolBar.prototype._setupPaletteActiveButton = function (button) {
  if (!this._paletteActiveButton[button.palette]) {
    // This will first button added to palette as "active" palette button.
    this._paletteActiveButton[button.palette] = button;
  }
  button.$element.on(
    "mousedown touchstart",
    function () {
      // This will update "active" palette button during every click / touch.
      this._paletteActiveButton[button.palette] = button;
    }.bind(this)
  );
};

TopToolBar.prototype._createPalette = function (paletteOptions) {
  let palette = new Palette(paletteOptions, this);
  let paletteName = palette.name;
  palette.$element.appendTo(this.$topToolBar);
  this._palettes[paletteName] = palette;
};

TopToolBar.prototype.getPalette = function (name) {
  return this._palettes[name];
};

module.exports = TopToolBar;
