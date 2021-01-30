# Solidity Project Contracts Core Library

This project serves as a base dependency for Solidity-based smart contract projects by providing common dependencies, configurations, contracts, scripts, interfaces, constants, and testing utilities.


## Table of Contents

- [Overview](#overview)
  * [Installation](#installation)
  * [Usage](#usage)
    - [Commands](#commands)
    - [Solidity Contracts](#solidity-contracts)
    - [Test and Migration Scripts](#test-and-migration-scripts)


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

#### Solidity Contracts

Import dependency contracts into your Solidity contracts and derive as needed:

```solidity
import "@animoca/ethereum-contracts-core_library/contracts/{{Contract Group}}/{{Contract}}.sol"
```

#### Test and Migration Scripts

Require the NodeJS module dependency in your test and migration scripts as needed:

```javascript
const { constants, interfaces, behaviors } = require('@animoca/ethereum-contracts-core_library');
```
