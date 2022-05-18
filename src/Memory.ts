import { byte } from './helpers'

/**
 * The SAP-1 memory module.
 */
export class Memory {

  /**
   * The bytes of the memory.
   */
  private data: number[]

  /**
   * Initializes the memory.
   * - The memory bytes will be initialized with zeros.
   *
   * @param capacity How many bytes of memory should be allocated.
   */
  public constructor(private capacity: number) {
    this.data = new Array(capacity).fill(0x00)
  }

  /**
   * Reads one of 1 byte of the memory.
   * - The provided address should be in the capacity range.
   *
   * @param address n-bit wide address
   * @returns 8-bit wide value
   */
  public read(address: number): number {
    return byte(this.data[address]) | 0x00
  }

  /**
   * Writes one of 1 byte of the memory.
   * - The provided address should be in the capacity range.
   * - The provided value will be clamped by 8-bits.
   *
   * @param address n-bit wide address
   * @param value 8-bit wide value
   */
  public write(address: number, value: number): void {
    this.data[address] = byte(value)
  }
}
