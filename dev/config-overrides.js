const { aliasWebpack, aliasJest } = require("react-app-alias-ex");

const options = {}; // default is empty for most cases

module.exports = aliasWebpack(options);
module.exports.jest = aliasJest(options);
