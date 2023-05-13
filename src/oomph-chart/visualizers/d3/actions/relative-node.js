/**
 * adjustNodeSize - Adjusts the size of the nodes in a chart based on their values.
 *
 * @param {String} selector The CSS selector for the chart object containing nodes
 * @param {Array}  data The dataset containing node values
 * @param {Object} options Configuration options for the chart
 */
export default function adjustNodeSize(selector, data, options) {
  function collectNodeValues(data) {
    if (!data.children) {
      return data.map((d) => d.y);
    }

    return data.children.flatMap(collectNodeValues);
  }
  // Extract all node values
  const nodeValues = collectNodeValues(data);

  // Define minimum and maximum node sizes
  const minNodeSize = options.minNodeSize || 3;
  const maxNodeSize = options.maxNodeSize || 20;

  // Create a scale for node sizes
  const nodeSizeScale = d3.scaleSqrt()
    .domain([Math.min(...nodeValues), Math.max(...nodeValues)])
    .range([minNodeSize, maxNodeSize]);

  // Update node size
  const nodes = d3.select(selector).selectAll('circle');
  console.log(nodes);
  nodes.each(function () {
    const el = d3.select(this);
    console.log('relative node', el);
    el.attr('r', (d) => {
      if (nodeSizeScale(d.y) <= 0) {
        return 1;
      }
      return nodeSizeScale(d.y);
    });
  });
}
