export default class SVGTypes {
  constructor() {
    const types = {
      bar: {
        _selfKey: 'bar',
        legacyName: 'BAR',
        legacyValue: 'bar-chart',
      },
      donut: {
        _selfKey: 'donut',
        legacyName: 'DONUT',
        legacyValue: 'donut-chart',
      },
    };

    Object.assign(this, types);
  }
}
