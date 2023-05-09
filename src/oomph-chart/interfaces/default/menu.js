export default function addMenu(chartObject, chartSelector, data, options, menuText = []) {
  const chart = document.querySelector(chartSelector);
  let wrapper = chart.querySelector('.chart-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'chart-wrapper';
    wrapper.style.position = 'relative';
    chart.appendChild(wrapper);
    const svgElement = chart.querySelector('svg');
    // chart.removeChild(svgElement);
    wrapper.appendChild(svgElement);
  }

  const menu = document.createElement('div');
  menu.id = 'menu';
  menu.style.position = 'relative';
  menu.style.zIndex = 10;

  wrapper.appendChild(menu);
  const svgElement = chart.querySelector('svg');
  // chart.removeChild(svgElement);
  wrapper.appendChild(svgElement);

  const menuHandler = (selectedOption) => {
    sortChart(chartObject, selectedOption, data, options, chartSelector);
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
    createRadioButtons(menu, data, menuHandler, menuText);
  } else if (options[0].menu === 'dropdown') {
    createDropdownMenu(menu, data, menuHandler, menuText);
  } else if (options[0].menu === 'rectangular') {
    createRectangularButtons(menu, data, menuHandler, menuText);
  } else if (options[0].menu === 'arrows') {
    createArrowButtons(menu, data, menuHandler, menuText, sortingOptions);
  } else {
    console.error(`Invalid menu type: ${options.menu}`);
  }
}

function sortChart(chartObject, sortBy, data, options, chartSelector) {
  // const svg = d3.select(chartSelector).select('svg');
  // const g = svg.select('g');
  console.log('in the sortChart function');
  const sortedData = data[0].slice().sort((a, b) => a.y - b.y);
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
function createDropdownMenu(menu, data, menuHandler, menuText) {
  const sortingOptions = getMenuText(data, menuText);

  const dropdown = d3.select(menu)
    .append('select')
    .on('change', function () {
      const selectedOption = this.value;
      menuHandler(selectedOption);
    });

  dropdown
    .selectAll('option')
    .data(sortingOptions)
    .enter()
    .append('option')
    .attr('value', (d) => d.value)
    .text((d) => d.text);
}

function getMenuText(data, menuText) {
  if (menuText.length !== data.length) {
    return data.map((_, index) => ({
      value: index,
      text: `Data Set ${index + 1}`,
    }));
  }
  return data.map((_, index) => ({
    value: index,
    text: menuText[index],
  }));
}

function createRadioButtons(menu, data, menuHandler, menuText) {
  const sortingOptions = getMenuText(data, menuText);

  const radioButtonContainer = d3.select(menu);

  radioButtonContainer
    .selectAll('input')
    .data(sortingOptions)
    .enter()
    .append('label')
    .text((d) => d.text)
    .append('input')
    .attr('type', 'radio')
    .attr('name', 'sortingOptions')
    .attr('value', (d) => d.value)
    .on('change', function () {
      const selectedOption = this.value;
      menuHandler(selectedOption);
    });
}

function createRectangularButtons(menu, data, menuHandler, menuText) {
  const sortingOptions = getMenuText(data, menuText);

  const buttonContainer = d3.select(menu);

  buttonContainer
    .selectAll('button')
    .data(sortingOptions)
    .enter()
    .append('button')
    .attr('class', 'rectangular-button')
    .text((d) => d.text)
    .on('click', function () {
      const selectedOption = d3.select(this).attr('value');
      menuHandler(selectedOption);
    })
    .attr('value', (d) => d.value);
}

function createArrowButtons(menu, data, menuHandler, menuText) {
  const sortingOptions = getMenuText(data, menuText);

  let currentIndex = 0;

  const updateMenu = (direction) => {
    currentIndex += direction;
    if (currentIndex < 0) {
      currentIndex = data.length - 1;
    } else if (currentIndex >= data.length) {
      currentIndex = 0;
    }
    menuHandler(currentIndex);
    menuTextSpan.text(sortingOptions[currentIndex].text);
  };

  const arrowButtonContainer = d3.select(menu);

  arrowButtonContainer
    .append('button')
    .attr('class', 'arrow-button left')
    .text('<')
    .on('click', () => updateMenu(-1));
  const menuTextSpan = arrowButtonContainer
    .append('span')
    .attr('class', 'menu-text')
    .text(sortingOptions[currentIndex].text);

  arrowButtonContainer
    .append('button')
    .attr('class', 'arrow-button right')
    .text('>')
    .on('click', () => updateMenu(1));
}
