#!/bin/bash

mv -f artifacts/build-info build-info.tmp 2>/dev/null
mv -f artifacts/contracts contracts.tmp 2>/dev/null
mv -f artifacts/imports imports.tmp 2>/dev/null
rm -rf artifacts && mkdir artifacts
mv -f build-info.tmp artifacts/build-info  2>/dev/null
mv -f contracts.tmp artifacts/contracts 2>/dev/null
mv -f imports.tmp artifacts/imports 2>/dev/null
echo "artifacts cleaned"