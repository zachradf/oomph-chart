// import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/no-relative-packages
import * as d3 from '../node_modules/d3/dist/d3.min.js';

// import GraphSuperClass from '../../Classes/GraphSuperClass.js';
import ChartTypes from '../../Classes/graphTypes/chart-types.js';
import InputTypes from '../../Classes/graphTypes/input-types.js';
import TagTypes from '../../Classes/graphTypes/tag-types.js';

global.d3 = d3;

describe('GraphSuperClass', () => {
  let chartTypes;
  let inputTypes;
  let tagTypes;

  beforeEach(() => {
    // data = new GraphSuperClass();
    chartTypes = new ChartTypes();
    inputTypes = new InputTypes();
    tagTypes = new TagTypes();
  });

  it('should instantiate with the correct properties', () => {
    expect(chartTypes).toBeInstanceOf(ChartTypes);
    expect(inputTypes).toBeInstanceOf(InputTypes);
    expect(tagTypes).toBeInstanceOf(TagTypes);
  });
});
