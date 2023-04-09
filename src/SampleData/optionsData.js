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
  radius: 8,
  color: 'blue',
  showLabels: true,
  diameter: 600,
  fillColor: 'blue',
  strokeColor: 'blue',
  xLabel: 'xLabel',
  yLabel: 'yLabel',
  colorScale: 'red',
  sortBy: 'value',
  hoverColor: 'blue',
};

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
  orientation: 'horizontal',
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

export const options4 = {
  margin: {
    top: 20, right: 20, bottom: 30, left: 40,
  },
  width: 500,
  height: 400,
  radius: 50,
  color: 'blue',
  showLabels: true,
  diameter: 6,
  fillColor: 'blue',
  strokeColor: 'blue',
  xLabel: 'xLabel',
  yLabel: 'yLabel',
  colorScale: 'red',
  // colorScheme: d3.schemeCategory10,
};

export const options5 = {
  width: 600,
  height: 400,
  margin: {
    top: 20, right: 20, bottom: 50, left: 50,
  },
  color: ['#98abc5', '#8a89a6', '#7b6888'],
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
};

export const funnelChartOptions = {
  width: 800,
  height: 400,
  margin: {
    top: 20, right: 20, bottom: 30, left: 100,
  },
  colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#3F51B5'],
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
};

export const gaugeOptions = {
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
};
