export const optionsForceDirected = {
  width: 600,
  height: 600,
  color: d3.scaleOrdinal(d3.schemeCategory10),
  linkDistance: 50, // TODO look into linkdistance
  chargeStrength: -200, // TODO look into chargeStrength
};

export const options = {
  margin: {
    top: 20, right: 20, bottom: 30, left: 40,
  },
  width: 600,
  height: 400,
  radius: 5,
  color: 'red',
  showLabels: true,
};
// options.margin = { top: 20, right: 20, bottom: 30, left: 40 };
// options.width = 600;
// options.height = 400;
// options.radius = 5;
// options.color = "blue";
// options.showLabels = true;

export const options2 = {};
options2.margin = {
  top: 20, right: 20, bottom: 30, left: 40,
};
options2.width = 600;
options2.height = 400;
options2.radius = 5;
options2.color = 'black';
options2.showLabels = true;

// module.exports = { options, options2 };
