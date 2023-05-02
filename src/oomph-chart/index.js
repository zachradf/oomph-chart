import { renderImplementation } from './methods/render-implementation.js';
import { getCompatibleInputTypes } from './validators/input-validator.js';
import { getInputToTagAdjacencies } from './edges/input-to-tag-getter.js';
import { getTagToChartAdjacencies } from './edges/tag-to-chart-getter.js';
import { verifyVisualizer } from './validators/visualizer-validator.js';

/**
 * Determines and defines the relationship between input data and resulting charts.
 * Example:
 *    inputs --> tags --> charts
 * @constructor
 * @property {*} data - The raw data that's being imported.
 * @property {Set.string} charts - Compatible chart types, matched to <ChartTypes>.
 * @property {Set.string} inputs - Compatible input types, matched to <InputTypes>.
 * @property {Set.string} tags - Compatible tag types, matched to <TagTypes>.
 * @param {*} userInput - User input data. Can be of any type.
 * @param {string} visualizer - Declared visualizer type, matched to <VisualizerTypes>.
 */
export default class OomphChart {
  constructor(userInput, visualizer = 'd3') {
    this.data = userInput;
    this.inputs = getCompatibleInputTypes(this.data);
    this.tags = getInputToTagAdjacencies(this.inputs);
    this.charts = getTagToChartAdjacencies(this.tags);
    this.visualizer = verifyVisualizer(visualizer);
  }

  render(chartType) {
    return renderImplementation(this.data, this.visualizer, this.charts, chartType);
  }
}
