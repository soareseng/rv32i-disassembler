import { extractOpcode, opcodeToDecoder, parseInstruction } from "./instruction";
import { formatInstruction } from "../formatter/formatters";


export const decodeInstruction = (instruction: string): string => {
  const parsedInstruction = parseInstruction(instruction)
  const opcode = extractOpcode(parsedInstruction)
  const decoder = opcodeToDecoder[opcode as keyof typeof opcodeToDecoder]
  return formatInstruction(decoder(parsedInstruction))
}


console.log(decodeInstruction("B3 81 20 00"))

