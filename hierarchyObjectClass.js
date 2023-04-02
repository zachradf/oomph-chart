import createD3SunburstChart from "/src/hierarchicalCharts/sunBurst.js";
import createD3TreeMap from "/src/hierarchicalCharts/treeMap.js";

export class hierarchyObject {
    constructor(graphArray, input) {
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
            'SUNBURST' : createD3SunburstChart,
            'TREEMAP' : createD3TreeMap,
        }
        this.iterateGraphs = () => {
            for (let i = 0; i < this.graphArray.length; i++) {
                this.createGraph[this.graphArray[i]](this.input.data, this.input.selector, this.input.options);
            }
        }
        this.iterateGraphs();
    }
    createD3SunburstChart(data, selector, options){
        createD3SunburstChart(data, selector, options);
    }
    createD3TreeMap(data, selector, options){     
        createD3TreeMap(data, selector, options);
    }
    addGraphs(type){
        this.graphArray.push(...type);
        if(!Array.isArray(type)){
        this.createGraph[type](this.input.data, this.input.selector, this.input.options);
        } else {
            for (let i = 0; i < type.length; i++) {
                this.createGraph[type[i]](this.input.data, this.input.selector, this.input.options);
            }
        }
    }

    removeChart(type) {
        // const chartTypeMap = {
        //     'SUNBURST': 'rect',
        //     'TREEMAP': 'circle',
        // };
        const svgTypeMap = {
            'SUNBURST': 'sun-burst',
            'TREEMAP': 'tree-map',
        };
        // const svgSelector = svgTypeMap[type];
        const chartSelector = chartTypeMap[type];
        if (chartSelector) {
            d3.select(this.input.selector)
                .selectAll(chartSelector)
                .remove();

            // Remove the x and y axes
            // d3.select(this.input.selector)
            //     .selectAll(`.x-axis, .y-axis, .${svgSelector}`)
            //     .remove();
        } else {
            console.error(`Invalid chart type: ${type}`);
        }
    }
    updateInput(input){
        this.input = input;
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

        this.iterateGraphs()
    }
}