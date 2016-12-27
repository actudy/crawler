var fs = require('fs');
var args = fs.readFileSync('args.json', 'utf8');

console.log(args);
