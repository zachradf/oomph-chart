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
      [inputTypes.dates._selfKey]: [
        tagTypes.dateRange._selfKey,
      ],
      [inputTypes.xy._selfKey]: [
        tagTypes.multiAxis._selfKey,
        tagTypes.singleAxis._selfKey,
      ],
    };

    return edges;
  } catch (error) {
    console.error(`Error caught, possible reference to non-existent input or tag type: ${error.message}`);
    return {};
  }
}

export const inputToTagEdges = createInputToTagEdges();
