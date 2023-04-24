/**
 * Defines the nature of input types. Will associate with tags, but not charts directly.
 * @constructor
 * @property {Object} types - The types of inputs available.
 * @property {string} types.name - The name of the input.
 * @property {string} types.nameLong - The long name of the input.
 * @property {Array} types.dataTypes - Supported data types, presumably JS-based.
 */
export default class InputTypes {
  constructor() {
    // TODO input types are a work-in-progress
    const types = {
      dates: {
        name: 'Dates',
        nameLong: 'Dates',
        dataTypes: [Date],
      },
      xy: {
        name: 'XY',
        nameLong: 'XY Axis',
        dataTypes: [String, Number],
      },
    };

    Object.assign(this, types);
  }
}
