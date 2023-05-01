import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3FunnelChart from '../../Charts/basicCharts/funnelChart';

global.d3 = d3;

describe('createD3FunnelChart', () => {
  const data = [    { name: 'Step 1', value: 100 },    { name: 'Step 2', value: 75 },    { name: 'Step 3', value: 50 },    { name: 'Step 4', value: 25 },  ];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    colors: ['steelblue', 'gray'],
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
    createD3FunnelChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.funnel-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3FunnelChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.funnel-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3FunnelChart(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.funnel-chart .x-axis');
    const yAxis = document.querySelector('#chart svg.funnel-chart .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });

  test('creates a rect for each data point', () => {
    const { document } = jsdom.window;

    createD3FunnelChart(data, document.querySelector('#chart'), options);
    const rects = document.querySelectorAll('#chart svg.funnel-chart rect');
    expect(rects.length).toBe(data.length);
  });

  test('fills each rect with the correct color', () => {
    const { document } = jsdom.window;

    createD3FunnelChart(data, document.querySelector('#chart'), options);
    const rects = document.querySelectorAll('#chart svg.funnel-chart rect');
    expect(rects[0].getAttribute('fill')).toBe(options.colors[0]);
    expect(rects[1].getAttribute('fill')).toBe(options.colors[1]);
    expect(rects[2].getAttribute('fill')).toBe(options.colors[0]);
    expect(rects[3].getAttribute('fill')).toBe(options.colors[1]);
  });
});
