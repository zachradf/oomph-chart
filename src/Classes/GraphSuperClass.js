/* eslint-disable no-underscore-dangle */

import VisualizerTypes from './graphTypes/visualizerTypes.js';

import { getCompatibleInputTypes } from './graphValidators/inputValidator.js';
import { getTagToChartAdjacencies } from './graphAdjacencies/tagToChartAdjacencies.js';
import { getInputToTagAdjacencies } from './graphAdjacencies/inputToTagAdjacencies.js';

const visualizerTypes = new VisualizerTypes();

/**
 * Determines and defines the relationship between input data and resulting charts.
 * Example:
 *    inputs --> tags --> charts
 * @constructor
 * @property {*} data - The raw data that's being imported.
 * @property {Array.<ChartTypes>} charts - Compatible chart types.
 * @property {Array.<InputTypes>} inputs - Compatible input types.
 * @property {Array.<TagTypes>} tags - Compatible tag types.
 * @param {*} userInput - User input data. Can be of any type.
 * @param {<VisualizerTypes>} visualizer - Declared visualizer type.
 */
export default class GraphSuperClass {
  constructor(userInput, visualizer = visualizerTypes.d3._selfKey) {
    this.data = userInput;
    this.inputs = getCompatibleInputTypes(this.data);
    this.tags = getInputToTagAdjacencies(this.inputs);
    this.charts = getTagToChartAdjacencies(this.tags);

    this.visualizer = verifyVisualizer(visualizer);
  }
}

function verifyVisualizer(visualizer) {
  if (!visualizer || visualizer.length === 0 || !visualizerTypes[visualizer]) {
    console.error('Error caught, unsupported visualizer.');
    return '';
  }
  return visualizerTypes[visualizer]._selfKey;
}
