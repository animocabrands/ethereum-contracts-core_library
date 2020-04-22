#!/bin/bash

`dirname "$0"`/oz-compile.sh && mocha --timeout 30000 --full-trace --exit --recursive "$@"