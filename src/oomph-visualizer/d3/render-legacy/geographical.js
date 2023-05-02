import onHover from '../actions/on-hover.js';
import relativeNode from '../actions/relative-node.js';

export default class GeographicClass {
  constructor(chartArray, input) {
    this.createChart = {

    };
    const svgTypeMap = {

    };

    this.chartArray = chartArray;
    this.options = input.options;
    this.data = input.data;
    this.input = input;

    this.iterateCharts = () => {
      for (let i = 0; i < this.chartArray.length; i++) {
        this.options[i].chartClass = svgTypeMap[this.chartArray[i]];

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
          generalElements = createAxes(this.input.data[i], chartArray[i], this.options[i]);
          generalElements.svg = createSVG(this.selector, chartArray[i], this.options[i]);
          this.generalElements = generalElements;
        } else if (!this.options[i].stack) {
          generalElements = createAxes(this.input.data[i], chartArray[i], this.options[i]);
          generalElements.svg = createSVG(this.selector, chartArray[i], this.options[i]);
          this.generalElements = generalElements;
        }
        console.log(this.options[i], 'options', this.chartArray[i], 'graph', this.data[i], 'data', this.selector, 'selector');
        this.createChart[this.chartArray[i]](this.data[i], this.options[i], this.generalElements);
        const options = this.options[i];
        const elements = d3.selectAll(`svg.${svgTypeMap[this.chartArray[i]]} circle, arc, rect, path, line, polygon, node`);
        // eslint-disable-next-line no-loop-func
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

        appendAxes(this.chartArray[i], this.options[i], this.generalElements);
      }
    };
    this.iterateCharts();
  }

  addCharts(type) {
    this.chartArray.push(...type);
    for (let i = 0; i < type.length; i++) {
      this.createChart[type[i]](this.data, this.options, this.generalElements);
      appendAxes(this.chartArray[i], this.options, this.generalElements);
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

    this.iterateCharts();
  }
}
