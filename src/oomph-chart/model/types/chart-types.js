/**
 * Defines the nature of chart types. Will associate with tags, but not
 * inputs directly.
 * @constructor
 * @property {Object} types - The types of charts available.
 * @property {string} types._selfKey - Pseudo-internal: The name of the key of the property.
 * @property {string} types.name - The name of the chart.
 * @property {string} types.nameLong - The long name of the chart.
 */
export default class ChartTypes {
  constructor() {
    const types = {
      area: {
        _selfKey: 'area',
        name: 'Area',
        nameLong: 'Area Chart',
      },
      bar: {
        _selfKey: 'bar',
        name: 'Bar',
        nameLong: 'Bar Chart',
      },
      box: {
        _selfKey: 'box',
        name: 'Box',
        nameLong: 'Box Plot',
      },
      bubble: {
        _selfKey: 'bubble',
        name: 'Bubble',
        nameLong: 'Bubble Chart',
      },
      donut: {
        _selfKey: 'donut',
        name: 'Donut',
        nameLong: 'Donut Chart',
      },
      funnel: {
        _selfKey: 'funnel',
        name: 'Funnel',
        nameLong: 'Funnel Chart',
      },
      guage: {
        _selfKey: 'guage',
        name: 'Gauge',
        nameLong: 'Gauge Chart',
      },
      heat: {
        _selfKey: 'heat',
        name: 'Heat',
        nameLong: 'Heat Map',
      },
      line: {
        _selfKey: 'line',
        name: 'Line',
        nameLong: 'Line Graph',
      },
      pie: {
        _selfKey: 'pie',
        name: 'Pie',
        nameLong: 'Pie Chart',
      },
      polar: {
        _selfKey: 'polar',
        name: 'Polar',
        nameLong: 'Polar Chart',
      },
      radar: {
        _selfKey: 'radar',
        name: 'Radar',
        nameLong: 'Radar Chart',
      },
      scatter: {
        _selfKey: 'scatter',
        name: 'Scatter',
        nameLong: 'Scatter Plot',
      },
      stackedBar: {
        _selfKey: 'stackedBar',
        name: 'Stacked Bar',
        nameLong: 'Stacked Bar Chart',
      },
      waterfall: {
        _selfKey: 'waterfall',
        name: 'Waterfall',
        nameLong: 'Waterfall Chart',
      },

      // HIERARCHY CHARTS
      adjacency: {
        _selfKey: 'adjacency',
        name: 'Adjacency',
        nameLong: 'Adjacency Matrix',
      },
      chord: {
        _selfKey: 'chord',
        name: 'Chord',
        nameLong: 'Chord Diagram',
      },
      cloud: {
        _selfKey: 'cloud',
        name: 'Cloud',
        nameLong: 'Cloud Diagram',
      },
      cluster: {
        _selfKey: 'cluster',
        name: 'Cluster',
        nameLong: 'Cluster Diagram',
      },
      dendrogram: {
        _selfKey: 'dendrogram',
        name: 'Dendrogram',
        nameLong: 'Dendrogram Chart',
      },
      icicle: {
        _selfKey: 'icicle',
        name: 'Icicle',
        nameLong: 'Icicle Plot',
      },
      marimekko: {
        _selfKey: 'marimekko',
        name: 'Marimekko',
        nameLong: 'Marimekko Diagram',
      },
      radialTree: {
        _selfKey: 'radialTree',
        name: 'Radial Tree',
        nameLong: 'Radial Tree Diagram',
      },
      sankey: {
        _selfKey: 'sankey',
        name: 'Sankey',
        nameLong: 'Sankey Diagram',
      },
      sun: {
        _selfKey: 'sun',
        name: 'Sun Burst',
        nameLong: 'Sun Burst Diagram',
      },
      treeDiagram: {
        _selfKey: 'treeDiagram',
        name: 'Tree Diagram',
        nameLong: 'Tree Diagram',
      },
      treeMap: {
        _selfKey: 'treeMap',
        name: 'Tree Map',
        nameLong: 'Tree Map',
      },
      voronoi: {
        _selfKey: 'voronoi',
        name: 'Voronoi',
        nameLong: 'Voronoi Diagram',
      },
    };

    Object.assign(this, types);
  }
}
