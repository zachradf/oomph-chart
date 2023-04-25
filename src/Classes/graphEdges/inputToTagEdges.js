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
export const inputToTagEdges = {
  [inputTypes.dates._selfKey]: [
    tagTypes.dateRange._selfKey,
  ],
  [inputTypes.xy._selfKey]: [
    tagTypes.multiAxis._selfKey,
    tagTypes.singleAxis._selfKey,
  ],
};
