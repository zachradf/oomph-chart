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
function createTagToChartAssociations() {
  try {
    const associations = {
      [tagTypes.basic._selfKey]: [
        chartTypes.area._selfKey,
        chartTypes.bar._selfKey,
        // chartTypes.box._selfKey,
        chartTypes.donut._selfKey,
        chartTypes.funnel._selfKey,
        // chartTypes.gauge._selfKey,
        chartTypes.line._selfKey,
        chartTypes.pie._selfKey,
        chartTypes.polar._selfKey,
        chartTypes.radar._selfKey,
        chartTypes.scatter._selfKey,
      ],
      [tagTypes.basicExtended._selfKey]: [
        // chartTypes.box._selfKey,
        chartTypes.heat._selfKey,
        chartTypes.waterfall._selfKey,
      ],
      [tagTypes.hierarchic._selfKey]: [
        chartTypes.adjacency._selfKey,
        chartTypes.cluster._selfKey,
        chartTypes.dendrogram._selfKey,
        chartTypes.marimekko._selfKey,
        chartTypes.radialTree._selfKey,
        chartTypes.treeDiagram._selfKey,
      ],
      [tagTypes.hierarchicValue._selfKey]: [
        chartTypes.bubble._selfKey,
        chartTypes.chord._selfKey,
        chartTypes.cloud._selfKey,
        chartTypes.icicle._selfKey,
        chartTypes.sankey._selfKey,
        chartTypes.stackedBar._selfKey,
        chartTypes.sun._selfKey,
        chartTypes.treeMap._selfKey,
        chartTypes.voronoi._selfKey,
      ],
    };

    return associations;
  } catch (error) {
    console.error(`Possible reference to non-existent tag or chart type: ${error.message}`);
    return {};
  }
}

export const tagToChartAssociations = createTagToChartAssociations();
