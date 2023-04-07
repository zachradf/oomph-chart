export default function addHoverEffects(selector) {
  const bars = d3.select(selector).selectAll('rect');//generalize this to work on all nodes/bars 

  bars
    .on('mouseover', function () {
      d3.select(this).attr('fill', 'red');
    })
    .on('mouseout', function () {
      d3.select(this).attr('fill', options.color);
    });
}
