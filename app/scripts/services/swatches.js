const TMP_SWATCHES = [
  { color: "#FCFCF0FF", label: "P901 - Crème" },
  { color: "#A38C7AFF", label: "P119 - Grijsbeige" },
  { color: "rgba(194, 191, 184, 1)", label: "P744 - Zijdegrijs" },
  { color: "rgba(74, 84, 89, 1)", label: "P712 - Basaltgrijs" },
  { color: "rgba(189, 186, 171, 1)", label: "P732 - Kiezelgrijs" },
  { color: "rgba(145, 143, 135, 1)", label: "P730 - Steengrijs" },
  { color: "rgba(122, 125, 117, 1)", label: "P723 - Betongrijs" },
  { color: "rgba(156, 156, 166, 1)", label: "P704 - Signaalgrijs" },
  { color: "rgba(122, 125, 128, 1)", label: "P737 - Stafgrijs" },
  { color: "rgba(97, 94, 89, 1)", label: "P739 - Kwartsgrijs" },
  { color: "rgba(107, 97, 87, 1)", label: "P706 - Beigegrijs" },
  { color: "rgba(77, 92, 107, 1)", label: "P731 - Blauwgrijs" },
  { color: "rgba(38, 46, 56, 1)", label: "P716 - Antraciesgrijs" },
  { color: "rgba(0, 43, 122, 1)", label: "P511 - Staalblauw" },
  { color: "rgba(3, 13, 31, 1)", label: "P504 - Zwartblauw" },
  { color: "rgba(23, 41, 28, 1)", label: "P609 - Dennengroen" },
  { color: "rgba(0, 38, 25, 1)", label: "P692 - Monumentengroen" },
  { color: "rgba(26, 33, 41, 1)", label: "P721 - Zwartgrijs" },
  { color: "rgba(92, 32, 16, 1)", label: "P890 - Staalbrons" },
  { color: "rgba(13, 8, 13, 1)", label: "P822 - Zwartbruin" },
  { color: "rgba(3, 5, 10, 1)", label: "P905 - Zwart" },
  { color: "rgba(20, 23, 28, 1)", label: "P917 - Verkeerszwart" },
];
/* Groundwork for the API interaction once done */
class SwatchesService {
  constructor() {}
  /* Fetch Swatches from DB */
  static fetchSwatches() {
    return TMP_SWATCHES;
  }
  /* Convert Swatches to usable colors for the color picker*/
  static getSwatches() {
    const swatches = this.fetchSwatches();
    return this.extractColors(swatches);
  }
  /* Extracts the color of the swatches for the color-pickr */
  static extractColors(swatches) {
    return swatches.map((swatch) => swatch.color);
  }
}

module.exports = SwatchesService;
