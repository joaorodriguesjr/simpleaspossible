import assert from 'node:assert/strict'
import { byte, nibble, hi, lo } from '../src/helpers'

/**
 * Should clamp values in 8-bits.
 */
assert.equal(byte(0x0000), 0x0000)
assert.equal(byte(0x0100), 0x0000)
assert.equal(byte(0x00A0), 0x00A0)


/**
 * Should clamp values in 4-bits.
 */
assert.equal(nibble(0x0000), 0x0000)
assert.equal(nibble(0x0010), 0x0000)
assert.equal(nibble(0x000A), 0x000A)


/**
 * Should extract the high nibble of the provided value.
 */
assert.equal(hi(0x0000), 0x0000)
assert.equal(hi(0x00A0), 0x000A)
assert.equal(hi(0x0A00), 0x0000)

/**
 * Should extract the low nibble of the provided value.
 */
assert.equal(lo(0x0000), 0x0000)
assert.equal(lo(0x000A), 0x000A)
assert.equal(lo(0x00A0), 0x0000)
