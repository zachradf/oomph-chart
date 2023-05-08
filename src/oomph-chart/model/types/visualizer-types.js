import D3ChartTypes from '../../visualizers/d3/types/chart-types.js';
import D3OptionTypes from '../../visualizers/d3/types/option-types.js';

const d3ChartTypes = new D3ChartTypes();
const d3OptionsTypes = new D3OptionTypes();

/**
 * Defines available visualizer types
 *
 * @constructor
 * @property {Object} types - The types of visualizers available.
 * @property {string} types._selfKey - Pseudo-internal: The name of the key of the property.
 * @property {string} types.name - The name of the visualizer.
 * @property {string} types.nameLong - The long name of the visualizer.
 */
export default class VisualizerTypes {
  constructor() {
    const types = {
      d3: {
        _selfKey: 'd3',
        name: 'D3',
        nameLong: 'D3 Visualizer',
        chartTypes: d3ChartTypes,
        optionTypes: d3OptionsTypes,
      },
    };

    Object.assign(this, types);
  }
}
