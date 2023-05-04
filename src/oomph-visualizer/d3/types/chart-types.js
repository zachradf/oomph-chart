/* Basic Charts */
import renderAreaChart from '../charts/basic/area.js';
import renderBarChart from '../charts/basic/bar.js';
import renderBoxPlot from '../charts/basic/box.js';
import renderBubbleChart from '../charts/basic/bubble.js';
import renderDonutChart from '../charts/basic/donut.js';
import renderFunnelChart from '../charts/basic/funnel.js';
import renderGaugeChart from '../charts/basic/gauge.js';
import renderHeatMap from '../charts/basic/heat.js';
import renderLineGraph from '../charts/basic/line.js';
import renderPieChart from '../charts/basic/pie.js';
import renderPolarChart from '../charts/basic/polar.js';
import renderRadarChart from '../charts/basic/radar.js';
import renderScatterPlot from '../charts/basic/scatter.js';
import renderStackedBarChart from '../charts/basic/stacked.js';
import renderWaterfallChart from '../charts/basic/waterfall.js';

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
      area: {
        _selfKey: 'area',
        chartClass: 'area-chart',
        legacyName: 'AREA',
        name: 'Area',
        nameLong: 'Area Chart',
        render: renderAreaChart,
      },
      bar: {
        _selfKey: 'bar',
        chartClass: 'bar-chart',
        legacyName: 'BAR',
        name: 'Bar',
        nameLong: 'Bar Chart',
        render: renderBarChart,
      },
      box: {
        _selfKey: 'box',
        chartClass: 'box-plot',
        legacyName: 'BOX',
        name: 'Box',
        nameLong: 'Box Plot',
        render: renderBoxPlot,
      },
      bubble: {
        _selfKey: 'bubble',
        chartClass: 'bubble-chart',
        legacyName: 'BUBBLE',
        name: 'Bubble',
        nameLong: 'Bubble Chart',
        render: renderBubbleChart,
      },
      donut: {
        _selfKey: 'donut',
        chartClass: 'donut-chart',
        legacyName: 'DONUT',
        name: 'Donut',
        nameLong: 'Donut Chart',
        render: renderDonutChart,
      },
      funnel: {
        _selfKey: 'funnel',
        chartClass: 'funnel-chart',
        legacyName: 'FUNNEL',
        name: 'Funnel',
        nameLong: 'Funnel Chart',
        render: renderFunnelChart,
      },
      gauge: {
        _selfKey: 'gauge',
        chartClass: 'gauge-chart',
        legacyName: 'GAUGE',
        name: 'Gauge',
        nameLong: 'Gauge Chart',
        render: renderGaugeChart,
      },
      heat: { // TODO note: was previously 'heat-map', verify if is now type-safe to use 'heat'
        _selfKey: 'heat',
        chartClass: 'heat-map',
        legacyName: 'HEATMAP',
        name: 'Heat',
        nameLong: 'Heat Map',
        render: renderHeatMap,
      },
      line: {
        _selfKey: 'line',
        chartClass: 'line-graph',
        legacyName: 'LINE',
        name: 'Line',
        nameLong: 'Line Graph',
        render: renderLineGraph,
      },
      pie: {
        _selfKey: 'pie',
        chartClass: 'pie-chart',
        legacyName: 'PIE',
        name: 'Pie',
        nameLong: 'Pie Chart',
        render: renderPieChart,
      },
      polar: {
        _selfKey: 'polar',
        chartClass: 'polar-chart',
        legacyName: 'POLAR',
        name: 'Polar',
        nameLong: 'Polar Chart',
        render: renderPolarChart,
      },
      radar: {
        _selfKey: 'radar',
        chartClass: 'radar-chart',
        legacyName: 'RADAR',
        name: 'Radar',
        nameLong: 'Radar Chart',
        render: renderRadarChart,
      },
      scatter: {
        _selfKey: 'scatter',
        chartClass: 'scatter-plot',
        legacyName: 'SCATTER',
        name: 'Scatter',
        nameLong: 'Scatter Plot',
        render: renderScatterPlot,
      },
      stackedbar: {
        _selfKey: 'stackedbar',
        chartClass: 'stacked-bar-chart-plot', // TODO match more closely with key
        legacyName: 'STACKEDBAR',
        name: 'Stacked Bar',
        nameLong: 'Stacked Bar Chart',
        render: renderStackedBarChart,
      },
      waterfall: {
        _selfKey: 'waterfall',
        chartClass: 'waterfall-chart',
        legacyName: 'WATERFALL',
        name: 'Waterfall',
        nameLong: 'Waterfall Chart',
        render: renderWaterfallChart,
      },

    };

    Object.assign(this, types);
  }
}
