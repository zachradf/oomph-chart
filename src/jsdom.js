const { JSDOM } = require('jsdom');

// const htmlString = '<html><body><div id="my-div">Hello, world!</div></body></html>';
const htmlString = `
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
  </head>
  <body>
    <div class="testClass" id="chart">hello</div>
  </body>
</html>`;
const jsdom = new JSDOM(htmlString);

const document = jsdom.window.document;
const myDiv = document.querySelector('#chart');

console.log(myDiv.textContent); // Output: "Hello, world!"

