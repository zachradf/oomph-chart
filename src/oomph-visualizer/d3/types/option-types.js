import { optionData as options } from '../../../sample-data/options.js';

export default class OptionTypes {
  constructor() {
    const types = {
      bar: {
        _selfKey: 'bar',
        legacyOptions: options.options4,
      },
      donut: {
        _selfKey: 'donut',
        legacyOptions: options.options3,
      },
    };

    Object.assign(this, types);
  }
}
