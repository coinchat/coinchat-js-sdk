'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformRelativeToRootPath = exports.hasRootPathPrefixInString = undefined;

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = (0, _slash2.default)(global.rootPath || process.cwd());

var hasRootPathPrefixInString = exports.hasRootPathPrefixInString = function hasRootPathPrefixInString(importPath) {
  var rootPathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '~';

  var containsRootPathPrefix = false;

  if (typeof importPath === 'string') {
    if (importPath.substring(0, 1) === rootPathPrefix) {
      containsRootPathPrefix = true;
    }

    var firstTwoCharactersOfString = importPath.substring(0, 2);
    if (firstTwoCharactersOfString === rootPathPrefix + '/') {
      containsRootPathPrefix = true;
    }
  }

  return containsRootPathPrefix;
};

var transformRelativeToRootPath = exports.transformRelativeToRootPath = function transformRelativeToRootPath(importPath, rootPathSuffix, rootPathPrefix) {
  var sourceFile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var withoutRootPathPrefix = '';
  if (hasRootPathPrefixInString(importPath, rootPathPrefix)) {
    if (importPath.substring(0, 1) === '/') {
      withoutRootPathPrefix = importPath.substring(1, importPath.length);
    } else {
      withoutRootPathPrefix = importPath.substring(2, importPath.length);
    }

    var absolutePath = _path2.default.resolve((rootPathSuffix ? rootPathSuffix : './') + '/' + withoutRootPathPrefix);
    var sourcePath = sourceFile.substring(0, sourceFile.lastIndexOf('/'));

    // if the path is an absolute path (webpack sends '/Users/foo/bar/baz.js' here)
    if (sourcePath.indexOf('/') === 0 || sourcePath.indexOf(':/') === 1 || sourcePath.indexOf(':\\') === 1) {
      sourcePath = sourcePath.substring(root.length + 1);
    }

    sourcePath = _path2.default.resolve(sourcePath);

    var relativePath = (0, _slash2.default)(_path2.default.relative(sourcePath, absolutePath));

    // if file is located in the same folder
    if (relativePath.indexOf('../') !== 0) {
      relativePath = './' + relativePath;
    }

    // if the entry has a slash, keep it
    if (importPath[importPath.length - 1] === '/') {
      relativePath += '/';
    }

    return relativePath;
  }

  if (typeof importPath === 'string') {
    return importPath;
  }

  throw new Error('ERROR: No path passed');
};