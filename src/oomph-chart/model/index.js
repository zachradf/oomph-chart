import { getCompatibleInputTypes } from './validators/input-validator.js';
import { getInputToTagAdjacencies } from './edges/input-to-tag-getter.js';
import { getTagToChartAdjacencies } from './edges/tag-to-chart-getter.js';

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
export default class OomphModel {
  constructor(userInput) {
    this.data = userInput;
    this.inputs = getCompatibleInputTypes(this.data);
    this.tags = getInputToTagAdjacencies(this.inputs);
    this.chartsEligible = getTagToChartAdjacencies(this.tags);
  }
}
