import { Memory } from './Memory'
import { Processor } from './Processor'

const memory = new Memory(16)
const processor = new Processor(memory)


function hex(value: number): string {
  return value.toString(16).padStart(2, '0').toUpperCase()
}


console.log('Loads the accumulator with the value stored on memory location 0x0A')
memory.write(0x0A, 0x05)
memory.write(0x00, 0x1A)
processor.cycle()
console.log('0x0A: ', hex(memory.read(0x0A)), ' AC: ', hex(processor.acc))
console.log('')


console.log('Increments the accumulator with the value stored on memory location 0x0A')
memory.write(0x01, 0x2A)
processor.cycle()
console.log('0x0A: ', hex(memory.read(0x0A)), ' AC: ', hex(processor.acc))
console.log('')


console.log('Increments the accumulator with the value stored on memory location 0x0A')
memory.write(0x02, 0x2A)
processor.cycle()
console.log('0x0A: ', hex(memory.read(0x0A)), ' AC: ', hex(processor.acc))
console.log('')


console.log('Loads the output with the value stored on the accumulator')
memory.write(0x03, 0x40)
processor.cycle()
console.log(' OUT: ', hex(processor.out))
console.log('')
