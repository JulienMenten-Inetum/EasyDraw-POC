const stamps = {
  Doors: ["./assets/stamps/door.svg"],
  Extra: ["../../assets/stamps/heart.svg", "../../assets/stamps/stamp_1.svg"],
};

class StampsService {
  constructor() {}

  getStamps() {
    return this.fetchStamps();
  }

  async fetchSVG(data) {
    try {
      const r = await fetch(data);
      const svg = await r.text();
      return svg;
    } catch (error) {
      return console.log(error);
    }
  }
  fetchStamps() {
    let newStamps = stamps;

    Object.keys(stamps).forEach((collection) => {
      stamps[collection].forEach((img, index) =>
        this.fetchSVG(img).then(
          (svg) => (newStamps[collection][index] = svg.toString())
        )
      );
    });
    return newStamps;
  }
}

module.exports = StampsService;
