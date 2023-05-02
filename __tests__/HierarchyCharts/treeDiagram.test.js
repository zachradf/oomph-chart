import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/no-relative-packages
import * as d3 from '../node_modules/d3/dist/d3.min.js';
import createTreeDiagram from '../../Charts/hierarchicalCharts/treeDiagram';

global.d3 = d3;

describe('createTreeDiagram', () => {
  let data; let
    options;

  beforeAll(() => {
    // Set up sample data and options
    data = {
      name: 'A',
      children: [
        {
          name: 'B',
          children: [
            { name: 'C' },
            { name: 'D' }
          ],
        },
        {
          name: 'E',
          children: [
            { name: 'F' }
          ],
        }
      ],
    };
    options = {
      width: 600,
      height: 600,
      color: 'steelblue',
      radius: 5,
      strokeColor: '#ccc',
    };
  });
  let jsdom;

  beforeEach(() => {
    // Set up a new JSDOM environment for each test
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
    // global.window = dom.window;
    // global.document = dom.window.document;
  });

  // afterEach(() => {
  //   // Clean up after each test by resetting the JSDOM environment
  //   delete global.window;
  //   delete global.document;
  // });

  // TODO - fix this test, same issue with BarChart selecting colors
  test('creates a tree diagram', () => {
    const { document } = jsdom.window;
    createTreeDiagram(data, document.querySelector('#chart'), options);
    const svg = document.querySelector('#chart svg.tree-diagram');
    console.log('THIS IS SVG-------------------', svg)
    expect(svg).not.toBeNull();
  });
  test('creates the correct number of nodes and links', () => {
    const { document } = jsdom.window;

    createTreeDiagram(data, document.querySelector('#chart'), options);

    const svg = document.querySelector('#chart svg.tree-diagram');
    const links = svg.querySelectorAll('.link');
    expect(links).toHaveLength(5);

    const nodes = svg.querySelectorAll('.node');
    expect(nodes).toHaveLength(6);
  });

  test('nodes have the correct color and radius', () => {
    const { document } = jsdom.window;

    createTreeDiagram(data, document.querySelector('#chart'), options);

    const nodes = document.querySelectorAll('#chart svg.tree-diagram .node circle');

    nodes.forEach((node) => {
      expect(node.getAttribute('r')).toBe(options.radius.toString());
      const nodeColor = node.style.fill;
      expect(nodeColor).toBe(options.color);
    });
  });
  // TODO This test is not working, links is empty
  test('links have the correct color and width', () => {
    const { document } = jsdom.window;

    createTreeDiagram(data, document.querySelector('#chart'), options);
    // setTimeout(() => {
    //   const links = document.querySelectorAll('#chart svg.tree-diagram .link');
    //   console.log('THIS IS LINKS _______________________________---------------', links);
    // }, 1000);
    const links = document.querySelectorAll('#chart svg.tree-diagram .link');
    // console.log('THIS IS LINK', links.length);

    links.forEach((link) => {
      expect(link.getAttribute('stroke')).toBe(options.strokeColor);
      expect(link.getAttribute('stroke-width')).toBe('1.5');
    });
  });
});
