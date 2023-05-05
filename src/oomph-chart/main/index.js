import OomphModel from '../model/index.js';
import OomphInterface from '../interfaces/index.js';

import { renderImplementation } from './methods/render-implementation.js';
import {
  getCompatibleChartTypes,
  verifyVisualizer,
} from './validators/visualizer-validator.js';

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

    const model = new OomphModel(this.data);
    this.inputs = model.inputs;
    this.tags = model.tags;
    this.chartsEligible = model.chartsEligible;

    // Determine which of the eligible charts are supported by the visualizer.
    this.visualizer = verifyVisualizer(visualizer);
    this.charts = getCompatibleChartTypes(this.chartsEligible, this.visualizer);

    const oomphInterface = new OomphInterface();
    // oomphInterface.render();
  }

  render(chartType) {
    return renderImplementation(this, chartType);
  }
}
