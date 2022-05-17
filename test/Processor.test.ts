import assert from 'node:assert/strict'
import { Processor } from '../src/Processor'

const processor = new Processor()

/**
 * Should write and read a clamped 8-bit value from the memory.
 */
processor.write(0x0001, 0x000A)
assert.equal(processor.read(0x0001), 0x000A)

processor.write(0x0002, 0x0100)
assert.equal(processor.read(0x0002), 0x0000)
