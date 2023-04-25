/* eslint-disable no-use-before-define */
import InputTypes from '../Classes/graphTypes/inputTypes.js';

/**
 * Determines supported input types.
 * @param {*} input - Any type is supported, as this function will determine what is supported.
 */
export function getCompatibleInputTypes(userInput) {
  // console.log('getCompatibleInputTypes called with the following user input:\n', userInput);

  // Edge case: no input is provided
  if (!userInput) return null;

  const compatibleInputTypes = [];
  const inputTypes = new InputTypes();

  // Check each input type
  Object.keys(inputTypes).forEach((inputType) => {
    if (isValidInput(inputType, userInput)) compatibleInputTypes.push(inputType);
  });

  return compatibleInputTypes;
}

function isValidInput(inputType, userInput) {
  const inputTypes = new InputTypes();
  console.log('isValidInput called with:', inputType, userInput);
  console.log('Anticipated structure is:', inputTypes[inputType]);

  // TODO

  return true;
}
