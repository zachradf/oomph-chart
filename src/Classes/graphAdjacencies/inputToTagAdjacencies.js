import { inputToTagEdges } from '../graphEdges/inputToTagEdges.js';

/**
 * Determines which tags are valid based off of provided input types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
 */
export function getInputToTagAdjacencies(validInputs) {
  // Edge case: no input is provided
  if (!validInputs) return null;

  const inputToTagAdjacencies = new Set();

  validInputs?.forEach((inputType) => {
    const adjacencies = inputToTagEdges[inputType];
    adjacencies?.forEach((adjacency) => inputToTagAdjacencies.add(adjacency));
  });

  return [...inputToTagAdjacencies];
}
