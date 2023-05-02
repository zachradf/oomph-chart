import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/no-relative-packages
import * as d3 from '../node_modules/d3/dist/d3.min.js';
import createD3RadarChart from '../../Charts/basicCharts/radarChart';

global.d3 = d3;

describe('createD3RadarChart', () => {
  const data = [    { name: 'Category 1', value: 10 },    { name: 'Category 2', value: 20 },    { name: 'Category 3', value: 15 },    { name: 'Category 4', value: 25 },    { name: 'Category 5', value: 18 },  ];

  const options = {
    width: 500,
    height: 500,
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    colors: ['steelblue', 'gray'],
    maxValue: 30,
    levels: 5,
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
          <div class="testClass" id="chart"></div>
        </body>
      </html>
    `);
  });

  test('creates an SVG element', () => {
    const { document } = jsdom.window;
    createD3RadarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.radar-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.radar-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates ticks', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const ticks = document.querySelectorAll('#chart svg.radar-chart line.ticks');
    expect(ticks.length).toBe(data.length * options.levels);
  });

  test('creates labels', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const labels = document.querySelectorAll('#chart svg.radar-chart text.label');
    expect(labels.length).toBe(data.length);
  });

  test('creates label lines', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const labelLines = document.querySelectorAll('#chart svg.radar-chart line.label-line');
    expect(labelLines.length).toBe(data.length);
  });

  test('creates a path', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const path = document.querySelector('#chart svg.radar-chart path.radar-chart-path');
    expect(path).not.toBeNull();
  });
  test('fills radar chart path with the correct colors', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const radarChartPath = document.querySelector('#chart svg.radar-chart path');
    expect(radarChartPath.getAttribute('fill')).toBe(options.colors[0]);
    expect(radarChartPath.getAttribute('stroke')).toBe(options.colors[1]);
  });

  test('creates level ticks', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const levelTicks = document.querySelectorAll('#chart svg.radar-chart .ticks');
    expect(levelTicks.length).toBe(options.levels * data.length);
  });

  test('creates labels', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const labels = document.querySelectorAll('#chart svg.radar-chart .label');
    expect(labels.length).toBe(data.length);
  });

  test('creates label lines', () => {
    const { document } = jsdom.window;

    createD3RadarChart(data, document.querySelector('#chart'), options);
    const labelLines = document.querySelectorAll('#chart svg.radar-chart .label-line');
    expect(labelLines.length).toBe(data.length);
  });
});