/* eslint-disable import/prefer-default-export */
import InputTypes from '../Classes/data/graphTypes/inputTypes';

export function isValidInput(inputType, userInput) {
  const inputTypes = new InputTypes();
  console.log('isValidInput called with:', inputType, userInput);
  console.log('Anticipated structure is:', inputTypes[inputType]);

  // TODO

  return true;
}
