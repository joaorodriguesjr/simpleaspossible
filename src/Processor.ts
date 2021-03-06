import { byte, nibble, hi, lo } from './helpers'
import { Memory } from './Memory'

/**
 * The SAP-1 central processing unit.
 */
export class Processor {

  /**
   * The cpu memory.
   */
  private memory: Memory

  /**
   * The registers memory.
   */
  private registers: number[]

  /**
   * The halting flag.
   */
  public halted: boolean

  /**
   * The cpu instruction set.
   */
  private operations: (() => void)[]

  /**
   * Initializes the cpu.
   * - Creates zeroed registers.
   * - Creates the memory with zeroed 16-bytes.
   * - Creates the mapped instruction set.
   */
  public constructor(memory: Memory) {
    this.registers = new Array(4).fill(0)

    this.memory = memory

    this.halted = false

    this.operations = [
      () => this.HLT(),
      () => this.LDA(),
      () => this.ADD(),
      () => this.SUB(),
      () => this.OUT(),
    ]
  }

  /**
   * Executes a machine cycle.
   */
  public cycle(): void {
    if (this.halted)
      return

    this.ir = this.memory.read(this.pc)

    const operation = this.operations[this.opcode()]
    operation()

    this.pc = this.pc + 1
  }

  /**
   * Loads the accumulator with a value stored on the memory
   */
  public LDA(): void {
    this.acc = this.memory.read(this.address())
  }

  /**
   * Adds a memory stored value to the accumulator
   */
  public ADD(): void {
    this.acc += this.memory.read(this.address())
  }

  /**
   * Subtracts a memory stored value from the accumulator
   */
  public SUB(): void {
    this.acc -= this.memory.read(this.address())
  }

  /**
   * Loads the output with the value stored on the accumulator.
   */
  public OUT(): void {
    this.out = this.acc
  }

  /**
   * Halts the processor.
   */
  public HLT(): void {
    this.halted = true
  }

  /**
   * Extracts a 4-bit wide opcode from the high nibble of the instruction register.
   *
   * @returns A 4-bit wide opcode.
   */
  public opcode(): number {
    return hi(this.ir)
  }

  /**
   * Extracts a 4-bit wide address from the low nibble of the instruction register.
   *
   * @returns A 4-bit wide address.
   */
  public address(): number {
    return lo(this.ir)
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

  /**
   * The output register as a 8-bit clamped value.
   */
  public get out(): number {
    return byte(this.registers[3])
  }

  /**
   * Sets the output register value.
   * - The provided value will be clamped by 8-bits.
   */
  public set out(value: number) {
    this.registers[3] = byte(value)
  }
}
