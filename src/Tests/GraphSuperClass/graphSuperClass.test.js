import * as d3 from 'd3';
// import { JSDOM } from 'jsdom';
// import GraphSuperClass from '../../Classes/GraphSuperClass.js';
import ChartTypes from '../../Classes/graphTypes/chartTypes.js';
import InputTypes from '../../Classes/graphTypes/inputTypes.js';
import TagTypes from '../../Classes/graphTypes/tagTypes.js';

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
