/**
 * Defines the nature of tag types. Will associate with tags and charts, acting as an abstract
 * bridge between them.
 * @constructor
 * @property {Object} types - The types of tags available.
 * @property {string} types._selfKey - Pseudo-internal: The name of the key of the property.
 * @property {string} name - The name of the tag.
 * @property {string} nameLong - The long name of the tag.
 */
export default class TagTypes {
  constructor() {
    // TODO tag types are a work-in-progress
    const types = {
      dateRange: {
        _selfKey: 'dateRange',
        name: 'Date',
        nameLong: 'Date Range',
      },
      multiAxis: {
        _selfKey: 'multiAxis',
        name: 'Multi',
        nameLong: 'Multi Axis',
      },
      singleAxis: {
        _selfKey: 'singleAxis',
        name: 'Single',
        nameLong: 'Single Axis',
      },
    };

    Object.assign(this, types);
  }
}
