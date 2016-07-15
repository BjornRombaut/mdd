'use strict';
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const files = require('./files');
const menu = require('./menu');
const html = require('./html');
const theme = require('./theme');

function writeToFile(file, content) {
    var dir = file.substr(0, file.lastIndexOf('/'))
    mkdirp.sync(dir);
    fs.writeFileSync(file, content);
}

function clearFolder(path) {
    if (path !== '/') {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    clearFolder(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
}

class Build {
    run(cfg, cwd) {
        var appMenu = menu.create(cfg, cwd);
        clearFolder(path.join(cwd, cfg.dst));

        // Build HTML
        for (var file of files.get(cfg, cwd)) {
            if (file.indexOf('node_modules') === -1) {
                var isIndex = false;
                var url = file.replace(path.join(cwd, cfg.src, '/'), '').replace('.md', '');
                url = url.replace(/\s+/g, '-').toLowerCase();
                url = cfg.mapUrl(url);
                if (url === 'readme') {
                    url = '';
                    isIndex = true;
                }
                var shortFileName = url + '/index.html';
                var menuHTML = html.getMenu(appMenu, url);
                var contentHTML = html.getContent(file);
                var content = html.get(cfg, cwd, {
                    livereload: false,
                    content: contentHTML,
                    menu: menuHTML,
                    isIndex: isIndex
                });
                var fullFileName = path.join(cwd, cfg.dst, shortFileName);
                writeToFile(fullFileName, content);
            }
        }

        // Build Theme
        var themeContent = theme.generate(cfg);
        var themePath = path.join(cwd, cfg.dst, 'static/mdd.css');
        writeToFile(themePath, themeContent);

        // Build JS
        var jsContent = fs.readFileSync(path.join(__dirname, 'static/mdd.js'));
        var jsPath = path.join(cwd, cfg.dst, 'static/mdd.js');
        writeToFile(jsPath, jsContent);
    }
}

module.exports = new Build();
