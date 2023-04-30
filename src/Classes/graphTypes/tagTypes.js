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
    const types = {
      basic: {
        _selfKey: 'basic',
        name: 'Basic',
        nameLong: 'Basic Tag',
      },
      geographic: {
        _selfKey: 'geographic',
        name: 'Geographic',
        nameLong: 'Geographic Tag',
      },
      hierarchic: {
        _selfKey: 'hierarchic',
        name: 'Hierarchic',
        nameLong: 'Hierarchic Tag',
      },

    };

    Object.assign(this, types);
  }
}
