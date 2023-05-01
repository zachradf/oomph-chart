import BasicClass from '../BasicClass.js';
import ChartTypes from '../graphTypes/chart-types.js';
import SVGTypes from '../visualizers/d3/svgTypes.js';
import VisualizerTypes from '../graphTypes/visualizer-types.js';
import OptionTypes from '../visualizers/d3/optionTypes.js';

const chartTypes = new ChartTypes();
const optionTypes = new OptionTypes();
const svgTypes = new SVGTypes();
const visualizerTypes = new VisualizerTypes();

export function drawImplementation(data, visualizer, charts, chartType) {
  if (!chartType || chartType.length === 0 || !chartTypes[chartType]) {
    console.error('Invalid chart type provided.');
    return;
  }

  if (!charts.has(chartType)) {
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

  // TODO for now, only support basic chart types
  const tempOveride = {
    svgTypeMap: { [svgTypes[chartType].legacyName]: svgTypes[chartType].legacyValue },
    chartArray: [chartTypes[chartType].legacyName],
    options: [optionTypes[chartType].legacyOptions],
    data: [data],
  };

  // TODO note: for now, invoking the legacy class also draws it
  const basicClass = new BasicClass(null, null, tempOveride);
}
