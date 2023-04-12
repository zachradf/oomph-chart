import * as d3 from 'd3';
import { JSDOM } from 'jsdom';
import GraphSuperClass from '../../Classes/data/graphSuperClass';
import ChartTypes from '../../Classes/data/graphTypes/chartTypes';
import InputTypes from '../../Classes/data/graphTypes/inputTypes';
import TagTypes from '../../Classes/data/graphTypes/tagTypes';

global.d3 = d3;

describe('GraphSuperClass', () => {
  let data;

  beforeEach(() => {
    data = new GraphSuperClass();
  });

  it('should instantiate with the correct properties', () => {
    expect(data.charts).toBeInstanceOf(ChartTypes);
    expect(data.inputs).toBeInstanceOf(InputTypes);
    expect(data.tags).toBeInstanceOf(TagTypes);
  });
});
