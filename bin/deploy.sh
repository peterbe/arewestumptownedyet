#!/usr/bin/env bash
set -eo pipefail


INLINE_RUNTIME_CHUNK=false \
yarn run build

./bin/update_version.js > build/version.json

./bin/insert_version.js build/version.json build/index.html

gh-pages --add --dist build/
