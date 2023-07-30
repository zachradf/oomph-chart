/* eslint-disable max-classes-per-file */
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
class OomphChart {
  constructor(inputData = null, visualizer = 'd3', iface = 'default') {
    if (inputData === null || inputData === undefined) console.error('Please provide a data input, received: ', inputData);
    this.data = inputData;
    this.inputs = getCompatibleInputTypes(this.data);
    this.tags = getInputToTagAssociations(this.inputs);
    this.chartsEligible = getTagToChartAssociations(this.tags);
    this.currentChartType = null;
    this.currentOptionsShape = null;
    this.options = null;
    // Determine which of the eligible charts are supported by the visualizer.
    this.visualizer = verifyVisualizer(visualizer);
    this.charts = getCompatibleChartTypes(this.chartsEligible, this.visualizer);

    // TODO Determine which interface to use.
    this.interface = verifyInterface(iface);
  }

  getOptionsShape(chartType) {
    if (hasValidRenderVisualizerArguments(this, chartType)) {
      const chartTypes = new ChartTypes();
      // eslint-disable-next-line no-underscore-dangle
      const charts = chartTypes[chartType]._selfKey;
      if (this.charts.has(charts)) {
      // Expand from d3 options types in the future
        this.currentChartType = charts;
        const optionTypes = new D3OptionTypes();
        const tempSingleOption = getChartToOptionAssociations([charts]);
        const optionShape = optionTypes[tempSingleOption];
        this.currentOptionsShape = optionShape;

        return optionShape;
      }
    }
    return console.error('Provided chart is not within your eligible charts. Received: ', chartType);
  }

  render(chartType, options, interfaceType = this.interface) {
    this.getOptionsShape(chartType);
    this.renderInterface(interfaceType);
    this.renderVisualizer(chartType, options);
  }

  renderInterface() {
    const oomphInterface = new OomphInterface(this.interface);
    oomphInterface.render();
  }

  renderVisualizer(chartType, options) {
    if (hasValidRenderVisualizerArguments(this, chartType)) {
      this.options = options;
      const chartTypes = new ChartTypes();
      // eslint-disable-next-line no-underscore-dangle
      const charts = chartTypes[chartType]._selfKey;
      this.currentChartType = charts;
      // TODO load appropriate visualizer
      this.visualizerInstance = new D3Visualizer(
        [charts],
        [this.data],
        [this.options],
        [this.currentOptionsShape]
      );
      this.visualizerInstance.renderCharts();
    } else console.error('Could not render visualizer due to invalid arguments.');
  }

  updateData(data) {
    if (!data) return;
    this.data = data;
    this.inputs = getCompatibleInputTypes(this.data);
    this.tags = getInputToTagAssociations(this.inputs);
    this.chartsEligible = getTagToChartAssociations(this.tags);
    this.charts = getCompatibleChartTypes(this.chartsEligible, this.visualizer);
  }

  updateChartType(chartType) {
    if (!chartType || !hasValidRenderVisualizerArguments(this, chartType)) return;
    const chartTypes = new ChartTypes();
    // eslint-disable-next-line no-underscore-dangle
    const charts = chartTypes[chartType]._selfKey;
    this.currentChartType = charts;
    this.getOptionsShape(charts);
  }

  updateOptions(options = this.options) {
    if (!options) return;
    // Run this through validator
    this.options = options;
    this.visualizerInstance.updateInput(
      [this.currentChartType],
      [this.data],
      [this.options],
      [this.currentOptionsShape]
    );
  }

  updateVisualizerInstance({ data, options, chartType }) {
    if (!this.visualizerInstance) return console.error('Cannot update without an existing visualizer instance.');
    if (!data && !options && !chartType) return console.error('Please provide inputs to update visualizer instance.');

    this.updateData(data);
    this.updateChartType(chartType);
    this.updateOptions(options);

    return true;
  }
}

export default OomphChart;
