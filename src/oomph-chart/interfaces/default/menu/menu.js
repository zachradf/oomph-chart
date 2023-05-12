import * as render from './render-menu';

export default function addMenu(chartObject, chartSelector, data, options, menuText = []) {
  const chart = document.querySelector(chartSelector);
  let wrapper = chart.querySelector('.chart-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'chart-wrapper';
    wrapper.style.position = 'relative';
    chart.appendChild(wrapper);
    const svgElement = chart.querySelector('svg');
    wrapper.appendChild(svgElement);
  }

  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.style.position = 'relative';
  menu.style.zIndex = 10;

  wrapper.appendChild(menu);
  const svgElement = chart.querySelector('svg');
  wrapper.appendChild(svgElement);

  const menuHandler = (selectedOption) => {
    updateChart(chartObject, selectedOption, data, options);
  };
  let sortingOptions;
  if (menuText.length !== data.length) {
    sortingOptions = data.map((_, index) => ({
      value: index,
      text: `Data Set ${index + 1}`,
    }));
  } else {
    sortingOptions = data.map((_, index) => ({
      value: index,
      text: menuText[index],
    }));
  }

  if (options[0].menu === 'radio') {
    render.createRadioButtons(menu, data, menuHandler, menuText);
  } else if (options[0].menu === 'dropdown') {
    render.createDropdownMenu(menu, data, menuHandler, menuText);
  } else if (options[0].menu === 'rectangular') {
    render.createRectangularButtons(menu, data, menuHandler, menuText);
  } else if (options[0].menu === 'arrows') {
    render.createArrowButtons(menu, data, menuHandler, menuText, sortingOptions);
  } else if (options[0].menu === 'tabs') {
    render.createTabs(menu, data, menuHandler, menuText);
  } else {
    console.error(`Invalid menu type: ${options.menu}`);
  }
}

function updateChart(chartObject, sortBy, data, options) {
  console.log('in the updateChart function');
  const sortByIndex = parseInt(sortBy, 10);

  if (!Array.isArray(options)) {
    chartObject.removeChart(options[0].chartType);
    chartObject.updateInput([data[sortByIndex]], [options[sortByIndex]]);
  } else {
    chartObject.updateInput([data[sortByIndex]], [options[sortByIndex]]);
  }
  // Update the chart with the selected dataset

  console.log(data);
}
