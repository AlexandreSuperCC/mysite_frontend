#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

scp -r ROOT [dest]

