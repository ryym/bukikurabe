/**
 * A script to watch files and run Babel automatically
 * without building files first (like `babel --watch` does).
 * On the development, we want to build files, then start a server,
 * and then watch files. But if we use `babel` and `babel --watch`
 * for this purpose, files will be built twice.
 */

const watch = require('node-watch');
const babel = require('babel-core');
const fs = require('fs');
const path = require('path');

function startWatching(srcDir, destDir) {
  watch(srcDir, filePath => {
    babel.transformFile(filePath, (err, { code }) => {
      if (err) {
        console.error(err.stack);
        return;
      }
      const destPath = path.join(destDir, path.relative(srcDir, filePath));
      writeFileSyncRec(destPath, code);
      console.info(`${filePath} -> ${destPath}`);
    });
  });
}

function writeFileSyncRec(filePath, data, options) {
  listUnexistDirectories(filePath)
    .reverse()
    .forEach(p => fs.mkdirSync(p));
  fs.writeFileSync(filePath, data, options);
}

function listUnexistDirectories(filePath, dirs = []) {
  const dirPath = path.dirname(filePath);
  if (fs.existsSync(dirPath)) {
    return dirs;
  }
  dirs.push(dirPath);
  return listUnexistDirectories(dirPath, dirs);
}

startWatching(
  path.resolve(__dirname, '..', 'backend'),
  path.resolve(__dirname, '..', 'build')
);
