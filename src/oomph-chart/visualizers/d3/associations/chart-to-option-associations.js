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
function createChartToOptionAssociations() {
  try {
    const associations = {
      [chartTypes.adjacency._selfKey]: [
        optionTypes.optionsAdjacency._selfKey,
      ],
      [chartTypes.area._selfKey]: [
        optionTypes.optionsArea._selfKey,
      ],
      [chartTypes.bar._selfKey]: [
        optionTypes.optionsBar._selfKey,
      ],
      [chartTypes.box._selfKey]: [
        optionTypes.optionsBox._selfKey,
      ],
      [chartTypes.bubble._selfKey]: [
        optionTypes.optionsBubble._selfKey,
      ],
      [chartTypes.chord._selfKey]: [
        optionTypes.optionsChord._selfKey,
      ],
      [chartTypes.cloud._selfKey]: [
        optionTypes.optionsCloud._selfKey,
      ],
      [chartTypes.cluster._selfKey]: [
        optionTypes.optionsCluster._selfKey,
      ],
      [chartTypes.dendrogram._selfKey]: [
        optionTypes.optionsDendrogram._selfKey,
      ],
      [chartTypes.donut._selfKey]: [
        optionTypes.optionsDonut._selfKey,
      ],
      [chartTypes.funnel._selfKey]: [
        optionTypes.optionsFunnel._selfKey,
      ],
      // [chartTypes.gauge._selfKey]: [
      //   optionTypes.optionsGauge._selfKey,
      // ],
      [chartTypes.heat._selfKey]: [ // TODO note: was previously 'heat-map', verify now type-safe to use 'heat'
        optionTypes.optionsHeat._selfKey,
      ],
      [chartTypes.icicle._selfKey]: [
        optionTypes.optionsIcicle._selfKey,
      ],
      [chartTypes.line._selfKey]: [
        optionTypes.optionsLine._selfKey,
      ],
      [chartTypes.marimekko._selfKey]: [
        optionTypes.optionsMarimekko._selfKey,
      ],
      [chartTypes.pie._selfKey]: [
        optionTypes.optionsPie._selfKey,
      ],
      [chartTypes.polar._selfKey]: [
        optionTypes.optionsPolar._selfKey,
      ],
      [chartTypes.radar._selfKey]: [
        optionTypes.optionsRadar._selfKey,
      ],
      [chartTypes.radialTree._selfKey]: [
        optionTypes.optionsRadialTree._selfKey,
      ],
      [chartTypes.sankey._selfKey]: [
        optionTypes.optionsSankey._selfKey,
      ],
      [chartTypes.scatter._selfKey]: [
        optionTypes.optionsScatter._selfKey,
      ],
      [chartTypes.stackedBar._selfKey]: [
        optionTypes.optionsStacked._selfKey,
      ],
      [chartTypes.sun._selfKey]: [
        optionTypes.optionsSun._selfKey,
      ],
      [chartTypes.treeDiagram._selfKey]: [
        optionTypes.optionsTreeDiagram._selfKey,
      ],
      [chartTypes.treeMap._selfKey]: [
        optionTypes.optionsTreeMap._selfKey,
      ],
      [chartTypes.voronoi._selfKey]: [
        optionTypes.optionsVoronoi._selfKey,
      ],
      [chartTypes.waterfall._selfKey]: [
        optionTypes.optionsWaterfall._selfKey,
      ],
    };

    return associations;
  } catch (error) {
    console.error(`Possible reference to non-existent chart or option type: ${error.message}`);
    return {};
  }
}

export const chartToOptionAssociations = createChartToOptionAssociations();
