import ChartTypes from '../types/chart-types.js';
import VisualizerTypes from '../types/visualizer-types.js';
import OptionTypes from '../../oomph-visualizer/d3/types/option-types.js';
import D3Visualizer from '../../oomph-visualizer/d3/index.js';

const chartTypes = new ChartTypes();
const optionTypes = new OptionTypes();
const visualizerTypes = new VisualizerTypes();

export function renderImplementation(
  {
    charts, data, chartsEligible, visualizer,
  },
  chartType
) {
  if (!chartType || chartType.length === 0 || !chartTypes[chartType]) {
    console.error('Invalid chart type provided.');
    return;
  }

  if (!charts.has(chartType)) {
    console.error(`${visualizerTypes[visualizer].name} visualizer does not support '${chartType}' chart type.`);
    return;
  }

  if (!chartsEligible.has(chartType)) {
    console.error(`Instantiated object does not support '${chartType}' chart type.`);
    return;
  }

  if (!visualizer || visualizer.length === 0 || !visualizerTypes[visualizer]) {
    console.error('Invalid visualizer provided.');
    return;
  }

  if (!data) {
    console.error('Invalid data detected.');
    return;
  }

  if (data.length === 0) {
    console.warn('There are no data points to draw.');
  }

  console.log(`Drawing a ${chartTypes[chartType].nameLong} with ${data.length} data point(s) using ${visualizerTypes[visualizer].name}.`);

  // eslint-disable-next-line no-underscore-dangle
  const tempCharts = [chartTypes[chartType]._selfKey];
  const tempData = [data];
  const tempOptions = [optionTypes[chartType].legacyOptions];

  // TODO note: for now, invoking the visualizer also draws it
  const d3Visualizer = new D3Visualizer(tempCharts, tempData, tempOptions);
}
