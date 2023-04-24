/**
 * Defines the nature of chart types. Will associate with tags, but not
 * inputs directly.
 * @constructor
 * @property {Object} types - The types of charts available.
 * @property {string} types.name - The name of the chart.
 * @property {string} types.nameLong - The long name of the chart.
 */
export default class ChartTypes {
  constructor() {
    const types = {
      area: {
        name: 'Area',
        nameLong: 'Area Chart',
      },
      bar: {
        name: 'Bar',
        nameLong: 'Bar Chart',
      },
      box: {
        name: 'Box',
        nameLong: 'Box Plot',
      },
      bubble: {
        name: 'Bubble',
        nameLong: 'Bubble Chart',
      },
      donut: {
        name: 'Donut',
        nameLong: 'Donut Chart',
      },
      funnel: {
        name: 'Funnel',
        nameLong: 'Funnel Chart',
      },
      guage: {
        name: 'Gauge',
        nameLong: 'Gauge Chart',
      },
      heat: {
        name: 'Heat',
        nameLong: 'Heat Map',
      },
      line: {
        name: 'Line',
        nameLong: 'Line Graph',
      },
      pie: {
        name: 'Pie',
        nameLong: 'Pie Chart',
      },
      polar: {
        name: 'Polar',
        nameLong: 'Polar Chart',
      },
      radar: {
        name: 'Radar',
        nameLong: 'Radar Chart',
      },
      scatter: {
        name: 'Scatter',
        nameLong: 'Scatter Plot',
      },
      stackedBar: {
        name: 'Stacked Bar',
        nameLong: 'Stacked Bar Chart',
      },
      waterfall: {
        name: 'Waterfall',
        nameLong: 'Waterfall Chart',
      },
    };

    Object.assign(this, types);
  }
}
