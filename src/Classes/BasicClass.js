/* eslint-disable import/extensions */
import createBubbleChart from '../Charts/basicCharts/bubbleChart.js';
import createBarChart from '../Charts/basicCharts/barChart.js';
import createScatterPlot from '../Charts/basicCharts/scatterPlot.js';
import createLineGraph from '../Charts/basicCharts/lineGraph.js';
import createPieChart from '../Charts/basicCharts/pieChart.js';
import createAreaChart from '../Charts/basicCharts/areaChart.js';
import createDonutChart from '../Charts/basicCharts/donutChart.js';
import createStackedBarChart from '../Charts/basicCharts/stackedBarChart.js';
import createHeatMap from '../Charts/basicCharts/heatMap.js';
import createRadarChart from '../Charts/basicCharts/radarChart.js';
import createPolarChart from '../Charts/basicCharts/polarChart.js';
import createWaterfallChart from '../Charts/basicCharts/waterfallChart.js';
import createFunnelChart from '../Charts/basicCharts/funnelChart.js';
import createGaugeChart from '../Charts/basicCharts/gaugeChart.js';
import createBoxPlot from '../Charts/basicCharts/boxPlot.js';

import stack from '../AddFunctionality/stack.js';

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
      this.input.options.chartNumber = 1;
    } else {
      this.input.options = input.options;
      this.input.options.chartNumber = 1;
    }

    this.createGraph = {
      BAR: createBarChart,
      BUBBLE: createBubbleChart,
      SCATTER: createScatterPlot,
      LINE: createLineGraph,
      PIE: createPieChart,
      AREA: createAreaChart,
      DONUT: createDonutChart,
      STACKEDBAR: createStackedBarChart,
      HEATMAP: createHeatMap,
      RADAR: createRadarChart,
      POLAR: createPolarChart,
      WATERFALL: createWaterfallChart,
      FUNNEL: createFunnelChart,
      GAUGE: createGaugeChart,
      BOX: createBoxPlot,
    };
    this.iterateGraphs = () => {
    
      for (let i = 0; i < this.graphArray.length; i++) {
        this.createGraph[this.graphArray[i]](this.input.data, this.input.selector, this.input.options);
        console.log(this.input.options);
      }
    };
    this.iterateGraphs();
  }

  // You can probably put all of this in the create graph object
  createBoxPlot(data, selector, options) {
    createBoxPlot(data, selector, options);
  }

  createFunnelChart(data, selector, options) {
    createFunnelChart(data, selector, options);
  }

  createGaugeChart(data, selector, options) {
    createGaugeChart(data, selector, options);
  }

  createWaterfallChart(data, selector, options) {
    createWaterfallChart(data, selector, options);
  }

  createPolarChart(data, selector, options) {
    createPolarChart(data, selector, options);
  }

  createRadarChart(data, selector, options) {
    createRadarChart(data, selector, options);
  }

  createBarChart(data, selector, options) {
    createBarChart(data, selector, options);
  }

  createBubbleChart(data, selector, options) {
    createBubbleChart(data, selector, options);
  }

  createDonutChart(data, selector, options) {
    createDonutChart(data, selector, options);
  }

  createHeatMap(data, selector, options) {
    createHeatMap(data, selector, options);
  }

  createStackedBarChart(data, selector, options) {
    createStackedBarChart(data, selector, options);
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
      BUBBLE: 'bubble-chart',
      SCATTER: 'scatter-plot',
      LINE: 'line-graph',
      PIE: 'pie-chart',
      AREA: 'area-chart',
      DONUT: 'donut-chart',
      STACKEDBAR: 'stacked-bar-chart',
      HEATMAP: 'heat-map',
      RADAR: 'radar-chart',
      POLAR: 'polar-chart',
      WATERFALL: 'waterfall-chart',
      FUNNEL: 'funnel-chart',
      GAUGE: 'gauge-chart',
      BOX: 'box-plot',
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


//Experiment with stacking and saving certain chart function results to the class
  // if (this.input.options.overlay) {
      //   const chartFunctions = [];
      //   for (let i = 0; i < this.graphArray.length; i++) {
      //     // const chartDiv = document.createElement('div');
      //     // chartDiv.id = `chart${this.input.options.chartNumber}`;
      //     // document.body.appendChild(chartDiv);
      //     // this.input.options.selector += this.input.options.chartNumber;
      //     // this.input.options.chartNumber++;
      //     // this.input.selector = chartDiv.id;
      //     chartFunctions.push(this.createGraph[this.graphArray[i]]);
      //     // this.createGraph[this.graphArray[i]](this.input.data, this.input.selector, this.input.options);
      //     // chartArray.push(this.input.selector);
      //   }
      //   stack(chartFunctions, this.input.data, this.input.selector, this.input.options);
      // } else {    //  }