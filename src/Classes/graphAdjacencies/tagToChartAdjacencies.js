import { tagToChartEdges } from '../graphEdges/tagToChartEdges.js';

/**
 * Determines which charts are valid based off of provided tag types.
 * TODO, will likely need a 2D array based off of each input type.
 * @param {Array.<InputTypes>} validInputs - An array of valid input types.
 * @returns {Array.<TagTypes} An array of tag types.
*/
export function getTagToChartAdjacencies(validTags) {
  // Edge case: no input is provided
  if (!validTags) return null;

  const tagToChartAdjacencies = new Set();

  validTags?.forEach((tagType) => {
    const adjacencies = tagToChartEdges[tagType];
    adjacencies?.forEach((adjacency) => tagToChartAdjacencies.add(adjacency));
  });

  return [...tagToChartAdjacencies];
}
