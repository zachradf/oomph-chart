export default function onHover(selector, options) {
  options.forEach((option, i) => {
    // Select all the elements (rect, node, leaf, link, circle) with the specified chartType class
    const elements = d3.selectAll(`circle.${option.chartClass}${i}, rect.${option.chartClass}${i}, .node.${option.chartClass}${i}, .leaf.${option.chartClass}${i}, .link.${option.chartClass}${i}, .box-rect, .arc, path.${option.chartClass}${i}, svg.pie-chart path`);
    // console.log('IN ON HOVER', options[0], elements);

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('color', '#fff')
      .style('padding', '5px 15px')
      .style('border', '1px solid black')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('z-index', '10')
      .style('display', 'none');

    elements.each(function () {
      // console.log(option.onHover);
      // console.log(this);
      if (option.onHover) {
        const el = d3.select(this);
        // Store the initial fill style value in a custom data attribute
        el.attr('data-initialFill', el.style('fill'))
          .on('mouseover', () => {
            if (option.onHover) {
              console.log('hovering');
              // Store the initial transform attribute to reset it later
              const initialTransform = el.attr('transform') || '';
              const initialFill = el.attr('data-initialFill');
              const fillColor = d3.color(initialFill);
              // Update tooltip content and position
              tooltip.html(`Data: ${JSON.stringify(el.datum())}`)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY + 10}px`)
                .style('display', 'block');

              // Set the fill style to the desired hover color or 4 shades darker than the initial fill color
              el.style('fill', option.hoverColor || fillColor.darker(4));
              // Apply the scaling transformation to expand the element
              // el.attr('transform', `${initialTransform} scale(1.05)`);
            }
          })
          // #! Thank you to Sanket from Perials for the mousemove and tooltip styling code
          .on('mousemove', () => {
            tooltip
              .style('top', `${event.pageY - 10}px`)
              .style('left', `${event.pageX + 10}px`);
          })
          .on('mouseout', function () {
          // Restore the fill style to the initial fill value
            const initialFill = d3.select(this).attr('data-initialFill');
            const initialTransform = el.attr('data-initialTransform') || '';

            // Reset the element's fill color and transform attribute
            el.style('fill', initialFill)
              .attr('transform', initialTransform);
            d3.select(this).style('fill', initialFill);
            // Hide the tooltip
            tooltip.style('display', 'none');
          });
      }
    });
  });
}
