import { chartData } from './chart.js';
import { optionData as options } from './options.js';

import OptionTypes from '../oomph-visualizer/d3/types/option-types.js';

const optionTypes = new OptionTypes();

export const inputData = {};

inputData.input = {
  data: [chartData.stackedBarChart2],
  selector: '#chart',
  options: [optionTypes.stackedbar.legacyOptions],
};

inputData.input1 = {
  data: [chartData.donutChart],
  selector: '#chart',
  options: [optionTypes.donut.legacyOptions],
};

inputData.input2 = {
  data: [
    chartData.scatterPlotRandom2,
    chartData.scatterPlotRandom2,
    chartData.scatterPlot,
  ],
  selector: '#chart',
  options: [options.options9, options.options1, options.options3], // TODO migrate to optionTypes
};

inputData.input3 = {
  data: [chartData.barChart],
  selector: '#chart',
  options: [optionTypes.bar.legacyOptions],
};

inputData.input4 = {
  data: [chartData.scatterPlot],
  selector: '#chart',
  options: [optionTypes.scatter.legacyOptions],
};

inputData.input5 = {
  data: [chartData.bubbleChart],
  selector: '#chart',
  options: [optionTypes.bubble.legacyOptions],
};

inputData.input6 = {
  data: [chartData.barChart],
  selector: '#chart',
  options: [optionTypes.bar.legacyOptions],
};

inputData.input7 = {
  data: [chartData.treeDiagram],
  selector: '#chart',
  options: [options.options9], // TODO migrate to optionTypes
};

inputData.input8 = {
  data: [chartData.treeMap],
  selector: '#chart',
  options: [options.options9], // TODO migrate to optionTypes
};

inputData.input9 = {
  data: [chartData.sunburst],
  selector: '#chart',
  options: [options.options4], // TODO migrate to optionTypes
};

inputData.input10 = {
  data: [chartData.waterfall],
  selector: '#chart',
  options: [optionTypes.waterfall.legacyOptions],
};

inputData.input11 = {
  data: [chartData.funnelChart],
  selector: '#chart',
  options: [optionTypes.funnel.legacyOptions],
};

inputData.input12 = {
  data: [chartData.polarChart],
  selector: '#chart',
  options: [optionTypes.polar.legacyOptions],
};

inputData.input13 = {
  data: [chartData.radarChart],
  selector: '#chart',
  options: [optionTypes.radar.legacyOptions],
};

inputData.input14 = {
  data: [20, 60, 80],
  selector: '#chart',
  options: [optionTypes.gauge.legacyOptions],
};

inputData.input15 = {
  data: [chartData.boxPlot],
  selector: '#chart',
  options: [optionTypes.box.legacyOptions],
};

inputData.input16 = {
  data: [chartData.chord],
  selector: '#chart',
  options: [options.options3], // TODO migrate to optionTypes
};

inputData.input17 = {
  data: [chartData.sankeyDiagram],
  selector: '#chart',
  options: [options.options3], // TODO migrate to optionTypes
};

inputData.input18 = {
  data: [chartData.treeMap],
  selector: '#chart',
  options: [options.options0], // TODO migrate to optionTypes
};

inputData.input19 = {
  data: [chartData.marimekko],
  selector: '#chart',
  options: [options.options3], // TODO migrate to optionTypes
};

inputData.input20 = {
  data: [chartData.adjacency],
  selector: '#chart',
  options: [options.options0], // TODO migrate to optionTypes
};

inputData.input21 = {
  data: [chartData.scatterPlotRandom],
  // data: [chartData.scatterPlot, chartData.scatterPlot2, chartData.scatterPlot3],
  selector: '#chart',
  options: [optionTypes.scatter.legacyOptions],
};

inputData.input22 = {
  data: [chartData.treeMap],
  selector: '#chart',
  options: [options.options6], // TODO migrate to optionTypes
};

inputData.input23 = {
  data: [chartData.barChart],
  selector: '#chart',
  options: [optionTypes.bar.legacyOptions],
};

inputData.input24 = {
  data: [chartData.scatterPlotRandom2],
  selector: '#chart',
  options: [optionTypes.scatter.legacyOptions],
};

inputData.input25 = {
  data: [chartData.scatterPlot2],
  selector: '#chart',
  options: [optionTypes.scatter.legacyOptions],
};

inputData.input26 = {
  data: [chartData.scatterPlot, chartData.scatterPlot2],
  selector: '#chart',
  options: [options.options3, options.options3], // TODO migrate to optionTypes
};

inputData.input27 = {
  data: [chartData.barChart2],
  selector: '#chart',
  options: [optionTypes.bar.legacyOptions],
};

inputData.input28 = {
  data: [chartData.funnelChart2],
  selector: '#chart',
  options: [optionTypes.funnel.legacyOptions],
};

inputData.input29 = {
  data: [chartData.stackedBarChart],
  selector: '#chart',
  options: [optionTypes.stackedbar.legacyOptions],
};
inputData.input30 = {
  data: [chartData.bubbleChart2],
  selector: '#chart',
  options: [optionTypes.bubble.legacyOptions],
};
