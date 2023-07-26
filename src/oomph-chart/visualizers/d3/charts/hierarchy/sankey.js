import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

export default function createSankeyDiagram(data, options, chartComponents) {
  const {
    width,
    height,
    nodeRadius,
    nodePadding,
  } = options;
  const color = d3.scaleOrdinal(options.colorScheme);
  const { svg } = chartComponents;
  data = convertData(data);

  svg.append('g');

  const sankey = d3Sankey()
    .nodeWidth(nodeRadius)
    .nodePadding(nodePadding)
    .extent([[1, 1], [width - 1, height - 5]]);

  const { nodes, links } = sankey(data);

  svg.append('g')
    .selectAll('rect')
    .data(nodes)
    .join('rect')
    .attr('x', (d) => d.x0)
    .attr('y', (d) => d.y0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('fill', (d) => color(d.index))
    .attr('stroke', `${options.strokeColor}`);

  svg.append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .attr('x', (d) => d.x0 - 6)
    .attr('y', (d) => (d.y1 + d.y0) / 2)
    .attr('dy', '0.35em')
    .attr('text-anchor', `${options.textAnchor}`)
    .text((d) => d.name)
    .style('font-size', '12px')
    .style('fill', '#000')
    .filter((d) => d.x0 < width / 2)
    .attr('x', (d) => d.x1 + 6)
    .attr('text-anchor', 'start');

  svg.append('g')
    .selectAll('path')
    .data(links)
    .join('path')
    .attr('d', sankeyLinkHorizontal())
    .attr('fill', 'none')
    .attr('stroke', (d) => color(d.source.index))
    .attr('stroke-opacity', 0.5)
    .attr('stroke-width', (d) => Math.max(1, d.width));
}

// TODO refactor
function convertData(hierarchicalData) {
  let nodeIndex = 0;
  const nodeIndexMap = new Map();
  const sankeyData = { nodes: [], links: [] };

  hierarchicalData.forEach((parent) => {
    if (!nodeIndexMap.has(parent.name)) {
      nodeIndexMap.set(parent.name, nodeIndex++);
      sankeyData.nodes.push({ name: parent.name });
    }

    parent.children.forEach((child) => {
      if (!nodeIndexMap.has(child.name)) {
        nodeIndexMap.set(child.name, nodeIndex++);
        sankeyData.nodes.push({ name: child.name });
      }

      sankeyData.links.push({
        source: nodeIndexMap.get(parent.name),
        target: nodeIndexMap.get(child.name),
        value: child.value,
      });
    });
  });

  return sankeyData;
}

// function convertData(inputData) {
//   const outputData = {
//     nodes: [],
//     links: [],
//   };

//   // create an index mapping for node names
//   const indexMap = {};
//   let index = 0;

//   inputData.forEach((item) => {
//     // push node name to outputData if not already present
//     if (!indexMap.hasOwnProperty(item.category)) {
//       outputData.nodes.push({ name: item.category });
//       indexMap[item.category] = index;
//       index++;
//     }

//     item.children.forEach((child) => {
//       // push child node name to outputData if not already present
//       if (!indexMap.hasOwnProperty(child.name)) {
//         outputData.nodes.push({ name: child.name });
//         indexMap[child.name] = index;
//         index++;
//       }

//       // push link data to outputData
//       outputData.links.push({
//         source: indexMap[item.category],
//         target: indexMap[child.name],
//         value: child.value,
//       });
//     });
//   });

//   return outputData;
// }
