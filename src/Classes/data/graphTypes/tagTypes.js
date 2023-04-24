/**
 * Defines the nature of tag types. Will associate with tags and charts, acting as an abstract
 * bridge between them.
 * @constructor
 * @property {Object} types - The types of tags available.
 * @property {string} name - The name of the tag.
 * @property {string} nameLong - The long name of the tag.
 */
export default class TagTypes {
  constructor() {
    // TODO tag types are a work-in-progress
    const types = {
      dateRange: {
        name: 'Date',
        nameLong: 'Date Range',
      },
      multiAxis: {
        name: 'Multi',
        nameLong: 'Multi Axis',
      },
      singleAxis: {
        name: 'Single',
        nameLong: 'Single Axis',
      },
    };

    Object.assign(this, types);
  }
}
