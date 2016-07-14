'use strict';
var marked = require('marked');
var fs = require('fs');
var path = require('path');

class HTML {
    get(cfg, cwd, options) {
        var template = cfg.templateUrl ? path.join(cwd, cfg.templateUrl) : path.join(__dirname, 'templates/' + cfg.template + '.html');
        var html = fs.readFileSync(template, {encoding: 'utf8'});

        var scripts = '<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/highlight.min.js"></script>';
        scripts += '<script src="/static/mdd.js"></script>'
        if (options.livereload) {
            scripts += '<script src="http://localhost:' + cfg.livereload + '/livereload.js?snipver=1"></script>';
        }
        html = html.replace(/#\{SCRIPTS\}/g, scripts);

        var styles = '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/github-gist.min.css">';
        styles += '<link rel="stylesheet" href="/static/mdd.css">';
        html = html.replace(/#\{STYLES\}/g, styles);

        if (!options.isIndex) {
            html = html.replace(/#\{BODY_CLASS\}/g, 'body--' + cfg.template);
        } else {
            html = html.replace(/#\{BODY_CLASS\}/g, 'body--index body--' + cfg.template);
        }

        html = html.replace(/#\{TITLE\}/g, cfg.name);
        html = html.replace(/#\{MENU\}/g, options.menu);
        html = html.replace(/#\{CONTENT\}/g, options.content);
        return html;
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
