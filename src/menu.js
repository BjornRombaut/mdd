'use strict';
var path = require('path');
var files = require('./files');

class Menu {
    create(cfg, cwd) {
        var menu = {};
        var safety = 0;

        function mergeFileStructure(menu, url, file) {
            var current = url.split('/')[0];

            if (url.indexOf('/') > -1) {
                if (!menu[current]) {
                    menu[current] = {};
                }
                mergeFileStructure(menu[current], url.replace(current + '/', ''), file);
            } else {
                if (!menu.__files__) {
                    menu.__files__ = [];
                }
                menu.__files__.push({
                    file: file,
                    name: current
                });
            }

            return menu;
        }

        for (var file of files.get(cfg, cwd)) {
            var url = file.replace(path.join(cwd, cfg.src, '/'), '').replace('.md', '');
            url = url.replace(/\s+/g, '-').toLowerCase();
            url = cfg.mapUrl(url);
            menu = mergeFileStructure(menu, url, url, file);
        }

        return menu;
    }
}

module.exports = new Menu();
