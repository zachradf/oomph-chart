import ChartTypes from './model/types/chart-types.js';
import D3OptionTypes from './visualizers/d3/types/option-types.js';
import D3Visualizer from './visualizers/d3/index.js';
import OomphInterface from './interfaces/index.js';

import { getChartToOptionAssociations } from './visualizers/d3/associations/chart-to-option-getter.js';
import { getCompatibleChartTypes } from './model/validators/chart-validator.js';
import { getCompatibleInputTypes } from './model/validators/input-validator.js';
import { getInputToTagAssociations } from './model/associations/input-to-tag-getter.js';
import { getTagToChartAssociations } from './model/associations/tag-to-chart-getter.js';
import { hasValidRenderVisualizerArguments } from './model/validators/render-validator.js';
import { verifyInterface } from './model/validators/interface-validator.js';
import { verifyVisualizer } from './model/validators/visualizer-validator.js';

/**
 * Determines and defines the relationship between input data and resulting charts.
 * Example:
 *    inputs --> tags --> charts (-WIP-> options)
 * @constructor
 * @property {Set.string} charts - Compatible chart types, matched to <ChartTypes>.
 * @property {Set.string} chartsEligible - Compatible chart types, matched to <ChartTypes>.
 * @property {*} data - The raw data that will be visualized.
 * @property {Set.string} inputs - Compatible input types, matched to <InputTypes>.
 * @property {string} interface - Interface type, matched to <VisualizerTypes>.
 * @property {Set.string} tags - Compatible tag types, matched to <TagTypes>.
 * @property {string} visualizer - Visualizer type, matched to <VisualizerTypes>.
 * @param {*} inputData - Input data. Can be of any type.
 * @param {string} visualizer - Declared visualizer type, matched to <VisualizerTypes>.
 * @param {string} iface - Declared interface type, matched to <InterfaceTypes>. Since 'interface'
 *                         is a reserved word in JavaScript, sometimes 'iface' will be used.
 */
export default class OomphChart {
  constructor(inputData, visualizer = 'd3', iface = 'default') {
    this.data = inputData;
    this.inputs = getCompatibleInputTypes(this.data);
    this.tags = getInputToTagAssociations(this.inputs);
    this.chartsEligible = getTagToChartAssociations(this.tags);

    // Determine which of the eligible charts are supported by the visualizer.
    this.visualizer = verifyVisualizer(visualizer);
    this.charts = getCompatibleChartTypes(this.chartsEligible, this.visualizer);

    // TODO Determine which interface to use.
    this.interface = verifyInterface(iface);
  }

  render(chartType, interfaceType = this.interface) {
    this.renderInterface(interfaceType);
    this.renderVisualizer(chartType);
  }

  renderInterface() {
    const oomphInterface = new OomphInterface(this.interface);
    oomphInterface.render();
  }

  renderVisualizer(chartType) {
    if (hasValidRenderVisualizerArguments(this, chartType)) {
      const chartTypes = new ChartTypes();
      const optionTypes = new D3OptionTypes();

      // TODO allow more than one association
      const tempSingleOption = getChartToOptionAssociations([chartType]);

      // eslint-disable-next-line no-underscore-dangle
      const charts = chartTypes[chartType]._selfKey;
      const options = optionTypes[tempSingleOption];

      // TODO separate invoking visualizer with rendering it
      // TODO load appropriate visualizer
      const d3Visualizer = new D3Visualizer([charts], [this.data], [options]);
    } else console.error('Could not render visualizer due to invalid arguments.');
  }
}
