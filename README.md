# Solidity Project Contracts Core Library

This project serves as a base dependency for Solidity-based smart contract projects by providing common dependencies, configurations, contracts, scripts, interfaces, constants, and testing utilities.


## Table of Contents

- [Overview](#overview)
  * [Installation](#installation)
  * [Usage](#usage)
    - [Commands](#commands)
    - [Solidity Contracts](#solidity-contracts)
    - [Test and Migration Scripts](#test-and-migration-scripts)
- [Configurations](#configurations)
  * [Openzeppelin Test Environment](#openzeppelin-test-environment)
  * [Truffle Config](#truffle-config)
  * [Truffle Security](#truffle-security)


## Overview

### Installation

Install as a module dependency in your host NodeJS project:

```bash
npm install --save-dev @animoca/ethereum-contracts-core_library
```


### Usage

#### Commands

```bash
npm run compile
```
Compiles all the contracts in the `contracts/` directory.

```bash
npm run test [files]
```
Runs all the tests. If `files` are specified, runs only these test files.

```bash
npm run coverage
```
Runs the test coverage.

```bash
npm run migrate --network <network>
```
Runs the migrations on the specified `network`.
The network `ganache` can be used for testing.

```bash
npm run verify
```
Runs a static analysis on the specified `contracts` through MythX API.
Note: an API key is required to run this command.

```bash
npm run publish
```
Verifies and publishes the contract code through Etherscan API.
Note: an API key is required to run this command, refer to `truffle-config.js` for a code snippet.


#### Solidity Contracts

Import dependency contracts into your Solidity contracts and derive as needed:

```solidity
import "@animoca/ethereum-contracts-core_library/contracts/{{Contract Group}}/{{Contract}}.sol"
```


#### Test and Migration Scripts

Require the NodeJS module dependency in your test and migration scripts as needed:

```javascript
const { constants, interfaces, behaviors, fixtures } = require('@animoca/ethereum-contracts-core_library');
```


### Configurations

#### Openzeppelin Test Environment

The Openzeppelin test environment configuration file defines the environment setup for running [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) based test suites using Openzeppelin's testing framework, which includes a local [Ganache blockchain](https://github.com/trufflesuite/ganache-core) with unlocked accounts and tools. Once this core library project is included as a dependency of your host NodeJS project, the configuration file can be found in **node_modules/@animoca/ethereum-contracts-core_library/test-environment.config.js**


#### Truffle Config

The Truffle configuration file defines the configuration properties used by the Truffle framework. Once this core library project is included as a dependency of your host NodeJS project, the configuration file can be found in **node_modules/@animoca/ethereum-contracts-core_library/truffle-config.js**


#### Truffle Security

The Truffle Security configuration file defines the configuration properties used by the [MythX Security Analysis Truffle plugin](https://www.npmjs.com/package/truffle-security) to provide static analysis for security vulnerabilities during Truffle's contract compilation process. Once this core library project is included as a dependency of your host NodeJS project, the configuration file can be found in **node_modules/@animoca/ethereum-contracts-core_library/truffle-security.js**
