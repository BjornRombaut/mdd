'use strict';

var express = require('express');
var livereload = require('livereload');
var fs = require('fs');
var path = require('path');
var menu = require('./menu');
var html = require('./html');
var files = require('./files');
var app = express();

class Server {
    start(cfg, cwd) {
        app.get('/mdc.css', function(req, res) {
            res.sendFile(path.join(__dirname, 'static', 'mdc.css'));
        });

        app.get('/mdc.js', function(req, res) {
            res.sendFile(path.join(__dirname, 'static', 'mdc.js'));
        });

        app.get('*', function(req, res) {
            var requestedFile;
            var isIndex = req.url === '/';
            for (var file of files.get(cfg, cwd)) {
                var url = file.replace(path.join(cwd, cfg.src, '/'), '').replace('.md', '');
                url = cfg.mapUrl(url);
                if (req.url === path.join('/' + url)) {
                    requestedFile = file;
                    break;
                }
            }
            if (isIndex) {
                requestedFile = path.join(cwd, 'README.md');
            }

            var content;
            var appMenu = menu.create(cfg, cwd);
            var activeUrl;
            var message = '';

            if (requestedFile) {
                activeUrl = requestedFile.replace(path.join(cwd, cfg.src, '/'), '').replace('.md', '');
                activeUrl = cfg.mapUrl(activeUrl);
            }

            var menuHTML = html.getMenu(appMenu, activeUrl);

            if (requestedFile) {
                try {
                    if (fs.statSync(requestedFile)) {
                        var contentHTML = html.getContent(requestedFile);

                        content = html.get(cfg, cwd, {
                            livereload: true,
                            content: contentHTML,
                            menu: menuHTML,
                            isIndex: isIndex
                        });
                    }
                } catch(err) {
                    console.log(err);
                    message = '<h1>Oops, something went wrong!</h1><p>' + err + '</p>';
                }
            }

            if (!content) {
                if (!message) {
                    message = '<h1>These are not the docs you\'re looking for..</h1><p>Seems like we can\'t find the docs for the URL you requested (' + req.url + ').</p>';
                }
                content = html.get(cfg, cwd, {
                    livereload: true,
                    content: message,
                    menu: menuHTML
                });
            }

            res.send(content);
        });

        app.listen(cfg.port);
        console.log('mdc server started at port', cfg.port);
        console.log('Livereload server started at port', cfg.livereload);
        var server = livereload.createServer({
            exts: ['md'],
            port: cfg.livereload
        });
        server.watch(cwd);
    }
}

module.exports = new Server();
