import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3PieChart from '../../Charts/BasicCharts/pieChart';

global.d3 = d3;

describe('createD3PieChart', () => {
  const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 30 },
    { label: 'D', value: 40 },
    { label: 'E', value: 50 },
  ];
  const options = {
    width: 500,
    height: 300,
    showLabels: true,
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

    // global.window.document = jsdom.window;
  });

  test('creates an SVG element', () => {
    const { document } = jsdom.window;
    createD3PieChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3PieChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates pie sectors', () => {
    const { document } = jsdom.window;

    createD3PieChart(data, document.querySelector('#chart'), options);
    const pieSectors = document.querySelectorAll('#chart svg path');
    expect(pieSectors.length).toBe(data.length);
  });

  test('fills pie sectors with the correct colors', () => {
    const { document } = jsdom.window;

    createD3PieChart(data, document.querySelector('#chart'), options);
    const pieSectors = document.querySelectorAll('#chart svg path');
    pieSectors.forEach((sector, index) => {
      expect(sector.getAttribute('fill')).toBe(d3.schemeCategory10[index]);
    });
  });

  test('adds labels to the pie chart', () => {
    const { document } = jsdom.window;

    createD3PieChart(data, document.querySelector('#chart'), options);
    const labels = document.querySelectorAll('#chart svg text');
    expect(labels.length).toBe(data.length);
  });
});
