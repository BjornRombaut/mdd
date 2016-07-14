#!/usr/bin/env node
'use strict';
var path = require('path');
var config = require('./src/config');
var server = require('./src/server');

function start() {
    var base = __dirname;
    var cwd = process.cwd();
    var cfg = config.get(base, cwd);
    server.start(cfg, cwd);
}

start();
