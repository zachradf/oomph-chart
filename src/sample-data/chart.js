export const chartData = {};
chartData.cluster = [
  {
    name: 'child1',
    value: 100,
    children: [
      {
        name: 'grandchild1',
        value: 50,
      },
      {
        name: 'grandchild2',
        value: 60,
      },
    ],
  },
  {
    name: 'child2',
    value: 80,
    children: [
      {
        name: 'grandchild3',
        value: 30,
      },
      {
        name: 'grandchild4',
        value: 70,
      },
    ],
  },
];

chartData.treeDiagram = [{
  name: 'A',
  value: null,
  children: [
    {
      name: 'B',
      value: null,
      children: [
        { name: 'C', value: null },
        { name: 'D', value: null },
      ],
    },
    {
      name: 'E',
      value: null,
      children: [
        { name: 'F', value: null },
      ],
    },
  ],
}];

chartData.treeMap = [{
  name: 'Category A',
  value: null,
  children: [
    { name: 'Item A1', value: 50 },
    { name: 'Item A2', value: 30 },
    { name: 'Item A3', value: 40 },
    { name: 'Item A4', value: 50 },
    { name: 'Item A5', value: 20 },
    { name: 'Item A6', value: 45 },
  ],
},
{
  name: 'Category B',
  value: null,
  children: [
    { name: 'Item B1', value: 20 },
    { name: 'Item B2', value: 60 },
    { name: 'Item B3', value: 35 },
    { name: 'Item B4', value: 5 },
    { name: 'Item B5', value: 80 },
    { name: 'Item B6', value: 35 },
  ],
},
{
  name: 'Category C',
  value: null,
  children: [
    { name: 'Item C1', value: 25 },
    { name: 'Item C2', value: 45 },
    { name: 'Item C3', value: 15 },
    { name: 'Item C4', value: 25 },
    { name: 'Item C5', value: 45 },
    { name: 'Item C6', value: 25 },
    { name: 'Item C7', value: 55 },
    { name: 'Item C8', value: 5 },
    { name: 'Item C9', value: 15 },
  ],
},
];

chartData.forceDirected = {
  nodes: [
    { id: 'A', group: 1 },
    { id: 'B', group: 1 },
    { id: 'C', group: 1 },
    { id: 'D', group: 2 },
    { id: 'E', group: 2 },
    { id: 'F', group: 2 },
  ],
  links: [
    { source: 'A', target: 'B', value: 1 },
    { source: 'B', target: 'C', value: 1 },
    { source: 'C', target: 'A', value: 1 },
    { source: 'D', target: 'E', value: 2 },
    { source: 'E', target: 'F', value: 2 },
    { source: 'F', target: 'D', value: 2 },
    { source: 'C', target: 'D', value: 3 },
  ],
};

// any chart with one categorical and one numerical value: donut chart, pie chart, bar chart etc.
chartData.barChart = [
  { x: 'A', y: 10 },
  { x: 'B', y: 20 },
  { x: 'C', y: 30 },
  { x: 'D', y: 40 },
  { x: 'E', y: 50 },
  { x: 'F', y: 60 },
  { x: 'G', y: 70 },
];

chartData.barChart2 = [
  { x: 'A', y: 10 },
  { x: 'B', y: 20 },
  { x: 'C', y: 30 },
  { x: 'D', y: 40 },
  { x: 'E', y: 50 },
  { x: 'F', y: 40 },
  { x: 'G', y: 50 },
  // { x: 'H', y: 60 },
];

chartData.donutChart = [
  { x: 'Apple', y: 30 },
  { x: 'Orange', y: 20 },
  { x: 'Banana', y: 25 },
  { x: 'Mango', y: 15 },
  { x: 'Pineapple', y: 10 },
];

// any chart with numerical x and y values
chartData.scatterPlot = [
  { x: 10, y: 20 },
  { x: 30, y: 50 },
  { x: 45, y: 10 },
  { x: 60, y: 90 },
  { x: 87, y: 60 },
  { x: 95, y: 25 },
  { x: 108, y: 10 },
  { x: 142, y: 103 },
  { x: 166, y: 98 },
  { x: 189, y: 70 },
];

chartData.scatterPlot2 = [
  ...Array(15).fill().map(() => ({
    x: -100 - Math.random() * 100,
    y: -100 - Math.random() * 100,
  })),
  ...Array(15).fill().map(() => ({
    x: 100 + Math.random() * 100,
    y: -100 - Math.random() * 100,
  })),
  ...Array(15).fill().map(() => ({
    x: 100 + Math.random() * 100,
    y: 100 + Math.random() * 100,
  })),
  ...Array(15).fill().map(() => ({
    x: -100 - Math.random() * 100,
    y: 100 + Math.random() * 100,
  })),
];
// [
//   { x: -10, y: 20 },
//   { x: 30, y: 54 },
//   { x: 45, y: 11 },
//   { x: 20, y: 98 },
//   { x: 87, y: 63 },
//   { x: 5, y: 33 },
//   { x: 128, y: -10 },
//   { x: 162, y: 103 },
//   { x: 16, y: 98 },
//   { x: 19, y: -40 },
//   { x: -10, y: 29 },
//   { x: 38, y: 4 },
//   { x: 45, y: 11 },
//   { x: 20, y: 98 },
//   { x: 107, y: 60 },
//   { x: 50, y: 33 },
//   { x: 28, y: 80 },
//   { x: 162, y: 13 },
//   { x: 16, y: 8 },
//   { x: 19, y: -40 },
//   { x: -10, y: 20 },
//   { x: 30, y: 54 },
//   { x: 45, y: 11 },
//   { x: 20, y: 98 },
//   { x: 87, y: 63 },
//   { x: 5, y: 33 },
//   { x: 128, y: -10 },
//   { x: 62, y: 103 },
//   { x: 106, y: 98 },
//   { x: 149, y: -40 },
//   { x: -120, y: 49 },
//   { x: 3, y: 24 },
//   { x: 5, y: 110 },
//   { x: 200, y: 38 },
//   { x: 17, y: 69 },
//   { x: 50, y: 13 },
//   { x: 28, y: 8 },
//   { x: 169, y: 103 },
//   { x: 50, y: 80 },
//   { x: 30, y: -40 },
// ];

chartData.scatterPlot3 = [
  { x: 15, y: 30 },
  { x: 34, y: 52 },
  { x: 49, y: 16 },
  { x: 10, y: 92 },
  { x: 34, y: 35 },
  { x: 26, y: 75 },
  { x: 18, y: 13 },
  { x: 172, y: 13 },
  { x: 146, y: 108 },
  { x: 129, y: 75 },
];

// // Randomize testDataScatterPlot2
//   testDataScatterPlot2.forEach((item) => {
//   item.x = Math.floor(Math.random() * (190 - 10) + 10);
//   item.y = Math.floor(Math.random() * (100 - 10) + 10);
// });

// // Randomize testDataScatterPlot3
//  testDataScatterPlot3.forEach((item) => {
//   item.x = Math.floor(Math.random() * (190 - 10) + 10);
//   item.y = Math.floor(Math.random() * (100 - 10) + 10);
// });
// cadidate for y2 axis
function generateRandomCoordinates(numPoints = 50, range = 250) {
  const coordinates = [];

  for (let i = 0; i < numPoints; i++) {
    const x = Math.floor(Math.random() * (range + 1));
    const y = Math.floor(Math.random() * (range + 1));

    coordinates.push({ x, y });
  }

  return coordinates;
}

chartData.scatterPlotRandom = generateRandomCoordinates();
chartData.scatterPlotRandom2 = generateRandomCoordinates();
// console.log(randomCoordinates);

chartData.heatMap2 = [
  { x: 'A', y: '1', value: 50 },
  { x: 'A', y: '2', value: 100 },
  { x: 'A', y: '3', value: 150 },
  { x: 'B', y: '1', value: 200 },
  { x: 'B', y: '2', value: 250 },
  { x: 'B', y: '3', value: 300 },
  { x: 'C', y: '1', value: 350 },
  { x: 'C', y: '2', value: 400 },
  { x: 'C', y: '3', value: 450 },
];

// TODO change category to name or vice versa
// chartData.stackedBarChart2 = [
//   {
//     category: 'Jan',
//     values: [
//       { group: 'Group A', value: 10 },
//       { group: 'Group B', value: 20 },
//       { group: 'Group C', value: 30 },
//     ],
//   },
//   {
//     category: 'Feb',
//     values: [
//       { group: 'Group A', value: 15 },
//       { group: 'Group B', value: 25 },
//       { group: 'Group C', value: 35 },
//     ],
//   },
//   {
//     category: 'Mar',
//     values: [
//       { group: 'Group A', value: 20 },
//       { group: 'Group B', value: 30 },
//       { group: 'Group C', value: 40 },
//     ],
//   },
// ];

// extreme scatter plot data
// Generate a high volume data set with 1 million data points
chartData.extremeScatterPlot1 = Array.from({ length: 10000 }, () => ({
  x: Math.random(),
  y: Math.random(),
}));
chartData.voronoi = [
  {
    name: 'Category A',
    value: 300, // The sum of the child values should be equal to or less than this.
    children: [
      {
        name: 'Sub-Category A1',
        value: 100,
        children: [
          { name: 'Item A1.1', value: 30 },
          { name: 'Item A1.2', value: 20 },
          { name: 'Item A1.3', value: 50 },
        ],
      },
      {
        name: 'Sub-Category A2',
        value: 200,
        children: [
          { name: 'Item A2.1', value: 100 },
          { name: 'Item A2.2', value: 50 },
          { name: 'Item A2.3', value: 50 },
        ],
      },
    ],
  },
  {
    name: 'Category B',
    value: 700, // The sum of the child values should be equal to or less than this.
    children: [
      {
        name: 'Sub-Category B1',
        value: 200,
        children: [
          { name: 'Item B1.1', value: 100 },
          { name: 'Item B1.2', value: 50 },
          { name: 'Item B1.3', value: 50 },
        ],
      },
      {
        name: 'Sub-Category B2',
        value: 300,
        children: [
          { name: 'Item B2.1', value: 100 },
          { name: 'Item B2.2', value: 100 },
          { name: 'Item B2.3', value: 100 },
        ],
      },
      {
        name: 'Sub-Category B3',
        value: 200,
        children: [
          { name: 'Item B3.1', value: 50 },
          { name: 'Item B3.2', value: 75 },
          { name: 'Item B3.3', value: 75 },
        ],
      },
    ],
  },
];

// Generate a high variation data set with values between -1000 and 1000
chartData.extremeScatterPlot2 = Array.from({ length: 25000 }, () => ({
  x: Math.random() * 2000 - 1000,
  y: Math.random() * 2000 - 1000,
}));

// extreme barchart data
chartData.dataSet1 = Array.from({ length: 1000 }, (_, i) => ({
  category: i,
  value: Math.floor(Math.random() * 1000),
}));
chartData.chordData = [
  {
    category: 'Category 1',
    value: 100,
    children: [
      { name: 'Category 2', value: 30 },
      { name: 'Category 3', value: 20 },
      { name: 'Category 4', value: 50 },
    ],
  },
  {
    category: 'Category 2',
    value: 80,
    children: [
      { name: 'Category 1', value: 10 },
      { name: 'Category 3', value: 40 },
      { name: 'Category 4', value: 30 },
    ],
  },
  {
    category: 'Category 3',
    value: 120,
    children: [
      { name: 'Category 1', value: 20 },
      { name: 'Category 2', value: 50 },
      { name: 'Category 4', value: 50 },
    ],
  },
  {
    category: 'Category 4',
    value: 90,
    children: [
      { name: 'Category 1', value: 30 },
      { name: 'Category 2', value: 30 },
      { name: 'Category 3', value: 30 },
    ],
  },
];

chartData.bubbleChartFlat = [
  {
    category: 'Category 1',
    value: 20,
    children: [
      { name: 'Subcategory 1A', value: 10 },
    ],
  },
  {
    category: 'Category 2',
    value: 10,
    children: [
      { name: 'Subcategory 2A', value: 7.5 },
      { name: 'Subcategory 2B', value: 2 },
    ],
  },
  {
    category: 'Category 3',
    value: 21,
    children: [
      { name: 'Subcategory 3A: this is a brief description of what this category is incase anyone wants to do that idk.', value: 7.5 },
      { name: 'Subcategory 3B', value: 2 },
      { name: 'Subcategory 3A', value: 9.5 },
      { name: 'Subcategory 3B', value: 12 },
    ],
  },
];
chartData.bubbleChart = [
  {
    name: 'Category 1',
    value: 175,
    children: [
      {
        name: 'Subcategory 1A',
        value: 50,
        children: [
          { name: 'SubSubCategory 1AA', value: 25 },
          { name: 'SubSubCategory 2AA', value: 25 },
          { name: 'SubSubCategory 3AA', value: 25 },

        ],
      },
      { name: 'Subcategory 1B', value: 50 },
    ],
  },
  {
    name: 'Category 2',
    value: 200,
    children: [
      { name: 'Subcategory 2A', value: 100 },
      { name: 'Subcategory 2B', value: 100 },
    ],
  },
  {
    name: 'Category 3',
    value: 150,
    children: [
      { name: 'Subcategory 3A', value: 50 },
      { name: 'Subcategory 3B', value: 50 },
      { name: 'Subcategory 3C', value: 50 },
    ],
  },
];

// chartData.bubbleChart = [
//   {
//     name: 'Category 1',
//     value: 20,
//     children: [
//       {
//         name: 'Subcategory 1A',
//         value: 10,
//         children: [
//           { name: 'Sub-subcategory 1A1', value: 5 },
//           { name: 'Sub-subcategory 1A2', value: 5 },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Category 2',
//     value: 10,
//     children: [
//       {
//         name: 'Subcategory 2A',
//         value: 7.5,
//         children: [
//           { name: 'Sub-subcategory 2A1', value: 3.75 },
//           { name: 'Sub-subcategory 2A2', value: 3.75 },
//         ],
//       },
//       { name: 'Subcategory 2B', value: 2 },
//     ],
//   },
//   {
//     name: 'Category 3',
//     value: 21,
//     children: [
//       {
//         name: 'Subcategory 3A: this is a brief description of what this category is incase anyone wants to do that idk.',
//         value: 7.5,
//         children: [
//           { name: 'Sub-subcategory 3A1', value: 3.75 },
//           { name: 'Sub-subcategory 3A2', value: 3.75 },
//         ],
//       },
//       { name: 'Subcategory 3B', value: 2 },
//       { name: 'Subcategory 3A', value: 9.5 },
//       { name: 'Subcategory 3B', value: 12 },
//     ],
//   },
// ];

// Heat map data candidate for y2 axis
chartData.heatMap = [
  { x: 'Monday', y: 10, group: 'A' },
  { x: 'Tuesday', y: 20, group: 'A' },
  { x: 'Wednesday', y: 30, group: 'A' },
  { x: 'Thursday', y: 40, group: 'A' },
  { x: 'Friday', y: 50, group: 'A' },
  { x: 'Saturday', y: 60, group: 'A' },
  { x: 'Sunday', y: 70, group: 'A' },
  { x: 'Monday', y: 80, group: 'B' },
  { x: 'Tuesday', y: 90, group: 'B' },
  { x: 'Wednesday', y: 100, group: 'B' },
  { x: 'Thursday', y: 110, group: 'B' },
  { x: 'Friday', y: 120, group: 'B' },
  { x: 'Saturday', y: 130, group: 'B' },
  { x: 'Sunday', y: 140, group: 'B' },
];

// see if this can be broken up into seperate objects that are compativle with barchart
// chartData.stackedBarChart = [
//   {
//     category: 'Category A',
//     values: [
//       { name: 'Value 1', value: 10 },
//       { name: 'Value 2', value: 20 },
//       { name: 'Value 3', value: 15 },
//     ],
//   },
//   {
//     category: 'Category B',
//     values: [
//       { name: 'Value 1', value: 25 },
//       { name: 'Value 2', value: 5 },
//       { name: 'Value 3', value: 18 },
//     ],
//   },
//   {
//     category: 'Category C',
//     values: [
//       { name: 'Value 1', value: 12 },
//       { name: 'Value 2', value: 30 },
//       { name: 'Value 3', value: 8 },
//     ],
//   },
//   {
//     category: 'Category D',
//     values: [
//       { name: 'Value 1', value: 12 },
//       { name: 'Value 2', value: 30 },
//       { name: 'Value 3', value: 8 },
//     ],
//   },
// ];
chartData.stackedBarChart = [
  {
    name: 'Category A',
    value: 45,
    children: [
      { name: 'Value 1', value: 10 },
      { name: 'Value 2', value: 20 },
      { name: 'Value 3', value: 15 },
    ],
  },
  {
    name: 'Category B',
    value: 48,
    children: [
      { name: 'Value 1', value: 25 },
      { name: 'Value 2', value: 5 },
      { name: 'Value 3', value: 18 },
    ],
  },
  {
    name: 'Category C',
    value: 50,
    children: [
      { name: 'Value 1', value: 12 },
      { name: 'Value 2', value: 30 },
      { name: 'Value 3', value: 8 },
    ],
  },
  {
    name: 'Category D',
    value: 50,
    children: [
      { name: 'Value 1', value: 12 },
      { name: 'Value 2', value: 30 },
      { name: 'Value 3', value: 8 },
    ],
  },
];
chartData.sunburst = [
  {
    name: 'A',
    value: 55,
    children: [
      {
        name: 'B',
        children: [
          { name: 'B1', value: 4 },
          { name: 'B2', value: 4 },
          { name: 'B3', value: 4 },
          { name: 'B4', value: 4 },
          { name: 'B5', value: 4 },
        ],
      },
      {
        name: 'C',
        children: [
          { name: 'C1', value: 3 },
          { name: 'C2', value: 3 },
          { name: 'C3', value: 3 },
          { name: 'C4', value: 3 },
          { name: 'C5', value: 3 },
        ],
      },
      {
        name: 'D',
        children: [
          { name: 'D1', value: 2 },
          { name: 'D2', value: 2 },
          { name: 'D3', value: 2 },
          { name: 'D4', value: 2 },
          { name: 'D5', value: 2 },
        ],
      },
      {
        name: 'E',
        children: [
          { name: 'E1', value: 1 },
          { name: 'E2', value: 1 },
          { name: 'E3', value: 1 },
          { name: 'E4', value: 1 },
          { name: 'E5', value: 1 },
        ],
      },
      {
        name: 'F',
        children: [
          { name: 'F1', value: 1 },
          { name: 'F2', value: 1 },
          { name: 'F3', value: 1 },
          { name: 'F4', value: 1 },
          { name: 'F5', value: 1 },
        ],
      },
    ],
  },
];

// chartData.sunburst = {
//   name: 'A',
//   children: [
//     {
//       name: 'B',
//       children: [
//         { name: 'B1', value: 4 },
//         { name: 'B2', value: 4 },
//         { name: 'B3', value: 4 },
//         { name: 'B4', value: 4 },
//         { name: 'B5', value: 4 },
//       ],
//     },
//     {
//       name: 'C',
//       children: [
//         { name: 'C1', value: 3 },
//         { name: 'C2', value: 3 },
//         { name: 'C3', value: 3 },
//         { name: 'C4', value: 3 },
//         { name: 'C5', value: 3 },
//       ],
//     },
//     {
//       name: 'D',
//       children: [
//         { name: 'D1', value: 2 },
//         { name: 'D2', value: 2 },
//         { name: 'D3', value: 2 },
//         { name: 'D4', value: 2 },
//         { name: 'D5', value: 2 },
//       ],
//     },
//     {
//       name: 'E',
//       children: [
//         { name: 'E1', value: 1 },
//         { name: 'E2', value: 1 },
//         { name: 'E3', value: 1 },
//         { name: 'E4', value: 1 },
//         { name: 'E5', value: 1 },
//       ],
//     },
//     {
//       name: 'F',
//       children: [
//         { name: 'F1', value: 1 },
//         { name: 'F2', value: 1 },
//         { name: 'F3', value: 1 },
//         { name: 'F4', value: 1 },
//         { name: 'F5', value: 1 },
//       ],
//     },
//   ],
// };

// TODO value can be calculated from start and end, candidate for y2 axis
chartData.waterfall = [
  { x: 'A', y1: 0, y2: 20 },
  { x: 'B', y1: 20, y2: 30 },
  { x: 'C', y1: 30, y2: 25 },
  { x: 'D', y1: 25, y2: 40 },
  { x: 'E', y1: 40, y2: 30 },
  { x: 'F', y1: 30, y2: 35 },
  { x: 'G', y1: 35, y2: 50 },
];
// [
//   {
//     category: 'A', start: 0, end: 20,
//   },
//   {
//     category: 'B', start: 20, end: 30,
//   },
//   {
//     category: 'C', start: 30, end: 25,
//   },
//   {
//     category: 'D', start: 25, end: 40,
//   },
//   {
//     category: 'E', start: 40, end: 30,
//   },
//   {
//     category: 'F', start: 30, end: 35,
//   },
//   {
//     category: 'G', start: 35, end: 50,
//   },
// ];

// TODO funnelChart 'x' values would actually be on the y axis, do you still convert?
chartData.funnelChart = [
  { x: 'Stage 1', y: 1000 },
  { x: 'Stage 2', y: 800 },
  { x: 'Stage 3', y: 600 },
  { x: 'Stage 4', y: 400 },
  { x: 'Stage 5', y: 200 },
];

chartData.funnelChart2 = [
  { x: 'Stage 1', y: 100 },
  { x: 'Stage 2', y: 800 },
  { x: 'Stage 3', y: 900 },
  { x: 'Stage 4', y: 200 },
  { x: 'Stage 5', y: 1900 },
  { x: 'Stage 6', y: 10 },
  { x: 'Stage 7', y: 40 },
];

chartData.polarChart = [
  { x: 'A', y: 100 },
  { x: 'B', y: 200 },
  { x: 'C', y: 150 },
  { x: 'D', y: 75 },
  { x: 'E', y: 125 },
];
chartData.radialTree = [
  {
    name: 'child 1',
    children: [
      {
        name: 'grandchild 1',

      },
      {
        name: 'grandchild 2',

      },
    ],
  },
  {
    name: 'child 2',
    children: [
      {
        name: 'grandchild 3',
      },
      {
        name: 'grandchild 4',
      },
    ],
  },
];

chartData.radarChart = [
  { x: 'A', y: 100 },
  { x: 'B', y: 100 },
  { x: 'C', y: 10 },
  { x: 'D', y: 75 },
  { x: 'E', y: 25 },
  { x: 'F', y: 25 },

];

chartData.boxPlot = [
  {
    category: 'A',
    min: 10,
    q1: 20,
    q3: 40,
    max: 60,
  },
  {
    category: 'B',
    min: 5,
    q1: 25,
    q3: 45,
    max: 75,
  },
  {
    category: 'C',
    min: 15,
    q1: 30,
    q3: 50,
    max: 80,
  },
  {
    category: 'D',
    min: 8,
    q1: 28,
    q3: 48,
    max: 68,
  },
];

// chartData.chord = [
//   [4, 5, 1, 0],
//   [2, 3, 2, 1],
//   [0, 6, 9, 10],
//   [1, 2, 3, 4],
//   ['A', 'B', 'C', 'D'],
// ];
chartData.chord = [
  {
    name: 'A',
    value: null,
    children: [
      { name: 'A', value: 4 },
      { name: 'B', value: 5 },
      { name: 'C', value: 1 },
      { name: 'D', value: 0 },
    ],
  },
  {
    name: 'B',
    value: null,
    children: [
      { name: 'A', value: 2 },
      { name: 'B', value: 3 },
      { name: 'C', value: 2 },
      { name: 'D', value: 1 },
    ],
  },
  {
    name: 'C',
    value: null,
    children: [
      { name: 'A', value: 0 },
      { name: 'B', value: 6 },
      { name: 'C', value: 9 },
      { name: 'D', value: 10 },
    ],
  },
  {
    name: 'D',
    value: null,
    children: [
      { name: 'A', value: 1 },
      { name: 'B', value: 2 },
      { name: 'C', value: 3 },
      { name: 'D', value: 4 },
    ],
  },
];
chartData.dendrogram = [
  {
    name: 'Category 1',
    value: 10,
    children: [
      {
        name: 'Subcategory 1A',
        value: 5,
        children: [
          { name: 'Sub-subcategory 1A1', value: 2 },
          { name: 'Sub-subcategory 1A2', value: 3 },
        ],
      },
      {
        name: 'Subcategory 1B',
        value: 5,
        children: [
          { name: 'Sub-subcategory 1B1', value: 2 },
          { name: 'Sub-subcategory 1B2', value: 3 },
        ],
      },
    ],
  },
  {
    name: 'Category 2',
    value: 15,
    children: [
      {
        name: 'Subcategory 2A',
        value: 7,
        children: [
          { name: 'Sub-subcategory 2A1', value: 3 },
          { name: 'Sub-subcategory 2A2', value: 4 },
        ],
      },
      { name: 'Subcategory 2B', value: 8 },
    ],
  },
];
chartData.icicle = [
  {
    name: 'Electronics',
    value: 1000,
    children: [
      {
        name: 'Laptops',
        value: 400,
      },
      {
        name: 'Mobile Phones',
        value: 600,
      },
    ],
  },
  {
    name: 'Books',
    value: 300,
    children: [
      {
        name: 'Fiction',
        value: 150,
      },
      {
        name: 'Non-Fiction',
        value: 150,
      },
    ],
  },
  {
    name: 'Apparel',
    value: 700,
    children: [
      {
        name: "Men's",
        value: 350,
      },
      {
        name: "Women's",
        value: 350,
      },
    ],
  },
];

// chartData.sankey = {
//   nodes: [
//     { name: 'Agriculture' },
//     { name: 'Industry' },
//     { name: 'Residential' },
//     { name: 'Electricity' },
//     { name: 'Natural Gas' },
//     { name: 'Coal' },
//     { name: 'Petroleum' },
//   ],
//   links: [
//     { source: 0, target: 3, value: 20 },
//     { source: 0, target: 4, value: 15 },
//     { source: 0, target: 5, value: 5 },
//     { source: 0, target: 6, value: 30 },
//     { source: 1, target: 3, value: 50 },
//     { source: 1, target: 4, value: 40 },
//     { source: 1, target: 5, value: 20 },
//     { source: 1, target: 6, value: 35 },
//     { source: 2, target: 3, value: 100 },
//     { source: 2, target: 4, value: 60 },
//     { source: 2, target: 5, value: 5 },
//     { source: 2, target: 6, value: 10 },
//   ],
// };
chartData.sankey = [
  {
    name: 'Agriculture',
    children: [
      { name: 'Electricity', value: 20 },
      { name: 'Natural Gas', value: 15 },
      { name: 'Coal', value: 5 },
      { name: 'Petroleum', value: 30 },
    ],
    value: 70,
  },
  {
    name: 'Industry',
    children: [
      { name: 'Electricity', value: 50 },
      { name: 'Natural Gas', value: 40 },
      { name: 'Coal', value: 20 },
      { name: 'Petroleum', value: 35 },
    ],
    value: 145,
  },
  {
    name: 'Residential',
    children: [
      { name: 'Electricity', value: 100 },
      { name: 'Natural Gas', value: 60 },
      { name: 'Coal', value: 5 },
      { name: 'Petroleum', value: 10 },
    ],
    value: 175,
  },
];

chartData.marimekko = [
  {
    name: 'Fruits',
    value: null,
    children: [
      { name: 'Apples', value: 0.2 },
      { name: 'Oranges', value: 0.3 },
      { name: 'Bananas', value: 0.5 },
    ],
  },
  {
    name: 'Vegetables',
    value: null,
    children: [
      { name: 'Carrots', value: 0.6 },
      { name: 'Potatoes', value: 0.3 },
      { name: 'Tomatoes', value: 0.1 },
    ],
  },
  {
    name: 'Grains',
    value: null,
    children: [
      { name: 'Wheat', value: 0.4 },
      { name: 'Rice', value: 0.4 },
      { name: 'Oats', value: 0.2 },
    ],
  },
];

// marimekko = [
//   {
//     category: 'Fruits',
//     children: [
//       { subCategory: 'Apples', percentage: 0.2 },
//       { subCategory: 'Oranges', percentage: 0.3 },
//       { subCategory: 'Bananas', percentage: 0.5 },
//     ],
//   },
//   {
//     category: 'Vegetables',
//     children: [
//       { subCategory: 'Carrots', percentage: 0.6 },
//       { subCategory: 'Potatoes', percentage: 0.3 },
//       { subCategory: 'Tomatoes', percentage: 0.1 },
//     ],
//   },
//   {
//     category: 'Grains',
//     children: [
//       { subCategory: 'Wheat', percentage: 0.4 },
//       { subCategory: 'Rice', percentage: 0.4 },
//       { subCategory: 'Oats', percentage: 0.2 },
//     ],
//   },
// ];

// chartData.adjacency = {
//   nodes: [
//     { id: 'A' },
//     { id: 'B' },
//     { id: 'C' },
//     { id: 'D' },
//     { id: 'E' },
//   ],
//   links: [
//     { source: 'A', target: 'B', value: 5 },
//     { source: 'A', target: 'C', value: 3 },
//     { source: 'B', target: 'D', value: 2 },
//     { source: 'B', target: 'E', value: 1 },
//     { source: 'C', target: 'D', value: 4 },
//     { source: 'D', target: 'E', value: 6 },
//   ],
// };
chartData.adjacency = [
  { name: 'A', value: 8, children: [{ name: 'B', value: 5 }, { name: 'C', value: 3 }] },
  { name: 'B', value: 3, children: [{ name: 'D', value: 2 }, { name: 'E', value: 1 }] },
  { name: 'C', value: 4, children: [{ name: 'D', value: 4 }] },
  { name: 'D', value: 6, children: [{ name: 'E', value: 6 }] },
  { name: 'E', value: 0, children: [] },
];

chartData.choropleth = [
  { coordinates: [40.7128, -74.0060] }, // New York City
  { coordinates: [34.0522, -118.2437] }, // Los Angeles
  { coordinates: [41.8781, -87.6298] }, // Chicago
  { coordinates: [29.7604, -95.3698] }, // Houston
  { coordinates: [37.7749, -122.4194] }, // San Francisco
];

// chartData.bubbleChart2 = [
//   { name: 'A2', value: 600, y2: 0.2 },
//   { name: 'B2', value: 500, y2: 0.2 },
//   { name: 'C2', value: 400, y2: 0.2 },
//   { name: 'CC2', value: 400, y2: 0.2 },
//   { name: 'D2', value: 300, y2: 0.2 },
//   { name: 'E2', value: 200, y2: 0.2 },
//   { name: 'A5', value: 600, y2: 0.5 },
//   { name: 'B5', value: 500, y2: 0.5 },
//   { name: 'C5', value: 400, y2: 0.5 },
//   { name: 'CC5', value: 400, y2: 0.5 },
//   { name: 'D5', value: 300, y2: 0.5 },
//   { name: 'E5', value: 200, y2: 0.5 },
//   { name: 'G8', value: 1550, y2: 0.8 },
//   { name: 'H8', value: 1200, y2: 0.8 },
//   { name: 'I8', value: 950, y2: 0.8 },
//   { name: 'M8', value: 1550, y2: 0.8 },
//   { name: 'A2', value: 600, y2: 0.2 },
//   { name: 'B2', value: 500, y2: 0.2 },
//   { name: 'C2', value: 400, y2: 0.2 },
//   { name: 'CC2', value: 400, y2: 0.2 },
//   { name: 'D2', value: 300, y2: 0.2 },
//   { name: 'E2', value: 200, y2: 0.2 },
//   { name: 'A5', value: 600, y2: 0.5 },
//   { name: 'B5', value: 500, y2: 0.5 },
//   { name: 'C5', value: 400, y2: 0.5 },
// { name: 'CC5', value: 400, y2: 0.5 },
// { name: 'D5', value: 300, y2: 0.5 },
// { name: 'E5', value: 200, y2: 0.5 },
// { name: 'G8', value: 1550, y2: 0.8 },
// { name: 'H8', value: 1200, y2: 0.8 },
// { name: 'I8', value: 950, y2: 0.8 },
// { name: 'M8', value: 1550, y2: 0.8 },
// ];

// [
//   { x: 'A2', y: 1100, y2: 0.2 },
//   { x: 'B2', y: 1100, y2: 0.2 },
//   { x: 'C2', y: 1100, y2: 0.2 },
//   { x: 'D5', y: 1600, y2: 0.5 },
//   { x: 'E5', y: 1000, y2: 0.5 },
//   { x: 'F5', y: 1100, y2: 0.5 },
//   { x: 'G8', y: 1550, y2: 0.8 },
//   { x: 'H8', y: 1200, y2: 0.8 },
//   { x: 'I8', y: 950, y2: 0.8 },
//   { x: '22', y: 1500, y2: 0.2 },
//   { x: '55', y: 600, y2: 0.5 },
//   { x: '25', y: 1100, y2: 0.5 },
//   { x: '88', y: 1550, y2: 0.8 },
// ]
