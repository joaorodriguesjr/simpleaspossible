This is a [SAP (Simple-As-Possible)](https://en.wikipedia.org/wiki/Simple-As-Possible_computer)
architecture virtual machine with the purpose of understand how a CPU works under the hood.

## Run unit tests

```sh
npm "install" && npm "test"
```
![Unit Tests](https://github.com/joaorodriguesjr/simpleaspossible/actions/workflows/test.yml/badge.svg)

## Run a simple machine code written program

```sh
npm "install" && npm "start"
```
![Simple Program](https://github.com/joaorodriguesjr/simpleaspossible/actions/workflows/start.yml/badge.svg)

The main memory state in "src/main.ts" example will be.

```
  1a 2a 2a 40
  00 00 00 00
  00 00 05 00
  00 00 00 00
```
