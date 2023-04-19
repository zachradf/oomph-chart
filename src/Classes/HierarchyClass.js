/* eslint-disable import/extensions */
import createSunburstChart from '../Charts/hierarchicalCharts/sunBurst.js';
import createTreeMap from '../Charts/hierarchicalCharts/treeMap.js';
import createTreeDiagram from '../Charts/hierarchicalCharts/treeDiagram.js';
import createChordDiagram from '../Charts/hierarchicalCharts/chordChart.js';
import createSankeyDiagram from '../Charts/hierarchicalCharts/sankeyDiagram.js';
import createClusterDiagram from '../Charts/hierarchicalCharts/clusterDiagram.js';
import createVoronoiTreemap from '../Charts/hierarchicalCharts/voronoiTree.js';
import createIcicleChart from '../Charts/hierarchicalCharts/iciclePlot.js';

export default class HierarchyClass {
  constructor(graphArray, input) {
    this.graphArray = graphArray;
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

    this.createGraph = {
      SUNBURST: createSunburstChart,
      TREEMAP: createTreeMap,
      TREEDIAGRAM: createTreeDiagram,
      CHORD: createChordDiagram,
      SANKEY: createSankeyDiagram,
      CLUSTER: createClusterDiagram,
      VORONOI: createVoronoiTreemap,
      ICICLE: createIcicleChart,
    };

    this.iterateGraphs = () => {
      for (let i = 0; i < this.graphArray.length; i++) {
        this.createGraph[this.graphArray[i]](this.input.data, this.input.selector, this.input.options);
      }
    };

    this.iterateGraphs();
  }

  addGraphs(type) {
    this.graphArray.push(...type);
    if (!Array.isArray(type)) {
      this.createGraph[type](this.input.data, this.input.selector, this.input.options);
    } else {
      for (let i = 0; i < type.length; i++) {
        this.createGraph[type[i]](this.input.data, this.input.selector, this.input.options);
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

    this.iterateGraphs();
  }
}
