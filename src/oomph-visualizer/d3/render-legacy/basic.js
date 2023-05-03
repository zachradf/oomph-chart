import createBubbleChart from '../charts/basic/bubble.js';
import createBarChart from '../charts/basic/bar.js';
import createScatterPlot from '../charts/basic/scatter.js';
import createLineGraph from '../charts/basic/line.js';
import createPieChart from '../charts/basic/pie.js';
import createAreaChart from '../charts/basic/area.js';
import createDonutChart from '../charts/basic/donut.js';
import createStackedBarChart from '../charts/basic/stacked.js';
import createHeatMap from '../charts/basic/heat.js';
import createRadarChart from '../charts/basic/radar.js';
import createPolarChart from '../charts/basic/polar.js';
import createWaterfallChart from '../charts/basic/waterfall.js';
import createFunnelChart from '../charts/basic/funnel.js';
import createGaugeChart from '../charts/basic/gauge.js';
import createBoxPlot from '../charts/basic/box.js';

import createAxes from '../functions/create-xy.js';
import createSVG from '../functions/create-svg.js';
import appendAxes from '../functions/append-axes.js';

import onHover from '../actions/on-hover.js';
import relativeNode from '../actions/relative-node.js';
import addAnimation from '../actions/animate/basic/animate-basic.js';

export default class BasicClass {
  constructor(chartArray, input, tempOveride) {
    this.createChart = {
      AREA: createAreaChart,
      BAR: createBarChart,
      BOX: createBoxPlot,
      BUBBLE: createBubbleChart,
      DONUT: createDonutChart,
      FUNNEL: createFunnelChart,
      GAUGE: createGaugeChart,
      HEATMAP: createHeatMap,
      LINE: createLineGraph,
      PIE: createPieChart,
      POLAR: createPolarChart,
      RADAR: createRadarChart,
      SCATTER: createScatterPlot,
      STACKEDBAR: createStackedBarChart,
      WATERFALL: createWaterfallChart,
    };

    let svgTypeMap = {
      AREA: 'area-chart',
      BAR: 'bar-chart',
      BOX: 'box-plot',
      BUBBLE: 'bubble-chart',
      DONUT: 'donut-chart',
      FUNNEL: 'funnel-chart',
      GAUGE: 'gauge-chart',
      HEATMAP: 'heat-map',
      LINE: 'line-graph',
      PIE: 'pie-chart',
      POLAR: 'polar-chart',
      RADAR: 'radar-chart',
      SCATTER: 'scatter-plot',
      STACKEDBAR: 'stacked-bar-chart',
      WATERFALL: 'waterfall-chart',
    };

    if (tempOveride) {
      console.log('TEMPORARY OVERRIDE DETECTED');

      // eslint-disable-next-line no-param-reassign
      chartArray = tempOveride.chartArray;

      // eslint-disable-next-line no-param-reassign
      input = {
        selector: '#chart',
        options: tempOveride.options,
        data: tempOveride.data,
      };

      // eslint-disable-next-line no-param-reassign
      svgTypeMap = tempOveride.svgTypeMap;
    }

    this.svgTypeMap = svgTypeMap;
    this.chartArray = chartArray;
    this.options = input.options;
    this.data = input.data;
    this.selector = input.selector;

    this.iterateCharts = () => {
      for (let i = 0; i < this.chartArray.length; i++) {
        this.options[i].chartClass = svgTypeMap[this.chartArray[i]];

        // general elements is an object that contains the svg, x and y, and the xAxis and yAxis
        let generalElements;
        if (this.options[i].stack && i === 0 && !this.options[0].updating) {
          generalElements = createAxes(this.data[i], chartArray[i], this.options[i]);
          generalElements.svg = createSVG(this.selector, chartArray[i], this.options[i]);
          this.generalElements = generalElements;
        } else if (!this.options[i].stack && !this.options[0].updating) {
          generalElements = createAxes(this.data[i], chartArray[i], this.options[i]);
          generalElements.svg = createSVG(this.selector, chartArray[i], this.options[i]);
          this.generalElements = generalElements;
        } else if (this.options[0].updating) {
          generalElements = createAxes(this.data[i], chartArray[i], this.options[i]);
          this.generalElements = generalElements;
        }
        if (!this.options[0].updating) {
          this.createChart[this.chartArray[i]](this.data[i], this.options[i], this.generalElements);
        }
        // this was done for linting purposes
        const options = this.options[i];

        // This is where we add the class and opacity option to the data elements
        const elements = d3.selectAll(`svg.${svgTypeMap[this.chartArray[0]]} circle, arc, rect, path, line, polygon, node`);

        // eslint-disable-next-line no-loop-func
        elements.each(function () {
          const element = d3.select(this);
          const { classList } = this; // Access the classList property of the DOM element

          if (classList.length === 0) {
            // The element has no classes, assign a class here
            element.classed(`${options.chartClass}${i}`, true);
          }
          if (options.opacity && classList[0] === `${options.chartClass}${i}`) {
            element.style('opacity', options.opacity);
          }
        });

        // Checking for onHover, relativeNodeSize, and animation/updating
        if (this.options[i].onHover) {
          onHover(this.selector, this.options);
        }
        if (this.options[i].relativeNodeSize) {
          relativeNode(this.selector, this.data[i], this.options[i]);
        }

        if (this.options[i].animate || this.options[0].updating) {
          addAnimation(this.selector, this.data[i], this.options[i], this.generalElements, this.options[i].duration);
        } else {
          appendAxes(this.chartArray[i], this.options[i], this.generalElements);
        }
      }
    };
    this.iterateCharts();
  }

  addCharts(type) { // This method probably needs to be refactored
    this.chartArray.push(...type);
    for (let i = 0; i < type.length; i++) {
      this.createChart[type[i]](this.data, this.options, this.generalElements);
      appendAxes(this.chartArray[i], this.options, this.generalElements);
    }
  }

  removeChart(type) {
    if (this.svgTypeMap[type]) {
      d3.select(this.selector)
        .selectAll(`svg.${this.options[0].chartClass}`)
        .remove();
      console.log('removed', this.options.chartClass);
    } else {
      console.error(`Invalid chart type: ${type}`);
    }
  }

  updateInput(input) {
    this.selector = input.selector;
    this.options = input.options;
    this.options[0].updating = true;
    this.data = input.data;

    this.iterateCharts();
  }
}
