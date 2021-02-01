# import-artifacts HardHat plugin

Imports pre-compiled artifacts from an array of local folders through `config.imports`.
`hardhat.config` example:
```javascript
module.exports = {
    // ...
    imports: ['imports', 'node_modules/dependency/artifacts']
}
```