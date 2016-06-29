'use strict';
var path = require('path');

class Config {
    get(base, cwd) {
        var baseConfig = require(path.join(base, 'murdoc.js'));
        var customConfig;

        try {
            customConfig = require(path.join(cwd, 'murdoc.js'));
            for (var key in customConfig) {
                var value = customConfig[key];
                baseConfig[key] = value;
            }
        } catch(err) {}

        return baseConfig;
    }
}

module.exports = new Config();
