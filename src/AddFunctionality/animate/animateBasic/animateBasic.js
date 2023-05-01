import onHover from '../../onHover';
import relativeNode from '../../relativeNode'; // TODO: incorporate this
import animateScatter from './animateScatter';
import animateLine from './animateLine';
import animateArea from './animateArea';
import animateBar from './animateBar';
import animatePie from './animatePie';
import animateDonut from './animateDonut';
import animateFunnel from './animateFunnel';
import animateStacked from './animateStacked';

export default function addAnimation(selector, data, options, generalElements, duration = 1000) {
  setTimeout(() => {
    const chart = d3.select(selector);

    chart.select('.x-axis')
      .transition()
      .duration(duration)
      .call(generalElements.xAxis);

    chart.select('.y-axis')
      .transition()
      .duration(duration)
      .call(generalElements.yAxis);

    let chartElements = chart.selectAll('g rect, g circle, .line-graph0, .area-chart0, path');
    
    // Calculate the difference between the length of the new dataset and the number of elements in the initial chart
    let numPlaceholders = data.length - chartElements.size();
    // console.log('SELECTED ELEMENTS', chartElements.nodes()[0].className.baseVal);
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
        numPlaceholders += 1;
      }
    }
    chartElements = chart.selectAll('g rect, g circle, .line-graph0, .area-chart0, path').data(data);

    const sortedData = data.slice().sort((a, b) => d3.ascending(a.x, b.x));
    const type = chartElements.nodes()[0].className.baseVal || (chartElements.nodes()[0].nodeName === 'path' && 'pie-chart0');
    console.log('TYPE', type);
    // Update the area chart separately
    const typeObject = {
      'bar-chart0': animateBar(chartElements, data, generalElements, options, duration),
      'scatter-plot0': animateScatter(chartElements, data, generalElements, duration),
      'line-graph0': animateLine(chartElements, sortedData, generalElements, duration),
      'area-chart0': animateArea(chart, sortedData, generalElements, options, duration),
      'pie-chart0': animatePie(generalElements, data, duration, options),
      'donut-chart0': animateDonut(generalElements, data, duration, options),
      'funnel-chart0': animateFunnel(generalElements, data, duration, options),
      'stacked-bar-chart0': animateStacked(generalElements, data, duration, options),
    };

    typeObject[type]();

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
