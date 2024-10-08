var StampImageButton = require("./stamp-image-button");

var INSERT_STAMP_AFTER = "text";

function generateStamps(uiDefinition, stampsDefition) {
  if (!stampsDefition) {
    return;
  }
  console.log(stampsDefition);
  // Main stamp button.
  var prevBtnIdx = findButtonIndex(INSERT_STAMP_AFTER, uiDefinition.buttons);
  uiDefinition.buttons.splice(prevBtnIdx + 1, 0, {
    name: "stamp",
    tooltip: "Stamp tool (click and hold to show available categories)",
    classes: "dt-expand dt-img-btn",
    wrapperClasses: "dt-separator-after",
    label: "M",
    palette: "main",
    activatesTool: "stamp",
    onClick: function () {
      this.ui.togglePalette("stampCategories");
    },
    onStampChange: function (newStamp) {
      console.log(newStamp);
      this.$icon.attr("src", newStamp.imgSrc);
    },
    icon: require("../../assets/icons/tools/ico-easydraw-stickers.svg"),
  });

  // Palette with stamp categories.
  uiDefinition.palettes.push({
    name: "stampCategories",
    anchor: "stamp",
    vertical: true,
    extraClasses: "dt-stamps-palette",
    hideOnClick: false,
  });

  // Generate separate palettes with stamp buttons for each category.
  Object.keys(stampsDefition).forEach(function (category) {
    console.log(stampsDefition);

    var categoryBtnName = category + "StampsCategory";
    var categoryPaletteName = category + "StampsPalette";

    var categoryBtn = {
      name: categoryBtnName,
      label: category,
      tooltip: category + " category (click to show available stamps)",
      classes: "dt-text-btn dt-expand",
      wrapperClasses: "dt-text-btn-wrapper",
      palette: "stampCategories",
      onClick: function () {
        this.ui.togglePalette(categoryPaletteName);
      },
    };
    uiDefinition.buttons.push(categoryBtn);

    var categoryPalette = {
      name: categoryPaletteName,
      anchor: categoryBtnName,
      topOffset: -1.5,
      leftOffset: -1.5,
    };
    uiDefinition.palettes.push(categoryPalette);
    var stampButtons = generateStampButtons(
      categoryPaletteName,
      stampsDefition[category]
    );
    stampButtons.forEach(function (stampButton) {
      uiDefinition.buttons.push(stampButton);
    });
  });

  function generateStampButtons(paletteName, imagesArray) {
    var result = [];
    imagesArray.forEach(function (imgSrc) {
      result.push({
        imageSrc: imgSrc,
        buttonClass: StampImageButton,
        palette: paletteName,
      });
    });
    return result;
  }

  function findButtonIndex(name, buttons) {
    for (var i = 0; i < buttons.length; i++) {
      if (!!buttons[i] && buttons[i].name === name) {
        return i;
      }
    }
  }
}

module.exports = generateStamps;
