import { RInstruction } from "../decoder/decode_r";
import { Instruction, InstructionType } from "../core/instruction";

const formatRInstruction = (instruction: RInstruction) => {
  return `${instruction.mnemonic} x${instruction.rd}, x${instruction.rs1}, x${instruction.rs2}`
}

export const formatInstruction = (instruction: Instruction): string => {
  if (instruction.instructionType === InstructionType.R && instruction.R) {
    return formatRInstruction(instruction.R)
  }
  throw new Error(`Unsupported instruction type: ${instruction.instructionType}`)
}