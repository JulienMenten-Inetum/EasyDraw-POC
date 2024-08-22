var Pickr = require("@simonwep/pickr/dist/pickr.es5.min");
var Swatches = require("../services/swatches");

const pickr = Pickr.create({
  el: ".color-picker",
  theme: "nano", // or 'monolith', or 'nano'

  swatches: Swatches.getSwatches(),
  useAsButton: true,
  position: "bottom",
  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,
    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: false,
      hsva: false,
      cmyk: false,
      input: true,
      clear: false,
      save: false,
    },
  },
});

module.exports = pickr;
