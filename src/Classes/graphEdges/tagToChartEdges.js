/* eslint-disable no-underscore-dangle */

import ChartTypes from '../graphTypes/chartTypes.js';
import TagTypes from '../graphTypes/tagTypes.js';

const chartTypes = new ChartTypes();
const tagTypes = new TagTypes();

/**
 * Defines the relationships between tag types and chart types, mapping
 * each tag type to an array of associated chart types. This is necessary
 * for determining the edge connections in a graph based on the tag types
 * provided.
 *
 * @type {Object.<string, string[]>}
 */
// TODO this section is heavily dependant on graph types being defined, so is very much a WIP.
function createTagToChartEdges() {
  try {
    const edges = {
      [tagTypes.xy._selfKey]: [
        chartTypes.bar._selfKey,
        chartTypes.line._selfKey,
      ],
    };

    return edges;
  } catch (error) {
    console.error(`Error caught, possible reference to non-existent tag or chart type: ${error.message}`);
    return {};
  }
}

export const tagToChartEdges = createTagToChartEdges();
