/* eslint-disable import/extensions */
// import * as d3 from 'd3';
import BasicClass from './Classes/BasicClass.js';
import HierarchyClass from './Classes/HierarchyClass.js';
import GraphSuperClass from './Classes/data/graphSuperClass.js';
import {
  bubbleChartData, testDataScatterPlot, treeDiagramData, treeMapData,
  dataSet1, testDataBarChart, extremeScatterPlot1, extremeScatterPlot2,
  stackedBarChartData2, heatMapData, heatMapData2, testDataDonutChart, sunburstData,
  waterfallData, funnelChartData, polarChartData, radarChartData, boxPlotData
} from './SampleData/chartData.js';
import {
  options, options2, options3, options4,
  options5, waterfallOptions, funnelChartOptions,
  polarChartOptions, radarChartOptions, gaugeOptions
} from './SampleData/optionsData.js';
import onHover from './AddFunctionality/onHover.js';
import zoom from './AddFunctionality/zoom.js';
import gradient from './AddFunctionality/gradient.js';
import addAnimation from './AddFunctionality/animate.js';
import stack from './AddFunctionality/stack.js';
import createIciclePlot from './Charts/hierarchicalCharts/iciclePlot.js';
import createChordDiagram from './Charts/hierarchicalCharts/chordChart.js';
import createSankeyDiagram from './Charts/hierarchicalCharts/sankeyDiagram.js';
import createClusterDiagram from './Charts/hierarchicalCharts/clusterDiagram.js';
import createVoronoiTreemap from './Charts/hierarchicalCharts/voronoiTree.js';

const data = new GraphSuperClass();
console.log(data);
console.log(data.charts.types);

const input = {
  data: stackedBarChartData2,
  selector: '#chart',
  options: options5,
};

const input2 = {
  data: testDataBarChart,
  selector: '#chart',
  options,
};

const input3 = {
  data: testDataScatterPlot,
  selector: '#chart',
  options,
};

const input4 = {
  data: heatMapData,
  selector: '#chart',
  options: options3,
};

const input5 = {
  data: bubbleChartData,
  selector: '#chart',
  options: options2,
};
const input6 = {
  data: testDataDonutChart,
  selector: '#chart',
  options: options2,
};
const input7 = {
  data: treeDiagramData,
  selector: '#chart',
  options,
};
const input8 = {
  data: treeMapData,
  selector: '#chart',
  options,
};
const input9 = {
  data: sunburstData,
  selector: '#chart',
  options: options4,
};
const input10 = {
  data: waterfallData,
  selector: '#chart',
  options: waterfallOptions,
};
const input11 = {
  data: funnelChartData,
  selector: '#chart',
  options: funnelChartOptions,
};
const input12 = {
  data: polarChartData,
  selector: '#chart',
  options: polarChartOptions,
};
const input13 = {
  data: radarChartData,
  selector: '#chart',
  options: radarChartOptions,
};
const input14 = {
  data: [20, 60, 80],
  selector: '#chart',
  options: gaugeOptions,
};

const input15 = {
  data: boxPlotData,
  selector: '#chart',
  options,
};

// Adds Charts
const areaObject = new BasicClass(['AREA'], input3);
const barObject = new BasicClass(['BAR'], input2);
const boxPlotObject = new BasicClass(['BOX'], input15);
const bubbleObject = new BasicClass(['BUBBLE'], input5);//fix category labels
const donutChartObject = new BasicClass(['DONUT'], input6);
const funnelObject = new BasicClass(['FUNNEL'], input11);
const gaugeObject = new BasicClass(['GAUGE'], input14); // STILL NEEDS WORK
const heatMapObject = new BasicClass(['HEATMAP'], input4);
const lineObject = new BasicClass(['LINE'], input3);
const pieChartObject = new BasicClass(['PIE'], input6);
const polarObject = new BasicClass(['POLAR'], input12);
const radarObject = new BasicClass(['RADAR'], input13);
const scatterObject = new BasicClass(['SCATTER'], input3);
const stackedBarObject = new BasicClass(['STACKEDBAR'], input);
const sunburstObject = new HierarchyClass(['SUNBURST'], input9); // fix labels
const treeDiagramObject = new HierarchyClass(['TREEDIAGRAM'], input7);
const treeMapObject = new HierarchyClass(['TREEMAP'], input8);
const waterfallObject = new BasicClass(['WATERFALL'], input10);

gradient('#chart', 'blue', 'red', 'BAR', 'x', testDataBarChart);// fix for waterfall and stackedbar chart x axis, funnel y axis

createChordDiagram([
  [0, 10, 5, 7, 3],
  [10, 0, 8, 2, 6],
  [5, 8, 0, 12, 4],
  [7, 2, 12, 0, 9],
  [3, 6, 4, 9, 0],
  ['A', 'B', 'C', 'D', 'E']
], '#chart', options);

createSankeyDiagram({
  nodes: [
    { name: 'Agriculture' },
    { name: 'Industry' },
    { name: 'Services' },
    { name: 'Energy' },
    { name: 'Transportation' },
    { name: 'Residential' },
    { name: 'Emissions' }
  ],
  links: [
    { source: 0, target: 3, value: 10 },
    { source: 1, target: 3, value: 20 },
    { source: 2, target: 3, value: 30 },
    { source: 3, target: 4, value: 25 },
    { source: 3, target: 5, value: 35 },
    { source: 4, target: 6, value: 25 },
    { source: 5, target: 6, value: 35 }
  ],
}, '#chart', {
  width: 960,
  height: 600,
  nodeWidth: 15,
  nodePadding: 10,
});

createClusterDiagram(
  {
    name: 'Root',
    group: 0,
    children: [
      {
        name: 'Group A',
        group: 1,
        children: [
          {
            name: 'Subgroup A1',
            group: 2,
            children: [
              { name: 'Item A1.1', group: 3 },
              { name: 'Item A1.2', group: 3 },
              { name: 'Item A1.3', group: 3 },
              { name: 'Item A1.4', group: 3 },
              { name: 'Item A1.5', group: 3 }
            ],
          },
          {
            name: 'Subgroup A2',
            group: 2,
            children: [
              { name: 'Item A2.1', group: 3 },
              { name: 'Item A2.2', group: 3 },
              { name: 'Item A2.3', group: 3 },
              { name: 'Item A2.4', group: 3 }
            ],
          },
          {
            name: 'Subgroup A3',
            group: 2,
            children: [
              { name: 'Item A3.1', group: 3 },
              { name: 'Item A3.2', group: 3 },
              { name: 'Item A3.3', group: 3 }
            ],
          }
        ],
      },
      {
        name: 'Group B',
        group: 1,
        children: [
          {
            name: 'Subgroup B1',
            group: 2,
            children: [
              { name: 'Item B1.1', group: 3 },
              { name: 'Item B1.2', group: 3 },
              { name: 'Item B1.3', group: 3 }
            ],
          },
          {
            name: 'Subgroup B2',
            group: 2,
            children: [
              { name: 'Item B2.1', group: 3 },
              { name: 'Item B2.2', group: 3 }
            ],
          },
          {
            name: 'Subgroup B3',
            group: 2,
            children: [
              { name: 'Item B3.1', group: 3 },
              { name: 'Item B3.2', group: 3 }
            ],
          },
          {
            name: 'Subgroup B4',
            group: 2,
            children: [
              { name: 'Item B4.1', group: 3 },
              { name: 'Item B4.2', group: 3 }
            ],
          }
        ],
      },
      {
        name: 'Group C',
        group: 1,
        children: [
          {
            name: 'Subgroup C1',
            group: 2,
            children: [
              { name: 'Item C1.1', group: 3 },
              { name: 'Item C1.2', group: 3 },
              { name: 'Item C1.3', group: 3 },
              { name: 'Item C1.4', group: 3 }
            ],
          },
          {
            name: 'Subgroup C2',
            group: 2,
            children: [
              { name: 'Item C2.1', group: 3 },
              { name: 'Item C2.2', group: 3 },
              { name: 'Item C2.3', group: 3 },
              { name: 'Item C2.4', group: 3 },
              { name: 'Item C2.5', group: 3 }
            ],
          },
          {
            name: 'Subgroup C3',
            group: 2,
            children: [
              { name: 'Item C3.1', group: 3 },
              { name: 'Item C3.2', group: 3 }
            ],
          }
        ],
      }
    ],
  },

  '#chart',

  options
);

createVoronoiTreemap(
  {
    name: 'root',
    children: [
      {
        name: 'Category 1',
        value: 200,
        children: [
          { name: 'Subcategory 1.1', value: 50 },
          { name: 'Subcategory 1.2', value: 75 },
          { name: 'Subcategory 1.3', value: 100 },
          { name: 'Subcategory 1.4', value: 25 },
        ],
      },
      {
        name: 'Category 2',
        value: 300,
        children: [
          { name: 'Subcategory 2.1', value: 150 },
          { name: 'Subcategory 2.2', value: 50 },
          { name: 'Subcategory 2.3', value: 100 },
        ],
      },
      {
        name: 'Category 3',
        value: 1400,
        children: [
          { name: 'Subcategory 3.1', value: 1200 },
          { name: 'Subcategory 3.2', value: 100 },
          { name: 'Subcategory 3.3', value: 50 },
          { name: 'Subcategory 3.4', value: 50 },
        ],
      },
      {
        name: 'Category 4',
        value: 150,
        children: [
          { name: 'Subcategory 4.1', value: 50 },
          { name: 'Subcategory 4.2', value: 100 },
        ],
      },
      {
        name: 'Category 5',
        value: 250,
        children: [
          { name: 'Subcategory 5.1', value: 100 },
          { name: 'Subcategory 5.2', value: 150 },
        ],
      },
    ],
  },

  '#chart',

  options
);
createIciclePlot({
  name: 'root',
  children: [
    {
      name: 'A',
      children: [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 200 },
        { name: 'A3', value: 150 },
      ],
    },
    {
      name: 'B',
      children: [
        { name: 'B1', value: 120 },
        { name: 'B2', value: 50 },
        { name: 'B3', value: 180 },
      ],
    },
    {
      name: 'C',
      children: [
        { name: 'C1', value: 300 },
        { name: 'C2', value: 90 },
      ],
    },
  ],
}, '#chart', options);