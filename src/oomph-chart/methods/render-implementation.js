import BasicClass from '../../oomph-visualizer/d3/render-legacy/basic.js';
import ChartTypes from '../types/chart-types.js';
import SVGTypes from '../../oomph-visualizer/d3/types/svg-types.js';
import VisualizerTypes from '../types/visualizer-types.js';
import OptionTypes from '../../oomph-visualizer/d3/types/option-types.js';

const chartTypes = new ChartTypes();
const optionTypes = new OptionTypes();
const svgTypes = new SVGTypes();
const visualizerTypes = new VisualizerTypes();

export function renderImplementation(data, visualizer, charts, chartType) {
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
