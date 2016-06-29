'use strict';
var path = require('path');
var glob = require('glob-concat');

class Files {
    get(cfg, cwd) {
        var files = glob.sync(path.join(cwd, cfg.src, '**/*.md'));
        return files;
    }
}

module.exports = new Files();
