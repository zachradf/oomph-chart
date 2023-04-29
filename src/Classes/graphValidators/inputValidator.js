/* eslint-disable no-use-before-define */
import InputTypes from '../graphTypes/inputTypes.js';

import { validateArrayHelper, validateObjectHelper } from './inputValidatorHelpers.js';

/**
 * Determines supported input types.
 * @param {*} input - Any type is supported, as this function will determine what is supported.
 * @returns {Array.InputTypes} Supported input types, based on the input.
 */
export function getCompatibleInputTypes(userInput) {
  // Edge case: no input is provided
  if (!userInput || !Array.isArray(userInput) || userInput.length === 0) return [];

  const compatibleInputTypes = [];
  const inputTypes = new InputTypes();

  // Check each input type
  Object.keys(inputTypes).forEach((inputType) => {
    if (isValidInput(userInput, inputTypes[inputType].dataFormat)) {
      compatibleInputTypes.push(inputType);
    }
  });

  if (compatibleInputTypes.length === 0) console.error('Error caught: No valid input was found.');

  return compatibleInputTypes;
}

/**
 * Abstract wrapper for validating input via indirect recursive calls.
 *
 * Usage example:
 * const expectedDataShape = [
 *   'string',
 *   'number',
 *   'boolean',
 *   'date',
 *   ['string', 'number'],
 *   { key1: 'string', key2: 'number' },
 * ];
 */
// TODO for now only arrays as input root are supported
// TODO add support for shallow (single element) and deep (all elements) checking
function isValidInput(input, dataFormat) {
  const inputExcerpt = [input[0].x, input[0].y];

  // Validate data shape
  if (Array.isArray(inputExcerpt)) return validateArrayHelper(inputExcerpt, dataFormat);
  if (typeof inputData === 'object') return validateObjectHelper(inputExcerpt, dataFormat);

  return false;
}
