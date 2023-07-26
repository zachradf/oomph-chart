import renderAdjacencyMatrix from '../charts/hierarchy/adjacency.js';
import renderAreaChart from '../charts/basic/area.js';
import renderBarChart from '../charts/basic/bar.js';
import renderBoxPlot from '../charts/basic/box.js';
import renderBubbleChart from '../charts/hierarchy/bubble.js';
import renderChordDiagram from '../charts/hierarchy/chord.js';
import renderClusterDiagram from '../charts/hierarchy/cluster.js';
import renderDendrogram from '../charts/hierarchy/dendrogram.js';
import renderDonutChart from '../charts/basic/donut.js';
import renderFunnelChart from '../charts/basic/funnel.js';
import renderGaugeChart from '../charts/basic/gauge.js';
import renderHeatMap from '../charts/basic/heat.js';
import renderIcicleChart from '../charts/hierarchy/icicle.js';
import renderLineGraph from '../charts/basic/line.js';
import renderMarimekkoChart from '../charts/hierarchy/marimekko.js';
import renderPieChart from '../charts/basic/pie.js';
import renderPolarChart from '../charts/basic/polar.js';
import renderRadarChart from '../charts/basic/radar.js';
import renderRadialTree from '../charts/hierarchy/radial-tree.js';
import renderSankeyDiagram from '../charts/hierarchy/sankey.js';
import renderScatterPlot from '../charts/basic/scatter.js';
import renderStackedBarChart from '../charts/hierarchy/stacked.js';
import renderSunburstChart from '../charts/hierarchy/sun.js';
import renderTreeDiagram from '../charts/hierarchy/tree-diagram.js';
import renderTreeMap from '../charts/hierarchy/tree-map.js';
import renderVoronoiTreemap from '../charts/hierarchy/voronoi.js';
import renderWaterfallChart from '../charts/basic/waterfall.js';
import renderWordCloud from '../charts/hierarchy/cloud.js';

/**
 * Defines the nature of chart types. Will associate with tags, but not
 * inputs directly.
 * @constructor
 * @property {Object} types - The types of charts available.
 * @property {string} types._selfKey - Pseudo-internal: The name of the key of the property.
 * @property {string} types.name - The name of the chart.
 * @property {string} types.nameLong - The long name of the chart.
 */
export default class D3ChartTypes {
  constructor() {
    const types = {
      adjacency: {
        _selfKey: 'adjacency',
        name: 'Adjacency',
        nameLong: 'Adjacency Matrix',
        render: renderAdjacencyMatrix,
      },
      area: {
        _selfKey: 'area',
        chartClass: 'area-chart',
        name: 'Area',
        nameLong: 'Area Chart',
        render: renderAreaChart,
      },
      bar: {
        _selfKey: 'bar',
        chartClass: 'bar-chart',
        name: 'Bar',
        nameLong: 'Bar Chart',
        render: renderBarChart,
      },
      box: {
        _selfKey: 'box',
        chartClass: 'box-plot',
        name: 'Box',
        nameLong: 'Box Plot',
        render: renderBoxPlot,
      },
      bubble: {
        _selfKey: 'bubble',
        chartClass: 'bubble-chart',
        name: 'Bubble',
        nameLong: 'Bubble Chart',
        render: renderBubbleChart,
      },
      chord: {
        _selfKey: 'chord',
        name: 'Chord',
        nameLong: 'Chord Diagram',
        render: renderChordDiagram,
      },
      cloud: {
        _selfKey: 'cloud',
        name: 'Cloud',
        nameLong: 'Cloud Diagram',
        render: renderWordCloud,
      },
      cluster: {
        _selfKey: 'cluster',
        name: 'Cluster',
        nameLong: 'Cluster Diagram',
        render: renderClusterDiagram,
      },
      dendrogram: {
        _selfKey: 'dendrogram',
        name: 'Dendrogram',
        nameLong: 'Dendrogram Chart',
        render: renderDendrogram,
      },
      donut: {
        _selfKey: 'donut',
        chartClass: 'donut-chart',
        name: 'Donut',
        nameLong: 'Donut Chart',
        render: renderDonutChart,
      },
      funnel: {
        _selfKey: 'funnel',
        chartClass: 'funnel-chart',
        name: 'Funnel',
        nameLong: 'Funnel Chart',
        render: renderFunnelChart,
      },
      // gauge: {
      //   _selfKey: 'gauge',
      //   chartClass: 'gauge-chart',
      //   name: 'Gauge',
      //   nameLong: 'Gauge Chart',
      //   render: renderGaugeChart,
      // },
      heat: { // TODO note: was previously 'heat-map', verify if is now type-safe to use 'heat'
        _selfKey: 'heat',
        chartClass: 'heat-map',
        name: 'Heat',
        nameLong: 'Heat Map',
        render: renderHeatMap,
      },
      icicle: {
        _selfKey: 'icicle',
        name: 'Icicle',
        nameLong: 'Icicle Plot',
        render: renderIcicleChart,
      },
      line: {
        _selfKey: 'line',
        chartClass: 'line-graph',
        name: 'Line',
        nameLong: 'Line Graph',
        render: renderLineGraph,
      },
      marimekko: {
        _selfKey: 'marimekko',
        name: 'Marimekko',
        nameLong: 'Marimekko Diagram',
        render: renderMarimekkoChart,
      },
      pie: {
        _selfKey: 'pie',
        chartClass: 'pie-chart',
        name: 'Pie',
        nameLong: 'Pie Chart',
        render: renderPieChart,
      },
      polar: {
        _selfKey: 'polar',
        chartClass: 'polar-chart',
        name: 'Polar',
        nameLong: 'Polar Chart',
        render: renderPolarChart,
      },
      radar: {
        _selfKey: 'radar',
        chartClass: 'radar-chart',
        name: 'Radar',
        nameLong: 'Radar Chart',
        render: renderRadarChart,
      },
      radialTree: {
        _selfKey: 'radialTree',
        name: 'Radial Tree',
        nameLong: 'Radial Tree Diagram',
        render: renderRadialTree,
      },
      sankey: {
        _selfKey: 'sankey',
        name: 'Sankey',
        nameLong: 'Sankey Diagram',
        render: renderSankeyDiagram,
      },
      scatter: {
        _selfKey: 'scatter',
        chartClass: 'scatter-plot',
        name: 'Scatter',
        nameLong: 'Scatter Plot',
        render: renderScatterPlot,
      },
      stackedBar: {
        _selfKey: 'stackedBar',
        chartClass: 'stacked-bar-chart-plot', // TODO match more closely with key
        name: 'Stacked Bar',
        nameLong: 'Stacked Bar Chart',
        render: renderStackedBarChart,
      },
      sun: {
        _selfKey: 'sun',
        chartClass: 'sun-burst',
        name: 'Sun Burst',
        nameLong: 'Sun Burst Diagram',
        render: renderSunburstChart,
      },
      treeDiagram: {
        _selfKey: 'treeDiagram',
        chartClass: 'tree-diagram',
        name: 'Tree Diagram',
        nameLong: 'Tree Diagram',
        render: renderTreeDiagram,
      },
      treeMap: {
        _selfKey: 'treeMap',
        chartClass: 'tree-map',
        name: 'Tree Map',
        nameLong: 'Tree Map',
        render: renderTreeMap,
      },
      voronoi: {
        _selfKey: 'voronoi',
        chartClass: 'voronoi',
        name: 'Voronoi',
        nameLong: 'Voronoi Diagram',
        render: renderVoronoiTreemap,
      },
      waterfall: {
        _selfKey: 'waterfall',
        chartClass: 'waterfall-chart',
        name: 'Waterfall',
        nameLong: 'Waterfall Chart',
        render: renderWaterfallChart,
      },
    };

    Object.assign(this, types);
  }
}
