import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
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
      nodeColor: 'steelblue',
      nodeRadius: 5,
      linkColor: '#ccc',
    };
  });

  beforeEach(() => {
    // Set up a new JSDOM environment for each test
    const dom = new JSDOM('<!DOCTYPE html><div id="chart"></div>');
    global.window = dom.window;
    global.document = dom.window.document;
  });

  afterEach(() => {
    // Clean up after each test by resetting the JSDOM environment
    delete global.window;
    delete global.document;
  });

// TODO - fix this test, same issue with BarChart selecting colors  
//   test('creates a tree diagram', () => {
//     const { document } = global.window;

//     createTreeDiagram(data, document.querySelector('#chart'), options);

//     const svg = document.querySelector('#chart svg.tree-diagram');
//     expect(svg).not.toBeNull();

//     const links = svg.querySelectorAll('.link');
//     expect(links).toHaveLength(3);

//     const nodes = svg.querySelectorAll('.node');
//     expect(nodes).toHaveLength(6);
//   });

//   test('nodes have the correct color and radius', () => {
//     const { document } = global.window;

//     createTreeDiagram(data, document.querySelector('#chart'), options);

//     const nodes = document.querySelectorAll('#chart svg.tree-diagram .node circle');

//     nodes.forEach((node) => {
//       expect(node.getAttribute('r')).toBe(options.nodeRadius.toString());
//       expect(node.getAttribute('fill')).toBe(options.nodeColor);
//     });
//   });

  test('links have the correct color and width', () => {
    const { document } = global.window;

    createTreeDiagram(data, document.querySelector('#chart'), options);

    const links = document.querySelectorAll('#chart svg.tree-diagram .link');

    links.forEach((link) => {
      expect(link.getAttribute('stroke')).toBe(options.linkColor);
      expect(link.getAttribute('stroke-width')).toBe('1.5');
    });
  });
});
