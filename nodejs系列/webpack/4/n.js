const express = require('express');
const server = express();

server.listen('3129');

server.use('',express.static('./'));