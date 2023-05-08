/* eslint-disable no-underscore-dangle */

import ChartTypes from '../types/chart-types.js';
import OptionTypes from '../types/option-types.js';

const chartTypes = new ChartTypes();
const optionTypes = new OptionTypes();

/**
 * Defines the relationships between tag types and chart types, mapping
 * each tag type to an array of associated chart types.
 *
 * @type {Object.<string, string[]>}
 */
// TODO this section is heavily dependant on graph types being defined, so is very much a WIP.
function createChartToOptionAssociations() {
  try {
    const associations = {
      [chartTypes.area._selfKey]: [
        optionTypes.options2._selfKey,
      ],
      [chartTypes.bar._selfKey]: [
        optionTypes.options5._selfKey,
      ],
      [chartTypes.box._selfKey]: [
        optionTypes.options3._selfKey,
      ],
      [chartTypes.bubble._selfKey]: [
        optionTypes.options10._selfKey,
      ],
      [chartTypes.donut._selfKey]: [
        optionTypes.options4._selfKey,
      ],
      [chartTypes.funnel._selfKey]: [
        optionTypes.funnelChart._selfKey,
      ],
      [chartTypes.gauge._selfKey]: [
        optionTypes.gauge._selfKey,
      ],
      [chartTypes.heat._selfKey]: [ // TODO note: was previously 'heat-map', verify now type-safe to use 'heat'
        optionTypes.options3._selfKey,
      ],
      [chartTypes.line._selfKey]: [
        optionTypes.options9._selfKey,
      ],
      [chartTypes.pie._selfKey]: [
        optionTypes.options6._selfKey,
      ],
      [chartTypes.polar._selfKey]: [
        optionTypes.polarChart._selfKey,
      ],
      [chartTypes.radar._selfKey]: [
        optionTypes.radarChart._selfKey,
      ],
      [chartTypes.scatter._selfKey]: [
        optionTypes.options3._selfKey,
      ],
      [chartTypes.stackedbar._selfKey]: [
        optionTypes.options7._selfKey,
      ],
      [chartTypes.waterfall._selfKey]: [
        optionTypes.waterfall._selfKey,
      ],
    };

    return associations;
  } catch (error) {
    console.error(`Possible reference to non-existent chart or option type: ${error.message}`);
    return {};
  }
}

export const chartToOptionAssociations = createChartToOptionAssociations();
