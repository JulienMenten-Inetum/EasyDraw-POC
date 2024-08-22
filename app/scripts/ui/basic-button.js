var $ = require("jquery");
require("../jquery-longpress");

// Note that we use 'mousedown touchstart' everywhere. It's pretty important,
// as 'click' could interfere with palette auto-hide feature (as it hides on
// 'mousedown'). Also, it simplifies scenarios for touch devices,
// as 'mousedown' occurs in the same moment as 'touchstart'.

function BasicButton(options, ui, drawingTool, extraClasses) {
  this.ui = ui;
  this.dt = drawingTool;
  this.name = options.name;
  this.palette = options.palette;
  // Note that this will be called later by UI manager.
  this.onInit = options.onInit;
  this._locked = false;

  this.icon = options.icon && options.icon.default;
  this.show_label = options.show_label || false;
  this.$btnWrapper = $("<div>")
    .addClass("dt-btn-wrapper")
    .addClass(options.wrapperClasses)
    .appendTo(ui.getPalette(options.palette).$element);
  if (options.sb == "picker-stroke") {
    this.$element = $("<button>")
      .addClass("dt-btn")
      .addClass("color-picker")
      .addClass("color-picker-stroke")
      .appendTo(this.$btnWrapper);
  } else if (options.sb == "picker-fill") {
    this.$element = $("<button>")
      .addClass("dt-btn")
      .addClass("color-picker")
      .addClass("color-picker-fill")
      .appendTo(this.$btnWrapper);
  } else {
    this.$element = $("<button>")
      .addClass("dt-btn")
      .addClass(options.classes)
      .addClass(extraClasses)
      .attr("title", options.tooltip)
      .appendTo(this.$btnWrapper);
  }

  this.$container = $("<div>")
    .addClass("dt-btn-icon-container")
    .appendTo(this.$element);

  if (this.show_label) {
    this.$label = $("<span>").text(options.name);
    this.getIcon(this.icon).then((svg) => {
      this.$icon = $(svg).attr("class", "icon").appendTo(this.$container);
    });
    this.$label.appendTo(this.$container);
  } else if (this.icon) {
    this.getIcon(this.icon).then((svg) => {
      this.$icon = $(svg).attr("class", "icon").appendTo(this.$container);
    });
  } else {
    this.$container.removeClass("dt-btn-icon-container");
    this.$label = $("<span>").text(options.label).appendTo(this.$container);
  }

  if (options.onClick) {
    this.$element.on(
      "mousedown touchstart",
      function (e) {
        if (this._locked) return;
        options.onClick.call(this, e, ui, drawingTool);
        e.preventDefault();
      }.bind(this)
    );
  }

  if (options.onLongPress) {
    this.$element.longPress(
      function (e) {
        if (this._locked) return;
        options.onLongPress.call(this, e, ui, drawingTool);
        e.preventDefault();
      }.bind(this)
    );
  }

  if (options.onStateChange) {
    drawingTool.on(
      "state:changed",
      function (state) {
        options.onStateChange.call(this, state);
      }.bind(this)
    );
  }

  if (options.onToolChange) {
    drawingTool.on(
      "tool:changed",
      function (state) {
        options.onToolChange.call(this, state);
      }.bind(this)
    );
  }

  if (options.onStampChange) {
    drawingTool.on(
      "stamp:changed",
      function (state) {
        options.onStampChange.call(this, state);
      }.bind(this)
    );
  }

  if (options.activatesTool) {
    this.$element.on(
      "mousedown touchstart",
      function (e) {
        if (this._locked) return;
        drawingTool.chooseTool(options.activatesTool);
        e.preventDefault();
      }.bind(this)
    );

    drawingTool.on(
      "tool:changed",
      function (toolName) {
        //fabric.log('tool changed', toolName, options.activatesTool)
        if (toolName === options.activatesTool) {
          this.$element.addClass("dt-active");
        } else {
          this.$element.removeClass("dt-active");
        }
      }.bind(this)
    );
  }

  if (options.reflectsTools) {
    drawingTool.on(
      "tool:changed",
      function (toolName) {
        if (options.reflectsTools.indexOf(toolName) !== -1) {
          this.setActive(true);
          this.setIcon(ui.getButton(toolName));
        } else {
          this.setActive(false);
          this.$element.removeClass("dt-active");
        }
      }.bind(this)
    );
  }
}

BasicButton.prototype.setIcon = function (tool) {
  if (this.$icon) {
    this.getIcon(tool.icon).then((svg) => {
      this.$icon.remove();
      this.$icon = $(svg).attr("class", "icon").appendTo(this.$container);
    });
  } else {
    //this.$label.text(tool.label);
  }
};

BasicButton.prototype.click = function () {
  // #triggerHandler won't create a native event that bubbles (in contrast
  // to #trigger). Use it as otherwise it could interfere with some other
  // handlers listening to 'mousedown' on window (palette auto-hide feature).
  this.$element.triggerHandler("mousedown");
};

BasicButton.prototype.setActive = function (v) {
  if (v) {
    this.$element.addClass("dt-active");
  } else {
    this.$element.removeClass("dt-active");
  }
};

BasicButton.prototype.setLocked = function (v) {
  if (v) {
    this.$element.addClass("dt-locked");
  } else {
    this.$element.removeClass("dt-locked");
  }
  this._locked = v;
};

BasicButton.prototype.getIcon = function (url) {
  return fetch(url)
    .then((r) => r.text())
    .then((svg) => svg)
    .catch((error) => console.log(error));
};

module.exports = BasicButton;
