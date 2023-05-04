import createSunburstChart from '../charts/hierarchy/sun.js';
import createTreeMap from '../charts/hierarchy/tree-map.js';
import createTreeDiagram from '../charts/hierarchy/tree-diagram.js';
import createChordDiagram from '../charts/hierarchy/chord.js';
import createSankeyDiagram from '../charts/hierarchy/sankey.js';
import createClusterDiagram from '../charts/hierarchy/cluster.js';
import createVoronoiTreemap from '../charts/hierarchy/voronoi.js';
import createIcicleChart from '../charts/hierarchy/icicle.js';
import createMarimekkoChart from '../charts/hierarchy/marimekko.js';
import createAdjacencyMatrix from '../charts/hierarchy/adjacency.js';
import createDendrogram from '../charts/hierarchy/dendogram.js';
import createRadialTree from '../charts/hierarchy/radial-tree.js';
import createWordCloud from '../charts/hierarchy/cloud.js';
import createSVG from '../functions/create-svg.js';

export default class HierarchyClass {
  constructor(chartArray, input) {
    this.chartArray = chartArray;
    this.options = input.options;
    this.input = input;
    this.data = input.data;
    this.selector = input.selector ? input.selector : '#chart';

    if (!input.options) {
      this.input.options = {};
      this.input.options.margin = {
        top: 20, right: 20, bottom: 30, left: 40,
      };
      this.input.options.width = 600;
      this.input.options.height = 400;
      this.input.options.radius = 5;
      this.input.options.color = 'red';
      this.input.options.showCategories = true;
    } else {
      this.input.options = input.options;
    }
    const svgTypeMap = {
      ADJACENCY: 'adjacency-matrix',
      CHORD: 'chord-diagram',
      CLUSTER: 'cluster-diagram',
      DENDROGRAM: 'dendrogram',
      ICICLE: 'icicle-chart',
      MARIMEKKO: 'marimekko-chart',
      RADIALTREE: 'radial-tree',
      SANKEY: 'sankey-diagram',
      SUNBURST: 'sun-burst',
      TREEDIAGRAM: 'tree-diagram',
      TREEMAP: 'tree-map',
      VORONOI: 'voronoi-treemap',
      WORDCLOUD: 'word-cloud',
    };

    this.createChart = {
      ADJACENCY: createAdjacencyMatrix,
      CHORD: createChordDiagram,
      CLUSTER: createClusterDiagram,
      DENDROGRAM: createDendrogram,
      ICICLE: createIcicleChart,
      MARIMEKKO: createMarimekkoChart,
      RADIALTREE: createRadialTree,
      SANKEY: createSankeyDiagram,
      SUNBURST: createSunburstChart,
      TREEDIAGRAM: createTreeDiagram,
      TREEMAP: createTreeMap,
      VORONOI: createVoronoiTreemap,
      WORDCLOUD: createWordCloud,
    };
    const chartComponents = {};
    this.iterateCharts = () => {
      for (let i = 0; i < this.chartArray.length; i++) {
        this.options[i].chartClass = svgTypeMap[this.chartArray[i]];
        chartComponents.svg = createSVG(this.selector, chartArray[i], this.options[i]);
        console.log(chartComponents);
        this.createChart[this.chartArray[i]](this.input.data[i], this.input.options[i], chartComponents);
        const options = this.input.options[i];
        // This is where we add the class and opacity option to the data elements
        const elements = d3.selectAll(`svg.${svgTypeMap[this.chartArray[i]]} circle, arc, rect, path, line, polygon, node`);
        // eslint-disable-next-line no-loop-func
        elements.each(function () {
          const element = d3.select(this);
          const { classList } = this; // Access the classList property of the DOM element
          if (classList.length === 0) {
            // The element has no classes, assign a class here
            element.classed(`${options.chartClass}${i}`, true);
          }
          if (options.opacity) {
            element.style('opacity', options.opacity);
          }
        });
      }
    };

    this.iterateCharts();
  }

  addCharts(type) {
    this.chartArray.push(...type);
    if (!Array.isArray(type)) {
      this.createChart[type](this.input.data, this.input.selector, this.input.options);
    } else {
      for (let i = 0; i < type.length; i++) {
        this.createChart[type[i]](this.input.data, this.input.selector, this.input.options);
      }
    }
  }

  removeChart(type) {
    const svgTypeMap = {
      SUNBURST: 'sun-burst',
      TREEMAP: 'tree-map',
      TREEDIAGRAM: 'tree-diagram',
    };
    const svgSelector = svgTypeMap[type];
    if (svgSelector) {
      d3.select(this.input.selector)
        .selectAll(`.${svgSelector}`)
        .remove();
    } else {
      console.error(`Invalid chart type: ${type}`);
    }
  }

  updateInput(input) {
    this.input = input;
    if (!input.options) {
      this.input.options = {};
      this.input.options.margin = {
        top: 20, right: 20, bottom: 30, left: 40,
      };
      this.input.options.width = 600;
      this.input.options.height = 400;
      this.input.options.radius = 5;
      this.input.options.color = 'red';
      this.input.options.showLabels = true;
    } else {
      this.input.options = input.options;
    }

    this.iterateCharts();
  }
}
