import { hasNonZeroValues } from '../../visualizers/d3/functions/format-data.js';
import InputTypes from '../types/input-types.js';

import {
  validateArrayHelper, validateObjectHelper, validateHierarchyHelper, validateHierarchyValueHelper,
} from './input-validator-helpers.js';

/**
 * Determines supported input types.
 * @param {*} input - Any type is supported, as this function will determine what is supported.
 * @returns {Array.InputTypes} Supported input types, based on the input.
 */
export function getCompatibleInputTypes(userInput) {
  // Edge case: no input is provided
  if (!userInput || !Array.isArray(userInput) || userInput.length === 0) return [];

  const compatibleInputTypes = new Set();
  const inputTypes = new InputTypes();

  // Check each input type
  Object.keys(inputTypes).forEach((inputType) => {
    if (isValidInput(userInput, inputTypes[inputType].dataFormat)) {
      compatibleInputTypes.add(inputType);
    }
  });

  if (compatibleInputTypes.length === 0) console.error('No valid input was found.');

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
// function isValidInput(input, dataFormat) {
//   const inputExcerpt = [input[0].x, input[0].y];

//   // Validate data shape
//   if (Array.isArray(inputExcerpt)) return validateArrayHelper(inputExcerpt, dataFormat);
//   // TODO inputData may not refer to anything
//   if (typeof inputData === 'object') return validateObjectHelper(inputExcerpt, dataFormat);

//   return false;
// }
function isValidInput(input, dataFormat) {
  let inputExcerpt = input[0];

  // check if format is 'x and y'
  if (Object.prototype.hasOwnProperty.call(inputExcerpt, 'x') && Object.prototype.hasOwnProperty.call(inputExcerpt, 'y')) {
  // Validate data shape
    inputExcerpt = [input[0].x, input[0].y];
    if (Array.isArray(inputExcerpt)) {
      return validateArrayHelper(inputExcerpt, dataFormat);
    }
    // TODO inputData may not refer to anything
    if (typeof inputData === 'object') return validateObjectHelper(inputExcerpt, dataFormat);
  }
  if (Object.prototype.hasOwnProperty.call(inputExcerpt, 'x') && Object.prototype.hasOwnProperty.call(inputExcerpt, 'y1') && Object.prototype.hasOwnProperty.call(inputExcerpt, 'y2')) {
    // Validate data shape
    inputExcerpt = [input[0].x, input[0].y1, input[0].y2];
    if (Array.isArray(inputExcerpt)) {
      return validateArrayHelper(inputExcerpt, dataFormat);
    }
    // TODO inputData may not refer to anything
    if (typeof inputData === 'object') return validateObjectHelper(inputExcerpt, dataFormat);
  }
  if (Object.prototype.hasOwnProperty.call(inputExcerpt, 'name')
  && Object.prototype.hasOwnProperty.call(inputExcerpt, 'children')
  && JSON.stringify(dataFormat) === JSON.stringify(['string', 'children'])
  ) {
    return validateHierarchyHelper(input, dataFormat);
  }
  // check if format is 'category, value, and children' for hierarchicValue data
  if (Object.prototype.hasOwnProperty.call(inputExcerpt, 'name')
  && Object.prototype.hasOwnProperty.call(inputExcerpt, 'value')
  && Object.prototype.hasOwnProperty.call(inputExcerpt, 'children')
  && JSON.stringify(dataFormat) === JSON.stringify(['string', 'number', 'children'])
  ) {
    return validateHierarchyValueHelper(input, dataFormat) && hasNonZeroValues(input);
  }

  console.log('Data format does not match: ', dataFormat);
  return false;
}
