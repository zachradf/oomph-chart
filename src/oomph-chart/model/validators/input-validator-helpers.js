// const isValid = (node) => {
//   if (!node.hasOwnProperty('value')) return false; // Check if value key exists

//   // If there are no children, return true
//   if (!node.children) return true;

//   // Use reduce to check children and sum their values
//   const childrenValueSum = node.children.reduce((sum, child) => {
//     if (sum === false) return false; // If a child was not valid, propagate false
//     const childValid = isValid(child);
//     return childValid ? sum + child.value : false;
//   }, 0);

//   // If childrenValueSum is false (i.e., a child was not valid), or if the sum exceeds the parent value, return false
//   return childrenValueSum !== false && childrenValueSum <= node.value;
// };

// export const hasNonZeroValues = (tree) => tree.every(isValid);

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
// Currently not in use?
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
export function validateHierarchyValueHelper(data, expectedDataShape) {
  if (JSON.stringify(expectedDataShape) !== JSON.stringify(['string', 'number', 'children'])) return false;

  function validateNode(node) {
    // Check if the node itself is an object
    if (typeof node !== 'object' || node === null) {
      console.error('Expected data to be an object, received', node);
      return false;
    }
    const hasCorrectName = typeof node.name === 'string';
    const hasCorrectChildren = Array.isArray(node.children);

    if (!hasCorrectName) {
      console.error('Node', node, 'has an incorrect type for the property: "name". Expected type: "string", received', node.name, 'type', typeof node.name);
    }

    if (node.children) {
      if (!hasCorrectChildren) {
        console.error('Node', node, 'has an incorrect type for the property: "children". Expected type: "array", received', node.children, 'type', typeof node.children);
      }

      // Validate each child node
      if (hasCorrectChildren) {
        return node.children.every(validateNode);
      }
    } else {
      // If the node does not have children, check if the value property is correct
      const hasCorrectValue = typeof node.value === 'number';

      if (!hasCorrectValue) {
        console.error('Node', node, 'has an incorrect type for the property: "value". Expected type: "number", received', node.value, 'type', typeof node.value);
      }

      return hasCorrectName && hasCorrectValue;
    }

    return hasCorrectName && hasCorrectChildren;
  }

  if (!Array.isArray(data)) {
    console.error('Data is not an array.');
    return false;
  }

  return data.every(validateNode);
}

// export function validateHierarchyValueHelper(data, expectedDataShape) {
//   if (JSON.stringify(expectedDataShape) !== JSON.stringify(['string', 'number', 'children'])) return false;

//   function validateNode(node) {
//     // Check if each property on the node has the correct type
//   // Check if the node itself is an object
//     if (typeof node !== 'object' || node === null) {
//       console.error('Expected data to be an object, received', node);
//       return false;
//     }
//     const hasCorrectName = typeof node.name === 'string';
//     const hasCorrectValue = typeof node.value === 'number';
//     const hasCorrectChildren = Array.isArray(node.children);

//     if (!hasCorrectName) {
//       console.error('Node', node, 'has an incorrect type for the property: "name". Expected type: "string", received', node.name, 'type', typeof node.name);
//     }

//     if (!hasCorrectValue) {
//       console.error('Node', node, 'has an incorrect type for the property: "value". Expected type: "number" or "null", received', node.value, 'type', typeof node.value);
//     }

//     if (node.children && !hasCorrectChildren) {
//       console.error('Node', node, 'has an incorrect type for the property: "children". Expected type: "array", received', node.children, 'type', typeof node.children);
//     }

//     if (!hasCorrectName || !hasCorrectValue || (node.children && !hasCorrectChildren)) {
//       return false;
//     }

//     // If the node has children, check each child node
//     if (hasCorrectChildren) {
//       return node.children.every(validateNode);
//     }

//     return true;
//   }

//   if (!Array.isArray(data)) {
//     console.error('Data is not an array.');
//     return false;
//   }

//   return data.every(validateNode);
// }

export function validateHierarchyHelper(data, expectedDataShape) {
  if (JSON.stringify(expectedDataShape) !== JSON.stringify(['string', 'children'])) return false;

  function validateNode(node) {
    // Check if each property on the node has the correct type
  // Check if the node itself is an object
    if (typeof node !== 'object' || node === null) {
      console.error('Expected data to be an object, received', node);
      return false;
    }
    const hasCorrectName = typeof node.name === 'string';
    const hasCorrectChildren = Array.isArray(node.children);

    if (!hasCorrectName) {
      console.error('Node', node, 'has an incorrect type for the property: "name". Expected type: "string", received', node.name, 'type', typeof node.name);
    }

    if (node.children && !hasCorrectChildren) {
      console.error('Node', node, 'has an incorrect type for the property: "children". Expected type: "array", received', node.children, 'type', typeof node.children);
    }

    if (!hasCorrectName || (node.children && !hasCorrectChildren)) {
      return false;
    }

    // If the node has children, check each child node
    if (hasCorrectChildren) {
      return node.children.every(validateNode);
    }
    console.log('string_children');
    return true;
  }

  if (!Array.isArray(data)) {
    console.error('Data is not an array.');
    return false;
  }

  return data.every(validateNode);
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
