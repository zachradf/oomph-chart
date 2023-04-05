// import * as d3 from 'd3/src';
import createBubbleChart from '../Charts/basicCharts/bubbleChart';
import createBarChart from '../Charts/basicCharts/barChart';
import createScatterPlot from '../Charts/basicCharts/scatterPlot';
import createLineGraph from '../Charts/basicCharts/lineGraph';
import createPieChart from '../Charts/basicCharts/pieChart';
import createAreaChart from '../Charts/basicCharts/areaChart';

export default class BasicClass {
  constructor(graphArray, input) {
    // EVENTUALLY ALL COMMON CHART FUNCTIONS WILL BE HERE
    this.graphArray = graphArray;
    this.input = input;
    this.input.selector = input.selector ? input.selector : '#chart';

    if (!input.options) {
      this.input.options = {};
      this.input.options.margin = {
        top: 20, right: 20, bottom: 30, left: 40,
      };
      this.input.options.width = 600;
      this.input.options.height = 400;
      this.input.options.radius = 5;
      this.input.options.color = 'red';
      this.input.options.showLabels = true;
    } else {
      this.input.options = input.options;
    }

    this.createGraph = {
      BAR: createBarChart,
      BUBBLE: createBubbleChart,
      SCATTER: createScatterPlot,
      LINE: createLineGraph,
      PIE: createPieChart,
      AREA: createAreaChart,
    };
    this.iterateGraphs = () => {
      for (let i = 0; i < this.graphArray.length; i++) {
        this.createGraph[this.graphArray[i]](this.input.data, this.input.selector, this.input.options, d3);
      }
    };
    this.iterateGraphs();
  }

  createBarChart(data, selector, options) {
    createBarChart(data, selector, options);
  }

  createBubbleChart(data, selector, options) {
    createBubbleChart(data, selector, options);
  }

  createScatterPlot(data, selector, options) {
    createScatterPlot(data, selector, options);
  }

  createLineGraph(data, selector, options) {
    createLineGraph(data, selector, options);
  }

  createPieChart(data, selector, options) {
    createPieChart(data, selector, options);
  }

  createAreaChart(data, selector, options) {
    createAreaChart(data, selector, options);
  }

  addGraphs(type) {
    this.graphArray.push(...type);
    if (!Array.isArray(type)) {
      this.createGraph[type](this.input.data, this.input.selector, this.input.options);
    } else {
      for (let i = 0; i < type.length; i++) {
        this.createGraph[type[i]](this.input.data, this.input.selector, this.input.options);
      }
    }
  }

  removeChart(type) {
    const svgTypeMap = {
      BAR: 'bar-chart',
      SCATTER: 'scatter-plot',
      LINE: 'line-graph',
      PIE: 'pie-chart',
      AREA: 'area-chart',
    };
    const svgSelector = svgTypeMap[type];
    if (svgSelector) {
      // Remove the x and y axes
      d3.select(this.input.selector)
        .selectAll(`.x-axis, .y-axis, .${svgSelector}`)
        .remove();
    } else {
      console.error(`Invalid chart type: ${type}`);
    }
  }

  updateInput(input) {
    this.input = input;
    if (!input.options) {
      this.input.options = {};
      this.input.options.margin = {
        top: 20, right: 20, bottom: 30, left: 40,
      };
      this.input.options.width = 600;
      this.input.options.height = 400;
      this.input.options.radius = 5;
      this.input.options.color = 'red';
      this.input.options.showLabels = true;
    } else {
      this.input.options = input.options;
    }

    this.iterateGraphs();
  }
}
