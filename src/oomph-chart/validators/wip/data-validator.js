function dataValid(data) {
// BAR CHART DATA VALIDATION
  if (!Array.isArray(data) || !data.every((d) => 'category' in d && 'value' in d)) {
    throw new Error('Invalid data format. Data should be an array of objects with "category" and "value" properties.');
  }
}
