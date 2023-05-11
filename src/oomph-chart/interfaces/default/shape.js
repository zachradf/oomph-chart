export default function createDraggableShape(options, svg) {
  const {
    scale, shapeType, fillColor, labelText, initialX, initialY, rotation,
  } = options;
  let shape;
  //   let scale;
  const stemLength = options.stemLength || 5;
  const arrowWidth = 100;
  const arrowHeight = options.arrowHeight || 10;
  if (shapeType === 'arrow') {
    const arrowPoints = `M0,${arrowHeight / 2} L${stemLength},${arrowHeight / 2} L${stemLength},0 L${stemLength + arrowWidth}, ${arrowHeight / 2} L${stemLength},${arrowHeight} L${stemLength},${arrowHeight / 2} Z`;

    shape = svg
      .append('path')
      .attr('d', arrowPoints)
      .attr('fill', fillColor);
  } else if (shapeType === 'ring') {
    const arcGenerator = d3.arc()
      .innerRadius(options.innerRadius || 10)
      .outerRadius(options.outerRadius || 20)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    shape = svg
      .append('path')
      .attr('d', arcGenerator())
      .attr('fill', fillColor);
  } else if (shapeType === 'circle') {
    shape = svg
      .append('circle')
      .attr('r', options.radius) // You can adjust the radius here or add it as an option
      .attr('fill', fillColor)
      .attr('opacity', options.opacity || 1);
  }
  shape.classed('shape-pointer', true);
  // Other shapes can be added here

  // Create the label
  const label = svg.append('text')
    .text(labelText)
    .attr('text-anchor', 'middle')
    .attr('dy', '-1em') // Adjust the vertical offset of the label relative to the shape
    .classed('shape-label', true);

  // Initial position and rotation
  const transformAttr = `translate(${initialX}, ${initialY}) rotate(${rotation || 0}, ${scale ? 5 * scale : 5}, ${stemLength ? (stemLength + 5) / 2 : 5}) scale(${scale || 1})`;

  //   if (shapeType === 'arrow' && stemLength) {
  //     arrowHead.attr('transform', transformAttr);
  //   }
  //   const transform = `translate(${initialX}, ${initialY}) rotate(${rotation || 0}, 0, 0)`;
  shape.attr('transform', transformAttr);
  //   //   shape.attr('transform', transform);
  label.attr('x', initialX).attr('y', initialY - 20); // Adjust the Y position to be above the shape
  const drag = d3
    .drag()
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded);

  shape.call(drag);

  let startPosition = {};
  let movement = [];

  function dragStarted(event, d) {
    startPosition = { x: event.x, y: event.y };
    movement = [];
  }

  function dragged(event, d) {
    let dragTimeout;
    const translate = `translate(${event.x}, ${event.y}) rotate(${rotation || 0}, ${scale ? 5 * scale : 5}, ${stemLength ? (stemLength + 5) / 2 : 5}) scale(${scale || 1})`;
    shape.attr('transform', translate);
    label.attr('x', event.x).attr('y', event.y - 20);
    if (dragTimeout) {
      clearTimeout(dragTimeout);
    }

    // Set a new timeout to push the coordinates to the movement array after a quarter second
    dragTimeout = movement.push({ dx: event.dx, dy: event.dy });

    // movement.push({ dx: event.dx, dy: event.dy });
  }

  function dragEnded(event, d) {
    startPosition = { x: initialX, y: initialY };
    setTimeout(() => shape.repeatMovement(), 200);
  }

  // Function to repeat the drag movement as an animation
  shape.repeatMovement = function () {
    if (movement.length === 0) return;

    const intervalDuration = options.repeatInterval || 500; // You can control the interval duration by adding a new option 'repeatInterval'
    let current = startPosition;

    setInterval(() => {
      movement.forEach((delta, index, arr) => {
        setTimeout(() => {
          let translate = `translate(${current.x + 17}, ${current.y - 10}) rotate(${rotation || 0}, ${scale ? 5 * scale : 5}, ${stemLength ? (stemLength + 5) / 2 : 5}) scale(${scale || 1})`;

          current = { x: current.x + delta.dx, y: current.y + delta.dy };
          //   shape.attr('transform', `translate(${current.x + 17}, ${current.y - 10})`);
          shape.attr('transform', `${translate}`);

          label.attr('x', current.x + 17).attr('y', current.y - 20);

          // Return to initial coordinates after the animation cycle
          if (index === arr.length - 1) {
            setTimeout(() => {
              translate = `translate(${initialX}, ${initialY}) rotate(${rotation || 0}, ${scale ? 5 * scale : 5}, ${stemLength ? (stemLength + 5) / 2 : 5}) scale(${scale || 1})`;

              shape.attr('transform', `${translate}`);
              label.attr('x', initialX).attr('y', initialY - 20);
              current = { x: initialX, y: initialY };
            }, 9 * (index + 1));
          }
        }, index * 10); // 10ms delay between steps
      });
    }, intervalDuration + (movement.length * 20));
  };
}
