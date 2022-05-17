import { byte, nibble, hi, lo } from './helpers'

type instruction = { mnemonic: string, execute: () => void }

/**
 * The SAP-1 central processing unit.
 */
export class Processor {

  /**
   * The cpu memory.
   */
  private memory: number[]

  /**
   * The registers memory.
   */
  private registers: number[]

  /**
   * The cpu instruction set.
   */
  private instructions: instruction[]

  /**
   * Initializes the cpu.
   * - Creates zeroed registers.
   * - Creates the memory with zeroed 16-bytes.
   * - Creates the mapped instruction set.
   */
  public constructor() {
    this.registers = new Array(1).fill(0)
    this.memory = new Array(16).fill(0)

    this.instructions = [
      { mnemonic: 'NOP', execute: () => {            } },
      { mnemonic: 'LDA', execute: () => { this.lda() } },
      { mnemonic: 'ADD', execute: () => { this.add() } },
    ]
  }

  /**
   * Executes a machine cycle.
   */
  public cycle(): void {
    this.ir = this.read(this.pc)

    const opcode = hi(this.ir)
    this.instructions[opcode].execute()

    this.pc = this.pc + 1
  }

  /**
   * Loads the accumulator with a value stored on the memory
   */
  public lda(): void {
    this.acc = this.read(lo(this.ir))
  }

  /**
   * Adds a memory stored value to the accumulator
   */
  public add(): void {
    this.acc += this.read(lo(this.ir))
  }

  /**
   * Reads one of the 16 bytes of the memory.
   * - The provided address value will be clamped by 4-bits.
   *
   * @param address 4-bit wide address
   * @returns 8-bit wide value
   */
  public read(address: number): number {
    return byte(this.memory[nibble(address)])
  }

  /**
   * Writes one of the 16 bytes of the memory.
   * - The provided address value will be clamped by 4-bits.
   * - The provided value will be clamped by 8-bits.
   *
   * @param address 4-bit wide address
   * @param value 8-bit wide value
   */
  public write(address: number, value: number): void {
    this.memory[nibble(address)] = byte(value)
  }

  /**
   * The program counter as a 4-bit clamped value.
   */
  public get pc(): number {
    return nibble(this.registers[0])
  }

  /**
   * Sets the program counter value.
   * - The provided value will be clamped by 4-bits.
   */
  public set pc(value: number) {
    this.registers[0] = nibble(value)
  }

  /**
   * The instruction register as a 8-bit clamped value.
   */
  public get ir(): number {
    return byte(this.registers[1])
  }

  /**
   * Sets the instruction register value.
   * - The provided value will be clamped by 8-bits.
   */
  public set ir(value: number) {
    this.registers[1] = byte(value)
  }

  /**
   * The accumulator register as a 8-bit clamped value.
   */
  public get acc(): number {
    return byte(this.registers[2])
  }

  /**
   * Sets the accumulator register value.
   * - The provided value will be clamped by 8-bits.
   */
  public set acc(value: number) {
    this.registers[2] = byte(value)
  }
}
