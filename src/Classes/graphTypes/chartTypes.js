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
        legacyName: 'BAR',
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
    };

    Object.assign(this, types);
  }
}
