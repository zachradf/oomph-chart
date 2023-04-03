function validateInputs(data, selector, options) {
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
  
    if (!['top', 'right', 'bottom', 'left'].every(prop => typeof margin[prop] === 'number')) {
      throw new Error('Invalid margin. Margin should have "top", "right", "bottom", and "left" properties with numeric values.');
    }
  }
  
  module.exports = validateInputs;
