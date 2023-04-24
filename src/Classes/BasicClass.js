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

import createAxes from './classFunctions/createXY.js';
import createSVG from './classFunctions/createSVG.js';
import appendAxes from './classFunctions/appendAxes.js';

import onHover from '../AddFunctionality/onHover.js';
import relativeNode from '../AddFunctionality/relativeNode.js';

export default class BasicClass {
  constructor(graphArray, input) {
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

    this.graphArray = graphArray;
    this.options = input.options;
    this.data = input.data;
    this.input = input;

    this.iterateGraphs = () => {
      for (let i = 0; i < this.graphArray.length; i++) {
        this.options[i].chartClass = svgTypeMap[this.graphArray[i]];

        this.selector = input.selector ? input.selector : '#chart';

        if (!input.options) {
          this.options[i] = {};
          this.options[i].margin = {
            top: 20, right: 20, bottom: 30, left: 40,
          };
          this.options[i].width = 600;
          this.options[i].height = 400;
          this.options[i].radius = 5;
          this.options[i].color = 'red';
          this.options[i].showCategories = true;
          this.options[i].chartNumber = 1;
          this.options[i].padding = 0.1;
        } else {
          this.options = input.options;
          this.options[i].chartNumber = i;
        }
        let generalElements;
        if (this.options[i].stack && i === 0) {
          generalElements = createAxes(this.input.data[i], graphArray[i], this.options[i]);
          generalElements.svg = createSVG(this.selector, graphArray[i], this.options[i]);
          this.generalElements = generalElements;
        } else if (!this.options[i].stack) {
          generalElements = createAxes(this.input.data[i], graphArray[i], this.options[i]);
          generalElements.svg = createSVG(this.selector, graphArray[i], this.options[i]);
          this.generalElements = generalElements;
        }
        console.log(this.options[i], 'options', this.graphArray[i], 'graph', this.data[i], 'data', this.selector, 'selector')
        this.createGraph[this.graphArray[i]](this.data[i], this.options[i], this.generalElements);
        const options = this.options[i];
        const elements = d3.selectAll(`svg.${svgTypeMap[this.graphArray[i]]} circle, arc, rect, path, line, polygon, node`);
        // eslint-disable-next-line no-loop-func
        console.log('-------------------------------', elements, 'elements')
        elements.each(function () {
          const element = d3.select(this);
          const { classList } = this; // Access the classList property of the DOM element

          if (classList.length === 0) {
           // The element has no classes, you can assign a class here
            element.classed(`${options.chartClass}${i}`, true);
          }
          if (options.opacity) {
            element.style('opacity', options.opacity);
          }
        });
        if (this.options[i].onHover) {
          console.log('onHover', this.options[i].onHover);
          onHover(this.selector, this.options);
        }
        if (this.options[i].relativeNodeSize) {
          relativeNode(this.selector, this.data[i], this.options[i]);
        }

        appendAxes(this.graphArray[i], this.options[i], this.generalElements);
      }
    };
    this.iterateGraphs();
  }

  addGraphs(type) {
    this.graphArray.push(...type);
    for (let i = 0; i < type.length; i++) {
      this.createGraph[type[i]](this.data, this.options, this.generalElements);
      appendAxes(this.graphArray[i], this.options, this.generalElements);
    }
  }

  removeChart(type) {
    // const this.svgSelector = this.options.chartClass;
    if (this.options.chartClass) {
      d3.select(this.input.selector)
        .selectAll(`svg.${this.options.chartClass}`)
        .remove();
      console.log('removed', this.options.chartClass);
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
