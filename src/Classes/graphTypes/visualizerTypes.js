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
      },
    };

    Object.assign(this, types);
  }
}
