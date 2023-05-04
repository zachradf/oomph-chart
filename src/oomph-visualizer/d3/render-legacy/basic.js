import appendAxes from '../functions/append-axes.js';
import createAxes from '../functions/create-axes.js';
import createSVG from '../functions/create-svg.js';

import addAnimation from '../actions/animate/basic/animate-basic.js';
import onHover from '../actions/on-hover.js';
import relativeNode from '../actions/relative-node.js';
import D3ChartTypes from '../types/chart-types.js';

const d3ChartTypes = new D3ChartTypes();

export default class BasicClass {
  constructor(chartArray, input, tempOveride) {
    this.createChart = {};

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
    }

    chartArray.forEach((chart) => {
      const key = d3ChartTypes[chart].legacyName;
      const val = d3ChartTypes[chart].render;
      this.createChart[key] = val;
    });

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
      // Map chartClass
      this.options[i].chartClass = d3ChartTypes[this.chartArray[i]].chartClass;

      if (shouldCreateChartComponents.call(this, i) || this.options[0].isUpdating) {
        this.chartComponents = createChartComponents.call(this, i);
      }

      // If not updating, create a new chart instance using current chart type, data, and options
      if (!this.options[0].isUpdating) {
        const { render } = d3ChartTypes[this.chartArray[i]];
        render(this.data[i], this.options[i], this.chartComponents);
      }

      applyOptions.call(this, i);
      applyActions.call(this, i);
    }
  }

  removeChart() {
    d3.select(this.selector)
      .selectAll(`svg.${this.options[0].chartClass}`)
      .remove();
    console.log('removed', this.options.chartClass);
  }

  updateInput(input) {
    this.selector = input.selector;
    this.options = input.options;
    this.options[0].isUpdating = true;
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

  if (options.animate || this.options[0].isUpdating) {
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

function applyOptions(i) {
  const options = this.options[i];
  const elements = d3.selectAll(`svg.${this.chartClass} circle, arc, rect, path, line, polygon, node`);

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
  if (!this.options[0].isUpdating) {
    chartComponents.svg = createSVG(this.selector, this.chartArray[i], this.options[i]);
  }
  return chartComponents;
}

function shouldCreateChartComponents(i) {
  const isFirstStackedChart = this.options[i].stack && i === 0;
  const isNotUpdating = !this.options[0].isUpdating;
  const isNotStackedChart = !this.options[i].stack;

  return (isFirstStackedChart && isNotUpdating) || (isNotStackedChart && isNotUpdating);
}
