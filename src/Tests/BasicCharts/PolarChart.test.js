import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3PolarChart from '../../Charts/basicCharts/polarChart.js';

global.d3 = d3;

describe('createD3PolarChart', () => {
  const data = [{ name: 'A', value: 10 }, { name: 'B', value: 20 }, { name: 'C', value: 30 }];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 20, left: 20,
    },
    colors: ['red', 'blue', 'green'],
    innerRadius: 0,
    outerRadius: 100,
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
    createD3PolarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.polar-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3PolarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.polar-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates polar chart arcs', () => {
    const { document } = jsdom.window;

    createD3PolarChart(data, document.querySelector('#chart'), options);
    const arcs = document.querySelectorAll('#chart svg.polar-chart path');
    expect(arcs.length).toBe(data.length);
  });

  test('fills arcs with the correct fill color', () => {
    const { document } = jsdom.window;

    createD3PolarChart(data, document.querySelector('#chart'), options);
    const arcPaths = document.querySelectorAll('#chart svg.polar-chart path');
    arcPaths.forEach((arcPath, i) => {
      expect(arcPath.getAttribute('fill')).toBe(options.colors[i]);
    });
  });

  test('creates arc labels', () => {
    const { document } = jsdom.window;

    createD3PolarChart(data, document.querySelector('#chart'), options);
    const arcLabels = document.querySelectorAll('#chart svg.polar-chart text');
    expect(arcLabels.length).toBe(data.length);
  });

  test('labels arcs with the correct name', () => {
    const { document } = jsdom.window;

    createD3PolarChart(data, document.querySelector('#chart'), options);
    const arcLabels = document.querySelectorAll('#chart svg.polar-chart text');
    arcLabels.forEach((arcLabel, i) => {
      expect(arcLabel.textContent).toBe(data[i].name);
    });
  });
});
