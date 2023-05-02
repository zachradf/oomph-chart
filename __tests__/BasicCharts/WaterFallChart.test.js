import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/no-relative-packages
import * as d3 from '../node_modules/d3/dist/d3.min.js';
import createD3WaterfallChart from '../../Charts/basicCharts/waterfallChart';

global.d3 = d3;

describe('createD3WaterfallChart', () => {
  const data = [
    { category: 'Sales', start: 0, end: 10 },
    { category: 'Cost of goods sold', start: 10, end: 5 },
    { category: 'Gross margin', start: 5, end: 25 },
    { category: 'Operating expenses', start: 25, end: 10 },
    { category: 'Operating income', start: 10, end: 20 }
  ];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    color: 'steelblue',
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
    createD3WaterfallChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.waterfall-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3WaterfallChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.waterfall-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3WaterfallChart(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.waterfall-chart .x-axis');
    const yAxis = document.querySelector('#chart svg.waterfall-chart .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });

  test('creates rectangle bars', () => {
    const { document } = jsdom.window;

    createD3WaterfallChart(data, document.querySelector('#chart'), options);
    const bars = document.querySelectorAll('#chart svg.waterfall-chart rect');
    expect(bars.length).toBe(data.length);
  });

  test('fills bars with the correct color', () => {
    const { document } = jsdom.window;

    createD3WaterfallChart(data, document.querySelector('#chart'), options);
    const bars = document.querySelectorAll('#chart svg.waterfall-chart rect');
    bars.forEach((bar, i) => {
      expect(bars[i].getAttribute('fill')).toBe(options.color);
    });
  });
});
