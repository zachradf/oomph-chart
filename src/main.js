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

  const forceDirectedData = {
    nodes: [
      { id: "A", group: 1 },
      { id: "B", group: 1 },
      { id: "C", group: 1 },
      { id: "D", group: 2 },
      { id: "E", group: 2 },
      { id: "F", group: 2 },
    ],
    links: [
      { source: "A", target: "B", value: 1 },
      { source: "B", target: "C", value: 1 },
      { source: "C", target: "A", value: 1 },
      { source: "D", target: "E", value: 2 },
      { source: "E", target: "F", value: 2 },
      { source: "F", target: "D", value: 2 },
      { source: "C", target: "D", value: 3 },
    ]
  };
  const treeMapData = {
    "name": "root",
    "children": [
      { "name": "A", "value": 100 },
      { "name": "B", "value": 80 },
      { "name": "C", "value": 120 },
      { "name": "D", "value": 60 }
    ]
  };

  const selector = "#chart";
  const optionsForceDirected = {
    width: 600,
    height: 600,
    color: d3.scaleOrdinal(d3.schemeCategory10),
    linkDistance: 50,
    chargeStrength: -200
  };
  
  // createForceDirectedGraph(data, selector, options);
  

const options = {}
options.margin = { top: 20, right: 20, bottom: 30, left: 40 };
options.width = 600;
options.height = 400;
options.radius = 5;
options.color = "blue";
options.showLabels = true;



const options2 = {}
options2.margin = { top: 20, right: 20, bottom: 30, left: 40 };
options2.width = 600;
options2.height = 400;
options2.radius = 5;
options2.color = "black";
options2.showLabels = true;
const input = {
  data: testDataScatterPlot,
  selector: "#chart",
  options: options2
}

const input2 = {
  data: forceDirectedData,
  selector: "#chart",
  options: optionsForceDirected
}
const testObject = new D3Object(["SCATTER"], input);
const testObject2 = new hierarchyObject(["FORCE"], input2);

// console.log(testObject.graphArray);
// testObject.addGraphs(["AREA", "LINE"]);
// console.log(testObject.graphArray);
testObject2
// testObject.updateInput(input2);
// testObject.removeChart("SCATTER");
// testObject.removeChart("AREA");
// testObject2.removeChart("SUNBURST");
// testObject2.updateInput
// testObject2.addGraphs("FORCE");