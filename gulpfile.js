var init = require('./build/gulpfile.init');
var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');
init();
prod();
dev();