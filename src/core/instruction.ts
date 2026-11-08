import { RInstruction } from "../decoder/decode_r";

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

export const parseInstruction = (instruction: string): number => {
  return parseInt(instruction, 16)
}

export const extractOpcode = (instruction: number) => {
  return instruction & 0x7F
}
