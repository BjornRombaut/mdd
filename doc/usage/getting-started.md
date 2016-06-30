# Getting Started

## Installation

You can install mdc via npm

```bash
npm install mdc -g
```

## Basic Usage

Afterwards you can start using mdc in any folder. mdc will start an express server and list all markdown files in subfolders.

```bash
mdc
```

## Custom Configuration

You're able to customize mdc by adding a `mdc.js` file to your project.

```js
module.exports = {
    name: 'mdc', // The name of your project, displayed in the docs
    port: 5000, // The port on which mdc runs
    livereload: 35729, // The port on which the livereload server runs
    src: 'doc', // The relative path where mdc should search for markdown files
    mapUrl: function(baseUrl) {
        return baseUrl; // A function that converts the folder structure the the wanted url structure
    }
}
```
