// import BasicClass from '../BasicClass.js';
import ChartTypes from '../graphTypes/chartTypes.js';
import VisualizerTypes from '../graphTypes/visualizerTypes.js';

const chartTypes = new ChartTypes();
const visualizerTypes = new VisualizerTypes();

export function drawImplementation(data, visualizer, charts, chartType) {
  if (!chartType || chartType.length === 0 || !chartTypes[chartType]) {
    console.error('Invalid chart type provided.');
    return;
  }

  // TODO optimize O(N) lookup, perhaps convert class properties to a set instead of array
  if (!charts.includes(chartType)) {
    console.error(`Instantiated object does not support '${chartType}' chart type.`);
    return;
  }

  // TODO implementation
  console.log(`Drawing a ${chartTypes[chartType].nameLong} with ${data.length} data point(s) using ${visualizerTypes[visualizer].name}.`);
}
