// import * as d3 from 'd3';
import BasicClass from './Classes/BasicClass';
import HierarchyClass from './Classes/HierarchyClass';
import {
  bubbleChartData, testDataScatterPlot, treeDiagramData, treeMapData, dataSet1, testDataBarChart, extremeScatterPlot1, extremeScatterPlot2,
  stackedBarChartData2, heatMapData2, testDataDonutChart, sunburstData
} from './SampleData/chartData';
import { options, options2, options3, options4, optionsForceDirected } from './SampleData/optionsData';
import onHover from './AddFunctionality/onHover';
import zoom from './AddFunctionality/zoom';
import gradient from './AddFunctionality/gradient';

const input = {
  data: stackedBarChartData2,
  selector: '#chart',
  options: {
    width: 600,
    height: 400,
    margin: {
      top: 20, right: 20, bottom: 50, left: 50,
    },
    color: ['#98abc5', '#8a89a6', '#7b6888'],
  },
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
  data: heatMapData2,
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
  options: options,
};
const input8 = {
  data: treeMapData,
  selector: '#chart',
  options: options,
};
const input9 = {
  data: sunburstData,
  selector: '#chart',
  options: options4,
};

const lineObject = new BasicClass(['LINE'], input3);
const areaObject = new BasicClass(['AREA'], input3);
const scatterObject = new BasicClass(['SCATTER'], input3);
const barObject = new BasicClass(['BAR'], input2);
const stackedBarObject = new BasicClass(['STACKEDBAR'], input);
const bubbleObject = new BasicClass(['BUBBLE'], input5);
const heatMapObject = new BasicClass(['HEATMAP'], input4);
const donutChartObject = new BasicClass(['DONUT'], input6);
const pieChartObject = new BasicClass(['PIE'], input6);
const treeDiagramObject = new HierarchyClass(['TREEDIAGRAM'], input7);
const treeMapObject = new HierarchyClass(['TREEMAP'], input8);
const sunburstObject = new HierarchyClass(['SUNBURST'], input9);
sunburstObject.removeChart('SUNBURST');
treeMapObject.removeChart('TREEMAP');
treeDiagramObject.removeChart('TREEDIAGRAM');
pieChartObject.removeChart('PIE');
donutChartObject.removeChart('DONUT');
heatMapObject.removeChart('HEATMAP');
bubbleObject.removeChart('BUBBLE');
stackedBarObject.removeChart('STACKEDBAR');
barObject.removeChart('BAR');
scatterObject.removeChart('SCATTER');
areaObject.removeChart('AREA');
lineObject.removeChart('LINE');

// gradient('#chart', 'red', 'blue', 'BAR', 'y');
// zoom('#chart', 'STACKEDBAR');
