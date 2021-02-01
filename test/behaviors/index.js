const {shouldBehaveLikePublicRole} = require('../contracts/access/PublicRole.behavior');
const {shouldBehaveLikePausableContract} = require('../contracts/utils/Pausable.behavior');
const {shouldSupportInterfaces} = require('../contracts/introspection/SupportsInterface.behavior');

module.exports = {
  shouldBehaveLikePublicRole,
  shouldBehaveLikePausableContract,
  shouldSupportInterfaces,
};
