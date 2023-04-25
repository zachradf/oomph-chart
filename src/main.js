/* eslint-disable import/extensions */
import * as d3 from 'd3';
import BasicClass from './Classes/BasicClass.js';
import HierarchyClass from './Classes/HierarchyClass.js';
import GraphSuperClass from './Classes/data/graphSuperClass.js';
import {
  input, input2, input3, input4, input5, input6, input7, input8, input9, input10, input11, input12, input13, input14, input15, input16, input17, input18, input19, input20, input21, input1, input22, input23
} from './SampleData/inputData.js';

import onHover from './AddFunctionality/onHover.js';
import zoom from './AddFunctionality/zoom.js';
import gradient from './AddFunctionality/gradient.js';
import addAnimation from './AddFunctionality/animate.js';
import stack from './AddFunctionality/stack.js';
import sort from './AddFunctionality/sort.js';
import createChoroplethMap from './Charts/geoCharts/choroplethMap.js';
import createPointMap from './Charts/geoCharts/pointMap.js';

const superObjects = {};
superObjects.string_number_test = new GraphSuperClass(testDataBarChart);
superObjects.number_number_test = new GraphSuperClass(testDataScatterPlot);
console.log(superObjects);

// onHover('#scatter', options);

// Adds Charts
// Basic Charts
// const areaObject = new BasicClass(['AREA', 'SCATTER'], input3);
// const barObject = new BasicClass(['SCATTER', 'SCATTER', 'SCATTER', 'AREA'], input2);

// const bubbleObject = new BasicClass(['BUBBLE'], input5);//fix category labels
// const areaObject = new BasicClass(['DONUT'], input23);
// const donutChartObject2 = new BasicClass(['AREA'], input4);
// const funnelObject = new BasicClass(['FUNNEL'], input11);
// // const gaugeObject = new BasicClass(['GAUGE'], input14); // STILL NEEDS WORK
// const heatMapObject = new BasicClass(['HEATMAP'], input4);
// // const lineObject = new BasicClass(['LINE', 'SCATTER'], input3);
// const pieChartObject = new BasicClass(['PIE'], input6);
// const polarObject = new BasicClass(['POLAR'], input12);
// const radarObject = new BasicClass(['RADAR'], input13);
// const stackedBarObject = new BasicClass(['STACKEDBAR'], input);
// const sunburstObject = new HierarchyClass(['SUNBURST'], input9); // fix labels
// const treeDiagramObject = new HierarchyClass(['TREEDIAGRAM'], input7);
// const treeMapObject = new HierarchyClass(['TREEMAP'], input8);
// const waterfallObject = new BasicClass(['WATERFALL'], input10);
// // // relativeNodeSize('#chart', testDataScatterPlot, options);
// const iciclePlotObject = new HierarchyClass(['ICICLE'], input8);
// const chordDiagramObject = new HierarchyClass(['CHORD'], input16);
// // // const sankeyDiagramObject = new HierarchyClass(['SANKEY'], input17);
// const clusterDiagramObject = new HierarchyClass(['CLUSTER'], input18);
// const voronoiTreemapObject = new HierarchyClass(['VORONOI'], input8);
// const dendrogramObject = new HierarchyClass(['DENDROGRAM'], input8);
// const radialTreeObject = new HierarchyClass(['RADIALTREE'], input22);
// const scatterObject = new BasicClass(['SCATTER'], input3);
// const marimekkoChartObject = new HierarchyClass(['MARIMEKKO'], input19);
// const adjacencyMatrixObject = new HierarchyClass(['ADJACENCY'], input20);
// const lineAndScatterObject = new BasicClass(['LINE', 'SCATTER'], input21);
// const barObject2 = new BasicClass(['BAR'], input1);
// const boxPlotObject = new BasicClass(['BOX'], input15);

// gradient('#chart', 'blue', 'red', 'BAR', 'x', testDataBarChart);// fix for waterfall and stackedbar chart x axis, funnel y axis
// onHover('#chart', [options, options1, options13]);
// const dataset = [
//   { id: '01', value: 10 },
//   { id: '02', value: 20 },
//   { id: '03', value: 30 },
//   { id: '09', value: 90 },
//   { id: '22', value: 100 },
//   { id: '43', value: 60 }
// ];

const options = {
  apiUrl: 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json',
  width: 800,
  height: 600,
  colorScale: d3.interpolateBlues,
  title: 'Point Map',
  showLabels: true,
  fontSize : 8,
};


// createChoroplethMap(dataset, options, '#chart');
// Example dataset
const dataset = [
  { coordinates: [40.7128, -74.0060] }, // New York City
  { coordinates: [34.0522, -118.2437] }, // Los Angeles
  { coordinates: [41.8781, -87.6298] }, // Chicago
  { coordinates: [29.7604, -95.3698] }, // Houston
  { coordinates: [37.7749, -122.4194] }, // San Francisco
];

// Example options object
// const options = {
//   apiUrl: 'https://d3js.org/us-10m.v1.json',
//   width: 800,
//   height: 600,
//   pointRadius: 5,
//   pointColor: 'blue',
//   backgroundColor: '#ccc',
// };


createPointMap(dataset, options, '#chart');
