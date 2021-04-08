import { Colors } from "../src/mod.ts";

function sortKeys<T extends object>(obj: T): T {
  return Object.keys(obj).sort().reduce<any>((result, key) => {
    let value = obj[key as keyof T];
    if (typeof value === "object") {
      result[key] = sortKeys(value as any);
    } else {
      result[key] = value;
    }
    return result;
  }, {});
}

const filename = Deno.args[0];
if (!filename) {
  console.error(Colors.red("ERROR"), "No filename provided");
  Deno.exit();
}
const fileString = Deno.readTextFileSync(filename);
const data = JSON.parse(fileString);
const sorted = sortKeys(data);
Deno.writeTextFileSync(filename, JSON.stringify(sorted, undefined, 2));
console.log(`File [${filename}] has been sorted out.`);
