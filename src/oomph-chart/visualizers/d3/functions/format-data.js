export function normalizeData(data) {
  // If the data is already an array and each object has a 'category' property, return the data
  if (Array.isArray(data) && data.every((item) => 'name' in item)) {
    console.log('this should exit the normalizeData function');
    return data;
  }

  return data.children.map((child) => {
    const normalizedChild = {
      name: child.name,
      value: child.value || null,
      children: child.children ? child.children.map((subChild) => {
        if (subChild.children) {
          return {
            name: subChild.name,
            value: subChild.value,
            children: subChild.children.map((subSubChild) => ({
              name: subSubChild.name,
              value: subSubChild.value,
            })),
          };
        }
        return {
          name: subChild.name,
          value: subChild.value,
        };
      }) : [],
    };
    return normalizedChild;
  });
}

export function isDataInCorrectFormat(data) {
  return (
    typeof data === 'object'
      && data !== null
      && data.name === 'root'
      && Array.isArray(data.children)
  );
}

function validateChildren(node) {
  // Base case: If the node is a leaf (has no children)
  if (!node.children) {
    // Check if the value is a number
    if (typeof node.value !== 'number') {
      console.error(`Node with name '${node.name}' has a non-numeric value:`, node);
      return false;
    }
    return true;
  }

  // Recursive case: Node has children
  // Use Array.every to ensure all children pass the validation
  return node.children.every(validateChildren);
}

export function hasNonZeroValues(data) {
  // Use Array.every to ensure all top-level nodes pass the validation
  return data.every(validateChildren);
}
