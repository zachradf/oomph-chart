import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3ScatterPlot from '../../Charts/basicCharts/scatterPlot';

global.d3 = d3;

describe('createD3ScatterPlot', () => {
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
    color: 'steelblue',
    radius: 4,
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
    createD3ScatterPlot(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.scatter-plot');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3ScatterPlot(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.scatter-plot');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates circles for each data point', () => {
    const { document } = jsdom.window;

    createD3ScatterPlot(data, document.querySelector('#chart'), options);
    const circles = document.querySelectorAll('#chart svg.scatter-plot circle');
    expect(circles).toHaveLength(data.length);
  });

  test('sets the correct fill color for circles', () => {
    const { document } = jsdom.window;

    createD3ScatterPlot(data, document.querySelector('#chart'), options);
    const circles = document.querySelectorAll('#chart svg.scatter-plot circle');
    circles.forEach((circle, i) => {
      expect(circles[i].getAttribute('fill')).toBe(options.color);
    });
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3ScatterPlot(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.scatter-plot .x-axis');
    const yAxis = document.querySelector('#chart svg.scatter-plot .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });
});
