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
  { x: 15, y: 25 },
  { x: 38, y: 10 },
  { x: 42, y: 103 },
  { x: 66, y: 98 },
  { x: 89, y: 70 }
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

//Heat map data
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
  { label: 'Sunday', value: 140, group: 'B' },
];

//stacked bar chart data
export const stackedBarChartData = [
  {
    label: 'Category A',
    values: [
      { name: 'Value 1', value: 10 },
      { name: 'Value 2', value: 20 },
      { name: 'Value 3', value: 15 },
    ]
  },
  {
    label: 'Category B',
    values: [
      { name: 'Value 1', value: 25 },
      { name: 'Value 2', value: 5 },
      { name: 'Value 3', value: 18 },
    ]
  },
  {
    label: 'Category C',
    values: [
      { name: 'Value 1', value: 12 },
      { name: 'Value 2', value: 30 },
      { name: 'Value 3', value: 8 },
    ]
  }
];
