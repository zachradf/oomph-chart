import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3DonutChart from '../../Charts/basicCharts/donutChart.js';

global.d3 = d3;

describe('createD3DonutChart', () => {
  const data = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 30 }
  ];
  const options = {
    width: 500,
    height: 300,
    radius: 100,
    color: ['red', 'blue', 'green'],
    fillColor: ['red', 'blue', 'green'],
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
    createD3DonutChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.donut-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3DonutChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.donut-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates donut chart arcs', () => {
    const { document } = jsdom.window;

    createD3DonutChart(data, document.querySelector('#chart'), options);
    const arcs = document.querySelectorAll('#chart svg.donut-chart .arc');
    expect(arcs.length).toBe(data.length);
  });

  test('creates arc paths', () => {
    const { document } = jsdom.window;

    createD3DonutChart(data, document.querySelector('#chart'), options);
    const arcPaths = document.querySelectorAll('#chart svg.donut-chart .arc path');
    expect(arcPaths.length).toBe(data.length);
  });

  test('fills arcs with the correct fill color', () => {
    const { document } = jsdom.window;

    createD3DonutChart(data, document.querySelector('#chart'), options);
    const arcPaths = document.querySelectorAll('#chart svg.donut-chart .arc path');
    arcPaths.forEach((arcPath, i) => {
      expect(arcPath.getAttribute('fill')).toBe(options.fillColor[i]);
    });
  });

  test('creates arc categories', () => {
    const { document } = jsdom.window;

    createD3DonutChart(data, document.querySelector('#chart'), options);
    const arcLabels = document.querySelectorAll('#chart svg.donut-chart .arc text');
    expect(arcLabels.length).toBe(data.length);
  });

  test('adds labels to arcs with the correct category', () => {
    const { document } = jsdom.window;

    createD3DonutChart(data, document.querySelector('#chart'), options);
    const arcLabels = document.querySelectorAll('#chart svg.donut-chart .arc text');
    arcLabels.forEach((arcLabel, i) => {
      expect(arcLabel.textContent).toBe(data[i].category);
    });
  });
});
