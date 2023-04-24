import InputTypes from '../Classes/data/graphTypes/inputTypes.js';

export function isValidInput(inputType, userInput) {
  const inputTypes = new InputTypes();
  console.log('isValidInput called with:', inputType, userInput);
  console.log('Anticipated structure is:', inputTypes[inputType]);

  // TODO

  return true;
}
