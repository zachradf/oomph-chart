/* eslint-disable no-underscore-dangle */

import VisualizerTypes from '../types/visualizer-types.js';

const visualizerTypes = new VisualizerTypes();

export function verifyVisualizer(visualizer) {
  if (!visualizer || visualizer.length === 0 || !visualizerTypes[visualizer]) {
    console.error('Unsupported visualizer.');
    return '';
  }

  return visualizerTypes[visualizer]._selfKey;
}

export function getCompatibleChartTypes(charts, visualizer) {
  const compatibleChartTypes = new Set();

  charts.forEach((chart) => {
    if (visualizerTypes[visualizer].chartTypes[chart]) compatibleChartTypes.add(chart);
  });

  return compatibleChartTypes;
}
