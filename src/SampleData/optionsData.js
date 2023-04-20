export const options = {
  childTextSize: 10,
  color: 'green',
  colorScale: 'red',
  diameter: 600,
  endAngle: Math.PI / 1.25,
  fillColor: 'blue',
  fontFamily: 'sans-seriff',
  fontWeight: 'normal',
  height: 800,
  hoverColor: 'blue',
  innerRadius: 180,
  interval: 2000,
  levels: 5, // maybe should be calculated from data
  linkColor: 'black',
  majorTickColor: 'black',
  majorTicks: 5,
  margin: {
    bottom: 30, left: 40, right: 20, top: 20,
  },
  maxColor: 'red', // maybe should be d3 color scale
  maxValue: 100, // maybe should be calculated from data
  minColor: 'blue',
  minorTickColor: 'black',
  minorTicks: 4,
  nodeRadius: 15,
  onHover: true,
  opacity: 0.75,
  outerRadius: 200,
  overlay: true,
  padding: 0.1,
  parentTextSize: 12,
  pointerColor: 'red',
  pointerWidth: 10,
  radius: 10,
  showCategories: true,
  showLabels: true,
  sortBy: 'value',
  stack: true,
  startAngle: -Math.PI / 1.25,
  strokeColor: 'blue',
  textAnchor: 'middle',
  textColor: 'white',
  width: 900,
  xLabel: 'xLabel',
  yLabel: 'yLabel',
};


export const options2 = {
  margin: {
    top: 20, right: 20, bottom: 30, left: 40,
  },
  width: 600,
  height: 400,
  radius: 100.5,
  color: 'red',
  showCategories: true,
  diameter: 400,
  fillColor: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'],
  overlay: true,
  opacity: 0.75,
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
  overlay: false,

};

export const options4 = {
  margin: {
    bottom: 30, left: 40, right: 20, top: 20,
  },
  width: 900,
  height: 800,
  opacity: 0.75,
  onHover: true,
  radius: 50,
  color: 'blue',
  showLabels: true,
  diameter: 6,
  stack: true,
  fillColor: 'green',
  strokeColor: 'blue',
  xLabel: 'xLabel',
  yLabel: 'yLabel',
  colorScale: 'red',
  overlay: false,
  // colorScheme: d3.schemeCategory10,
};

export const options5 = {
  width: 900,
  height: 800,
  margin: {
    bottom: 30, left: 40, right: 20, top: 20,
  },
  color: 'steelblue',
  fillColor: 'steelblue',
  onHover: true,
  overlay: false,
  diameter: 600,
  opacity: 0.5,
  stack: true,
};

export const waterfallOptions = {
  width: 600,
  height: 400,
  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
  },
  color: 'steelblue',
  positiveColor: 'green',
  negativeColor: 'red',
  overlay: false,
};

export const funnelChartOptions = {
  width: 800,
  height: 400,
  margin: {
    top: 20, right: 20, bottom: 30, left: 100,
  },
  colors: ['steelblue', 'grey'],
  overlay: false,
};

export const polarChartOptions = {
  width: 600,
  height: 600,
  margin: {
    top: 20, right: 20, bottom: 20, left: 20,
  },
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
  innerRadius: 50,
  outerRadius: 250,
  overlay: false,
};

export const radarChartOptions = {
  width: 500,
  height: 500,
  margin: {
    top: 50, right: 50, bottom: 50, left: 50,
  },
  colors: ['#1f77b4', '#2ca02c'],
  maxValue: 100, // maybe should be calculated from data
  levels: 5, // maybe should be calculated from data
  overlay: false,
};

export const gaugeOptions = {
  margin: {
    top: 20, right: 20, bottom: 30, left: 40,
  },
  width: 300,
  height: 300,
  majorTicks: 5,
  minorTicks: 4,
  startAngle: -Math.PI / 1.25,
  endAngle: Math.PI / 1.25,
  pointerColor: 'red',
  majorTickColor: 'black',
  minorTickColor: 'black',
  interval: 2000,
  pointerWidth: 10,
  overlay: false,
};
export const optionsForceDirected = {
  width: 600,
  height: 600,
  //   color: d3.scaleOrdinal(d3.schemeCategory10),
  linkDistance: 50, // TODO look into linkdistance
  chargeStrength: -200, // TODO look into chargeStrength
};

export const options1 = {
  childTextSize: 10,
  color: 'red',
  colorScale: 'red',
  diameter: 600,
  endAngle: Math.PI / 1.25,
  fillColor: 'blue',
  fontFamily: 'sans-seriff',
  fontWeight: 'normal',
  height: 800,
  hoverColor: 'blue',
  innerRadius: 180,
  interval: 2000,
  levels: 5, // maybe should be calculated from data
  linkColor: 'black',
  majorTickColor: 'black',
  majorTicks: 5,
  margin: {
    bottom: 30, left: 40, right: 20, top: 20,
  },
  maxColor: 'red', // maybe should be d3 color scale
  maxValue: 100, // maybe should be calculated from data
  minColor: 'blue',
  minorTickColor: 'black',
  minorTicks: 4,
  nodeRadius: 15,
  onHover: true,
  opacity: 0.75,
  outerRadius: 200,
  overlay: true,
  padding: 0.1,
  parentTextSize: 12,
  pointerColor: 'red',
  pointerWidth: 10,
  radius: 10,
  showCategories: true,
  showLabels: true,
  sortBy: 'value',
  stack: true,
  startAngle: -Math.PI / 1.25,
  strokeColor: 'blue',
  textAnchor: 'middle',
  textColor: 'white',
  width: 900,
  xLabel: 'xLabel',
  yLabel: 'yLabel',
};
export const options13 = {
  childTextSize: 10,
  color: 'blue',
  colorScale: 'red',
  diameter: 600,
  endAngle: Math.PI / 1.25,
  fillColor: 'blue',
  fontFamily: 'sans-seriff',
  fontWeight: 'normal',
  height: 800,
  hoverColor: 'blue',
  innerRadius: 180,
  interval: 2000,
  levels: 5, // maybe should be calculated from data
  linkColor: 'black',
  majorTickColor: 'black',
  majorTicks: 5,
  margin: {
    bottom: 30, left: 40, right: 20, top: 20,
  },
  maxColor: 'red', // maybe should be d3 color scale
  maxValue: 100, // maybe should be calculated from data
  minColor: 'blue',
  minorTickColor: 'black',
  minorTicks: 4,
  nodeRadius: 15,
  onHover: true,
  opacity: 0.75,
  outerRadius: 200,
  overlay: true,
  padding: 0.1,
  parentTextSize: 12,
  pointerColor: 'red',
  pointerWidth: 10,
  radius: 10,
  showCategories: true,
  showLabels: true,
  sortBy: 'value',
  stack: true,
  startAngle: -Math.PI / 1.25,
  strokeColor: 'blue',
  textAnchor: 'middle',
  textColor: 'white',
  width: 900,
  xLabel: 'xLabel',
  yLabel: 'yLabel',
};