export default function addAnimation(selector, data, options) {
  function customSort(criteria) {
    return (a, b) => {
      switch (criteria) {
        case 'x':
          return (a.x !== undefined && b.x !== undefined) ? a.x - b.x : a.label.localeCompare(b.label);
        case 'y':
          return (a.y !== undefined && b.y !== undefined) ? a.y - b.y : a.value - b.value;
        case 'value':
          return a.value - b.value;
        default:
          throw new Error('Invalid sorting criteria');
      }
    };
  }

  // Sort the data based on the custom sort function
  const sortedData = data.slice().sort(customSort(options.sortBy || 'value'));

  // Hide the data points by setting their opacity to 0
  d3.select(selector)
    // .select('.data-points') // Select the container with the class 'data-points'
    .selectAll('path') // Select only the path elements within the container
    .style('opacity', 0);

// Animate the data points to appear one by one
d3.select(selector)
    // .select('.data-points') // Select the container with the class 'data-points'
    .selectAll('path') // Select only the path elements within the container
    .data(sortedData)
    .transition()
    .duration(options.animationDuration || 200)
    .delay((_, i) => (options.animationDelay || 100) * i)
    .style('opacity', 1);

}
