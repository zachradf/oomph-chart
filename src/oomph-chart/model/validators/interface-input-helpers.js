import ComponentTypes from '../../interfaces/default/types/component-types.js';
import D3Visualizer from '../../visualizers/d3/index.js';

const componentTypes = new ComponentTypes();

export function interfaceInputHelper(options) {
  options.interfaceOptions.forEach((interfaceOption) => {
    if (typeof interfaceOption !== 'object') {
      console.error('Invalid interface option detected. Options for individual interfaces should be an object.');
      return false;
    }

    if (!interfaceOption.component) {
      console.error('Invalid interface component provided.');
      return false;
    }

    if (!componentTypes[interfaceOption.component]) {
      console.error('Invalid interface component provided. Interface component:', options.interfaceOptions.component);
      return false;
    }

    if (!interfaceOption.componentText || interfaceOption.componentText.length === 0) {
      console.warn('There is no provided interface text.');
    }

    console.log(`Adding a ${interfaceOption.component} interface component.`);
    return true;
  });
}
export function interfaceVisualizerIsValid(visualizerInstance) {
  if (!visualizerInstance) return console.error('Invalid visualizer instance provided.');
  // TODO generalize this check to all visualizer types
  if (visualizerInstance instanceof D3Visualizer) return console.error('Invalid visualizer instance provided.');

  return true;
}
