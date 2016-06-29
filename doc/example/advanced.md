# Advanced Example

You can use a custom config with murdoc. For example using the following folder structure:

- src
    - example
        - doc
            - advanced.md
            - basic.md
    - usage
        - doc
            - getting-started.md
- murdoc.js
- README.md

The `README.md` file will be used as index page, the other markdown files will all get there own page and item in the sidebar.

## Configure murdoc

```js
module.exports = {
    name: 'Advanced Example',
    src: 'src',
    port: 2000,
    mapUrl: function(baseUrl) {
        return baseUrl.replace('/doc', '');
    }
}
```

## Start murdoc

```bash
murdoc
```

## Open your browser

Open your favorite browser and surf to [http://localhost:2000](http://localhost:2000) and enjoy your documentation.
