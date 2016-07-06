# Getting Started

## Installation

You can install mdd via npm

```bash
npm install mdd -g
```

## Basic Usage

Afterwards you can start using mdd in any folder. mdd will start an express server and list all markdown files in subfolders.

```bash
mdd
```

## Custom Configuration

You're able to customize mdd by adding a `mdd.js` file to your project.

```js
module.exports = {
    name: 'mdd', // The name of your project, displayed in the docs
    port: 5000, // The port on which mdd runs
    livereload: 35729, // The port on which the livereload server runs
    src: 'doc', // The relative path where mdd should search for markdown files
    mapUrl: function(baseUrl) {
        return baseUrl; // A function that converts the folder structure the the wanted url structure
    }
}
```
