import validateInputs from '../../ValidatorFunctions/optionsValidator';
// import options from '../../sample-data/optionsData';
// console.log(options)

describe('validateInputs', () => {
  const options = {
    margin: {
      top: 20, right: 20, bottom: 30, left: 40,
    },
    width: 500,
    height: 400,
    radius: 5,
    color: 'blue',
    showLabels: true,
    diameter: 600,
    fillColor: 'blue',
    strokeColor: 'blue',
    xLabel: 'xLabel',
    yLabel: 'yLabel',
    colorScale: 'red',
  };
  const data = [
    { category: 'A', value: 1 },
    { category: 'B', value: 2 }
  ];
  const selector = '#chart';

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
