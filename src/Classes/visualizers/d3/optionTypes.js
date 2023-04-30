import { optionData as options } from '../../../SampleData/optionsData';

export default class OptionTypes {
  constructor() {
    const types = {
      bar: {
        _selfKey: 'bar',
        legacyOptions: options.options4,
      },
    };

    Object.assign(this, types);
  }
}
