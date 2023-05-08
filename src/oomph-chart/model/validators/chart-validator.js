import VisualizerTypes from '../types/visualizer-types.js';

const visualizerTypes = new VisualizerTypes();

export function getCompatibleChartTypes(charts, visualizer) {
  const compatibleChartTypes = new Set();

  charts.forEach((chart) => {
    if (visualizerTypes[visualizer].chartTypes[chart]) compatibleChartTypes.add(chart);
  });

  return compatibleChartTypes;
}
