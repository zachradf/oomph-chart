import { inputToTagEdges } from '../graphEdges/inputToTagEdges.js';

/**
 * Returns input-to-tag adjacencies.
 */
export function getInputAdjacencies(validInputs) {
  const inputAdjacencies = [];

  validInputs.forEach((inputType) => {
    const adjacencies = inputToTagEdges[inputType];
    inputAdjacencies.push(adjacencies);
  });

  // TODO for now, convert adjacencies into a flat array (and without `flat` method to be safe)
  const flatInputAdjacencies = [].concat(...inputAdjacencies);

  return flatInputAdjacencies;
}
