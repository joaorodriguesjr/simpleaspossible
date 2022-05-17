import { byte, nibble, hi, lo } from './helpers'

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
  public constructor() {
    this.registers = new Array(4).fill(0)
    this.memory = new Array(16).fill(0)

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

    this.ir = this.read(this.pc)

    const opcode = hi(this.ir)
    this.operations[opcode]()

    this.pc = this.pc + 1
  }

  /**
   * Loads the accumulator with a value stored on the memory
   */
  public LDA(): void {
    this.acc = this.read(this.address())
  }

  /**
   * Adds a memory stored value to the accumulator
   */
  public ADD(): void {
    this.acc += this.read(this.address())
  }

  /**
   * Subtracts a memory stored value from the accumulator
   */
  public SUB(): void {
    this.acc -= this.read(this.address())
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
   * Extracts a 4-bit wide address from the instruction register.
   *
   * @returns A 4-bit wide address.
   */
  public address(): number {
    return lo(this.ir)
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
