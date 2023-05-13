import * as render from './render-shape.js';

export default function createDraggableShape(options, svg) {
  const {
    scale, shapeType, labelText, initialX, initialY, rotation,
  } = options;
  const stemLength = options.stemLength || 5;
  const shapeCreators = {
    arrow: render.arrow,
    circle: render.circle,
    ellipse: render.ellipse,
    rectangle: render.rectangle,
    ring: render.ring,
  };
  const shape = shapeCreators[shapeType](svg, options);

  shape.classed('shape-pointer', true);

  // Create the label
  const label = svg.append('text')
    .text(labelText)
    .attr('text-anchor', 'middle')
    .attr('dy', options.shapeLabelOffsetY || '-1em')
    .attr('font-size', options.shapeFontSize || '12px')
    .attr('font-family', options.shapeFontFamily || 'Arial')
    .attr('fill', options.shapeLabelColor || 'black')
    .classed('shape-label', true);

  // Initial position and rotation
  const transformAttr = `translate(${initialX}, ${initialY}) rotate(${rotation || 0}, ${scale ? 5 * scale : 5}, ${stemLength ? (stemLength + 5) / 2 : 5}) scale(${scale || 1})`;
  shape.attr('transform', transformAttr);
  label.attr('x', initialX).attr('y', initialY - 20); // Adjust the Y position to be above the shape

  // // Attach drag behavior
  const drag = d3
    .drag()
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded);
  console.log(drag, 'drag');

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
  }

  function dragEnded() {
    startPosition = { x: initialX, y: initialY };
    setTimeout(() => shape.repeatMovement(), 200);
  }

  // Function to repeat the drag movement as an animation
  shape.repeatMovement = function () {
    if (movement.length === 0) return;

    const intervalDuration = options.repeatInterval || 500;
    let current = startPosition;

    setInterval(() => {
      movement.forEach((delta, index, arr) => {
        setTimeout(() => {
          let translate = `translate(${current.x + 17}, ${current.y - 10}) rotate(${rotation || 0}, ${scale ? 5 * scale : 5}, ${stemLength ? (stemLength + 5) / 2 : 5}) scale(${scale || 1})`;

          current = { x: current.x + delta.dx, y: current.y + delta.dy };
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
