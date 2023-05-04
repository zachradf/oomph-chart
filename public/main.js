// import { create } from 'd3-selection';
import BasicClass from '../src/oomph-visualizer/d3/render-legacy/basic.js';
import HierarchyClass from '../src/oomph-visualizer/d3/render-legacy/hierarchy.js';
import OomphChart from '../src/oomph-chart/index.js';

import { inputData } from '../src/sample-data/input.js';
import { superData } from '../src/sample-data/super.js';

import onHover from '../src/oomph-visualizer/d3/actions/on-hover.js';
import zoom from '../src/oomph-visualizer/d3/actions/zoom.js';
import gradient from '../src/oomph-visualizer/d3/actions/gradient.js';
import createChoropleth from '../src/oomph-visualizer/d3/charts/geographical/choropleth.js';
import createPointMap from '../src/oomph-visualizer/d3/charts/geographical/point.js';
import { chartData } from '../src/sample-data/chart.js';

const superObjects = {};
superObjects.testFor_string_number = new OomphChart(superData.basic);
superObjects.testFor_number_number = new OomphChart(superData.hierarchic);
console.log(superObjects);

const superBarObject = new OomphChart(superData.basic);
// superBarObject.render('bar');
// const barObjectTemp = new BasicClass(['bar'], inputData.input1);
// onHover('#scatter', options);
// createPointMap(chartData.choropleth, {
//   width: 1960,
//   height: 1600,
//   //   apiUrl: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
//   apiUrl: 'https://unpkg.com/us-atlas@3/states-10m.json',
//   colorScale: d3.interpolateBlues, // Use the d3.interpolateBlues color scale
//   title: 'Sample Choropleth Map',
//   showLabels: true,
//   fontSize: 12, // The font size for region labels
// }, '#chart');
// Adds Charts
// Basic Charts
// const areaObject2 = new BasicClass(['scatter'], inputData.input2);
const barObject = new BasicClass(['pie'], inputData.input6);
// const wordCloudObject = new HierarchyClass(['wordcloud'], inputData.input30);
// onHover('#chart', [options]);
// const bubbleObject = new BasicClass(['bubble'], inputData.input5);// fix category labels
// const areaObject = new BasicClass(['bar'], inputData.input23);
// const donutChartObject2 = new BasicClass(['donut'], inputData.input4);
// const funnelObject = new BasicClass(['funnel'], inputData.input11);
// const gaugeObject = new BasicClass(['gauge'], inputData.input14); // STILL NEEDS WORK
// const heatMapObject = new BasicClass(['heatmap'], inputData.input4);
// const lineObject = new BasicClass(['line', 'scatter'], inputData.input3);
// const pieChartObject = new BasicClass(['stackedbar'], inputData.input);
// pieChartObject.updateInput(inputData.input1);
// const polarObject = new BasicClass(['polar'], inputData.input12);
// const radarObject = new BasicClass(['radar'], inputDatainput13);
// const stackedBarObject = new BasicClass(['stackedbar'], inputData.input);
// const sunburstObject = new HierarchyClass(['sunburst'], inputData.input9); // fix labels
// const treeDiagramObject = new HierarchyClass(['treediagram'], inputData.input7);
// const treeMapObject = new HierarchyClass(['treemap'], inputData.input8);
// const waterfallObject = new BasicClass(['waterfall'], inputData.input10);
// // relativeNodeSize('#chart', testDataScatterPlot, options);
// const iciclePlotObject = new HierarchyClass(['icicle'], inputData.input8);
// const chordDiagramObject = new HierarchyClass(['chord'], inputData.input16);
// const sankeyDiagramObject = new HierarchyClass(['sankey'], inputData.input17);
// const clusterDiagramObject = new HierarchyClass(['cluster'], inputData.input18);
// const voronoiTreemapObject = new HierarchyClass(['voronoi'], inputData.input8);
// const dendrogramObject = new HierarchyClass(['dendogram'], inputData.input8);
// const radialTreeObject = new HierarchyClass(['radialtree'], inputData.input22);
// const scatterObject = new BasicClass(['scatter'], inputData.input3);
// const marimekkoChartObject = new HierarchyClass(['marimekko'], inputData.input19);
// const adjacencyMatrixObject = new HierarchyClass(['adjacency'], inputData.input20);
// const lineAndScatterObject = new BasicClass(['line', 'scatter'], input21);
// const barObject2 = new BasicClass(['bar'], inputData.input3);
// const boxPlotObject = new BasicClass(['box'], input15);
// setTimeout(() => barObject2.updateInput(inputData.input3), 5000);
// barObject2.updateInput(inputData.input3);
// areaObject.updateInput(inputData.input5);
// setTimeout(() => areaObject2.updateInput(inputData.input2), 2000);
// setTimeout(() => areaObject.updateInput(inputData.input4), 4000);
// setTimeout(() => areaObject.updateInput(inputData.input5), 6000);
// setTimeout(() => areaObject.updateInput(inputData.input4), 8000);
// setTimeout(() => areaObject.removeChart('scatter-plot'), 8000);
// createPointMap(dataset, options, '#chart');
// const barObject3 = new BasicClass(['bar'], inputData.input4);
// areaObject.updateInput(inputData.input5);
// setTimeout(() => pieChartObject.updateInput(inputData.input29), 2000);
// setTimeout(() => barObject.updateInput(inputData.input21), 2000);
// setTimeout(() => barObject.updateInput(inputData.input2), 5000);
// setTimeout(() => barObject.updateInput(inputData.input21), 8000);

// setTimeout(() => areaObject2.updateInput(inputData.input24), 6500);
// setTimeout(() => areaObject2.updateInput(inputData.input2), 10000);
// setTimeout(() => areaObject2.removeChart('scatter'), 15000);

// setTimeout(() => areaObject2.removeChart('scatter'), 5000);
// setTimeout(() => {
//   areaObject = new BasicClass(['line'], inputData.input26);
// }, 6000);
// setTimeout(() => areaObject2.updateInput(inputData.input26), 6000);
// setTimeout(() => areaObject.updateInput(inputData.input24), 7500);
