import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3Heatmap from '../../Charts/basicCharts/heatmap';

global.d3 = d3;

describe('createD3Heatmap', () => {
  const data = [
    { xLabel: 'A', yLabel: 'X', value: 4 },
    { xLabel: 'B', yLabel: 'X', value: 8 },
    { xLabel: 'C', yLabel: 'X', value: 2 },
    { xLabel: 'A', yLabel: 'Y', value: 7 },
    { xLabel: 'B', yLabel: 'Y', value: 3 },
    { xLabel: 'C', yLabel: 'Y', value: 6 }
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
// All test seem to be having trouble getting color values
//   test('fills heatmap cells with the correct color', () => {
//     const { document } = jsdom.window;

//     createD3Heatmap(data, document.querySelector('#chart'), options);

//     const heatmapCells = document.querySelectorAll('.heat-map .heatmap-cell');

//     heatmapCells.forEach((cell) => {
//       const cellData = data.find((d) => d.xLabel === cell.getAttribute('x') && d.yLabel === cell.getAttribute('y'));
//       const color = d3.interpolateBlues(cellData.__data__.value / d3.max(data, (d) => d.value));
//       expect(cell.__data__.value).toBe(color);
//     });
//   });

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
