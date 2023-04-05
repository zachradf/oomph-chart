import BasicClass from './Classes/BasicClass';
import HierarchyClass from './Classes/HierarchyClass';
import { testDataScatterPlot, treeMapData, dataSet1, testDataBarChart } from './SampleData/chartData';
import { options, options2, optionsForceDirected } from './SampleData/optionsData';

const input = {
  data: testDataScatterPlot,
  selector: '#chart',
  options,
};

const input2 = {
  data: treeMapData,
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
const testObject = new BasicClass(['SCATTER', 'LINE', 'AREA', 'BUBBLE'], input);
const testObject2 = new HierarchyClass(['TREEMAP', 'SUNBURST'], input2);
const testObject3 = new BasicClass(['BAR'], input3);
const testObject4 = new BasicClass(['PIE'], input4);
// testObject.addGraphs('BAR');// update data
// testObject.updateInput(input2);
// testObject.removeChart("SCATTER");
// testObject.removeChart("AREA");
