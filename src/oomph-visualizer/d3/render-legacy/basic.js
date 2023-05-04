import createAreaChart from '../charts/basic/area.js';
import createBarChart from '../charts/basic/bar.js';
import createBoxPlot from '../charts/basic/box.js';
import createBubbleChart from '../charts/basic/bubble.js';
import createDonutChart from '../charts/basic/donut.js';
import createFunnelChart from '../charts/basic/funnel.js';
import createGaugeChart from '../charts/basic/gauge.js';
import createHeatMap from '../charts/basic/heat.js';
import createLineGraph from '../charts/basic/line.js';
import createPieChart from '../charts/basic/pie.js';
import createPolarChart from '../charts/basic/polar.js';
import createRadarChart from '../charts/basic/radar.js';
import createScatterPlot from '../charts/basic/scatter.js';
import createStackedBarChart from '../charts/basic/stacked.js';
import createWaterfallChart from '../charts/basic/waterfall.js';

import appendAxes from '../functions/append-axes.js';
import createAxes from '../functions/create-axes.js';
import createSVG from '../functions/create-svg.js';

import addAnimation from '../actions/animate/basic/animate-basic.js';
import onHover from '../actions/on-hover.js';
import relativeNode from '../actions/relative-node.js';

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

    this.processCharts();
  }

  addCharts(type) { // This method probably needs to be refactored
    this.chartArray.push(...type);
    for (let i = 0; i < type.length; i++) {
      this.createChart[type[i]](this.data, this.options, this.chartComponents);
      appendAxes(this.chartArray[i], this.options, this.chartComponents);
    }
  }

  processCharts() {
    for (let i = 0; i < this.chartArray.length; i++) {
      // Map chart type to chartClass
      this.options[i].chartClass = this.svgTypeMap[this.chartArray[i]];

      if (shouldCreateChartComponents.call(this, i) || this.options[0].updating) {
        this.chartComponents = createChartComponents.call(this, i);
      }

      // If not updating, create a new chart instance using current chart type, data, and options
      if (!this.options[0].updating) {
        this.createChart[this.chartArray[i]](this.data[i], this.options[i], this.chartComponents);
      }

      applyStyling.call(this, i);
      applyActions.call(this, i);
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

    this.processCharts();
  }
}

/* HELPER FUNCTIONS */

function applyActions(i) {
  const options = this.options[i];

  if (options.onHover) {
    onHover(this.selector, this.options);
  }

  if (options.relativeNodeSize) {
    relativeNode(this.selector, this.data[i], options);
  }

  if (options.animate || this.options[0].updating) {
    addAnimation(
      this.selector,
      this.data[i],
      options,
      this.chartComponents,
      options.duration
    );
  } else {
    appendAxes(this.chartArray[i], options, this.chartComponents);
  }
}

function applyStyling(i) {
  const options = this.options[i];
  const elements = d3.selectAll(`svg.${this.svgTypeMap[this.chartArray[0]]} circle, arc, rect, path, line, polygon, node`);

  // eslint-disable-next-line func-names
  elements.each(function () {
    const element = d3.select(this);
    const { classList } = this;

    if (classList.length === 0) {
      element.classed(`${options.chartClass}${i}`, true);
    }
    if (options.opacity && classList[0] === `${options.chartClass}${i}`) {
      element.style('opacity', options.opacity);
    }
  });
}

function createChartComponents(i) {
  const chartComponents = createAxes(this.data[i], this.chartArray[i], this.options[i]);
  if (!this.options[0].updating) {
    chartComponents.svg = createSVG(this.selector, this.chartArray[i], this.options[i]);
  }
  return chartComponents;
}

function shouldCreateChartComponents(i) {
  const isFirstStackedChart = this.options[i].stack && i === 0;
  const isNotUpdating = !this.options[0].updating;
  const isNotStackedChart = !this.options[i].stack;

  return (isFirstStackedChart && isNotUpdating) || (isNotStackedChart && isNotUpdating);
}
