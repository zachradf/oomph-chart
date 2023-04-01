import { D3Object } from './d3ObjectClass.js';

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

const input = {
    data: testDataScatterPlot,
    selector: "#chart",
    options: options
}
const testObject = new D3Object(["SCATTER"], input);


console.log(testObject.graphArray);
testObject.addGraphs(["AREA", "LINE"]);
console.log(testObject.graphArray);