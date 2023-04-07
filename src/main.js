import * as d3 from 'd3';
import BasicClass from './Classes/BasicClass';
import HierarchyClass from './Classes/HierarchyClass';
import {
  bubbleChartData, testDataScatterPlot, treeDiagramData, treeMapData, dataSet1, testDataBarChart, extremeScatterPlot1, extremeScatterPlot2,
  stackedBarChartData, heatMapData
} from './SampleData/chartData';
import { options, options2, optionsForceDirected } from './SampleData/optionsData';
import onHover from './AddFunctionality/onHover';
import zoom from './AddFunctionality/zoom';
import gradient from './AddFunctionality/gradient';

const input = {
  data: [
    {
      label: 'Jan',
      values: [
        { group: 'Group A', value: 10 },
        { group: 'Group B', value: 20 },
        { group: 'Group C', value: 30 }
      ],
    },
    {
      label: 'Feb',
      values: [
        { group: 'Group A', value: 15 },
        { group: 'Group B', value: 25 },
        { group: 'Group C', value: 35 }
      ],
    },
    {
      label: 'Mar',
      values: [
        { group: 'Group A', value: 20 },
        { group: 'Group B', value: 30 },
        { group: 'Group C', value: 40 }
      ],
    }
  ],
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
  data: treeDiagramData,
  selector: '#chart',
  options,
};

const input3 = {
  data: testDataScatterPlot,
  selector: '#chart',
  options,
};

const input4 = {
  data: [
    { xLabel: 'A', yLabel: '1', value: 50 },
    { xLabel: 'A', yLabel: '2', value: 100 },
    { xLabel: 'A', yLabel: '3', value: 150 },
    { xLabel: 'B', yLabel: '1', value: 200 },
    { xLabel: 'B', yLabel: '2', value: 250 },
    { xLabel: 'B', yLabel: '3', value: 300 },
    { xLabel: 'C', yLabel: '1', value: 350 },
    { xLabel: 'C', yLabel: '2', value: 400 },
    { xLabel: 'C', yLabel: '3', value: 450 }
  ],
  selector: '#chart',
  options: {
    width: 800, // adjust as necessary
    height: 600, // adjust as necessary
    margin: {
      top: 50, right: 50, bottom: 50, left: 100,
    },
    colorScale: d3.interpolateRdYlBu, // use a diverging color scale
    xLabel: 'X Axis Label',
    yLabel: 'Y Axis Label',
  },

};
const input5 = {
  data: bubbleChartData,
  selector: '#chart',
  options: options2,
};
const testObject3 = new BasicClass(['HEATMAP'], input4);

const testObject = new BasicClass(['STACKEDBAR'], input);
const testObject5 = new BasicClass(['BUBBLE'], input5);
// zoom('#chart');
const testObject2 = new HierarchyClass(['TREEDIAGRAM'], input2);
// gradient('#chart', 'red', 'blue', 'y');
// zoom('#chart');
const scatterObject = new BasicClass(['SCATTER', 'AREA', 'LINE'], input3);
// const testObject4 = new BasicClass(['PIE'], input4);
// testObject.addGraphs('BAR');// update data
// testObject.updateInput(input2);
// testObject.removeChart('SCATTER');
// testObject.removeChart("AREA");
