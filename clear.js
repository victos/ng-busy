/*jshint esversion: 6 */
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootFolder = path.join(__dirname);
const srcLibFolder = path.join(rootFolder, 'src/lib');
const srcDemoFolder = path.join(rootFolder, 'src/demo');


// if(fs.existsSync(compilationFolder)) {
//   rimraf.sync(compilationFolder);
// }

return Promise.resolve()
// Copy library to temporary folder and inline html/css.
  .then(() => _removeCompileFiles(`**/*.ts`, srcLibFolder)
    .then(() => _removeCompileFiles(`**/*.ts`, srcDemoFolder))
  );

// Copy files maintaining relative paths.
function _removeCompileFiles(fileGlob, dir) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, {cwd: dir, nodir: true}, (err, files) => {
      if (err) {
        reject(err);
      }
      files.forEach(file => {
        const origin = path.join(dir, file);
        const jsFile = origin.replace(/\.ts/,'.js');
        const mapFile = jsFile + '.map';
        if(fs.existsSync(jsFile)) {
          fs.unlinkSync(jsFile);
        }
        if(fs.existsSync(mapFile)) {
          fs.unlinkSync(mapFile);
        }
        resolve();
      });
    });
  });
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
