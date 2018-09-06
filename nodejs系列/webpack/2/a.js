require('./c.js');
require('./a.css');
require('./b.css');

var html = require('./index.html');

document.body.innerHTML = html;

import l from './d.js';

document.getElementById('webpack').innerHTML = 'Hello webpack';

div1.innerHTML = `${l.a}+${l.b}-${l.b}`;