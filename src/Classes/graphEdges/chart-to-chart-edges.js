/* eslint-disable no-underscore-dangle */

import ChartTypes from '../graphTypes/chart-types.js';

const chartTypes = new ChartTypes();

/**
 * Defines the relationships between chart types, potentially useful for
 * stacking charts.
 *
 * @type {Object.<string, string[]>}
 */
// TODO this section is heavily dependant on graph types being defined, so is very much a WIP.
function getChartToChartEdges() {
  try {
    const edges = {
      [chartTypes.donut._selfKey]: [
        chartTypes.bar._selfKey,
      ],
    };

    return edges;
  } catch (error) {
    console.error(`Possible reference to non-existent chart type: ${error.message}`);
    return {};
  }
}

export const chartToChartEdges = getChartToChartEdges();
