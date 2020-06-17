const publicRole = require('../contracts/access/PublicRole.behavior');
const supportsInterface = require('../contracts/introspection/SupportsInterface.behavior');

module.exports = {
    ...publicRole,
    ...supportsInterface
}