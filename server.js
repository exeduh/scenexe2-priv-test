const fs = require('fs')
const fetch = require('fetch').fetchUrl

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

fetch('https://beta-scenexe2.glitch.me/scenexe2.js', function(a, b, c) {
  let __module__ = {
    exports: {}
  }
  let s = c.toString().replace(`module`, `__module__`)
  eval(s)
  main(__module__.exports)
})
