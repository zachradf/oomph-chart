export const treeDiagramData = {
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

export const treeMapData = {
  name: 'root',
  children: [
    {
      name: 'Category A',
      children: [
        { name: 'Item A1', value: 50 },
        { name: 'Item A2', value: 30 },
        { name: 'Item A3', value: 40 }
      ],
    },
    {
      name: 'Category B',
      children: [
        { name: 'Item B1', value: 20 },
        { name: 'Item B2', value: 60 },
        { name: 'Item B3', value: 35 }
      ],
    },
    {
      name: 'Category C',
      children: [
        { name: 'Item C1', value: 25 },
        { name: 'Item C2', value: 45 },
        { name: 'Item C3', value: 15 }
      ],
    }
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

// any chart with one categorical and one numerical value: donut chart, pie chart, bar chart etc.
export const testDataBarChart = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 },
  { label: 'C', value: 30 },
  { label: 'D', value: 40 },
  { label: 'E', value: 50 }
];
export const testDataDonutChart = [
  { label: 'Apple', value: 30 },
  { label: 'Orange', value: 20 },
  { label: 'Banana', value: 25 },
  { label: 'Mango', value: 15 },
  { label: 'Pineapple', value: 10 }
];

// any chart with numerical x and y values
export const testDataScatterPlot = [
  { x: 10, y: 20 },
  { x: 30, y: 50 },
  { x: 45, y: 10 },
  { x: 60, y: 90 },
  { x: 87, y: 60 },
  { x: 95, y: 25 },
  { x: 108, y: 10 },
  { x: 142, y: 103 },
  { x: 166, y: 98 },
  { x: 189, y: 70 }
];

export const heatMapData2 = [
  { xLabel: 'A', yLabel: '1', value: 50 },
  { xLabel: 'A', yLabel: '2', value: 100 },
  { xLabel: 'A', yLabel: '3', value: 150 },
  { xLabel: 'B', yLabel: '1', value: 200 },
  { xLabel: 'B', yLabel: '2', value: 250 },
  { xLabel: 'B', yLabel: '3', value: 300 },
  { xLabel: 'C', yLabel: '1', value: 350 },
  { xLabel: 'C', yLabel: '2', value: 400 },
  { xLabel: 'C', yLabel: '3', value: 450 }
];

export const stackedBarChartData2 = [
  {
    label: 'Jan',
    values: [
      { group: 'Group A', value: 10 },
      { group: 'Group B', value: 20 },
      { group: 'Group C', value: 30 }
    ],
  },
  {
    label: 'Feb',
    values: [
      { group: 'Group A', value: 15 },
      { group: 'Group B', value: 25 },
      { group: 'Group C', value: 35 }
    ],
  },
  {
    label: 'Mar',
    values: [
      { group: 'Group A', value: 20 },
      { group: 'Group B', value: 30 },
      { group: 'Group C', value: 40 }
    ],
  }
];

// extreme scatter plot data
// Generate a high volume data set with 1 million data points
export const extremeScatterPlot1 = Array.from({ length: 10000 }, () => ({
  x: Math.random(),
  y: Math.random(),
}));
// Generate a high variation data set with values between -1000 and 1000
export const extremeScatterPlot2 = Array.from({ length: 25000 }, () => ({
  x: Math.random() * 2000 - 1000,
  y: Math.random() * 2000 - 1000,
}));

// extreme barchart data
export const dataSet1 = Array.from({ length: 1000 }, (_, i) => ({
  label: i,
  value: Math.floor(Math.random() * 1000),
}));
// bubble chart data
export const bubbleChartData = [
  {
    name: 'Category 1',
    value: 20,
    children: [
      { name: 'Subcategory 1A', value: 10 },
      { name: 'Subcategory 1B', value: 5 },
      { name: 'Subcategory 1C', value: 5 }
    ],
  },
  {
    name: 'Category 2',
    value: 10,
    children: [
      { name: 'Subcategory 2A', value: 7.5 },
      { name: 'Subcategory 2B', value: 2 }
    ],
  }
];

// Heat map data
export const heatMapData = [
  { label: 'Monday', value: 10, group: 'A' },
  { label: 'Tuesday', value: 20, group: 'A' },
  { label: 'Wednesday', value: 30, group: 'A' },
  { label: 'Thursday', value: 40, group: 'A' },
  { label: 'Friday', value: 50, group: 'A' },
  { label: 'Saturday', value: 60, group: 'A' },
  { label: 'Sunday', value: 70, group: 'A' },
  { label: 'Monday', value: 80, group: 'B' },
  { label: 'Tuesday', value: 90, group: 'B' },
  { label: 'Wednesday', value: 100, group: 'B' },
  { label: 'Thursday', value: 110, group: 'B' },
  { label: 'Friday', value: 120, group: 'B' },
  { label: 'Saturday', value: 130, group: 'B' },
  { label: 'Sunday', value: 140, group: 'B' }
];

// stacked bar chart data
export const stackedBarChartData = [
  {
    label: 'Category A',
    values: [
      { name: 'Value 1', value: 10 },
      { name: 'Value 2', value: 20 },
      { name: 'Value 3', value: 15 }
    ],
  },
  {
    label: 'Category B',
    values: [
      { name: 'Value 1', value: 25 },
      { name: 'Value 2', value: 5 },
      { name: 'Value 3', value: 18 }
    ],
  },
  {
    label: 'Category C',
    values: [
      { name: 'Value 1', value: 12 },
      { name: 'Value 2', value: 30 },
      { name: 'Value 3', value: 8 }
    ],
  }
];

export const sunburstData ={
  name: 'A',
  children: [
    {
      name: 'B',
      children: [
        { name: 'B1', value: 4 },
        { name: 'B2', value: 4 },
        { name: 'B3', value: 4 },
        { name: 'B4', value: 4 },
        { name: 'B5', value: 4 }
      ]
    },
    {
      name: 'C',
      children: [
        { name: 'C1', value: 3 },
        { name: 'C2', value: 3 },
        { name: 'C3', value: 3 },
        { name: 'C4', value: 3 },
        { name: 'C5', value: 3 }
      ]
    },
    {
      name: 'D',
      children: [
        { name: 'D1', value: 2 },
        { name: 'D2', value: 2 },
        { name: 'D3', value: 2 },
        { name: 'D4', value: 2 },
        { name: 'D5', value: 2 }
      ]
    },
    {
      name: 'E',
      children: [
        { name: 'E1', value: 1 },
        { name: 'E2', value: 1 },
        { name: 'E3', value: 1 },
        { name: 'E4', value: 1 },
        { name: 'E5', value: 1 }
      ]
    },
    {
      name: 'F',
      children: [
        { name: 'F1', value: 1 },
        { name: 'F2', value: 1 },
        { name: 'F3', value: 1 },
        { name: 'F4', value: 1 },
        { name: 'F5', value: 1 }
      ]
    }
  ]
};
