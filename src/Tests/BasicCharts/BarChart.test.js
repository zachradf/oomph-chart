// Import your createD3BarChart function and D3 library
import createD3BarChart from '../../Charts/simpleCharts/barChart.js';
import * as d3 from 'd3';

// Create a div element in the DOM for the chart
beforeAll(() => {
  const div = document.createElement('div');
  div.id = 'chart';
  document.body.appendChild(div);
});

// Remove the div element from the DOM after testing
afterAll(() => {
  document.getElementById('chart').remove();
});

describe('createD3BarChart', () => {
  test('renders the bar chart with sample data set 1', () => {
    const data = [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'C', value: 30 },
    ];
    const selector = '#chart';
    const options = {
      width: 500,
      height: 300,
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      color: 'steelblue',
    };

    createD3BarChart(data, selector, options);

    const svg = d3.select(selector).select('svg');
    expect(svg).toBeDefined();
    expect(svg.attr('width')).toBe(String(options.width));
    expect(svg.attr('height')).toBe(String(options.height));
  });

  test('renders the bar chart with sample data set 2', () => {
    const data = [
      { label: 'Apple', value: 15 },
      { label: 'Banana', value: 25 },
      { label: 'Cherry', value: 35 },
      { label: 'Date', value: 45 },
    ];
    const selector = '#chart';
    const options = {
      width: 600,
      height: 400,
      margin: { top: 20, right: 20, bottom: 30, left: 40 },
      color: 'orange',
    };

    createD3BarChart(data, selector, options);

    const svg = d3.select(selector).select('svg');
    expect(svg).toBeDefined();
    expect(svg.attr('width')).toBe(String(options.width));
    expect(svg.attr('height')).toBe(String(options.height));
  });
});
