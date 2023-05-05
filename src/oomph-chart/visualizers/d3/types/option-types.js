import { optionData as options } from '../../../../sample-data/options.js';

export default class OptionTypes {
  constructor() {
    const types = {
      area: {
        _selfKey: 'area',
        legacyOptions: options.options2,
      },
      bar: {
        _selfKey: 'bar',
        legacyOptions: options.options5,
      },
      box: {
        _selfKey: 'box',
        legacyOptions: options.options3,
      },
      bubble: {
        _selfKey: 'bubble',
        legacyOptions: options.options10,
      },
      donut: {
        _selfKey: 'donut',
        legacyOptions: options.options4,
      },
      funnel: {
        _selfKey: 'funnel',
        legacyOptions: options.funnelChart,
      },
      gauge: {
        _selfKey: 'gauge',
        legacyOptions: options.gauge,
      },
      heat: { // TODO note: was previously 'heat-map', verify if is now type-safe to use 'heat'
        _selfKey: 'heat',
        legacyOptions: options.options3,
      },
      line: {
        _selfKey: 'line',
        legacyOptions: options.options9,
      },
      pie: {
        _selfKey: 'pie',
        legacyOptions: options.options6,
      },
      polar: {
        _selfKey: 'polar',
        legacyOptions: options.polarChart,
      },
      radar: {
        _selfKey: 'radar',
        legacyOptions: options.radarChart,
      },
      scatter: {
        _selfKey: 'scatter',
        legacyOptions: options.options3,
      },
      stackedbar: {
        _selfKey: 'stackedbar',
        legacyOptions: options.options7,
      },
      waterfall: {
        _selfKey: 'waterfall',
        legacyOptions: options.waterfall,
      },
    };

    Object.assign(this, types);
  }
}
