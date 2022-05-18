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


/**
 * The program counter register should be a
 * clamped 4-bit wide value.
 */
processor.pc = 0x000A
assert.equal(processor.pc, 0x000A)

processor.pc = 0x0010
assert.equal(processor.pc, 0x0000)


/**
 * The program counter shoud be incremented by 1
 * after each sucessful cycle.
 */
processor.pc = 0x0000
processor.write(0x0000, 0x0040)
processor.write(0x0001, 0x0040)

processor.cycle()
assert.equal(processor.pc, 0x0001)

processor.cycle()
assert.equal(processor.pc, 0x0002)


/**
 * The instruction register should be a
 * clamped 8-bit wide value.
 */
processor.ir = 0x00A0
assert.equal(processor.ir, 0x00A0)

processor.ir = 0x0100
assert.equal(processor.ir, 0x0000)


/**
 * The instruction register should receive the value
 * of the memory address pointed by the program counter.
 */
processor.pc = 0x0000
processor.write(0x0000, 0x0040)
processor.write(0x0001, 0x0040)

processor.cycle()
assert.equal(processor.ir, 0x0040)

processor.cycle()
assert.equal(processor.ir, 0x0040)


/**
 * The accumulator register should be a
 * clamped 8-bit wide value.
 */
processor.acc = 0x00A0
assert.equal(processor.acc, 0x00A0)

processor.acc = 0x0100
assert.equal(processor.acc, 0x0000)


/**
 * The accumulator register should receive the value
 * of the memory address pointed by the low nibble of
 * the instruction register.
 */
processor.pc = 0x0000
processor.write(0x0000, 0x001A)
processor.write(0x000A, 0x00FF)

processor.cycle()
assert.equal(processor.acc, 0x00FF)


/**
 * The accumulator register should be incremented with
 * the value of the memory address pointed by the high
 * nibble of the instruction register.
 */
processor.pc = 0x0000
processor.write(0x0000, 0x001A)
processor.write(0x0001, 0x002B)
processor.write(0x000A, 0x000F)
processor.write(0x000B, 0x00F0)

processor.cycle()
processor.cycle()
assert.equal(processor.acc, 0x00FF)


/**
 * The accumulator register should be decremented with
 * the value of the memory address pointed by the high
 * nibble of the instruction register.
 */
processor.pc = 0x0000
processor.write(0x0000, 0x001A)
processor.write(0x0001, 0x003B)
processor.write(0x000A, 0x000F)
processor.write(0x000B, 0x0005)

processor.cycle()
processor.cycle()
assert.equal(processor.acc, 0x000A)


/**
 * The output register should be a
 * clamped 8-bit wide value.
 */
processor.out = 0x00A0
assert.equal(processor.out, 0x00A0)

processor.out = 0x0100
assert.equal(processor.out, 0x0000)


/**
 * The output register should receive the value
 * stored on the accumulator register.
 */
processor.pc = 0x0000
processor.write(0x0000, 0x001A)
processor.write(0x0001, 0x0040)
processor.write(0x000A, 0x00FF)

processor.cycle()
processor.cycle()
assert.equal(processor.out, 0x00FF)


/**
 * No instruction should be executed after
 * halting the processor.
 */
processor.pc = 0x0000
processor.write(0x0000, 0x0000)
processor.write(0x0001, 0x0040)
processor.write(0x0001, 0x0040)

processor.cycle()
processor.cycle()
processor.cycle()
assert.equal(processor.pc, 0x0001)
assert.ok(processor.halted)
