/* eslint-disable no-underscore-dangle */

import ChartTypes from '../types/chart-types.js';

const chartTypes = new ChartTypes();

/**
 * Defines the relationships between chart types, potentially useful for
 * stacking charts.
 *
 * @type {Object.<string, string[]>}
 */
// Chart-to-chart is WIP.
function getChartToChartAssociations() {
  try {
    const associations = {
      [chartTypes.donut._selfKey]: [
        chartTypes.bar._selfKey,
      ],
    };

    return associations;
  } catch (error) {
    console.error(`Possible reference to non-existent chart type: ${error.message}`);
    return {};
  }
}

export const chartToChartAssociations = getChartToChartAssociations();
