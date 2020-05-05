# Solidity Project Stub

This project serves as a base dependency for Solidity-based contract projects by providing common configurations, contacts, scripts, interfaces, constants, and utilities.


## Table of Contents

- [Overview](#overview)
  * [Installation](#installation)
  * [Usage](#usage)
      - [Solidity Contracts](#solidity-contracts)
      - [Truffle Migrations](#truffle-migrations)
      - [Openzeppelin Tests](#openzeppelin-tests)
- [Configurations](#configurations)
  * [Openzeppelin Test Environment](#openzeppelin-test-environment)
  * [Truffle Config](#truffle-config)
  * [Truffle Security](#truffle-security)
- [Scripts](#scripts)


## Overview


### Installation

Install as a module dependency in your host NodeJS project:

```bash
$ npm install --save @animoca/ethereum-contracts-core_library
```


### Usage

#### Solidity Contracts

Import dependency contracts in your Solidity contracts:

```solidity
import "@animoca/ethereum-contracts-core_library/contracts/{{Contract Group}}/{{Contract}}.sol"
```


#### Truffle Migrations

Require the NodeJS module dependency in your migration scripts:

```javascript
const { constants } = require('@animoca/ethereum-contracts-core_library');
```


Perform a Truffle migration:

```bash
$ npm run migrate
```


#### Openzeppelin Tests

Require the NodeJS module dependency in your Openzeppelin tests:

```javascript
const { constants, interfaces, shouldSupportInterfaces } = require('@animoca/ethereum-contracts-core_library');
```


### Configurations

#### Openzeppelin Test Environment

The Openzeppelin test environment configuration file defines the environment setup for running [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/) based test suites using Openzeppelin's testing framework, which includes a local [ganache blockchain](https://github.com/trufflesuite/ganache-core) with unlocked accounts and tools. Once this core library project is included as a dependency of your host NodeJS project, the configuration file can be found in **node_modules/@animoca/ethereum-contracts-core/test-environment.config.js**


#### Truffle Config

The Truffle configuration file defines the configuration properties used by the Truffle framework. Once this core library project is included as a dependency of your host NodeJS project, the configuration file can be found in **node_modules/@animoca/ethereum-contracts-core/truffle-config.js**


#### Truffle Security

The Truffle Security configuration file defines the configuration properties used by the [MythX Security Analysis Truffle plugin](https://www.npmjs.com/package/truffle-security) to provide static analysis for security vulnerabilities during Truffle's contract compilation process. Once this core library project is included as a dependency of your host NodeJS project, the configuration file can be found in **node_modules/@animoca/ethereum-contracts-core/truffle-security.js**


### Scripts

+ **oz-compile.sh** - Compiles the Solidity contracts using the Openzeppelin testing framework.
+ **oz-test.sh** - Compiles and runs the Mocha + Chai based test suites usingOpenzeppelin's testing framework.
+ **migrate.sh** - Executes the Truffle migration scripts to deploy the contracts on Truffle's Ganache local blockchain.
+ **coverage.sh** - Executes Truffle coverage tests on the Solidity contracts.
