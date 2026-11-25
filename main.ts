import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Someone replied-all 'thanks!' to a 400-person email, and 38 people replied-all 'you're welcome' — the thread is now our company's longest-running project.";

// Gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
// exactly one line, not only whitespace.
// validateEntry returns the entry unchanged after checking every gate
// condition, so the caller writes exactly the validated text.
function validateEntry(entry: string): string {
  const chars = [...entry].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry length ${chars} chars is outside the 1-200 gate`);
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  return entry;
}

const validated = validateEntry(ENTRY);

// Re-check the validated text right before writing, so a later edit to
// ENTRY cannot silently bypass the gate.
if ([...validated].length !== [...ENTRY].length || validated !== ENTRY) {
  throw new Error("validated entry does not match the source entry");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", validated, "utf8");
