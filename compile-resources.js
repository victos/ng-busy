/*jshint esversion: 6 */
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const less = require('less');


/**
 * Simple Promiseify function that takes a Node API and return a version that supports promises.
 * We use promises instead of synchronized functions to make the process less I/O bound and
 * faster. It also simplifies the code.
 */
function promiseify(fn) {
  return function () {
    const args = [].slice.call(arguments, 0);
    return new Promise((resolve, reject) => {
      fn.apply(this, args.concat([function (err, value) {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      }]));
    });
  };
}

const readFile = promiseify(fs.readFile);
const writeFile = promiseify(fs.writeFile);
const exists = promiseify(fs.existsSync);
const deleteFile = promiseify(fs.unlinkSync);

/**
 * Inline resources in a tsc/ngc compilation.
 * @param projectPath {string} Path to the project.
 */
function compileResources(projectPath) {

  return compileLess(projectPath);
}

function compileLess(projectPath) {
  // Match only less files in projectPath.
  const files = glob.sync('**/*.component.less', {cwd: projectPath});

  // For each file, compile it and write the new file.
  return Promise.all(files.map(filePath => {
    const fullFilePath = path.join(projectPath, filePath);
    const newFilePath = fullFilePath.replace(/less$/, 'css');
    return new Promise((resolve, reject) => {
      less.render(fs.readFileSync(fullFilePath).toString(), {
        filename: path.resolve(fullFilePath), // <- here we go
      }, (e, output) => {
        fs.writeFileSync(newFilePath, output.css);
        deleteFile(fullFilePath)
        resolve();
      });
    } );
  }));
}

module.exports = compileResources;

// Run inlineResources if module is being called directly from the CLI with arguments.
if (require.main === module && process.argv.length > 2) {
  console.log('Inlining resources from project:', process.argv[2]);
  return compileResources(process.argv[2]);
}
