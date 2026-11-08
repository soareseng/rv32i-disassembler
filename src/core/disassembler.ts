import { extractOpcode, parseInstruction } from "./instruction";
import { decodeRInstruction } from "../decoder/decode_r";
import { formatInstruction } from "../formatter/formatters";

const opcodeToDecoder = {
  0x33: decodeRInstruction,
  default: () => {
    throw new Error("Unsupported instruction")
  }
}

export const decodeInstruction = (instruction: string): string => {
  const parsedInstruction = parseInstruction(instruction)
  const opcode = extractOpcode(parsedInstruction)
  const decoder = opcodeToDecoder[opcode as keyof typeof opcodeToDecoder] ?? opcodeToDecoder.default
  return formatInstruction(decoder(parsedInstruction))
}

console.log(decodeInstruction("0x002081B3"))

