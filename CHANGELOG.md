# Changelog

## 2.0.0 (27/05/2020)

### Breaking changes
 * Updated compiler to `solc:0.6.8`.
 * Refactored the type conversion libraries following the logic of one contract per function and moved them to `utils/types`.
 * Applied naming convention where missing: name must starting with `_` for `private` and `internal` variables and functions *only*.
 * Removed `BitsLayoutDecoder`.

### Improvements
 * `MinterRole.sol` public functions will revert if supplied a zero-address target. `addMinter()` will revert if the target has already been granted the minter role. `renounceMinter()` will revert if the caller was not previously granted the minter role.
 * `PauserRole.sol` public functions will revert if supplied a zero-address target. `addMinter()` will revert if the target has already been granted the pauser role. `renounceMinter()` will revert if the caller was not previously granted the pauser role.
 * Reworked implementation of the `uint256` to `string` conversions in.

 ### Bugfixes
  * Fixed an issue with the `uint256.inject()` function where the bitmask clearing step wasn't properly clearing the bits.

## 1.1.0 (06/05/2020)

### New features
 * Added `RichString.sol`, `RichBytes32.sol`, `BitsMask.sol`, `UInt256Bits.sol`and `BitsLayoutDecoder.sol` (missing tests).
 * Added `EnumMap.sol` and `EnumSet.sol` which are based on `openzeppelin`'s `EnumerableMap` and `EnumerableSet`. It is exposing the core `bytes32`-based structure without specialisation. The importer contract is responsible for any types casting.

## 1.0.0 (03/05/2020)

### Breaking changes
 * Migration to `solc:0.6.x`.
 * Migration to `@openzeppelin/contracts:3.x`.

### New features
 * Added `MinterRole.sol` and `PauserRole.sol` for retro-compatibility with existing contracts.
 * Added `WhitelistedOperators.sol`.
 * Added `PayoutWallet.sol`.

## 0.0.2 (10/04/2020)

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

## 0.0.1 (02/04/2020)
 * Initial commit. Add dependencies, config files and constants.
