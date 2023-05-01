/* eslint-disable import/extensions */
import * as d3 from 'd3';
import BasicClass from '../src/Classes/BasicClass.js';
import HierarchyClass from '../src/Classes/HierarchyClass.js';
import GraphSuperClass from '../src/Classes/GraphSuperClass.js';

import { inputData } from '../src/SampleData/inputData.js';
import { superData } from '../src/SampleData/superData.js';

import onHover from '../src/AddFunctionality/onHover.js';
import zoom from '../src/AddFunctionality/zoom.js';
import gradient from '../src/AddFunctionality/gradient.js';
import addAnimation from '../src/AddFunctionality/animate/animateBasic/animateBasic.js';
import stack from '../src/AddFunctionality/stack.js';
import sort from '../src/AddFunctionality/sort.js';
import createChoroplethMap from '../src/Charts/geoCharts/choroplethMap.js';
import createPointMap from '../src/Charts/geoCharts/pointMap.js';
import animateByYValue from '../src/AddFunctionality/animate/animateBasic/animateBasic.js';
import crreateWordCloud from '../src/Charts/HierarchicalCharts/wordCloud.js';
import createWordCloud from '../src/Charts/HierarchicalCharts/wordCloud.js';

const superObjects = {};
superObjects.testFor_string_number = new GraphSuperClass(superData.basic);
superObjects.testFor_number_number = new GraphSuperClass(superData.hierarchic);
console.log(superObjects);

const superBarObject = new GraphSuperClass(superData.basic);
// superBarObject.draw('bar');
// const barObjectTemp = new BasicClass(['BAR'], inputData.input1);

// onHover('#scatter', options);

// Adds Charts
// Basic Charts
// const areaObject2 = new BasicClass(['SCATTER'], inputData.input24);
// const barObject = new BasicClass(['SCATTER', 'SCATTER', 'SCATTER', 'AREA'], inputData.input2);
const wordCloudObject = new HierarchyClass(['WORDCLOUD'], inputData.input30);
// onHover('#chart', [options]);
// const bubbleObject = new BasicClass(['BUBBLE'], inputData.input5);// fix category labels
// const areaObject = new BasicClass(['DONUT'], inputData.input23);
// const donutChartObject2 = new BasicClass(['AREA'], inputData.input4);
// const funnelObject = new BasicClass(['FUNNEL'], inputData.input11);
// const gaugeObject = new BasicClass(['GAUGE'], inputData.input14); // STILL NEEDS WORK
// const heatMapObject = new BasicClass(['HEATMAP'], inputData.input4);
// const lineObject = new BasicClass(['LINE', 'SCATTER'], inputData.input3);
// const pieChartObject = new BasicClass(['STACKEDBAR'], inputData.input);
// pieChartObject.updateInput(inputData.input1);
// const polarObject = new BasicClass(['POLAR'], inputData.input12);
// const radarObject = new BasicClass(['RADAR'], inputDatainput13);
// const stackedBarObject = new BasicClass(['STACKEDBAR'], inputData.input);
// const sunburstObject = new HierarchyClass(['SUNBURST'], inputData.input9); // fix labels
// const treeDiagramObject = new HierarchyClass(['TREEDIAGRAM'], inputData.input7);
// const treeMapObject = new HierarchyClass(['TREEMAP'], inputData.input8);
// const waterfallObject = new BasicClass(['WATERFALL'], inputData.input10);
// // relativeNodeSize('#chart', testDataScatterPlot, options);
// const iciclePlotObject = new HierarchyClass(['ICICLE'], inputData.input8);
// const chordDiagramObject = new HierarchyClass(['CHORD'], inputData.input16);
// const sankeyDiagramObject = new HierarchyClass(['SANKEY'], input17);
// const clusterDiagramObject = new HierarchyClass(['CLUSTER'], inputData.input18);
// const voronoiTreemapObject = new HierarchyClass(['VORONOI'], inputData.input8);
// const dendrogramObject = new HierarchyClass(['DENDROGRAM'], inputData.input8);
// const radialTreeObject = new HierarchyClass(['RADIALTREE'], inputData.input22);
// const scatterObject = new BasicClass(['SCATTER'], inputData.input3);
// const marimekkoChartObject = new HierarchyClass(['MARIMEKKO'], inputData.input19);
// const adjacencyMatrixObject = new HierarchyClass(['ADJACENCY'], inputData.input20);
// const lineAndScatterObject = new BasicClass(['LINE', 'SCATTER'], input21);
// const barObject2 = new BasicClass(['BAR'], inputData.input3);
// const boxPlotObject = new BasicClass(['BOX'], input15);
// setTimeout(() => barObject2.updateInput(inputData.input3), 5000);
// barObject2.updateInput(inputData.input3);
// areaObject.updateInput(inputData.input5);
// setTimeout(() => areaObject2.updateInput(inputData.input2), 2000);
// setTimeout(() => areaObject.updateInput(inputData.input4), 4000);
// setTimeout(() => areaObject.updateInput(inputData.input5), 6000);
// setTimeout(() => areaObject.updateInput(inputData.input4), 8000);
// setTimeout(() => areaObject.removeChart('scatter-plot'), 8000);
// createPointMap(dataset, options, '#chart');
// const barObject3 = new BasicClass(['BAR'], inputData.input4);
// areaObject.updateInput(inputData.input5);
// setTimeout(() => pieChartObject.updateInput(inputData.input29), 2000);
// setTimeout(() => areaObject2.updateInput(inputData.input5), 2000);
// setTimeout(() => areaObject2.removeChart('SCATTER'), 5000);
// setTimeout(() => {
//   areaObject = new BasicClass(['LINE'], inputData.input26);
// }, 6000);
// setTimeout(() => areaObject2.updateInput(inputData.input26), 6000);
// setTimeout(() => areaObject.updateInput(inputData.input24), 7500);