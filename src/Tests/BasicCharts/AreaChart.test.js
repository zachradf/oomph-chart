// // __tests__/areaChart.test.js
import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3AreaChart from '../../Charts/basicCharts/areaChart';

global.d3 = d3;

describe('createD3AreaChart', () => {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 }
  ];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    fillColor: 'steelblue',
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

    // global.window = jsdom.window;
  });

  test('creates an SVG element', () => {
    const { document } = jsdom.window;
    createD3AreaChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.area-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3AreaChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.area-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3AreaChart(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.area-chart .x-axis');
    const yAxis = document.querySelector('#chart svg.area-chart .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });

  test('creates area path', () => {
    const { document } = jsdom.window;

    createD3AreaChart(data, document.querySelector('#chart'), options);
    const areaPath = document.querySelector('#chart svg.area-chart path');
    expect(areaPath).not.toBeNull();
  });

  test('fills area path with the correct color', () => {
    const { document } = jsdom.window;

    createD3AreaChart(data, document.querySelector('#chart'), options);
    const areaPath = document.querySelector('#chart svg.area-chart path');
    expect(areaPath.getAttribute('fill')).toBe(options.fillColor);
  });
});
