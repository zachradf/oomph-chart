/* eslint-disable no-underscore-dangle */

import VisualizerTypes from '../graphTypes/visualizerTypes.js';

export function verifyVisualizer(visualizer) {
  const visualizerTypes = new VisualizerTypes();

  if (!visualizer || visualizer.length === 0 || !visualizerTypes[visualizer]) {
    console.error('Error caught, unsupported visualizer.');
    return '';
  }

  return visualizerTypes[visualizer]._selfKey;
}
