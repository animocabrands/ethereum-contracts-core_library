#!/bin/bash

SOLC_VERSION=0.6.8
OPTIMIZER_RUNS=200

oz compile \
    --solc-version ${SOLC_VERSION} \
    --optimizer on \
    --optimizer-runs ${OPTIMIZER_RUNS} \
    --typechain web3-v1 \
    --typechain-outdir ./types/contracts
