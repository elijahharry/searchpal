// var path = require("path");

// const { override, babelInclude, addWebpackAlias } = require("customize-cra");

// module.exports = override(
//   babelInclude([
//     /* transpile (converting to es5) code in src/ and shared component library */
//     path.resolve("src"),
//     path.resolve("../lib"),
//   ]),
//   addWebpackAlias({
//     "@hellothere": path.relative(__dirname, "./src/hellothere"),
//   })
// );

const { aliasWebpack, aliasJest } = require("react-app-alias-ex");

const options = {}; // default is empty for most cases

module.exports = aliasWebpack(options);
module.exports.jest = aliasJest(options);
