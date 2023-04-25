/* eslint-disable no-use-before-define */
import InputTypes from '../graphTypes/inputTypes.js';

/**
 * Determines supported input types.
 * @param {*} input - Any type is supported, as this function will determine what is supported.
 * @returns {Array.InputTypes} Supported input types, based on the input.
 */
export function getCompatibleInputTypes(userInput) {
  // Edge case: no input is provided
  // TODO for now only arrays are supported
  // TODO add support to shallow (single element) and deep (all elements) checking
  if (!userInput || !Array.isArray(userInput) || userInput.length === 0) return [];

  const compatibleInputTypes = [];
  const inputTypes = new InputTypes();

  // Check each input type
  Object.keys(inputTypes).forEach((inputType) => {
    if (isValidInput(userInput, inputType, inputTypes)) compatibleInputTypes.push(inputType);
  });

  if (compatibleInputTypes.length === 0) console.error('Error caught: No valid input was found.');

  return compatibleInputTypes;
}

function isValidInput(userInput, inputType, inputTypes) {
  const userDataExcerpt = [userInput[0].x, userInput[0].y];
  const expectedDataShape = inputTypes[inputType].dataFormat;

  return validateDataShape(userDataExcerpt, expectedDataShape);
}

/**
 * Abstract wrapper for validating input via indirect recursive calls.
 * TODO potentially add support for more than array element as root.
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
function validateDataShape(inputData, expectedDataShape) {
  return validateArrayHelper(inputData, expectedDataShape);
}

/** Helper function. */
function validateTypeHelper(input, expectedType) {
  if (expectedType === 'date') {
    return input instanceof Date;
  }

  if (Array.isArray(expectedType)) {
    return validateArrayHelper(input, expectedType);
  }

  if (expectedType === 'object') {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
  }

  // eslint-disable-next-line valid-typeof
  return typeof input === expectedType;
}

/** Helper function. */
function validateArrayHelper(inputArray, expectedTypes) {
  if (!Array.isArray(inputArray) || inputArray.length !== expectedTypes.length) {
    return false;
  }

  for (let i = 0; i < inputArray.length; i += 1) {
    if (!validateTypeHelper(inputArray[i], expectedTypes[i])) {
      return false;
    }
  }

  return true;
}
