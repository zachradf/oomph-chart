import ChartTypes from './graphTypes/chartTypes';
import InputTypes from './graphTypes/inputTypes';
import TagTypes from './graphTypes/tagTypes';

/**
 * Defines the relationship between objects at the data layer.
 * Example:
 *    inputs --> tags --> charts
 * @constructor
 * @property {ChartTypes} charts - All available chart types.
 * @property {InputTypes} inputs - All available input types.
 * @property {TagTypes} tags - All available tag types.
 */
export default class GraphSuperClass {
  constructor() {
    this.charts = new ChartTypes();
    this.inputs = new InputTypes();
    this.tags = new TagTypes();
  }
}
