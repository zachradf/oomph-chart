export const treeDiagramData = {
  name: 'A',
  children: [
    {
      name: 'B',
      children: [
        { name: 'D' },
        { name: 'E' }
      ],
    },
    {
      name: 'C',
      children: [
        { name: 'F' },
        { name: 'G' }
      ],
    }
  ],
};

export const treeMapData = {
  name: 'root',
  children: [
    { name: 'A', value: 100 },
    { name: 'B', value: 80 },
    { name: 'C', value: 120 },
    { name: 'D', value: 60 }
  ],
};

export const forceDirectedData = {
  nodes: [
    { id: 'A', group: 1 },
    { id: 'B', group: 1 },
    { id: 'C', group: 1 },
    { id: 'D', group: 2 },
    { id: 'E', group: 2 },
    { id: 'F', group: 2 }
  ],
  links: [
    { source: 'A', target: 'B', value: 1 },
    { source: 'B', target: 'C', value: 1 },
    { source: 'C', target: 'A', value: 1 },
    { source: 'D', target: 'E', value: 2 },
    { source: 'E', target: 'F', value: 2 },
    { source: 'F', target: 'D', value: 2 },
    { source: 'C', target: 'D', value: 3 }
  ],
};

// any chart with one categorical and one numerical value
export const testDataBarChart = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 },
  { label: 'C', value: 30 },
  { label: 'D', value: 40 },
  { label: 'E', value: 50 }
];

// any chart with numerical x and y values
export const testDataScatterPlot = [
  { x: 10, y: 20 },
  { x: 30, y: 50 },
  { x: 45, y: 10 },
  { x: 60, y: 90 },
  { x: 80, y: 60 }
];
