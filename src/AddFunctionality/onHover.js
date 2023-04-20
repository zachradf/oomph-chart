import * as d3 from 'd3';

export default function onHover(selector, options) {
  console.log(selector);
  console.log(options);
  options.forEach((option, i) => {
    console.log(option.chartClass);

    // Select all the elements (rect, node, leaf, link, circle) with the specified chartType class
    const elements = d3.selectAll(`circle.${option.chartClass}${i}, rect.${option.chartClass}${i}, .node.${option.chartClass}${i}, .leaf.${option.chartClass}${i}, .link.${option.chartClass}${i}`);
    console.log(elements);

    elements.each(function() {
      const el = d3.select(this);
      // Store the initial fill style value in a custom data attribute
      el.attr('data-initialFill', el.style('fill'));
    })
    .on('mouseover', function () {
      console.log('hovering');
      const el = d3.select(this);
      const initialFill = el.attr('data-initialFill');
      const fillColor = d3.color(initialFill);

      // Set the fill style to the desired hover color or 4 shades darker than the initial fill color
      el.style('fill', option.hoverColor || fillColor.darker(4));
    })
    .on('mouseout', function () {
      // Restore the fill style to the initial fill value
      const initialFill = d3.select(this).attr('data-initialFill');
      d3.select(this).style('fill', initialFill);
    });
  });
}
