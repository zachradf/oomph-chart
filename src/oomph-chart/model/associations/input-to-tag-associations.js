/* eslint-disable no-underscore-dangle */

import InputTypes from '../types/input-types.js';
import TagTypes from '../types/tag-types.js';

const inputTypes = new InputTypes();
const tagTypes = new TagTypes();

/**
 * Defines the relationships between input types and tag types, mapping
 * each input type to an array of associated tag types.
 *
 * @type {Object.<string, string[]>}
 */
function createInputToTagAssociations() {
  try {
    const associations = {
      [inputTypes.number_number._selfKey]: [
        tagTypes.basic._selfKey,
      ],
      [inputTypes.string_number._selfKey]: [
        tagTypes.basic._selfKey,
      ],
      [inputTypes.string_number_string._selfKey]: [
        // tagTypes.basic._selfKey,
      ],
      [inputTypes.string_number_children._selfKey]: [
        tagTypes.hierarchic._selfKey,
      ],
    };

    return associations;
  } catch (error) {
    console.error(`Possible reference to non-existent input or tag type: ${error.message}`);
    return {};
  }
}

export const inputToTagAssociations = createInputToTagAssociations();
