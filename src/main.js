/* eslint-disable import/extensions */
// import * as d3 from 'd3';
import BasicClass from './Classes/BasicClass.js';
import HierarchyClass from './Classes/HierarchyClass.js';
import GraphSuperClass from './Classes/data/graphSuperClass.js';
import {
  bubbleChartData, testDataScatterPlot, treeDiagramData, treeMapData,
  dataSet1, testDataBarChart, extremeScatterPlot1, extremeScatterPlot2,
  stackedBarChartData2, heatMapData, heatMapData2, testDataDonutChart, sunburstData,
  waterfallData, funnelChartData, polarChartData, radarChartData, boxPlotData
} from './SampleData/chartData.js';
import {
  options, options2, options3, options4,
  options5, waterfallOptions, funnelChartOptions,
  polarChartOptions, radarChartOptions, gaugeOptions
} from './SampleData/optionsData.js';
import onHover from './AddFunctionality/onHover.js';
import zoom from './AddFunctionality/zoom.js';
import gradient from './AddFunctionality/gradient.js';
import addAnimation from './AddFunctionality/animate.js';
import stack from './AddFunctionality/stack.js';
import createIciclePlot from './Charts/hierarchicalCharts/iciclePlot.js';
import createChordDiagram from './Charts/hierarchicalCharts/chordChart.js';
import createSankeyDiagram from './Charts/hierarchicalCharts/sankeyDiagram.js';
import createClusterDiagram from './Charts/hierarchicalCharts/clusterDiagram.js';
import createVoronoiTreemap from './Charts/hierarchicalCharts/voronoiTree.js';
import createDendrogram from './Charts/hierarchicalCharts/dendogram.js';
import createRadialTree from './Charts/hierarchicalCharts/radialTreeMap.js';
import relativeNodeSize from './AddFunctionality/relativeNode.js';
const data = new GraphSuperClass();
console.log(data);
console.log(data.charts.types);

const input = {
  data: stackedBarChartData2,
  selector: '#chart',
  options: options5,
};

const input2 = {
  data: testDataBarChart,
  selector: '#chart',
  options,
};

const input3 = {
  data: testDataScatterPlot,
  selector: '#chart',
  options,
};

const input4 = {
  data: heatMapData,
  selector: '#chart',
  options: options3,
};

const input5 = {
  data: bubbleChartData,
  selector: '#chart',
  options: options2,
};
const input6 = {
  data: testDataDonutChart,
  selector: '#chart',
  options: options2,
};
const input7 = {
  data: treeDiagramData,
  selector: '#chart',
  options,
};
const input8 = {
  data: treeMapData,
  selector: '#chart',
  options,
};
const input9 = {
  data: sunburstData,
  selector: '#chart',
  options: options4,
};
const input10 = {
  data: waterfallData,
  selector: '#chart',
  options: waterfallOptions,
};
const input11 = {
  data: funnelChartData,
  selector: '#chart',
  options: funnelChartOptions,
};
const input12 = {
  data: polarChartData,
  selector: '#chart',
  options: polarChartOptions,
};
const input13 = {
  data: radarChartData,
  selector: '#chart',
  options: radarChartOptions,
};
const input14 = {
  data: [20, 60, 80],
  selector: '#chart',
  options: gaugeOptions,
};

const input15 = {
  data: boxPlotData,
  selector: '#chart',
  options,
};

// Adds Charts
// Basic Charts
// const areaObject = new BasicClass(['AREA', 'SCATTER'], input3);
// const barObject = new BasicClass(['BAR'], input2);
// const boxPlotObject = new BasicClass(['BOX'], input15);
// const bubbleObject = new BasicClass(['BUBBLE'], input5);//fix category labels
// const donutChartObject = new BasicClass(['DONUT'], input6);
// const funnelObject = new BasicClass(['FUNNEL'], input11);
// const gaugeObject = new BasicClass(['GAUGE'], input14); // STILL NEEDS WORK
// const heatMapObject = new BasicClass(['HEATMAP'], input4);
// const lineObject = new BasicClass(['LINE'], input3);
// const pieChartObject = new BasicClass(['PIE'], input6);
// const polarObject = new BasicClass(['POLAR'], input12);
// const radarObject = new BasicClass(['RADAR'], input13);
// const scatterObject = new BasicClass(['SCATTER'], input3);
// const stackedBarObject = new BasicClass(['STACKEDBAR'], input);
// const sunburstObject = new HierarchyClass(['SUNBURST'], input9); // fix labels
// const treeDiagramObject = new HierarchyClass(['TREEDIAGRAM'], input7);
// const treeMapObject = new HierarchyClass(['TREEMAP'], input8);
// const waterfallObject = new BasicClass(['WATERFALL'], input10);
relativeNodeSize('#chart', testDataScatterPlot, options);
// const iciclePlotObject = new HierarchyClass(['ICICLE'], input8);
// const input16 = {
//   data: [[2, 5, 3, 6], [5, 1, 0, 4], [11, 2, 3, 7], [0, 8, 3, 5], ['CAT1', 'CAT2', 'CAT3', 'CAT4']],
//   selector: '#chart',
//   options,
// };
// const chordDiagramObject = new HierarchyClass(['CHORD'], input16);
// createDendrogram(treeDiagramData, '#chart', options);
// createRadialTree(treeDiagramData, '#chart', options);

// gradient('#chart', 'blue', 'red', 'BAR', 'x', testDataBarChart);// fix for waterfall and stackedbar chart x axis, funnel y axis
// onHover('#chart');
