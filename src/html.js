'use strict';
var marked = require('marked');
var fs = require('fs');
var path = require('path');

class HTML {
    get(cfg, cwd, options) {
        var app = '<html><head>';
        app += '<title>' + cfg.name + '</title>'
        app += '<meta name="viewport" content="width=device-width, initial-scale=1">'
        app += '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/github-gist.min.css">'
        app += '<link rel="stylesheet" href="/murdoc.css">'
        if (!options.isIndex) {
            app += '</head><body>';
        } else {
            app += '</head><body class="body--index">';
        }
        app += '<nav class="sidebar"><div class="header"><input class="search" placeholder="Search" id="search" type="text"></div>' + options.menu + '</nav>';
        app += '<section class="content"><div class="header"><a href="/">' + cfg.name + '</a></div><div class="wrapper"><div class="doc">' + options.content + '</div></div></section>';
        app += '<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/highlight.min.js"></script>';
        app += '<script src="/murdoc.js"></script>';
        if (options.livereload) {
            app += '<script src="http://localhost:' + cfg.livereload + '/livereload.js?snipver=1"></script>';
        } else {
            app += '</body></html>';
        }

        return app;
    }


    getMenu(menu, url) {
        var menuList = '<ul class="menu">';
        function getMenuList(currentMenu) {
            for (var menuItem in currentMenu) {
                if (menuItem !== '__files__') {
                    menuList += '<li class="menu__item"><span class="menu__text">' + menuItem.replace(/-/g, ' ') + '</span><ul class="menu__sub">';
                    getMenuList(currentMenu[menuItem]);
                    menuList += '</ul></li>';
                }
            }
            if (currentMenu && currentMenu.__files__) {
                for (var file of currentMenu.__files__) {
                    if (url === file.file) {
                        menuList += '<li class="menu__item menu__item--active"><a href="/' + file.file.replace('.md', '') + '" class="menu__link">' + file.name.replace(/-/g, ' ') + '</a></li>';
                    } else {
                        menuList += '<li class="menu__item"><a href="/' + file.file.replace('.md', '') + '" class="menu__link">' + file.name.replace(/-/g, ' ') + '</a></li>';
                    }
                }
            }
        }
        getMenuList(menu);
        menuList += '</ul>';
        return menuList;
    }

    getContent(filename) {
        var md = marked(fs.readFileSync(filename, {encoding: 'utf8'}));
        md.replace(/class=\"lang-/g, '');
        return md;
    }
}

module.exports = new HTML();
