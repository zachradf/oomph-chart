/* eslint-disable no-underscore-dangle */

import VisualizerTypes from '../types/visualizer-types.js';

const visualizerTypes = new VisualizerTypes();

export function verifyVisualizer(visualizer) {
  if (!visualizer || visualizer.length === 0 || !visualizerTypes[visualizer]) {
    console.error(`Unsupported visualizer: ${visualizer}`);
    return '';
  }

  return visualizerTypes[visualizer]._selfKey;
}
