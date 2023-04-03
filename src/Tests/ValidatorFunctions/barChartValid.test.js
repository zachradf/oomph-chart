const validateInputs = require('../../ValidatorFunctions/optionsValid.js');
const optionObject = require('../../SampleData/optionsData.js');
const options = optionObject.options;

console.log("THIS IS OPTIONS", options, "AND THIS IS OPTIONS WIDTH", options.width)
describe('validateInputs', () => {
  const data = [
    { label: 'A', value: 1 },
    { label: 'B', value: 2 },
  ];
  const selector = '#chart';
//   const options = {
//     width: 600,
//     height: 400,
//   };

  test('Does not throw for valid inputs', () => {
    expect(() => validateInputs(data, selector, options)).not.toThrow();
  });

  test('Throws error for invalid selector', () => {
    const invalidSelector = 123;

    expect(() => validateInputs(data, invalidSelector, options)).toThrow(
      'Invalid selector. Selector should be a non-empty string.'
    );
  });

  test('Throws error for invalid options', () => {
    const invalidOptions = null;

    expect(() => validateInputs(data, selector, invalidOptions)).toThrow(
      'Invalid options. Options should be a non-null object.'
    );
  });
});
