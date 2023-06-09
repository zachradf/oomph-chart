import appendAxes from './functions/append-axes.js';
import createAxes from './functions/create-axes.js';
import createSVG from './functions/create-svg.js';

import addAnimation from './actions/animate/basic/animate-basic.js';
import addGradient from './actions/gradient.js';
import onHover from './actions/on-hover.js';
import relativeNode from './actions/relative-node.js';
import D3ChartTypes from './types/chart-types.js';

import { d3OptionShape } from './types/option-shape.js';
import { validateOptionShape } from '../../model/validators/options-validator.js';

const d3ChartTypes = new D3ChartTypes();

export default class D3Visualizer {
  constructor(chartArray, data, options, selector = '#chart') {
    // this.createChart = {};

    // chartArray.forEach((chart) => {
    //   const key = d3ChartTypes[chart].legacyName;
    //   const val = d3ChartTypes[chart].render;
    //   this.createChart[key] = val;
    // });

    this.chartArray = chartArray;
    this.data = data;
    this.options = options;
    this.selector = selector;

    // WIP
    validateOptionShape(d3OptionShape, this.options[0]);

    this.processCharts(); // TODO possibly rename to 'render' or 'renderCharts'
  }

  // addCharts(type) { // This method probably needs to be refactored
  //   this.chartArray.push(...type);
  //   for (let i = 0; i < type.length; i++) {
  //     this.createChart[type[i]](this.data, this.options, this.chartComponents);
  //     appendAxes(this.chartArray[i], this.options, this.chartComponents);
  //   }
  // }

  processCharts() {
    for (let i = 0; i < this.chartArray.length; i++) {
      this.options[i].chartClass = d3ChartTypes[this.chartArray[i]].chartClass;
      this.options[i].chartNumber = i;

      if (shouldCreateChartComponents.call(this, i) || this.options[0].isUpdating) {
        this.chartComponents = createChartComponents.call(this, i);
      }

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

  updateInput(data, options, selector = '#chart') {
    this.options = options;

    if (options[0].animate) {
      this.options[0].isUpdating = true;
    }
    this.data = data;

    this.selector = selector;

    this.processCharts();
  }
}

/* HELPER FUNCTIONS */

function applyActions(i) {
  const options = this.options[i];

  if (!this.options[0].isUpdating) {
    const axisBBox = appendAxes(this.chartArray[i], options, this.chartComponents);
    this.chartComponents.xAxisBBox = axisBBox.xAxisBBox ? axisBBox.xAxisBBox : null;
    this.chartComponents.yAxisBBox = axisBBox.yAxisBBox ? axisBBox.yAxisBBox : null;
  }

  if (options.gradient) {
    addGradient(
      this.selector,
      this.chartArray[i],
      this.chartComponents,
      this.data[i],
      options
    );
  }

  if (options.onHover) {
    onHover(this.selector, this.options);
  }

  if (options.relativeNodeSize) {
    relativeNode(this.selector, this.data[i], options);
  }

  if (options.animate && this.options[0].isUpdating) {
    addAnimation(
      this.selector,
      this.data[i],
      options,
      this.chartComponents,
      options.duration
    );
  }
}

function applyOptions(i) {
  const options = this.options[i];
  const { isUpdating } = this.options[0];
  const allElements = d3.selectAll(`svg.${options.chartClass} circle, arc, rect, path, line, polygon, node`);
  const excludedElements = d3.selectAll('.y-axis, .x-axis, .shape-label, .shape-pointer, .y-axis * , .x-axis *');

  const elements = allElements.filter(function () {
    const currentElement = d3.select(this);
    return !excludedElements.nodes().includes(currentElement.node());
  });

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
    if (options.boxShadow) {
      element.style('filter', 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))');
    }
    if (isUpdating) {
      elements.attr('fill', `${options.color}`);
      elements.attr('data-initialFill', `${options.color}`);
      console.log(options.color, i);
    }
  });
}

function createChartComponents(i) {
  const chartComponents = createAxes(this.data[i], this.chartArray[i], this.options[i]);
  if (!this.options[0].isUpdating) { // figure out if its best to have [0] be updated or include it in the most recent
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
