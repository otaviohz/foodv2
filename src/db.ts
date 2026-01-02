import { parse as yamlParse, stringify as yamlStringify } from "jsr:@std/yaml";

export async function readYaml<T>(path: string, fallback: T): Promise<T> {
  try {
    const txt = await Deno.readTextFile(path);
    const data = yamlParse(txt);
    return (data ?? fallback) as T;
  } catch (err) {
    console.error("Couldn't read database: ", path, err);
    return fallback as T;
  }
}

export async function writeYaml<T>(path: string, data: T): Promise<void> {
  await Deno.writeTextFile(path, yamlStringify(data));
}
