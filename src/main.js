/* eslint-disable import/extensions */
// import * as d3 from 'd3';
import BasicClass from './Classes/BasicClass.js';
import HierarchyClass from './Classes/HierarchyClass.js';
import GraphSuperClass from './Classes/GraphSuperClass.js';
import {
  bubbleChartData, testDataScatterPlot, treeDiagramData, treeMapData,
  dataSet1, testDataBarChart, extremeScatterPlot1, extremeScatterPlot2,
  stackedBarChartData2, heatMapData, heatMapData2, testDataDonutChart, sunburstData,
  waterfallData, funnelChartData, polarChartData, radarChartData, boxPlotData, testDataScatterPlot2, testDataScatterPlot3
} from './SampleData/chartData.js';
import {
  options, options1, options2, options3, options4,
  options5, options13, waterfallOptions, funnelChartOptions,
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
import createMarimekkoChart from './Charts/hierarchicalCharts/merimekkoChart.js';
import createAdjacencyMatrix from './Charts/hierarchicalCharts/adjacencyMatrix.js';
import sort from './AddFunctionality/sort.js';

const superObject1 = new GraphSuperClass(testDataBarChart);
console.log(superObject1);

const input = {
  data: [testDataBarChart],
  selector: '#chart',
  options: [options4],
};

const input2 = {
  data: [testDataScatterPlot, testDataScatterPlot2, testDataScatterPlot3, testDataScatterPlot],
  selector: '#chart',
  options: [options, options1, options13, options5],
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
// onHover('#scatter', options);

// Adds Charts
// Basic Charts
// const areaObject = new BasicClass(['AREA', 'SCATTER'], input3);
const barObject = new BasicClass(['SCATTER', 'SCATTER', 'SCATTER', 'AREA'], input2);

const barObject2 = new BasicClass(['BAR'], input);

// const boxPlotObject = new BasicClass(['BOX'], input15);
// const bubbleObject = new BasicClass(['BUBBLE'], input5);//fix category labels
// const donutChartObject = new BasicClass(['DONUT'], input6);
// const funnelObject = new BasicClass(['FUNNEL'], input11);
// const gaugeObject = new BasicClass(['GAUGE'], input14); // STILL NEEDS WORK
// const heatMapObject = new BasicClass(['HEATMAP'], input4);
// const lineObject = new BasicClass(['LINE', 'SCATTER', ], input3);
// const pieChartObject = new BasicClass(['PIE'], input6);
// const polarObject = new BasicClass(['POLAR'], input12);
// const radarObject = new BasicClass(['RADAR'], input13);
// const scatterObject = new BasicClass(['SCATTER'], input3);
// const stackedBarObject = new BasicClass(['STACKEDBAR'], input);
// const sunburstObject = new HierarchyClass(['SUNBURST'], input9); // fix labels
// const treeDiagramObject = new HierarchyClass(['TREEDIAGRAM'], input7);
// const treeMapObject = new HierarchyClass(['TREEMAP'], input8);
// const waterfallObject = new BasicClass(['WATERFALL'], input10);
// relativeNodeSize('#chart', testDataScatterPlot, options);
// const iciclePlotObject = new HierarchyClass(['ICICLE'], input8);
// const input16 = {
//   data: [[2, 5, 3, 6], [5, 1, 0, 4], [11, 2, 3, 7], [0, 8, 3, 5], ['CAT1', 'CAT2', 'CAT3', 'CAT4']],
//   selector: '#chart',
//   options,
// };
// sort('#chart', testDataBarChart, options);
// const chordDiagramObject = new HierarchyClass(['CHORD'], input16);
// createDendrogram(treeDiagramData, '#chart', options);
// createRadialTree(treeDiagramData, '#chart', options);
// createMarimekkoChart(
//   [
//     {
//       category: 'Food',
//       children: [
//         { subCategory: 'Groceries', percentage: 0.6 },
//         { subCategory: 'Restaurants', percentage: 0.4 }
//       ],
//     },
//     {
//       category: 'Travel',
//       children: [
//         { subCategory: 'Transportation', percentage: 0.7 },
//         { subCategory: 'Hotels', percentage: 0.3 }
//       ],
//     },
//     {
//       category: 'Bills',
//       children: [
//         { subCategory: 'Electric', percentage: 0.2 },
//         { subCategory: 'Gas', percentage: 0.4 },
//         { subCategory: 'Water', percentage: 0.2 },
//         { subCategory: 'Internet', percentage: 0.2 },
//       ],
//     }
//   ],
//   '#chart',

//   options
// );
// createAdjacencyMatrix({
//   nodes: [
//     { id: 'A' },
//     { id: 'B' },
//     { id: 'C' },
//     { id: 'D' }
//   ],
//   links: [
//     { source: 'A', target: 'A', value: 1 },
//     { source: 'A', target: 'B', value: 2 },
//     { source: 'A', target: 'C', value: 3 },
//     { source: 'A', target: 'D', value: 1 },
//     { source: 'B', target: 'A', value: 2 },
//     { source: 'B', target: 'B', value: 1 },
//     { source: 'B', target: 'C', value: 1 },
//     { source: 'B', target: 'D', value: 3 },
//     { source: 'C', target: 'A', value: 3 },
//     { source: 'C', target: 'B', value: 1 },
//     { source: 'C', target: 'C', value: 1 },
//     { source: 'C', target: 'D', value: 2 },
//     { source: 'D', target: 'A', value: 1 },
//     { source: 'D', target: 'B', value: 3 },
//     { source: 'D', target: 'C', value: 2 },
//     { source: 'D', target: 'D', value: 1 }
//   ],
// }, '#chart', options);
// gradient('#chart', 'blue', 'red', 'BAR', 'x', testDataBarChart);// fix for waterfall and stackedbar chart x axis, funnel y axis
// onHover('#chart', [options, options1, options13]);
