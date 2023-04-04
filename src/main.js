import BasicClass from './Classes/BasicClass.js';
import HierarchyClass from './Classes/HierarchyClass.js';
import { testDataScatterPlot, treeMapData, testDataBarChart } from '../../../../../src/SampleData/chartData.js';
import { options, options2, optionsForceDirected } from '../../../../../src/SampleData/optionsData.js';

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

// console.log(testObject.graphArray);
// testObject.addGraphs(["AREA", "LINE"]);
// console.log(testObject.graphArray);
testObject.addGraphs('PIE');// update data
// testObject.updateInput(input2);
// testObject.removeChart("SCATTER");
// testObject.removeChart("AREA");
// testObject2.removeChart("SUNBURST");
// testObject2.updateInput
// testObject2.addGraphs("FORCE");
