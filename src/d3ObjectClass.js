// import createBarChart from '/src/barChart.js';
// import createScatterPlot from '/src/scatterPlot.js';

// export class D3Object {
//     constructor(data = [], selector="#chart", options) {
//         this.data = data;
//         this.selector = selector;
//         this.options = options;

//         if(this.data === undefined || this.data === null) {
//             throw new Error("Data is undefined or null");
//         } 

//         if (this.selector === undefined || this.selector === null) {
//             throw new Error("Selector is undefined or null");
//         }

//         if(options === undefined || options === {} || options === null){
//         // Set default values for width, height, and margin if not provided
//             this.options = {};
//             this.options.width = 600;
//             this.options.height = 400;
//             this.options.margin = { top: 20, right: 20, bottom: 30, left: 40 };
//         }
//     }

//     createBarChart(data, selector, options){
//          createBarChart(data = this.data, selector = this.selector, options = this.options);
//          console.log("createBarChart called");
//          console.log(this.data, this.selector, this.options);
//     }
//     createScatterPlot(data, selector, options){
//         createScatterPlot(data = this.data, selector = this.selector, options = this.options);
//     }
// }



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

