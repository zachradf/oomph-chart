export default function addSorting(chartSelector, data, options) {
  const chart = document.querySelector(chartSelector);
  const sortDropdown = document.createElement('div');
  sortDropdown.id = 'sort-dropdown';
  chart.appendChild(sortDropdown);
  const dropdown = d3.select('#sort-dropdown')
    .append('select')
    .on('change', function () {
      const selectedOption = this.value;
      sortChart(chartSelector, data, selectedOption, options);
    });

  const sortingOptions = [
    { value: 'name', text: 'Name' },
    { value: 'value', text: 'Value' },
  ];

  dropdown
    .selectAll('option')
    .data(sortingOptions)
    .enter()
    .append('option')
    .attr('value', (d) => d.value)
    .text((d) => d.text);
}

function sortChart(chartSelector, data, sortBy, options) {
  const svg = d3.select(chartSelector).select('svg');
  const g = svg.select('g');

  data.sort((a, b) => {
    if (sortBy === 'name') {
      return d3.ascending(a.name, b.name);
    }
    return d3.descending(a.value, b.value);
  });

  const x = d3.scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, options.width - options.margin.left - options.margin.right])
    .padding(0.1);

  g.selectAll('rect')
    .data(data)
    .transition()
    .duration(750)
    .attr('x', (d) => x(d.name));
}
