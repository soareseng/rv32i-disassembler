import { describe, expect, test, it } from 'vitest'
import {decodeRInstruction} from "../../decoder/decode_r";

describe('decodeRInstruction', () => {
  it.each([
    { instruction: 0x33, expected: { mnemonic: "add", rd: 0, rs1: 0, rs2: 0, func3: 0, func7: 0 } },
  ])('decodes add R-type instruction', ({ instruction, expected }) => {
    expect(decodeRInstruction(instruction)).toEqual(expected)
  })
})
