/**
 * Clamps the given value in 8-bits.
 *
 * @param value A number value
 * @returns 8-bit wide clamped value
 */
export function byte(value: number): number {
  return value & 0xFF
}

/**
 * Clamps the given value in 4-bits.
 *
 * @param value A number value
 * @returns 4-bit wide clamped value
 */
export function nibble(value: number): number {
  return value & 0x0F
}

/**
 * Extracts the high nibble of the given value.
 *
 * @param value A number value
 * @returns The high nibble
 */
export function hi(value: number): number {
  return (value & 0xF0) >> 4
}

/**
 * Extracts the low nibble of the given value.
 *
 * @param value A number value
 * @returns The low nibble
 */
export function lo(value: number): number {
  return value & 0x0F
}
