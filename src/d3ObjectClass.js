import createBarChart from '/src/simpleCharts/barChart.js';
import createScatterPlot from '/src/simpleCharts/scatterPlot.js';
import createD3LineGraph from '/src/simpleCharts/lineGraph.js';
import createD3PieChart from '/src/simpleCharts/pieChart.js';
import createD3AreaChart from '/src/simpleCharts/areaChart.js';

export class D3Object {
    constructor(graphArray, input) {
        //EVENTUALLY ALL COMMON CHART FUNCTIONS WILL BE HERE
        this.graphArray = graphArray;
        this.input = input;
        this.input.selector = input.selector ? input.selector : "#chart";

        if(!input.options){
        this.input.options = {};
        this.input.options.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.input.options.width = 600;
        this.input.options.height = 400;
        this.input.options.radius = 5;
        this.input.options.color = "red";
        this.input.options.showLabels = true;

        } else {
            this.input.options = input.options;

        }
        
        this.createGraph = {
            'BAR' : createBarChart,
            'SCATTER' : createScatterPlot,
            'LINE' : createD3LineGraph,
            'PIE' : createD3PieChart,
            'AREA' : createD3AreaChart,
        }
        for (let i = 0; i < this.graphArray.length; i++) {
            this.createGraph[this.graphArray[i]](input.data, input.selector, input.options);
        }
    }
    createBarChart(data, selector, options){
         createBarChart(data, selector, options);
    }
    createScatterPlot(data, selector, options){
        createScatterPlot(data, selector, options);
    }
    createLineGraph(data, selector, options){
        createD3LineGraph(data, selector, options);
    }
    createPieChart(data, selector, options){
        createD3PieChart(data, selector, options);
    }
    createAreaChart(data, selector, options){
        createD3AreaChart(data, selector, options);
    }
    addGraphs(TYPE){
        this.graphArray.push(...TYPE);
        if(!Array.isArray(TYPE)){
        this.createGraph[TYPE](this.input.data, this.input.selector, this.input.options);
        } else {
            for (let i = 0; i < TYPE.length; i++) {
                this.createGraph[TYPE[i]](this.input.data, this.input.selector, this.input.options);
            }
        }
    }
}

