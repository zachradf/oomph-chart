/* eslint-disable no-underscore-dangle */

import ChartTypes from '../types/chart-types.js';
import TagTypes from '../types/tag-types.js';

const chartTypes = new ChartTypes();
const tagTypes = new TagTypes();

/**
 * Defines the relationships between tag types and chart types, mapping
 * each tag type to an array of associated chart types.
 *
 * @type {Object.<string, string[]>}
 */
// TODO this section is heavily dependant on graph types being defined, so is very much a WIP.
function createTagToChartAssociations() {
  try {
    const associations = {
      [tagTypes.basic._selfKey]: [
        chartTypes.bar._selfKey,
        chartTypes.donut._selfKey,
        chartTypes.funnel._selfKey,
        chartTypes.polar._selfKey,
        chartTypes.radar._selfKey,
      ],
      [tagTypes.hierarchic._selfKey]: [
        chartTypes.scatter._selfKey,
      ],
    };

    return associations;
  } catch (error) {
    console.error(`Possible reference to non-existent tag or chart type: ${error.message}`);
    return {};
  }
}

export const tagToChartAssociations = createTagToChartAssociations();
