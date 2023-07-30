export const validOptionShapeTypes = ['string', 'number', 'boolean'];

export function validateOptionShape(shape, input) {
  // Check that all keys in input exist in shape
  Object.keys(input).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(shape, key)) {
      throw new Error(`Unexpected key "${key}" found in input. This key does not exist within the expected options.`);
    }
  });

  Object.keys(shape).forEach((key) => {
    // Ignore '_selfKey'
    if (key === '_selfKey') return;
    // Skip to the next key if the key does not exist in input, or if the value is null.
    if (!Object.prototype.hasOwnProperty.call(input, key) || input[key] === null) {
      return;
    }

    // Handle array case
    if (Array.isArray(shape[key])) {
      // Check if the input's key value is an array
      if (!Array.isArray(input[key])) {
        throw new Error(`Input's ${key} is expected to be an array`);
      }

      input[key].forEach((inputElement, index) => {
        // Get the first element in the shape's key value which is the expected type for all elements in the input's key array
        const expectedType = shape[key][0];
        if (typeof inputElement !== expectedType) {
          throw new Error(`Element at index ${index} in ${key} must be a ${expectedType}`);
        }
      });
    } else if (typeof shape[key] === 'object') {
      // Handle object case
      validateOptionShape(shape[key], input[key]);
    } else {
      // Validates that the shape's values themselves adhere to valid option types
      if (!validOptionShapeTypes.includes(shape[key])) {
        throw new Error(`Invalid type specified for ${key}`);
      }

      // Validates the input
      // NOTE that above codeblock makes shape[key] effectively typesafe
      // eslint-disable-next-line valid-typeof
      if (typeof input[key] !== shape[key]) {
        throw new Error(`${key} must be a ${shape[key]}`);
      }
    }
  });
  return true;
}

// TODO WIP
export function validateOptions(data, selector, options) {
  if (typeof selector !== 'string' || !selector) {
    throw new Error('Invalid selector. Selector should be a non-empty string.');
  }

  if (typeof options !== 'object' || !options) {
    throw new Error('Invalid options. Options should be a non-null object.');
  }
  const { width, height, margin } = options;

  if (typeof width !== 'number' || width <= 0) {
    throw new Error('Invalid width. Width should be a positive number.');
  }

  if (typeof height !== 'number' || height <= 0) {
    throw new Error('Invalid height. Height should be a positive number.');
  }

  if (typeof margin !== 'object' || !margin) {
    throw new Error('Invalid margin. Margin should be a non-null object.');
  }

  if (!['top', 'right', 'bottom', 'left'].every((prop) => typeof margin[prop] === 'number')) {
    throw new Error('Invalid margin. Margin should have "top", "right", "bottom", and "left" properties with numeric values.');
  }
}
