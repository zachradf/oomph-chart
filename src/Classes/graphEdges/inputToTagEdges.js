/* eslint-disable no-underscore-dangle */

import InputTypes from '../graphTypes/inputTypes.js';
import TagTypes from '../graphTypes/tagTypes.js';

const inputTypes = new InputTypes();
const tagTypes = new TagTypes();

/**
 * Defines the relationships between input types and tag types, mapping
 * each input type to an array of associated tag types. This is necessary
 * for determining the edge connections in a graph based on the input types
 * provided.
 *
 * @type {Object.<string, string[]>}
 */
// TODO this section is heavily dependant on graph types being defined, so is very much a WIP.
function createInputToTagEdges() {
  try {
    const edges = {
      [inputTypes.number_number._selfKey]: [
        tagTypes.xy._selfKey,
      ],
      [inputTypes.string_number._selfKey]: [
        tagTypes.categorical._selfKey,
      ],
    };

    return edges;
  } catch (error) {
    console.error(`Possible reference to non-existent input or tag type: ${error.message}`);
    return {};
  }
}

export const inputToTagEdges = createInputToTagEdges();
