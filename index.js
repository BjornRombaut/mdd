#!/usr/bin/env node
'use strict';
var path = require('path');
var config = require('./src/config');
var server = require('./src/server');
var build = require('./src/build');

function start() {
    var base = __dirname;
    var cwd = process.cwd();
    var cfg = config.get(base, cwd);
    server.start(cfg, cwd);
}

function startBuild() {
    var base = __dirname;
    var cwd = process.cwd();
    var cfg = config.get(base, cwd);
    build.run(cfg, cwd);
}

if (process.argv[2] == 'build') {
    startBuild();
} else {
    start();
}
