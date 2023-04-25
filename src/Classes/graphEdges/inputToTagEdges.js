// import InputTypes from '../graphTypes/inputTypes.js';
// import TagTypes from '../graphTypes/tagTypes.js';

// const tagTypes = new TagTypes();

// TODO this section is heavily dependant on graph types being defined, so is very much a WIP.
// TODO make below types type-safe/object-based rather than hard-coded
export const inputToTagEdges = {
  dates: [
    'dateRange',
  ],
  xy: [
    'multiAxis',
    'singleAxis',
  ],
};
