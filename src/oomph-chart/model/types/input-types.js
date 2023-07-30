/**
 * Defines the nature of input types. Will associate with tags, but not charts directly.
 *
 * Example for dataFormat:
 * const expectedDataShape = [
 *   'string',
 *   'number',
 *   'boolean',
 *   'date',
 *   ['string', 'number'],
 *   { key1: 'string', key2: 'number' },
 * ];
 *
 * Key naming convention:
 * number_string_ar_number_number_ray_ob_string_number_ject;
 *
 * @constructor
 * @property {Object} types - The types of inputs available.
 * @property {string} types._selfKey - Pseudo-internal: The name of the key of the property.
 * @property {string} types.name - The name of the input.
 * @property {string} types.nameLong - The long name of the input.
 * @property {Array} types.dataFormat - Supported data types, presumably JS-based.
 */
export default class InputTypes {
  constructor() {
    const types = {
      number_number: {
        _selfKey: 'number_number',
        name: 'Number Number',
        nameLong: 'Number Number Input',
        dataFormat: ['number', 'number'],
      },
      string_number: {
        _selfKey: 'string_number',
        name: 'String Number',
        nameLong: 'String Number Input',
        dataFormat: ['string', 'number'],
      },
      string_number_number: {
        _selfKey: 'string_number_number',
        name: 'String Number Number',
        nameLong: 'String Number Number Input',
        dataFormat: ['string', 'number', 'number'],
      },
      string_children: {
        _selfKey: 'string_children',
        name: 'String Children',
        nameLong: 'String Children Hierarchy',
        dataFormat: ['string', 'children'],
      },
      string_number_children: {
        _selfKey: 'string_number_children',
        name: 'String Number Children',
        nameLong: 'String Number Children Hierarchy',
        dataFormat: ['string', 'number', 'children'],
      },
    };

    Object.assign(this, types);
  }
}
