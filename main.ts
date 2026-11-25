import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Someone replied-all 'thanks!' to a 400-person email, and 38 people replied-all 'you're welcome' — the thread is now our company's longest-running project.";

// Gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
// exactly one line, not only whitespace.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry length ${chars} chars is outside the 1-200 gate`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
