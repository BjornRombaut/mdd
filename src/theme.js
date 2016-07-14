'use strict';

const fs = require('fs');
const path = require('path');
const themes = {
    red: {
        base: '#fff',
        baseText: '#999',
        primary: '#ef4a4a',
        primaryText: '#fff',
        subtleBackground: '#f5f5f5',
        subtleBorder: '#E5E5E5'
    },
    yellow: {
        primary: '#f2d729'
    },
    blue: {
        primary: '#28c5ed'
    },
    green: {
        primary: '#28ef85'
    }
}

class Theme {
    generate(cfg) {
        var fileContent = fs.readFileSync(path.join(__dirname, 'static/mdd.css'),  {encoding: 'utf8'});
        var baseTheme = themes.red;
        var currentTheme;
        if (typeof cfg.theme === 'string') {
            currentTheme = themes[cfg.theme];
        } else {
            currentTheme = cfg.theme;
        }

        for (var key in currentTheme) {
            var value = currentTheme[key];
            baseTheme[key] = value;
        }

        fileContent = fileContent.replace(/\$baseText/g, baseTheme.baseText);
        fileContent = fileContent.replace(/\$base/g, baseTheme.base);
        fileContent = fileContent.replace(/\$primaryText/g, baseTheme.primaryText);
        fileContent = fileContent.replace(/\$primary/g, baseTheme.primary);
        fileContent = fileContent.replace(/\$subtleBackground/g, baseTheme.subtleBackground);
        fileContent = fileContent.replace(/\$subtleBorder/g, baseTheme.subtleBorder);

        return fileContent;
    }
}

module.exports = new Theme();
