const fs = require('fs')
const fetch = require('fetch').fetchUrl
const path = require('path')
const main = function(scenexe2) {
  let options = {
    parentPort: {
      postMessage: function() {}
    },
    port: 3000,
    testing: 1,
    start: `load('./d-2teams.js')`,
    secret: {
      p1: process.env.token,
    },
    standalone: 1
  }
  let data = scenexe2.run(options)
}

const localFilePath = path.join(__dirname, 'scenexe2.js');
​
fs.readFile(localFilePath, 'utf8', (err, fileContent) => {
  if (err) {
    console.error('Error reading local file:', err);
    return;
  }
​
  let __module__ = {
    exports: {}
  };
​
  let s = fileContent.toString().replace(`module`, `__module__`);
  eval(s);
​
  main(__module__.exports);
});
