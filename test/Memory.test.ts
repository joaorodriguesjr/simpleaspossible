import assert from 'node:assert/strict'
import { Memory } from '../src/Memory'

const memory = new Memory(16)

/**
 * Should write and read a clamped 8-bit value from the memory.
 */
memory.write(0x0001, 0x000A)
assert.equal(memory.read(0x0001), 0x000A)

memory.write(0x0002, 0x0100)
assert.equal(memory.read(0x0002), 0x0000)
