import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/no-relative-packages
import * as d3 from '../node_modules/d3/dist/d3.min.js';
import createD3LineGraph from '../../Charts/basicCharts/lineGraph';

global.d3 = d3;

describe('createD3LineGraph', () => {
  const data = [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    strokeColor: 'steelblue',
    strokeWidth: 1.5,
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
    createD3LineGraph(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.line-graph');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3LineGraph(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.line-graph');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3LineGraph(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.line-graph .x-axis');
    const yAxis = document.querySelector('#chart svg.line-graph .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });

  test('creates line path', () => {
    const { document } = jsdom.window;

    createD3LineGraph(data, document.querySelector('#chart'), options);
    const linePath = document.querySelector('#chart svg.line-graph path');
    expect(linePath).not.toBeNull();
  });

  test('draws the line with the correct stroke color', () => {
    const { document } = jsdom.window;

    createD3LineGraph(data, document.querySelector('#chart'), options);
    const linePath = document.querySelector('#chart svg.line-graph path');
    expect(linePath.getAttribute('stroke')).toBe(options.strokeColor);
  });

  test('draws the line with the correct stroke width', () => {
    const { document } = jsdom.window;

    createD3LineGraph(data, document.querySelector('#chart'), options);
    const linePath = document.querySelector('#chart svg.line-graph path');
    expect(linePath.getAttribute('stroke-width')).toBe(options.strokeWidth.toString());
  });
});
