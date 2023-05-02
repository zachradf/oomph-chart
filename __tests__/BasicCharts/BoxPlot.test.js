import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/no-relative-packages
import * as d3 from '../node_modules/d3/dist/d3.min.js';
import createD3BoxPlot from '../../Charts/basicCharts/boxPlot';

global.d3 = d3;

describe('createD3BoxPlot', () => {
  const data = [{
    category: 'A', min: 0, q1: 5, median: 10, q3: 15, max: 20,
  }, {
    category: 'B', min: 10, q1: 12.5, median: 15, q3: 17.5, max: 20,
  }, {
    category: 'C', min: 5, q1: 10, median: 12.5, q3: 15, max: 18,
  }, {
    category: 'D', min: 2, q1: 7, median: 10, q3: 14, max: 18,
  }];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    fillColor: 'green',
  };
  let jsdom;
  beforeEach(() => {
    // Set up the JSDOM window
    jsdom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <div class="testClass" id="chart">hello</div>
        </body>
      </html>
    `);
  });

  test('creates an SVG element', () => {
    const { document } = jsdom.window;
    createD3BoxPlot(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.box-plot');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3BoxPlot(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.box-plot');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3BoxPlot(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.box-plot .x-axis');
    const yAxis = document.querySelector('#chart svg.box-plot .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });

  test('creates box and whisker plot elements', () => {
    const { document } = jsdom.window;

    createD3BoxPlot(data, document.querySelector('#chart'), options);
    const boxes = document.querySelectorAll('#chart svg.box-plot .box-rect');
    const whiskers = document.querySelectorAll('#chart svg.box-plot .min, #chart svg.box-plot .max');
    expect(boxes.length).toBe(data.length);
    expect(whiskers.length).toBe(data.length * 2);
  });

  test('fills boxes with the correct color', () => {
    const { document } = jsdom.window;

    createD3BoxPlot(data, document.querySelector('#chart'), options);
    const boxes = document.querySelectorAll('#chart svg.box-plot .box-rect');
    boxes.forEach((box) => {
      expect(box.getAttribute('fill')).toBe(options.fillColor);
    });
  });
});
