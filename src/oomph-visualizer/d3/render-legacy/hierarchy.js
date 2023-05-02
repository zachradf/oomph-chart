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

export default class HierarchyClass {
  constructor(chartArray, input) {
    this.chartArray = chartArray;
    this.input = input;
    this.input.data = input.data;
    this.input.selector = input.selector ? input.selector : '#chart';

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

    this.createChart = {
      SUNBURST: createSunburstChart,
      TREEMAP: createTreeMap,
      TREEDIAGRAM: createTreeDiagram,
      CHORD: createChordDiagram,
      SANKEY: createSankeyDiagram,
      CLUSTER: createClusterDiagram,
      VORONOI: createVoronoiTreemap,
      ICICLE: createIcicleChart,
      MARIMEKKO: createMarimekkoChart,
      ADJACENCY: createAdjacencyMatrix,
      DENDROGRAM: createDendrogram,
      RADIALTREE: createRadialTree,
      WORDCLOUD: createWordCloud,
    };

    this.iterateCharts = () => {
      for (let i = 0; i < this.chartArray.length; i++) {
        console.log(this.input.data[i], this.input.selector, this.input.options[i]);
        this.createChart[this.chartArray[i]](this.input.data[i], this.input.selector, this.input.options[i]);
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
