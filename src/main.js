import { D3Object } from './d3ObjectClass.js';
import { hierarchyObject } from '../hierarchyObjectClass.js';

const testDataBarChart = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 30 },
    { label: 'D', value: 40 },
    { label: 'E', value: 50 }
  ];

const testDataScatterPlot = [
    { x: 10, y: 20 },
    { x: 30, y: 50 },
    { x: 45, y: 10 },
    { x: 60, y: 90 },
    { x: 80, y: 60 }
  ];

const options = {}
options.margin = { top: 20, right: 20, bottom: 30, left: 40 };
options.width = 600;
options.height = 400;
options.radius = 5;
options.color = "blue";
options.showLabels = true;

  // Example usage
  const data = {
    "name": "root",
    "children": [
      { "name": "A", "value": 100 },
      { "name": "B", "value": 80 },
      { "name": "C", "value": 120 },
      { "name": "D", "value": 60 }
    ]
  };

const input = {
    data: testDataScatterPlot,
    selector: "#chart",
    options: options
}
const options2 = {}
options2.margin = { top: 20, right: 20, bottom: 30, left: 40 };
options2.width = 600;
options2.height = 400;
options2.radius = 5;
options2.color = "black";
options2.showLabels = true;
const input2 = {
  data: data,
  selector: "#chart",
  options: options2
}
const testObject = new D3Object(["SCATTER"], input);
const testObject2 = new hierarchyObject(["SUNBURST", "TREEMAP"], input2);

console.log(testObject.graphArray);
testObject.addGraphs(["AREA", "LINE"]);
console.log(testObject.graphArray);
// testObject.updateInput(input2);
testObject.removeChart("SCATTER");
testObject.removeChart("AREA");