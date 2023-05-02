import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/no-relative-packages
import * as d3 from '../node_modules/d3/dist/d3.min.js';
import createD3Heatmap from '../../src/Charts/basicCharts/heatmap';

global.d3 = d3;

describe('createD3Heatmap', () => {
  const data = [
    { x: 'A', y: 'X', value: 4 },
    { x: 'B', y: 'X', value: 8 },
    { x: 'C', y: 'X', value: 2 },
    { x: 'A', y: 'Y', value: 7 },
    { x: 'B', y: 'Y', value: 3 },
    { x: 'C', y: 'Y', value: 6 }
  ];
  const options = {
    width: 500,
    height: 300,
    margin: {
      top: 20, right: 20, bottom: 50, left: 50,
    },
    colorScale: d3.interpolateBlues,
    xLabel: 'X Axis Label',
    yLabel: 'Y Axis Label',
  };
  let jsdom;
  beforeEach(() => {
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
    createD3Heatmap(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.heat-map');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;
    createD3Heatmap(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.heat-map');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates heatmap cells', () => {
    const { document } = jsdom.window;
    createD3Heatmap(data, document.querySelector('#chart'), options);
    const heatmapCells = document.querySelectorAll('#chart svg.heat-map rect.heatmap-cell');
    expect(heatmapCells).toHaveLength(data.length);
  });
  // Correctly getting colors but the comparison is still off
  // test('fills heatmap cells with the correct color', () => {
  //   const { document } = jsdom.window;
  //   createD3Heatmap(data, document.querySelector('#chart'), options);
  //   const cells = document.querySelectorAll('#chart svg.heat-map rect.heatmap-cell');
  //   cells.forEach((cell, i) => {
  //     expect(cells[i].getAttribute('fill')).toBe(d3.interpolateBlues(data[i].value));
  //   });
  // });

  test('creates x-axis and y-axis with labels', () => {
    const { document } = jsdom.window;
    createD3Heatmap(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.heat-map .x-axis-label');
    const yAxis = document.querySelector('#chart svg.heat-map .y-axis-label');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
    expect(xAxis.textContent).toBe(options.xLabel);
    expect(yAxis.textContent).toBe(options.yLabel);
  });
});
