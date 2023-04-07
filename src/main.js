import BasicClass from './Classes/BasicClass';
import HierarchyClass from './Classes/HierarchyClass';
import {
  bubbleChartData, testDataScatterPlot, treeDiagramData, treeMapData, dataSet1, testDataBarChart, extremeScatterPlot1, extremeScatterPlot2,
} from './SampleData/chartData';
import { options, options2, optionsForceDirected } from './SampleData/optionsData';

const input = {
  data: extremeScatterPlot1,
  selector: '#chart',
  options,
};

const input2 = {
  data: treeDiagramData,
  selector: '#chart',
  options,
};

const input3 = {
  data: dataSet1,
  selector: '#chart',
  options,
};

const input4 = {
  data: testDataBarChart,
  selector: '#chart',
  options,
};
const input5 = {
  data: bubbleChartData,
  selector: '#chart',
  options: options2,
};

// const testObject = new BasicClass(['SCATTER', 'LINE', 'AREA'], input);
// const testObject5 = new BasicClass(['BUBBLE'], input5);
const testObject2 = new HierarchyClass(['TREEDIAGRAM'], input2);
// const testObject3 = new BasicClass(['BAR'], input3);
// const testObject4 = new BasicClass(['PIE'], input4);
// testObject.addGraphs('BAR');// update data
// testObject.updateInput(input2);
// testObject.removeChart('SCATTER');
// testObject.removeChart("AREA");
