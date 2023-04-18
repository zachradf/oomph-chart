import * as d3 from 'd3';

export default function addHoverEffects(selector, options = {hoverColor: null}) {
  const elements = d3.select(selector).selectAll('rect, circle, path');

  elements
    .each(function () {
      const el = d3.select(this);
      // Store the initial fill style value in a custom data attribute
      el.attr('data-initialFill', el.style('fill'));
    })
    .on('mouseover', function () {
      const el = d3.select(this);
      const initialFill = el.attr('data-initialFill');
      const fillColor = d3.color(initialFill);

      // Set the fill style to the desired hover color or 4 shades darker than the initial fill color
      el.style('fill', options.hoverColor || fillColor.darker());
    })
    .on('mouseout', function () {
      // Restore the fill style to the initial fill value
      const initialFill = d3.select(this).attr('data-initialFill');
      d3.select(this).style('fill', initialFill);
    });
}
