import onHover from '../../on-hover';
import relativeNode from '../../relative-node';
import gradient from '../../gradient';
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
    console.log('options.chartClass', options.chartClass);
    const chart = d3.select(selector);
    const nonAxialCharts = ['voronoi', 'treeMap', 'treeDiagram', 'radialTree', 'icicle', 'polar', 'radar', 'pie', 'donut', 'heatmap', 'bubble', 'sun', 'chord', 'cloud', 'cluster', 'dendrogram', 'sankey'];
    if (!nonAxialCharts.includes(`${options.chartClass}`)) {
      chart.select('.x-axis')
        .transition()
        .duration(duration)
        .call(chartComponents.xAxis);

      chart.select('.y-axis')
        .transition()
        .duration(duration)
        .call(chartComponents.yAxis);
    }
    // const elements = chart.selectAll('g rect, g circle, .line, #line0, #area0, path');
    const elements = chart.selectAll(`.${options.chartClass}0`);
    const excludedElements = d3.selectAll('.shape-label, .shape-pointer');

    let chartElements = elements.filter(function () {
      const currentElement = d3.select(this);
      return !excludedElements.nodes().includes(currentElement.node());
    });
    console.log('chartElements should exclude pointer', options.chartClass);
    console.log('chartType', chartElements);

    const type = chartElements.nodes()[0].className.baseVal;
    // || (chartElements.nodes()[0].nodeName === 'path' && 'pie-chart0');
    const sortedData = data.slice().sort((a, b) => d3.ascending(a.x, b.x));

    if (type === 'area0' || type === 'line0') {
      if (type === 'area0') {
        animateArea(chart, sortedData, chartComponents, options, duration);
        return;
      }
      animateLine(chartElements, sortedData, chartComponents, duration);
      return;
    }

    let numPlaceholders = data.length - chartElements.size();
    console.log('above placeholders', numPlaceholders, data.length, chartElements.size(), chartElements);
    if (numPlaceholders > 0) {
      while (numPlaceholders > 0) {
        const selectedElement = chartElements.nodes()[0];
        // Clone the element
        const clonedElement = selectedElement.cloneNode(true);
        console.log('in placeholders');
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
    chartElements = chart.selectAll('g rect, g circle, .line0, .area0 path, path').data(data);

    console.log('TYPE', type, 'chartElements', chartElements);
    switch (type) {
      case 'bar0': animateBar(chartElements, data, chartComponents, options, duration);
        break;
      case 'scatter0': animateScatter(chartElements, data, chartComponents, duration);
        break;
      case 'pie0': animatePie(chartComponents, data, duration, options);
        break;
      case 'donut0': animateDonut(chartComponents, data, duration, options);
        break;
      case 'funnel0': animateFunnel(chartComponents, data, duration, options);
        break;
      case 'stackedbar0': animateStacked(chartComponents, data, duration, options);
        break;
      default: console.log('No animation for this chart type', type);
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
    if (options.relativeNode) {
      relativeNode(selector, data, options);
    }
    if (options.gradient) {
      gradient(selector, options.gradientColor[0], options.gradientColor[1], type, options.gradientAxis, data);
    }
  }, duration);
}
