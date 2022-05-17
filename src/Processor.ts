import { byte, nibble } from './helpers'

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
   * Initializes the cpu.
   * - Creates zeroed registers.
   * - Creates the memory with zeroed 16-bytes.
   */
  public constructor() {
    this.registers = new Array(1).fill(0)
    this.memory = new Array(16).fill(0)
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
}
