import InputTypes from '../types/input-types.js';

import { inputToTagAssociations } from './input-to-tag-associations.js';

/**
 * Determines which tags are valid based off of provided input types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
 */
export function getInputToTagAssociations(inputs) {
  if (!inputs || inputs.length === 0) {
    console.error('No inputs provided.');
  }

  try {
    const associations = new Set();
    const associationsBuilder = [];
    const inputTypes = new InputTypes();

    // TODO for now, flatten all inputs associations into a single associations list.
    inputs.forEach((inputType) => {
      if (!inputTypes[inputType]) throw new Error(`Invalid input type: ${inputType}`);
      if (!inputToTagAssociations[inputType]) throw new Error(`No input-to-tag associations found for: ${inputType}`);
      associationsBuilder.push(...inputToTagAssociations[inputType]);
    });

    associationsBuilder.forEach((association) => {
      associations.add(association);
    });

    return associations;
  } catch (error) {
    console.error(error.message);
    return new Set();
  }
}
