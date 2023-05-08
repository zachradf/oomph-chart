import ChartTypes from '../types/chart-types.js';
import VisualizerTypes from '../types/visualizer-types.js';

const chartTypes = new ChartTypes();
const visualizerTypes = new VisualizerTypes();

export function hasValidRenderVisualizerArguments(obj, chartType) {
  if (!chartType || chartType.length === 0 || !chartTypes[chartType]) {
    console.error('Invalid chart type provided.');
    return false;
  }

  if (!obj.charts.has(chartType)) {
    console.error(`${visualizerTypes[obj.visualizer].name} visualizer does not support '${chartType}' chart type.`);
    return false;
  }

  if (!obj.chartsEligible.has(chartType)) {
    console.error(`Instantiated object does not support '${chartType}' chart type.`);
    return false;
  }

  if (!obj.visualizer || obj.visualizer.length === 0 || !visualizerTypes[obj.visualizer]) {
    console.error('Invalid visualizer provided.');
    return false;
  }

  if (!obj.data) {
    console.error('Invalid data detected.');
    return false;
  }

  if (obj.data.length === 0) {
    console.warn('There are no data points to draw.');
  }

  console.log(`Drawing a ${chartTypes[chartType].nameLong} with ${obj.data.length} data point(s) using ${visualizerTypes[obj.visualizer].name}.`);

  return true;
}
