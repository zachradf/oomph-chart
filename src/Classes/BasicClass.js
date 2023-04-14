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
import createAxes from './classFunctions/XY.js';
import createSVG from './classFunctions/SVG.js';

export default class BasicClass {
  constructor(graphArray, input) {
    this.graphArray = graphArray;
    this.input = input;
    this.selector = input.selector ? input.selector : '#chart';
    this.data = input.data;

    if (!input.options) {
      this.options = {};
      this.options.margin = {
        top: 20, right: 20, bottom: 30, left: 40,
      };
      this.options.width = 600;
      this.options.height = 400;
      this.options.radius = 5;
      this.options.color = 'red';
      this.options.showCategories = true;
      this.options.chartNumber = 1;
      this.options.padding = 0.1;
    } else {
      this.options = input.options;
      this.options.chartNumber = 1;
    }
    // this.options.chartClass = this.svgTypeMap[graphArray[0]];

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
    this.options.chartClass = svgTypeMap[graphArray[0]];

    const generalElements = createAxes(input.data, graphArray[0], this.options);
    generalElements.svg = createSVG(this.selector, graphArray[0], this.options);

    this.iterateGraphs = () => {
      for (let i = 0; i < this.graphArray.length; i++) {
        this.createGraph[this.graphArray[i]](this.data, this.selector, this.options, generalElements);
      }
    };
    this.iterateGraphs();
  }

  // You can probably put all of this in the create graph object
  createAreaChart(data, selector, options, generalElements) {
    createAreaChart(data, selector, options, generalElements);
  }

  createBarChart(data, selector, options, generalElements) {
    createBarChart(data, selector, options, generalElements);
  }

  createBoxPlot(data, selector, options, generalElements) {
    createBoxPlot(data, selector, options, generalElements);
  }

  createBubbleChart(data, selector, options, generalElements) {
    createBubbleChart(data, selector, options, generalElements);
  }

  createDonutChart(data, selector, options, generalElements) {
    createDonutChart(data, selector, options, generalElements);
  }

  createFunnelChart(data, selector, options, generalElements) {
    createFunnelChart(data, selector, options, generalElements);
  }

  createGaugeChart(data, selector, options, generalElements) {
    createGaugeChart(data, selector, options, generalElements);
  }

  createHeatMap(data, selector, options, generalElements) {
    createHeatMap(data, selector, options, generalElements);
  }

  createLineGraph(data, selector, options, generalElements) {
    createLineGraph(data, selector, options, generalElements);
  }

  createPieChart(data, selector, options, generalElements) {
    createPieChart(data, selector, options, generalElements);
  }

  createPolarChart(data, selector, options, generalElements) {
    createPolarChart(data, selector, options, generalElements);
  }

  createRadarChart(data, selector, options, generalElements) {
    createRadarChart(data, selector, options, generalElements);
  }

  createScatterPlot(data, selector, options, generalElements) {
    createScatterPlot(data, selector, options, generalElements);
  }

  createStackedBarChart(data, selector, options, generalElements) {
    createStackedBarChart(data, selector, options, generalElements);
  }

  createWaterfallChart(data, selector, options, generalElements) {
    createWaterfallChart(data, selector, options, generalElements);
  }

  addGraphs(type) {
    this.graphArray.push(...type);
    if (!Array.isArray(type)) {
      this.createGraph[type](this.data, this.selector, this.options);
    } else {
      for (let i = 0; i < type.length; i++) {
        this.createGraph[type[i]](this.data, this.selector, this.options);
      }
    }
  }

  removeChart(type) {
    const svgSelector = this.options.chartClass;
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
      this.options = {};
      this.options.margin = {
        top: 20, right: 20, bottom: 30, left: 40,
      };
      this.options.width = 600;
      this.options.height = 400;
      this.options.radius = 5;
      this.options.color = 'red';
      this.options.showLabels = true;
    } else {
      this.options = input.options;
    }

    this.iterateGraphs();
  }
}

// Experiment with stacking and saving certain chart function results to the class
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
