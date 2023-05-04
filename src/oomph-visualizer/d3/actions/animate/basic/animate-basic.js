import onHover from '../../on-hover';
import relativeNode from '../../relative-node'; // TODO: incorporate this
import animateScatter from './animate-scatter';
import animateLine from './animate-line';
import animateArea from './animate-area';
import animateBar from './animate-bar';
import animatePie from './animate-pie';
import animateDonut from './animate-donut';
import animateFunnel from './animate-funnel';
import animateStacked from './animate-stacked';

export default function addAnimation(selector, data, options, chartComponents, duration = 1000) {
  setTimeout(() => {
    const chart = d3.select(selector);

    chart.select('.x-axis')
      .transition()
      .duration(duration)
      .call(chartComponents.xAxis);

    chart.select('.y-axis')
      .transition()
      .duration(duration)
      .call(chartComponents.yAxis);

    let chartElements = chart.selectAll('g rect, g circle, .line-graph0, .area-chart0, path');
    // if (options.updating) {
    //   chartElements = d3.selectAll(`svg.${options.chartClass} circle, arc, rect, path, line, polygon, node`);
    // }
    // Calculate the difference between the length of the new dataset and the number of elements
    // in the initial chart
    let numPlaceholders = data.length - chartElements.size();
    console.log('SELECTED ELEMENTS', options, chartElements.nodes()[0], chartElements);
    if (numPlaceholders > 0) {
      while (numPlaceholders > 0) {
        const selectedElement = chartElements.nodes()[0];
        // Clone the element
        const clonedElement = selectedElement.cloneNode(true);

        // Append the cloned element to the chart
        const g = chart.select('g');

        // Append the cloned element to the g group
        g.node().appendChild(clonedElement);
        numPlaceholders -= 1;
      }
    } else if (numPlaceholders < 0) {
      const nodes = chartElements.nodes();

      while (numPlaceholders < 0) {
        const selectedElement = nodes.pop();
        // Remove the selected element from the chart
        selectedElement.remove();
        numPlaceholders++;
      }
    }
    chartElements = chart.selectAll('g rect, g circle, .line-graph0, .area-chart0, path').data(data);

    const sortedData = data.slice().sort((a, b) => d3.ascending(a.x, b.x));
    const type = chartElements.nodes()[0].className.baseVal || (chartElements.nodes()[0].nodeName === 'path' && 'pie-chart0');
    console.log('TYPE', type);
    // Update the area chart separately
    switch (type) {
      case 'bar-chart0': animateBar(chartElements, data, chartComponents, options, duration);
        break;
      case 'scatter-plot0': animateScatter(chartElements, data, chartComponents, duration);
        break;
      case 'line-graph0': animateLine(chartElements, sortedData, chartComponents, duration);
        break;
      case 'area-chart0': animateArea(chart, sortedData, chartComponents, options, duration);
        break;
      case 'pie-chart0': animatePie(chartComponents, data, duration, options);
        break;
      case 'donut-chart0': animateDonut(chartComponents, data, duration, options);
        break;
      case 'funnel-chart0': animateFunnel(chartComponents, data, duration, options);
        break;
      case 'stacked-bar-chart0': animateStacked(chartComponents, data, duration, options);
        break;
      default: console.log('No animation for this chart type');
    }

    if (!options.yLine) {
      chart.select('.y-axis path').remove();
    }
    if (!options.xLine) {
      chart.select('.x-axis path').remove();
    }

    if (options.onHover) {
      onHover(selector, [options]);
    }
  }, duration);
}
