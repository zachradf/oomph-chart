/* Basic Charts */
// import renderAreaChart from '../charts/basic/area.js';
import renderBarChart from '../charts/basic/bar.js';
// import renderBoxPlot from '../charts/basic/box.js';
// import renderBubbleChart from '../charts/basic/bubble.js';
import renderDonutChart from '../charts/basic/donut.js';
// import renderFunnelChart from '../charts/basic/funnel.js';
// import renderGaugeChart from '../charts/basic/gauge.js';
// import renderHeatMap from '../charts/basic/heat.js';
// import renderLineGraph from '../charts/basic/line.js';
// import renderPieChart from '../charts/basic/pie.js';
// import renderPolarChart from '../charts/basic/polar.js';
// import renderRadarChart from '../charts/basic/radar.js';
// import renderScatterPlot from '../charts/basic/scatter.js';
// import renderStackedBarChart from '../charts/basic/stacked.js';
// import renderWaterfallChart from '../charts/basic/waterfall.js';

/* Hierarchy Charts */
// import renderAdjacencyMatrix from '../charts/hierarchy/adjacency.js';
// import renderChordDiagram from '../charts/hierarchy/chord.js';
// import renderClusterDiagram from '../charts/hierarchy/cluster.js';
// import renderDendrogram from '../charts/hierarchy/dendogram.js';
// import renderIcicleChart from '../charts/hierarchy/icicle.js';
// import renderMarimekkoChart from '../charts/hierarchy/marimekko.js';
// import renderRadialTree from '../charts/hierarchy/radial-tree.js';
// import renderSankeyDiagram from '../charts/hierarchy/sankey.js';
// import renderSunburstChart from '../charts/hierarchy/sun.js';
// import renderTreeDiagram from '../charts/hierarchy/tree-diagram.js';
// import renderTreeMap from '../charts/hierarchy/tree-map.js';
// import renderVoronoiTreemap from '../charts/hierarchy/voronoi.js';
// import renderWordCloud from '../charts/hierarchy/cloud.js';

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
      bar: {
        _selfKey: 'bar',
        legacyName: 'BAR',
        name: 'Bar',
        nameLong: 'Bar Chart',
        render: renderBarChart,
      },
      donut: {
        _selfKey: 'donut',
        legacyName: 'DONUT',
        name: 'Donut',
        nameLong: 'Donut Chart',
        render: renderDonutChart,
      },
    };

    Object.assign(this, types);
  }
}
