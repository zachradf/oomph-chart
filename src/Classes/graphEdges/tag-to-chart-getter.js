import TagTypes from '../graphTypes/tag-types.js';

import { tagToChartEdges } from './tag-to-chart-edges.js';

/**
 * Determines which charts are valid based off of provided tag types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
*/

export function getTagToChartAdjacencies(tags) {
  if (!tags || tags.length === 0) {
    console.error('No tags provided.');
    return [];
  }

  try {
    const tagToChartAdjacencies = new Set();
    const tagTypes = new TagTypes();
    const adjacencies = [];

    tags.forEach((tagType) => {
      if (!tagTypes[tagType]) throw new Error(`Invalid tag type: ${tagType}`);
      if (!tagToChartEdges[tagType]) throw new Error(`No tag-to-chart edges found for: ${tagType}`);

      // TODO verify if '...' is needed below. Seems to work either way, but needed for input-to-tag
      adjacencies.push(...tagToChartEdges[tagType]);
    });

    adjacencies.forEach((adjacency) => {
      tagToChartAdjacencies.add(adjacency);
    });

    return tagToChartAdjacencies;
  } catch (error) {
    console.error(error.message);
    return new Set();
  }
}
