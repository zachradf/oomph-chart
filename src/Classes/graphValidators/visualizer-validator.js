/* eslint-disable no-underscore-dangle */

import VisualizerTypes from '../graphTypes/visualizer-types.js';

export function verifyVisualizer(visualizer) {
  const visualizerTypes = new VisualizerTypes();

  if (!visualizer || visualizer.length === 0 || !visualizerTypes[visualizer]) {
    console.error('Unsupported visualizer.');
    return '';
  }

  return visualizerTypes[visualizer]._selfKey;
}
