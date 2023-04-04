import BasicClass from './Classes/BasicClass.js';  
import HierarchyClass from './Classes/HierarchyClass.js';
import { testDataScatterPlot, treeMapData, testDataBarChart } from './SampleData/chartData.js';
import { options, options2, optionsForceDirected } from './SampleData/optionsData.js';

const input = {
  data: testDataScatterPlot,
  selector: '#chart',
  options: options2,
};

const input2 = {
  data: treeMapData,
  selector: '#chart',
  options,
};
const testObject = new BasicClass(['SCATTER', 'LINE', 'AREA'], input);
const testObject2 = new HierarchyClass(['TREEMAP', 'SUNBURST'], input2);

testObject.addGraphs('PIE');// update data
// testObject.updateInput(input2);
// testObject.removeChart("SCATTER");
// testObject.removeChart("AREA");
