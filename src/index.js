const constants = require('./constants');
const interfaces = require('./interfaces/ERC165');
const shouldSupportInterfaces = require('../test/contracts/introspection/SupportsInterface.behavior');

module.exports = {
    constants,
    interfaces,
    shouldSupportInterfaces
}