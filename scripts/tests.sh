#!/bin/sh

set -e

npx ts-node test/helpers.test.ts
npx ts-node test/Processor.test.ts
npx ts-node test/Memory.test.ts

echo 'SUCCESS: ALL TESTS PASSED!!!'
