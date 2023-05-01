import InputTypes from '../graphTypes/input-types.js';

import { inputToTagEdges } from './input-to-tag-edges.js';

/**
 * Determines which tags are valid based off of provided input types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
 */
export function getInputToTagAdjacencies(inputs) {
  if (!inputs || inputs.length === 0) {
    console.error('No inputs provided.');
  }

  try {
    const inputToTagAdjacencies = new Set();
    const inputTypes = new InputTypes();
    const adjacencies = [];

    inputs.forEach((inputType) => {
      if (!inputTypes[inputType]) throw new Error(`Invalid input type: ${inputType}`);
      if (!inputToTagEdges[inputType]) throw new Error(`No input-to-tag edges found for: ${inputType}`);
      adjacencies.push(...inputToTagEdges[inputType]);
    });

    adjacencies.forEach((adjacency) => {
      inputToTagAdjacencies.add(adjacency);
    });

    return inputToTagAdjacencies;
  } catch (error) {
    console.error(error.message);
    return new Set();
  }
}
