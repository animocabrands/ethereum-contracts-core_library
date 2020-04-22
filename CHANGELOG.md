# Changelog

## 0.0.2 (2020/04/10)

### Breaking changes
 * `constants.js` has been moved to `src/constants.js`. The module now exposes the object `constants`.

### New features
 * Added `RichUin256.sol` solidity library.
 * Added `SupportsInterface.behavior.js`.
 * Added `interfaces/ERC165/`.

### Bugfixes
 * Fixed value of `EmptyByte` which made some tests fail

### Improvements
 * Exported constants are now also classified through a parent object related to the type. For example `BN.Five`, or `Bytes32.Zero`. The previous exports are still available.

## 0.0.1 (2020/04/02)
 * Initial commit. Add dependencies, config files and constants.