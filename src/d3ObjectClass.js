import createBarChart from '/src/barChart.js';
import createScatterPlot from '/src/scatterPlot.js';
import createD3LineGraph from '/src/lineGraph.js';
export class D3Object {
    constructor() {
        this.defaultOptions = {};
        this.defaultOptions.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.defaultOptions.width = 600;
        this.defaultOptions.height = 400;
        this.defaultOptions.radius = 5;
        this.defaultOptions.color = "red";
    }
    createBarChart(data, selector = "#chart", options = this.defaultOptions){
         createBarChart(data, selector, options);
    }
    createScatterPlot(data, selector = "#chart", options = this.defaultOptions){
        createScatterPlot(data, selector, options);
    }
    createLineGraph(data, selector = "#chart", options = this.defaultOptions){
        createD3LineGraph(data, selector, options);
    }
}

