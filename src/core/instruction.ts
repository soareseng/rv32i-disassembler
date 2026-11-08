import { decodeRInstruction, RInstruction } from "../decoder/decode_r";

export enum InstructionType {
  R = "R",
  I = "I",
  S = "S",
  B = "B",
  U = "U",
  J = "J",
}

export interface Instruction {
  R?: RInstruction
  instructionType: InstructionType
}

export const extractOpcode = (instruction: number) => {
  return instruction & 0x7F
}

export const opcodeToDecoder = {
  0x33: decodeRInstruction,
}

export const parseInstruction = (instruction: string): number => {
  const instructionArray = instruction.split(" ")
  const parsedInstruction = parseInt(instructionArray[0] ?? "0", 16) |
    parseInt(instructionArray[1] ?? "0", 16) << 8 |
    parseInt(instructionArray[2] ?? "0", 16) << 16 |
    parseInt(instructionArray[3] ?? "0", 16) << 24
  if (instructionArray.length !== 4) throw new Error(`Invalid instruction. Instruction: ${instruction}`)
  return parsedInstruction
}
