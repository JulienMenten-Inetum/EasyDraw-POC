var StrokeButton = require("./stroke-button");
var FillButton = require("./fill-button");
var ColorButton = require("./color-button");
var LineWidthButton = require("./line-width-button");
var SelectedLineWidthButton = require("./selected-line-width-button");
var TextButton = require("./text-button");

var COLORS = [
  {
    value: "",
    icon: require("../../assets/icons/colors/color-none-icon.svg"),
  },
  {
    value: "#3f3f3f",
    icon: require("../../assets/icons/colors/color-black-icon.svg"),
  },
  {
    value: "#fff",
    icon: require("../../assets/icons/colors/color-white-icon.svg"),
  },
  {
    value: "#bfbfbf",
    icon: require("../../assets/icons/colors/color-gray-icon.svg"),
  },
  {
    value: "#eb0000",
    icon: require("../../assets/icons/colors/color-red-icon.svg"),
  },
  {
    value: "#008a00",
    icon: require("../../assets/icons/colors/color-green-icon.svg"),
  },
  {
    value: "#00f",
    icon: require("../../assets/icons/colors/color-blue-icon.svg"),
  },
  {
    value: "#ff8415",
    icon: require("../../assets/icons/colors/color-orange-icon.svg"),
  },
  {
    value: "#ff0",
    icon: require("../../assets/icons/colors/color-yellow-icon.svg"),
  },
  {
    value: "#d100d1",
    icon: require("../../assets/icons/colors/color-purple-icon.svg"),
  },
];

var STROKE_COLORS = [
  {
    value: "",
    icon: require("../../assets/icons/colors/stroke-color-none-icon.svg"),
  },
  {
    value: "#3f3f3f",
    icon: require("../../assets/icons/colors/stroke-color-black-icon.svg"),
  },
  {
    value: "#fff",
    icon: require("../../assets/icons/colors/stroke-color-white-icon.svg"),
  },
  {
    value: "#bfbfbf",
    icon: require("../../assets/icons/colors/stroke-color-gray-icon.svg"),
  },
  {
    value: "#eb0000",
    icon: require("../../assets/icons/colors/stroke-color-red-icon.svg"),
  },
  {
    value: "#008a00",
    icon: require("../../assets/icons/colors/stroke-color-green-icon.svg"),
  },
  {
    value: "#00f",
    icon: require("../../assets/icons/colors/stroke-color-blue-icon.svg"),
  },
  {
    value: "#ff8415",
    icon: require("../../assets/icons/colors/stroke-color-orange-icon.svg"),
  },
  {
    value: "#ff0",
    icon: require("../../assets/icons/colors/stroke-color-yellow-icon.svg"),
  },
  {
    value: "#d100d1",
    icon: require("../../assets/icons/colors/stroke-color-purple-icon.svg"),
  },
];

var GRADIENTS = [
  {
    from: "#7cc3ff",
    to: "#cbe7ff",
    icon: require("../../assets/icons/colors/gradient1.svg"),
  },
];

var PATTERNS = [
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern5.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAFxGAABcRgEUlENBAAAHP2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA5LTA3VDA5OjU4OjI4KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOS0zMFQxMTozOToyNSswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOS0zMFQxMTozOToyNSswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZTVjMDRiYzUtYTBhNC00YTM3LWFhNDAtNmVmY2RhMGVlZjU5IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmIxNDBhOWYtMWUwYS1iYjQ5LTkwMWItMWFiYTE2NmJkN2JjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDgzNzgwYzgtNmM5Yy00MjU0LTk3MDUtMmU4ZjNhMWQ4ZTM5Ij4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmJiMTQwYTlmLTFlMGEtYmI0OS05MDFiLTFhYmExNjZiZDdiYzwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ4Mzc4MGM4LTZjOWMtNDI1NC05NzA1LTJlOGYzYTFkOGUzOSIgc3RFdnQ6d2hlbj0iMjAyMy0wOS0wN1QwOTo1ODoyOCswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU0YTU5Y2M2LWQ1OGMtNDgyNS1iNzg4LTQ1MTMyOGFjNjdlYSIgc3RFdnQ6d2hlbj0iMjAyMy0wOS0xM1QxNjoxMzoyNiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU1YzA0YmM1LWEwYTQtNGEzNy1hYTQwLTZlZmNkYTBlZWY1OSIgc3RFdnQ6d2hlbj0iMjAyMy0wOS0zMFQxMTozOToyNSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI1LjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+M34WlAAAABlJREFUCJlj+P//PwM6xhBAEWQAM4lRiYwBDS9IuKif9G8AAAAASUVORK5CYII=",
  },
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern9.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAACXBIWXMAAFxGAABcRgEUlENBAAAGoGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuYThkNDc1MzQ5LCAyMDIzLzAzLzIzLTEzOjA1OjQ1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuNyAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDktMDdUMDk6NTg6MjgrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA5LTEzVDE2OjEzOjI2KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA5LTEzVDE2OjEzOjI2KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MDg2OTA2ZS1mYTVhLTQyY2EtODY0YS0zNjRiN2QzMjcyMjIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2MTU2YjJjNS1kOGM2LTBlNDQtYTU3My04YTYxYmViMjZkM2QiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkODM3ODBjOC02YzljLTQyNTQtOTcwNS0yZThmM2ExZDhlMzkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ4Mzc4MGM4LTZjOWMtNDI1NC05NzA1LTJlOGYzYTFkOGUzOSIgc3RFdnQ6d2hlbj0iMjAyMy0wOS0wN1QwOTo1ODoyOCswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU0YTU5Y2M2LWQ1OGMtNDgyNS1iNzg4LTQ1MTMyOGFjNjdlYSIgc3RFdnQ6d2hlbj0iMjAyMy0wOS0xM1QxNjoxMzoyNiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjgwODY5MDZlLWZhNWEtNDJjYS04NjRhLTM2NGI3ZDMyNzIyMiIgc3RFdnQ6d2hlbj0iMjAyMy0wOS0xM1QxNjoxMzoyNiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qapH6wAAABZJREFUCB1j+I8bMNBaTkpKiq72oQEA2BvvX4Nj5WgAAAAASUVORK5CYII=",
  },
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern_v5.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAFxGAABcRgEUlENBAAAFxGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA5LTEzVDE2OjE2OjM5KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOS0zMFQxMjowMDoxMiswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOS0zMFQxMjowMDoxMiswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZGM3YzM2ZGUtNjIzZC00MjdkLTgwZjMtMjU4YTgzMzM4M2E5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmQ2ZjFkNzg5LWQ4ODAtNGMxMi1iYWU4LWNiZjBiOGFiZDA5NyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQ2ZjFkNzg5LWQ4ODAtNGMxMi1iYWU4LWNiZjBiOGFiZDA5NyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDZmMWQ3ODktZDg4MC00YzEyLWJhZTgtY2JmMGI4YWJkMDk3IiBzdEV2dDp3aGVuPSIyMDIzLTA5LTEzVDE2OjE2OjM5KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjQuNyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGM3YzM2ZGUtNjIzZC00MjdkLTgwZjMtMjU4YTgzMzM4M2E5IiBzdEV2dDp3aGVuPSIyMDIzLTA5LTMwVDEyOjAwOjEyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6+KmgOAAAAFUlEQVQIHWP4//8/AwgDwX84mwaCAF7BQMBCgLgIAAAAAElFTkSuQmCC",
  },
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern_h5.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAFxGAABcRgEUlENBAAAGVGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA5LTEzVDE2OjE3OjA0KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOS0zMFQxMjowMDowMiswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOS0zMFQxMjowMDowMiswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2Y4OTM3OWYtMDJiZS00NzI4LTlhZDctNDg0MGE1NmQ2OWY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmMwZmM2MmU3LTI0ZWItNDRmYi1iZThmLTVhMDZkYTRjOGI3OSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMwZmM2MmU3LTI0ZWItNDRmYi1iZThmLTVhMDZkYTRjOGI3OSI+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6YzBmYzYyZTctMjRlYi00NGZiLWJlOGYtNWEwNmRhNGM4Yjc5PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzBmYzYyZTctMjRlYi00NGZiLWJlOGYtNWEwNmRhNGM4Yjc5IiBzdEV2dDp3aGVuPSIyMDIzLTA5LTEzVDE2OjE3OjA0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjQuNyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2Y4OTM3OWYtMDJiZS00NzI4LTlhZDctNDg0MGE1NmQ2OWY3IiBzdEV2dDp3aGVuPSIyMDIzLTA5LTMwVDEyOjAwOjAyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OKZlUAAAAGElEQVQIHWP4//8/AzpmwCoIBP8xMNHaAV7BQMAs1RSLAAAAAElFTkSuQmCC",
  },
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern_d5.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAACXBIWXMAAFxGAABcRgEUlENBAAAGVGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA5LTEzVDE2OjMzOjMyKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOS0zMFQxMTo1OTozOSswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOS0zMFQxMTo1OTozOSswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YmRhNDYzZjgtNzFjYS00YWI3LWFlYzktOWY0Yzk2YjlhMjE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU4ZWVlZDA3LTA4OTMtNGZjYi04YThiLTk0YWIyNmIwNDQyZiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU4ZWVlZDA3LTA4OTMtNGZjYi04YThiLTk0YWIyNmIwNDQyZiI+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6NThlZWVkMDctMDg5My00ZmNiLThhOGItOTRhYjI2YjA0NDJmPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NThlZWVkMDctMDg5My00ZmNiLThhOGItOTRhYjI2YjA0NDJmIiBzdEV2dDp3aGVuPSIyMDIzLTA5LTEzVDE2OjMzOjMyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjQuNyAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmRhNDYzZjgtNzFjYS00YWI3LWFlYzktOWY0Yzk2YjlhMjE2IiBzdEV2dDp3aGVuPSIyMDIzLTA5LTMwVDExOjU5OjM5KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5J5OR5AAAAH0lEQVQIHWP4//8/AzIGAkwBMI0uABdEFoDyUQVAGABewUDA3cFGMwAAAABJRU5ErkJggg==",
  },
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern_v15.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAFxGAABcRgEUlENBAAAHMWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA5LTEzVDE2OjE2OjM5KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOS0zMFQxMTo0Mzo0NCswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOS0zMFQxMTo0Mzo0NCswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZGQyNzIxNmItOWFhMC00MjdhLTk2NDQtNTM2YTA1ZDFlODUxIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjIyZjMwMzAtZDU2NS1kZjRkLTlmNTQtN2YyYTRjOWFlZDQzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZDZmMWQ3ODktZDg4MC00YzEyLWJhZTgtY2JmMGI4YWJkMDk3Ij4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDpkNmYxZDc4OS1kODgwLTRjMTItYmFlOC1jYmYwYjhhYmQwOTc8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkNmYxZDc4OS1kODgwLTRjMTItYmFlOC1jYmYwYjhhYmQwOTciIHN0RXZ0OndoZW49IjIwMjMtMDktMTNUMTY6MTY6MzkrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ZGU3NzE0OC05ZWVhLTRjNzctYmQ0Ni0yODMzNDJhZGQyMTAiIHN0RXZ0OndoZW49IjIwMjMtMDktMzBUMTE6NDM6NDQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkZDI3MjE2Yi05YWEwLTQyN2EtOTY0NC01MzZhMDVkMWU4NTEiIHN0RXZ0OndoZW49IjIwMjMtMDktMzBUMTE6NDM6NDQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PikO8dkAAAAcSURBVCgVY/j//z8DLgwE//HKj2oe1TyqmcqaAZkSgppkdskGAAAAAElFTkSuQmCC",
  },
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern_h15.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAFxGAABcRgEUlENBAAAHMWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA5LTEzVDE2OjE3OjA0KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOS0zMFQxMTo0NDozMiswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOS0zMFQxMTo0NDozMiswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWJmOGUyOTItMmJhYi00MDkyLTgyOTktZjE3MjVjNzA1MDJmIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MzQxODkzOGYtYzY2MS01ODQzLTk3MzUtZThjMjhjZWFiN2RiIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzBmYzYyZTctMjRlYi00NGZiLWJlOGYtNWEwNmRhNGM4Yjc5Ij4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDpjMGZjNjJlNy0yNGViLTQ0ZmItYmU4Zi01YTA2ZGE0YzhiNzk8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjMGZjNjJlNy0yNGViLTQ0ZmItYmU4Zi01YTA2ZGE0YzhiNzkiIHN0RXZ0OndoZW49IjIwMjMtMDktMTNUMTY6MTc6MDQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZTNmZWMxNS1kMzIyLTRkZmYtODI0Yy0yNDQ2NmZmODYwMjUiIHN0RXZ0OndoZW49IjIwMjMtMDktMzBUMTE6NDQ6MzIrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplYmY4ZTI5Mi0yYmFiLTQwOTItODI5OS1mMTcyNWM3MDUwMmYiIHN0RXZ0OndoZW49IjIwMjMtMDktMzBUMTE6NDQ6MzIrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmlM9VwAAAAcSURBVCjPY/z//z8DuYBxVDM9NQPx/9EAG/aaAXNKKuVFURgvAAAAAElFTkSuQmCC",
  },
  {
    value: "dot",
    icon: require("../../assets/icons/patterns/pattern_d15.svg"),
    value:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAFxGAABcRgEUlENBAAAHMWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjcgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA5LTEzVDE2OjMzOjMyKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wOS0zMFQxMTo0Njo0OCswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wOS0zMFQxMTo0Njo0OCswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M2YyZjEwYTctMzVlYS00YmM1LWJiNDItYjVmODJlMzVkZWU4IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OTQ2YTAwZWEtNGVjNC1mNDQ5LTkyYmUtYTVjZDNlNDY0MDFkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NThlZWVkMDctMDg5My00ZmNiLThhOGItOTRhYjI2YjA0NDJmIj4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDo1OGVlZWQwNy0wODkzLTRmY2ItOGE4Yi05NGFiMjZiMDQ0MmY8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1OGVlZWQwNy0wODkzLTRmY2ItOGE4Yi05NGFiMjZiMDQ0MmYiIHN0RXZ0OndoZW49IjIwMjMtMDktMTNUMTY6MzM6MzIrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC43IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMGU1YmM5Ny03ODEwLTQ0MGEtODcwYi1lODhiNjYzOTZhMzAiIHN0RXZ0OndoZW49IjIwMjMtMDktMzBUMTE6NDY6NDgrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozZjJmMTBhNy0zNWVhLTRiYzUtYmI0Mi1iNWY4MmUzNWRlZTgiIHN0RXZ0OndoZW49IjIwMjMtMDktMzBUMTE6NDY6NDgrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpfSR/YAAABHSURBVCiRnctHCgAwDANB///TTiGEFDdJsOg0oqrC1MfD+SyE8Qkh/MIytmAJezDFEQxxBl1cgSauwg8j8MIo3JiBy3Fw1ACZEoKanXFuWQAAAABJRU5ErkJggg==",
  },
];

var STROKE_WIDTHS = [
  {
    value: 1,
    icon: require("../../assets/icons/tools/line-width-1-px-icon.svg"),
  },
  {
    value: 2,
    icon: require("../../assets/icons/tools/line-width-2-px-icon.svg"),
  },
  {
    value: 4,
    icon: require("../../assets/icons/tools/line-width-4-px-icon.svg"),
  },
  {
    value: 8,
    icon: require("../../assets/icons/tools/line-width-8-px-icon.svg"),
  },
  {
    value: 12,
    icon: require("../../assets/icons/tools/line-width-12-px-icon.svg"),
  },
  {
    value: 16,
    icon: require("../../assets/icons/tools/line-width-16-px-icon.svg"),
  },
  {
    value: 20,
    icon: require("../../assets/icons/tools/line-width-20-px-icon.svg"),
  },
  {
    split: true,
    value: 1,
    type: 5,
    icon: require("../../assets/icons/tools/ico-easydraw-line-weight-dash-1.svg"),
  },
  {
    value: 2,
    type: 10,
    icon: require("../../assets/icons/tools/ico-easydraw-line-weight-dash-2.svg"),
  },
  {
    value: 4,
    type: 20,
    icon: require("../../assets/icons/tools/ico-easydraw-line-weight-dash-3.svg"),
  },
  {
    value: 8,
    type: 40,
    icon: require("../../assets/icons/tools/ico-easydraw-line-weight-dash-4.svg"),
  },
  {
    value: 12,
    type: 60,
    icon: require("../../assets/icons/tools/ico-easydraw-line-weight-dash-5.svg"),
  },
  {
    value: 16,
    type: 80,
    icon: require("../../assets/icons/tools/ico-easydraw-line-weight-dash-6.svg"),
  },
  {
    value: 20,
    type: 100,
    icon: require("../../assets/icons/tools/ico-easydraw-line-weight-dash-7.svg"),
  },
];

var ERASER_WIDTHS = [
  {
    value: 1,
    icon: require("../../assets/icons/tools/line-width-1-px-icon.svg"),
  },
  {
    value: 2,
    icon: require("../../assets/icons/tools/line-width-2-px-icon.svg"),
  },
  {
    value: 4,
    icon: require("../../assets/icons/tools/line-width-4-px-icon.svg"),
  },
  {
    value: 8,
    icon: require("../../assets/icons/tools/line-width-8-px-icon.svg"),
  },
  {
    value: 12,
    icon: require("../../assets/icons/tools/line-width-12-px-icon.svg"),
  },
  {
    value: 16,
    icon: require("../../assets/icons/tools/line-width-16-px-icon.svg"),
  },
  {
    value: 20,
    icon: require("../../assets/icons/tools/line-width-20-px-icon.svg"),
  },
];

var FONT_SIZES = [12, 17, 22, 27, 32, 37, 42];

var FONT_ICONS = {
  12: require("../../assets/icons/tools/ico-easydraw-text-1.svg"),
  17: require("../../assets/icons/tools/ico-easydraw-text-2.svg"),
  22: require("../../assets/icons/tools/ico-easydraw-text-3.svg"),
  27: require("../../assets/icons/tools/ico-easydraw-text-4.svg"),
  32: require("../../assets/icons/tools/ico-easydraw-text-5.svg"),
  37: require("../../assets/icons/tools/ico-easydraw-text-6.svg"),
  42: require("../../assets/icons/tools/ico-easydraw-text-7.svg"),
};

var topToolUi = {
  palettes: [
    {
      name: "top",
      vertical: false,
      permanent: true,
    },
  ],
  buttons: [
    {
      name: "select",
      label: "s",
      wrapperClasses: "dt-separator-horizontal",
      tooltip: "Select tool",
      activatesTool: "select",
      palette: "top",
      icon: require("../../assets/icons/tools/ico-easydraw-cursor.svg"),
    },
    {
      name: "pan",
      tooltip: "Pan Image",
      label: "p",
      classes: "dt-pan ",
      wrapperClasses: "dt-separator-horizontal",
      separatorAfter: true /* This is a test for later, creating a better easier to maintain separator */,
      palette: "top",
      activatesTool: "pan",
      //onInit: setPanMode,
      onClick: setPanMode,
      icon: require("../../assets/icons/tools/hand-thin2.svg"),
    },
    {
      name: "undo",
      tooltip: "Undo",
      label: "u",
      classes: "dt-undo-redo",
      palette: "top",
      onClick: function () {
        this.dt.undo();
        //canvasResize();
      },
      onInit: function () {
        this.setLocked(true);
        this.dt.on(
          "undo:possible",
          function () {
            this.setLocked(false);
          }.bind(this)
        );
        this.dt.on(
          "undo:impossible",
          function () {
            this.setLocked(true);
          }.bind(this)
        );
      },
      icon: require("../../assets/icons/tools/ico-ico-undo.svg"),
    },
    {
      name: "redo",
      tooltip: "Redo",
      label: "r",
      classes: "dt-undo-redo dt-separator-horizontal",
      palette: "top",
      onClick: function () {
        this.dt.redo();
        //canvasResize();
      },
      onInit: function () {
        this.setLocked(true);
        this.dt.on(
          "redo:possible",
          function () {
            this.setLocked(false);
          }.bind(this)
        );
        this.dt.on(
          "redo:impossible",
          function () {
            this.setLocked(true);
          }.bind(this)
        );
      },
      icon: require("../../assets/icons/tools/ico-ico-refresh.svg"),
    },
    {
      name: "trash",
      tooltip: "Delete selected objects",
      label: "d",
      activatesTool: "trash",
      palette: "top",
      onInit: lockWhenNothingIsSelected,
      icon: require("../../assets/icons/tools/ico-ico-delete.svg"),
    },
  ],
};

var ui = {
  /***
   * Palettes
   ***/
  palettes: [
    {
      name: "main",
      vertical: true,
      permanent: true,
    },
    {
      name: "lines",
      anchor: "linesPalette",
      vertical: false,
    },
    {
      name: "shapes",
      anchor: "shapesPalette",
      vertical: false,
    },
    {
      name: "fontSizes",
      anchor: "text",
    },
    {
      name: "strokeColors",
      anchor: "strokeColorPalette",
    },
    {
      name: "fillColors",
      anchor: "fillColorPalette",
      split2: true,
    },
    {
      name: "strokeWidths",
      anchor: "strokeWidthPalette",
      split: true,
    },
    {
      name: "eraserWidths",
      anchor: "eraserWidthPalette",
    },
  ],
  buttons: [
    /***
     * Main tools
     ***/
    {
      name: "free",
      tooltip: "Free hand drawing tool",
      label: "F",
      activatesTool: "free",
      palette: "main",
      icon: require("../../assets/icons/tools/ico-ico-edit.svg"),
    },

    {
      name: "eraserWidthPalette",
      tooltip: "Eraser width (click and hold to show available options)",
      buttonClass: SelectedLineWidthButton,
      classes: "dt-eraser-width-btn",
      label: "E",
      palette: "main",
      activatesTool: "eraser",
      onClick: function () {
        this.ui.togglePalette("eraserWidths");
      },
      onStateChange: function (state) {
        this.setLineWidth(state.strokeWidth);
      },
      icon: require("../../assets/icons/tools/ico-easydraw-eraser.svg"),
    },
    {
      name: "linesPalette",
      tooltip: "Line tool (click and hold to show available line types)",
      classes: "dt-expand",
      reflectsTools: ["line", "arrow", "doubleArrow", "dimension"],
      palette: "main",
      onInit: function () {
        this.setIcon(this.ui.getPaletteActiveButton("lines"));
        this.ui.getPaletteActiveButton("lines").click();
      },
      onClick: function () {
        this.ui.getPaletteActiveButton("lines").click();
        this.ui.togglePalette("lines");
      },
      icon: require("../../assets/icons/tools/ico-easydraw-line.svg"),
    },
    {
      name: "shapesPalette",
      tooltip: "Basic shape tool (click and hold to show available shapes)",
      classes: "dt-expand",
      reflectsTools: ["rect", "ellipse", "square", "circle", "triangle", "arc"],
      palette: "main",
      onInit: function () {
        this.setIcon(this.ui.getPaletteActiveButton("shapes"));
      },
      onClick: function () {
        this.ui.getPaletteActiveButton("shapes").click();
        this.ui.togglePalette("shapes");
      },
      icon: require("../../assets/icons/tools/ico-easydraw-circle.svg"),
    },
    {
      name: "polygon",
      tooltip: "Polygon tool",
      label: "p",
      activatesTool: "polygon",
      palette: "main",
      icon: require("../../assets/icons/tools/ico-easydraw-polygon.svg"),
    },
    {
      name: "text",
      tooltip: "Text tool (click and hold to show available font sizes)",
      buttonClass: TextButton,
      label: "T",
      // Do not exit text edit mode on click. See text tool class.
      classes: "dt-expand dt-keep-text-edit-mode",
      activatesTool: "text",
      palette: "main",
      onClick: function () {
        this.ui.togglePalette("fontSizes");
      },
      onStateChange: function (state) {
        if (state.fontSize && FONT_ICONS[state.fontSize]) {
          getIcon(FONT_ICONS[state.fontSize].default)
            .then((svg) => {
              this.$icon.remove();
              this.$icon = $(svg)
                .attr("class", "icon")
                .appendTo(this.$container);
            })
            .catch((e) => console.log(e));
        }
        this.setTextSize(state.fontSize);
      },
      icon: require("../../assets/icons/tools/ico-easydraw-text-1.svg"),
    },
    {
      name: "strokeColorPalette",
      tooltip: "Stroke color (click and hold to show available colors)",
      buttonClass: StrokeButton,
      // Do not exit text edit mode on click. See text tool class.
      classes: "dt-keep-text-edit-mode",
      palette: "main",
      onInit: function () {
        this.setColor(this.dt.state.stroke);
      },
      onStateChange: function (state) {
        this.setColor(state.stroke);
      },
      onClick: function () {
        this.ui.togglePalette("strokeColors");
      },
      icon: require("../../assets/icons/tools/ico-easydraw-stroke-color.svg"),
    },
    {
      name: "fillColorPalette",
      tooltip: "Fill color (click and hold to show available colors)",
      buttonClass: FillButton,
      palette: "main",
      onInit: function () {
        this.setColor(this.dt.state.fill);
      },
      onStateChange: function (state) {
        this.setColor(state.fill);
      },
      onClick: function () {
        this.ui.togglePalette("fillColors");
      },
      icon: require("../../assets/icons/tools/ico-easydraw-fill-color.svg"),
    },
    {
      name: "strokeWidthPalette",
      tooltip: "Stroke width (click and hold to show available options)",
      buttonClass: SelectedLineWidthButton,
      wrapperClasses: "dt-separator-after",
      label: "w",
      palette: "main",
      onClick: function () {
        this.ui.togglePalette("strokeWidths");
      },
      onStateChange: function (state) {
        this.setLineWidth(state.strokeWidth);
      },
      icon: require("../../assets/icons/tools/ico-easydraw-line-weight.svg"),
    },
    {
      name: "clone",
      tooltip: "Clone tool",
      label: "c",
      activatesTool: "clone",
      palette: "main",
      onInit: lockWhenNothingIsSelected,
      icon: require("../../assets/icons/tools/ico-ico-copy.svg"),
    },
    {
      name: "sendToBack",
      tooltip: "Send selected objects to back",
      label: "m",
      classes: "dt-send-to",
      palette: "main",
      onInit: lockWhenNothingIsSelected,
      onClick: function () {
        this.dt.sendSelectionToBack();
      },
      icon: require("../../assets/icons/tools/ico-easydraw-send-to-back.svg"),
    },
    {
      name: "sendToFront",
      tooltip: "Send selected objects to front",
      label: "l",
      classes: "dt-send-to",
      palette: "main",
      onInit: lockWhenNothingIsSelected,
      onClick: function () {
        this.dt.sendSelectionToFront();
      },
      icon: require("../../assets/icons/tools/ico-easydraw-send-to-front.svg"),
    },
    {
      name: "group",
      tooltip: "Add to group",
      label: "g",
      classes: "dt-group-add",
      palette: "main",
      onInit: lockWhenSingleObjectIsSelected,
      onClick: function () {
        this.dt.addToGroup();
        // canvasResize();
      },
      icon: require("../../assets/icons/tools/group.svg"),
    },
    {
      name: "ungroup",
      tooltip: "Split group",
      label: "h",
      classes: "dt-group-remove",
      palette: "main",
      onInit: lockWhenNothingIsSelected,
      onClick: function () {
        this.dt.removeFromGroup();
        // canvasResize();
      },
      icon: require("../../assets/icons/tools/ungroup.svg"),
    },
    {
      name: "lock",
      tooltip: "Lock selection",
      label: "q",
      classes: "dt-selection-lock",
      palette: "main",
      onInit: lockWhenNothingIsSelected,
      onClick: function () {
        this.dt.lockSelection();
      },
      icon: require("../../assets/icons/tools/lock.svg"),
    },
    {
      name: "unlock",
      tooltip: "Unlock all selections",
      label: "g",
      classes: "dt-selection-unlock",
      palette: "main",
      onClick: function () {
        this.dt.unlockLockSelections();
      },
      icon: require("../../assets/icons/tools/unlock.svg"),
    },

    /***
     * Line tools
     ***/
    {
      name: "line",
      tooltip: "Line",
      label: "L",
      activatesTool: "line",
      palette: "lines",
      icon: require("../../assets/icons/tools/ico-easydraw-line.svg"),
    },
    {
      name: "arrow",
      tooltip: "Arrow",
      label: "A",
      activatesTool: "arrow",
      palette: "lines",
      icon: require("../../assets/icons/tools/ico-easydraw-arrow.svg"),
    },
    {
      name: "doubleArrow",
      tooltip: "Double arrow",
      label: "D",
      activatesTool: "doubleArrow",
      palette: "lines",
      icon: require("../../assets/icons/tools/ico-easydraw-arrow-2.svg"),
    },
    {
      name: "dimension",
      tooltip: "Dimension",
      label: "M",
      activatesTool: "dimension",
      palette: "lines",
      icon: require("../../assets/icons/tools/ico-easydraw-measure.svg"),
    },
    /***
     * Shape tools
     ***/
    {
      name: "circle",
      tooltip: "Circle",
      label: "C",
      activatesTool: "circle",
      palette: "shapes",
      icon: require("../../assets/icons/tools/ico-easydraw-circle.svg"),
      show_label: false,
    },
    {
      name: "square",
      tooltip: "Square",
      label: "S",
      activatesTool: "square",
      palette: "shapes",
      icon: require("../../assets/icons/tools/ico-easydraw-square.svg"),
      show_label: false,
    },
    {
      name: "ellipse",
      tooltip: "Ellipse",
      label: "E",
      activatesTool: "ellipse",
      palette: "shapes",
      icon: require("../../assets/icons/tools/ico-easydraw-oval.svg"),
      show_label: false,
    },
    {
      name: "rect",
      tooltip: "Rectangle",
      label: "R",
      activatesTool: "rect",
      palette: "shapes",
      icon: require("../../assets/icons/tools/ico-easydraw-rectangle.svg"),
      show_label: false,
    },
    {
      name: "triangle",
      tooltip: "Triangle",
      label: "V",
      activatesTool: "triangle",
      palette: "shapes",
      icon: require("../../assets/icons/tools/triangle-tool.svg"),
      show_label: false,
    },
    {
      name: "arc",
      tooltip: "Arc",
      label: "A",
      activatesTool: "arc",
      palette: "shapes",
      icon: require("../../assets/icons/tools/ico-easydraw-arc.svg"),
      show_label: false,
    },
  ],
  optionalButtons: [
    {
      name: "annotation",
      tooltip: "Annotation tool",
      label: "a",
      // Do not exit text edit mode on click. See text tool class.
      classes: "dt-keep-text-edit-mode",
      activatesTool: "annotation",
      palette: "main",
      icon: require("../../assets/icons/tools/annotation-icon.svg"),
    },
  ],
};

FONT_SIZES.forEach(function (fontSize) {
  ui.buttons.push({
    label: "T",
    tooltip: fontSize + "px",
    // Do not exit text edit mode on click. See text tool class.
    classes: "dt-keep-text-edit-mode",
    onClick: function () {
      this.dt.setFontSize(fontSize);
      this.dt.setSelectionFontSize(fontSize);
    },
    onStateChange: function (state) {
      this.setActive(state.fontSize === fontSize);
    },
    palette: "fontSizes",
    icon: FONT_ICONS[fontSize],
  });
});

COLORS.forEach(function (color) {
  ui.buttons.push({
    buttonClass: ColorButton,
    tooltip: color.value,
    color: color.value,
    type: "fill",
    palette: "fillColors",
    icon: color.icon,
  });
});

STROKE_COLORS.forEach(function (color) {
  ui.buttons.push({
    buttonClass: ColorButton,
    tooltip: color.value,
    // Do not exit text edit mode on click. See text tool class.
    classes: "dt-keep-text-edit-mode",
    color: color.value,
    type: "stroke",
    palette: "strokeColors",
    icon: color.icon,
  });
});

GRADIENTS.forEach(function (gradient) {
  ui.buttons.push({
    buttonClass: ColorButton,
    tooltip: "Gradient",
    // Do not exit text edit mode on click. See text tool class.
    classes: "dt-keep-text-edit-mode",
    color: "gradient",
    from: gradient.from,
    to: gradient.to,
    type: "fill",
    palette: "fillColors",
    icon: gradient.icon,
    gradient: true,
  });
});
PATTERNS.forEach(function (pattern) {
  ui.buttons.push({
    buttonClass: ColorButton,
    tooltip: "Pattern",
    // Do not exit text edit mode on click. See text tool class.
    classes: "dt-keep-text-edit-mode",
    color: "pattern",
    value: pattern.value,
    type: "fill",
    palette: "fillColors",
    icon: pattern.icon,
    pattern: true,
  });
});
// Color picker buttons
ui.buttons.push({
  buttonClass: ColorButton,
  tooltip: "Color picker",
  color: "picker",
  type: "fill",
  palette: "fillColors",
  sb: "picker-fill",
  icon: require("../../assets/icons/tools/palette.svg"),
});
ui.buttons.push({
  buttonClass: ColorButton,
  tooltip: "Color picker",
  wrapperClasses: "dt-separator-horizontal",
  color: "picker",
  type: "stroke",
  palette: "strokeColors",
  sb: "picker-stroke",
  icon: require("../../assets/icons/tools/palette.svg"),
});
// Pipette button
ui.buttons.push({
  buttonClass: ColorButton,
  tooltip: "Pipette tool",
  color: "pipette",
  classes: "dt-pipette-btn",
  type: "stroke",
  palette: "strokeColors",
  activatesTool: "strokePipette",
  sb: "pipette-stroke",
  icon: require("../../assets/icons/tools/pipette.svg"),
});
ui.buttons.push({
  buttonClass: ColorButton,
  tooltip: "Pipette tool",
  color: "pipette",
  classes: "dt-pipette-btn",
  type: "fill",
  palette: "fillColors",
  activatesTool: "fillPipette",
  sb: "pipette-stroke",
  icon: require("../../assets/icons/tools/pipette.svg"),
});
// Stroke width
STROKE_WIDTHS.forEach(function (width) {
  let type = !!width.type ? " / Dashed" : "";
  let btn = {
    buttonClass: LineWidthButton,
    tooltip: width.value + "px" + type,
    width: width.value,
    palette: "strokeWidths",
    icon: width.icon,
    split: width.split,
  };
  if (!!width.type) {
    btn.type = width.type;
  }
  ui.buttons.push(btn);
});

ERASER_WIDTHS.forEach(function (width) {
  ui.buttons.push({
    buttonClass: LineWidthButton,
    tooltip: width.value + "px",
    width: width.value,
    palette: "eraserWidths",
    icon: width.icon,
  });
});

// Helper functions that may be used by buttons.
// Note that all listeners are called in the context
// of the button isntance (`this` value).

function lockWhenNothingIsSelected() {
  this.setLocked(true);
  this.dt.canvas.on(
    "selection:created",
    function () {
      this.setLocked(false);
    }.bind(this)
  );
  this.dt.canvas.on(
    "selection:cleared",
    function () {
      this.setLocked(true);
    }.bind(this)
  );
}

// Antonio - Clickworks:
// Helper function that makes sure no objects get grouped that are solo-selected. Only ;ultiple objects can get grouped.
function lockWhenSingleObjectIsSelected() {
  this.setLocked(true);
  this.dt.canvas.on(
    "selection:created",
    function () {
      if (this.dt.canvas.getActiveObjects().length > 1) {
        this.setLocked(false);
      }
    }.bind(this)
  );
  this.dt.canvas.on(
    "selection:updated",
    function () {
      if (this.dt.canvas.getActiveObjects().length > 1) {
        this.setLocked(false);
      }
    }.bind(this)
  );
  this.dt.canvas.on(
    "selection:cleared",
    function () {
      this.setLocked(true);
    }.bind(this)
  );
}

function setPanMode() {
  this.dt.chooseTool("select");
}
function getIcon(url) {
  return fetch(url)
    .then((r) => r.text())
    .then((svg) => svg)
    .catch((error) => console.log(error));
}

module.exports = { ui, topToolUi };
