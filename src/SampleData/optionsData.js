export const optionsForceDirected = {
  width: 600,
  height: 600,
  //   color: d3.scaleOrdinal(d3.schemeCategory10),
  linkDistance: 50, // TODO look into linkdistance
  chargeStrength: -200, // TODO look into chargeStrength
};

export const options = {
  margin: {
    top: 20, right: 20, bottom: 30, left: 40,
  },
  width: 500,
  height: 400,
  radius: 5,
  color: 'blue',
  showLabels: true,
  diameter: 600,
  fillColor: 'blue',
  strokeColor: 'blue',
  xLabel: 'xLabel',
  yLabel: 'yLabel',
  colorScale: 'red',

};
console.log(typeof options);
export const options2 = {
  margin: {
    top: 20, right: 20, bottom: 30, left: 40,
  },
  width: 600,
  height: 400,
  radius: 200.5,
  color: 'red',
  showLabels: true,
  diameter: 400,
  fillColor: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'],
};
export const options3 = {
  width: 800, // adjust as necessary
  height: 600, // adjust as necessary
  margin: {
    top: 50, right: 50, bottom: 50, left: 100,
  },
  colorScale: d3.interpolateRdYlBu, // use a diverging color scale
  xLabel: 'X Axis Label',
  yLabel: 'Y Axis Label',
};
