import TagTypes from '../types/tag-types.js';

import { tagToChartAssociations } from './tag-to-chart-associations.js';

/**
 * Determines which charts are valid based off of provided tag types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
*/

export function getTagToChartAssociations(tags) {
  if (!tags || tags.length === 0) {
    console.error('No tags provided.');
    return [];
  }

  try {
    const associations = new Set();
    const associationsBuilder = [];
    const tagTypes = new TagTypes();

    // TODO for now, flatten all tags associations into a single associations list.
    tags.forEach((tagType) => {
      if (!tagTypes[tagType]) throw new Error(`Invalid tag type: ${tagType}`);
      if (!tagToChartAssociations[tagType]) throw new Error(`No tag-to-chart associations found for: ${tagType}`);

      // TODO verify if '...' is needed below. Seems to work either way, but needed for input-to-tag
      associationsBuilder.push(...tagToChartAssociations[tagType]);
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
