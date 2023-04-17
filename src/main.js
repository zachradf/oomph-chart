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
  polarChartOptions, radarChartOptions, gaugeOptions,
} from './SampleData/optionsData.js';
import onHover from './AddFunctionality/onHover.js';
import zoom from './AddFunctionality/zoom.js';
import gradient from './AddFunctionality/gradient.js';
import addAnimation from './AddFunctionality/animate.js';
import stack from './AddFunctionality/stack.js';

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
  options: options,
};

// Adds Charts
const areaObject = new BasicClass(['AREA'], input3);
const barObject = new BasicClass(['BAR'], input2);
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

gradient('#chart', 'blue', 'red', 'SCATTER', 'y', testDataScatterPlot);// fix for waterfall and stackedbar chart x axis, funnel y axis
// addAnimation('#chart', testDataScatterPlot, options);
// onHover('#chart', options);// add default darker shade for gradient within an element
// gradient('#chart', 'red', 'blue', 'SCATTER', 'y');
// gradient('#chart', 'red', 'blue', 'BAR', 'x');
// zoom('#chart', 'SCATTER');



// Removes Charts
areaObject.removeChart('AREA');
// sunburstObject.removeChart('SUNBURST');
// treeMapObject.removeChart('TREEMAP');
// treeDiagramObject.removeChart('TREEDIAGRAM');
// pieChartObject.removeChart('PIE');
// donutChartObject.removeChart('DONUT');
// heatMapObject.removeChart('HEATMAP');
// bubbleObject.removeChart('BUBBLE');
// stackedBarObject.removeChart('STACKEDBAR');
barObject.removeChart('BAR');
// scatterObject.removeChart('SCATTER');
// lineObject.removeChart('LINE');
// waterfallObject.removeChart('WATERFALL');
// funnelObject.removeChart('FUNNEL');
// polarObject.removeChart('POLAR');
// radarObject.removeChart('RADAR');
// gaugeObject.removeChart('GAUGE');

// TODO: set a default value in each class for options, also add updated options objects to pass these
// sunburstObject.updateInput('SUNBURST');
// treeMapObject.updateInput('TREEMAP');
// treeDiagramObject.updateInput('TREEDIAGRAM');
// pieChartObject.updateInput('PIE');
// donutChartObject.updateInput('DONUT');
// heatMapObject.updateInput('HEATMAP');
// bubbleObject.updateInput('BUBBLE');
// stackedBarObject.updateInput('STACKEDBAR');
// barObject.updateInput('BAR');
// scatterObject.updateInput('SCATTER');
// areaObject.updateInput('AREA');
// lineObject.updateInput('LINE');

// gradient('#chart', 'red', 'blue', 'BAR', 'y');
// zoom('#chart', 'STACKEDBAR');
