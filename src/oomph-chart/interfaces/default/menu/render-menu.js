export function createDropdownMenu(menu, data, menuHandler, menuText) {
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

export function createRadioButtons(menu, data, menuHandler, menuText) {
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

export function createRectangularButtons(menu, data, menuHandler, menuText) {
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

export function createArrowButtons(menu, data, menuHandler, menuText) {
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

export function getMenuText(data, menuText) {
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
export function createTabs(menu, data, menuHandler, menuText) {
  const sortingOptions = getMenuText(data, menuText);

  const tabContainer = d3.select(menu);

  tabContainer
    .selectAll('div')
    .data(sortingOptions)
    .enter()
    .append('div')
    .attr('class', 'tab')
    .text((d) => d.text)
    .on('click', function () {
      const selectedOption = d3.select(this).attr('value');
      menuHandler(selectedOption);
      d3.selectAll('.tab').classed('active', false);
      d3.select(this).classed('active', true);
    })
    .attr('value', (d) => d.value)
    .style('width', `${100 / sortingOptions.length}%`)
    .style('text-align', 'center')
    .style('display', 'inline-block')
    .style('border', '1px solid black')
    .style('border-bottom', 'none')
    .style('border-radius', '5px 5px 0 0')
    .style('padding', '10px')
    .style('background-color', '#ddd')
    .style('cursor', 'pointer');

  // Add an active class for the selected tab
  const activeTabStyle = {
    'background-color': '#fff',
    'border-bottom': '1px solid #fff',
  };

  d3.selectAll('.tab.active').styles(activeTabStyle);
}
