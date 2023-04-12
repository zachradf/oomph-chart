import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import createD3BarChart from '../../Charts/basicCharts/barChart';

global.d3 = d3;

describe('createD3BarChart', () => {
  const data = [{ label: 'A', value: 10 }, { label: 'B', value: 20 }, { label: 'C', value: 30 }, { label: 'D', value: 40 }];
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
    createD3BarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.bar-chart');
    expect(svgElement).not.toBeNull();
  });

  test('sets the correct SVG width and height', () => {
    const { document } = jsdom.window;

    createD3BarChart(data, document.querySelector('#chart'), options);
    const svgElement = document.querySelector('#chart svg.bar-chart');
    expect(svgElement.getAttribute('width')).toBe(options.width.toString());
    expect(svgElement.getAttribute('height')).toBe(options.height.toString());
  });

  test('creates x-axis and y-axis', () => {
    const { document } = jsdom.window;

    createD3BarChart(data, document.querySelector('#chart'), options);
    const xAxis = document.querySelector('#chart svg.bar-chart .x-axis');
    const yAxis = document.querySelector('#chart svg.bar-chart .y-axis');
    expect(xAxis).not.toBeNull();
    expect(yAxis).not.toBeNull();
  });

  test('creates rectangle bars', () => {
    const { document } = jsdom.window;

    createD3BarChart(data, document.querySelector('#chart'), options);
    const bars = document.querySelectorAll('#chart svg.bar-chart rect');
    expect(bars.length).toBe(data.length);
  });
  // TODO: fix this test or function for fill color
  //   test('fills bars with the correct color', () => {
  //     const { document } = jsdom.window;

//     createD3BarChart(data, document.querySelector('#chart'), options);
//     const bars = document.querySelectorAll('#chart svg.bar-chart rect');
//     console.log('THIS IS BARS', bars[0])
//     // bars.forEach((bar, i) => {
//     //   console.log('THIS IS BARS', bar.getAttribute('fill'));
//     //   expect(bar.getAttribute('fill')).toBe(options.color);
//     // });
//     bars.forEach((bar, i) => {
//       expect(bar.style.fill).toBe(options.color);
//     });
//   });
});
