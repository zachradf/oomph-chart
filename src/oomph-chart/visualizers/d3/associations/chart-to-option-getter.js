import ChartTypes from '../types/chart-types.js';

import { chartToOptionAssociations } from './chart-to-option-associations.js';

/**
 * Determines which charts are valid based off of provided tag types.
 *
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
*/

export function getChartToOptionAssociations(charts) {
  if (!charts || charts.length === 0) {
    console.error('No charts provided.');
    return [];
  }

  try {
    const associations = new Set();
    const associationsBuilder = [];
    const chartTypes = new ChartTypes();

    // TODO for now, flatten all charts options into a single options list.
    charts.forEach((chartType) => {
      if (!chartTypes[chartType]) throw new Error(`Invalid chart type: ${chartType}`);
      if (!chartToOptionAssociations[chartType]) throw new Error(`No chart-to-options associations found for: ${chartType}`);

      // TODO verify if '...' is needed below. Seems to work either way, but needed for input-to-tag
      associationsBuilder.push(...chartToOptionAssociations[chartType]);
    });

    associationsBuilder.forEach((association) => {
      associations.add(association);
    });

    // TODO restore this functionality in favor of the below workaround
    // return associations;

    // TODO workaround for now, only return the first options association
    return associationsBuilder[0] ? associationsBuilder[0] : '';
  } catch (error) {
    console.error(error.message);
    return new Set();
  }
}
