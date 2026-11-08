import { Instruction, InstructionType } from "../core/instruction";

export interface RInstruction {
  mnemonic: string;
  rd: number;
  func3: number;
  rs1: number;
  rs2: number;
  func7: number;
}

const functToMnemonicMapper = {
  0x0: (func7: number) => [0x0, 0x20].includes(func7) ? (func7 === 0x0 ? "add" : "sub") : (() => { throw new Error(`Unknown func7: ${func7}`) })(),
  0x1: "sll",
  0x2: "slt",
  0x3: "sltu",
  0x4: "xor",
  0x5: (func7: number) => [0x0, 0x20].includes(func7) ? (func7 === 0x0 ? "srl" : "sra") : (() => { throw new Error(`Unknown func7: ${func7}`) })(),
  0x6: "or",
  0x7: "and",
  default: undefined,
}

const funcsToMnemonic = (func3: number, func7: number): string => {
  const mnemonic = functToMnemonicMapper[func3 as keyof typeof functToMnemonicMapper]
  if (!mnemonic) throw new Error(`Unknown func3: ${func3}`)
  return typeof mnemonic === "function" ? mnemonic(func7) : mnemonic
}

export const decodeRInstruction = (instruction: number): Instruction => {
  const rd = (instruction >> 7) & 0x1F
  const func3 = (instruction >> 12) & 0x07
  const rs1 = (instruction >> 15) & 0x1F
  const rs2 = (instruction >> 20) & 0x1F
  const func7 = (instruction >> 25) & 0x7F
  console.log(funcsToMnemonic(func3, func7))
  return {
    R: {
      mnemonic: funcsToMnemonic(func3, func7),
      rd,
      func3,
      rs1,
      rs2,
      func7,
    },
    instructionType: InstructionType.R,
  }
}
