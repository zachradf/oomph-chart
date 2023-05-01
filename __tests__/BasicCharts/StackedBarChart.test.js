import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3StackedBarChart from '../../Charts/basicCharts/stackedBarChart';

global.d3 = d3;

describe('createD3StackedBarChart', () => {
  const data = [
    {
      category: 'A',
      values: [
        { group: 'X', value: 10 },
        { group: 'Y', value: 20 },
        { group: 'Z', value: 30 }
      ],
    },
    {
      category: 'B',
      values: [
        { group: 'X', value: 40 },
        { group: 'Y', value: 50 },
        { group: 'Z', value: 60 }
      ],
    },
    {
      category: 'C',
      values: [
        { group: 'X', value: 70 },
        { group: 'Y', value: 80 },
        { group: 'Z', value: 90 }
      ],
    }
  ];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    color: ['red', 'green', 'blue'],
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
    createD3StackedBarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.stacked-bar-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3StackedBarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.stacked-bar-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3StackedBarChart(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.stacked-bar-chart .x-axis');
    const yAxis = document.querySelector('#chart svg.stacked-bar-chart .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });

  test('creates stacked bars', () => {
    const { document } = jsdom.window;

    createD3StackedBarChart(data, document.querySelector('#chart'), options);
    const bars = document.querySelectorAll('#chart svg.stacked-bar-chart rect');
    expect(bars.length).toBe(data.length * data[0].values.length);
  });

  test('fills bars with the correct color', () => {
    createD3StackedBarChart(data, document.querySelector('#chart'), options);
    const bars = document.querySelectorAll('#chart svg.stacked-bar-chart rect');
    bars.forEach((bar, i) => {
      const expectedColor = options.color[i % options.color.length]; // Calculate the expected color based on the index and color scheme
      expect(bars[i].getAttribute('fill')).toBe(expectedColor);
    });
  });
});
