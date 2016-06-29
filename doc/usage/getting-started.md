# Getting Started

## Installation

You can install murdoc via npm

```bash
npm install murdoc -g
```

## Basic Usage

Afterwards you can start using murdoc in any folder. Murdoc will start an express server and list all markdown files in subfolders.

```bash
murdoc
```

## Custom Configuration

You're able to customize murdoc by adding a `murdoc.js` file to your project.

```js
module.exports = {
    name: 'Murdoc', // The name of your project, displayed in the docs
    port: 5000, // The port on which murdoc runs
    livereload: 35729, // The port on which the livereload server runs
    src: 'doc', // The relative path where murdoc should search for markdown files
    mapUrl: function(baseUrl) {
        return baseUrl; // A function that converts the folder structure the the wanted url structure
    }
}
```
