import { readFileSync } from "node:fs";

/**
 *  Reads a JSON file and parses its contents into a TypeScript type.
 * @param filePath
 * @returns The parsed JSON data as the specified type T.
 */
export function readJsonFile<T>(filePath: string): T {
  const fileContents = readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as T;
}
