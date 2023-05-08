/**
 * Defines available interface types
 *
 * @constructor
 * @property {Object} types - The types of interfaces available.
 * @property {string} types._selfKey - Pseudo-internal: The name of the key of the property.
 * @property {string} types.name - The name of the interface.
 * @property {string} types.nameLong - The long name of the interface.
 */
export default class InterfaceTypes {
  constructor() {
    const types = {
      default: {
        _selfKey: 'default',
        name: 'Default',
        nameLong: 'Default Interface',
      },
    };

    Object.assign(this, types);
  }
}
