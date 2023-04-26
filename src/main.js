/* eslint-disable import/extensions */
import * as d3 from 'd3';
import BasicClass from './Classes/BasicClass.js';
import HierarchyClass from './Classes/HierarchyClass.js';
import GraphSuperClass from './Classes/graphSuperClass.js';

import { inputData } from './SampleData/inputData.js';

import onHover from './AddFunctionality/onHover.js';
import zoom from './AddFunctionality/zoom.js';
import gradient from './AddFunctionality/gradient.js';
import addAnimation from './AddFunctionality/animate.js';
import stack from './AddFunctionality/stack.js';
import sort from './AddFunctionality/sort.js';
import createChoroplethMap from './Charts/geoCharts/choroplethMap.js';
import createPointMap from './Charts/geoCharts/pointMap.js';
import animateByYValue from './AddFunctionality/animate.js';

// const superObjects = {};
// superObjects.string_number_test = new GraphSuperClass(testDataBarChart);
// superObjects.number_number_test = new GraphSuperClass(testDataScatterPlot);
// console.log(superObjects);

// onHover('#scatter', options);

// Adds Charts
// Basic Charts
// const areaObject = new BasicClass(['SCATTER'], inputData.input3);
// const barObject = new BasicClass(['SCATTER', 'SCATTER', 'SCATTER', 'AREA'], inputData.input2);

// const bubbleObject = new BasicClass(['BUBBLE'], inputData.input5);// fix category labels
// const areaObject = new BasicClass(['DONUT'], inputData.input23);
// const donutChartObject2 = new BasicClass(['AREA'], inputData.input4);
// const funnelObject = new BasicClass(['FUNNEL'], inputData.input11);
// // const gaugeObject = new BasicClass(['GAUGE'], inputData.input14); // STILL NEEDS WORK
// const heatMapObject = new BasicClass(['HEATMAP'], inputData.input4);
// // const lineObject = new BasicClass(['LINE', 'SCATTER'], inputData.input3);
// const pieChartObject = new BasicClass(['PIE'], inputData.input6);
// const polarObject = new BasicClass(['POLAR'], inputData.input12);
// const radarObject = new BasicClass(['RADAR'], inputDatainput13);
// const stackedBarObject = new BasicClass(['STACKEDBAR'], inputData.input);
// const sunburstObject = new HierarchyClass(['SUNBURST'], inputData.input9); // fix labels
// const treeDiagramObject = new HierarchyClass(['TREEDIAGRAM'], inputData.input7);
// const treeMapObject = new HierarchyClass(['TREEMAP'], inputData.input8);
// const waterfallObject = new BasicClass(['WATERFALL'], inputData.input10);
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
const barObject2 = new BasicClass(['BAR'], input3);
// const boxPlotObject = new BasicClass(['BOX'], input15);

// setTimeout(animateByYValue('#chart', inputData.input3.data[0], inputData.input3.options), 1000);
// createPointMap(dataset, options, '#chart');
