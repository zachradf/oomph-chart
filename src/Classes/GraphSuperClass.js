import { getCompatibleInputTypes } from './graphValidators/inputValidator.js';
import { getInputToTagAdjacencies } from './graphAdjacencies/inputToTagAdjacencies.js';
import { getTagToChartAdjacencies } from './graphAdjacencies/tagToChartAdjacencies.js';
import { verifyVisualizer } from './graphValidators/visualizorValidator.js';

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
  constructor(userInput, visualizer = 'd3') {
    this.data = userInput;
    this.inputs = getCompatibleInputTypes(this.data);
    this.tags = getInputToTagAdjacencies(this.inputs);
    this.charts = getTagToChartAdjacencies(this.tags);
    this.visualizer = verifyVisualizer(visualizer);
  }
}
