/* eslint-disable no-use-before-define */
import ChartTypes from './graphTypes/chartTypes.js';
import InputTypes from './graphTypes/inputTypes.js';
import TagTypes from './graphTypes/tagTypes.js';

import { isValidInput } from '../../ValidatorFunctions/inputValidator.js';

/**
 * Defines the relationship between objects at the data layer.
 * Example:
 *    inputs --> tags --> charts
 * @constructor
 * @property {Array.<ChartTypes>} charts - Compatible chart types.
 * @property {Array.<InputTypes>} inputs - Compatible input types.
 * @property {Array.<TagTypes>} tags - Compatible tag types.
 * @param {*} input - The input data. Can be of any type.
 */
export default class GraphSuperClass {
  constructor(input) {
    this.inputs = getCompatibleInputTypes(input);
    this.tags = getCompatibleTagTypes(this.inputs);
    this.charts = getCompatibleChartTypes(this.tags);
  }
}

/**
 * Determines supported input types.
 * @param {*} input - Any type is supported, as this function will determine what is supported.
 */
function getCompatibleInputTypes(userInput) {
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

/**
 * Determines which tags are valid based off of provided input types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
 */
function getCompatibleTagTypes(validInputs) {
  // console.log('getCompatibleTagTypes called with the following valid inputs:\n', validInputs);

  // Edge case: no input is provided
  if (!validInputs) return null;

  const compatibleTagTypes = [];
  const tagTypes = new TagTypes();

  // TODO

  return compatibleTagTypes;
}

/**
 * Determines which charts are valid based off of provided tag types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
 */
function getCompatibleChartTypes(validTags) {
  // console.log('getCompatibleChartTypes called with the following valid tags:\n', validTags);

  // Edge case: no input is provided
  if (!validTags) return null;

  const compatibleChartTypes = [];
  const chartTypes = new ChartTypes();

  // TODO

  return compatibleChartTypes;
}
