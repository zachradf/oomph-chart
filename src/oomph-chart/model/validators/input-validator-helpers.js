export function validateArrayHelper(inputArray, expectedTypes) {
  if (!Array.isArray(inputArray) || inputArray.length !== expectedTypes.length) {
    return false;
  }

  for (let i = 0; i < inputArray.length; i++) {
    if (!validateTypeHelper(inputArray[i], expectedTypes[i])) {
      return false;
    }
  }

  return true;
}

// TODO further testing/verification/integration of this function is needed
export function validateObjectHelper(inputObject, expectedStructure) {
  if (typeof inputObject !== 'object' || inputObject === null || Array.isArray(inputObject)) {
    return false;
  }

  const inputKeys = Object.keys(inputObject);
  const expectedKeys = Object.keys(expectedStructure);

  if (inputKeys.length !== expectedKeys.length) {
    return false;
  }

  for (let i = 0; i < inputKeys.length; i++) {
    const key = inputKeys[i];
    if (
      !expectedKeys.includes(key)
      || !validateTypeHelper(inputObject[key], expectedStructure[key])) {
      return false;
    }
  }

  return true;
}

export function validateTypeHelper(input, expectedType) {
  if (expectedType === 'date') {
    return input instanceof Date;
  }

  if (Array.isArray(expectedType)) {
    return validateArrayHelper(input, expectedType);
  }

  if (expectedType === 'object') {
    return validateObjectHelper(input, expectedType);
  }

  // eslint-disable-next-line valid-typeof
  return typeof input === expectedType;
}
