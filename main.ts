// Office Joke Open — one line of office comedy, at most 200 characters.
// The program's whole job is to write that single line to entry.txt.
//
// The joke is built from three parts so the turn lands in the last words:
//   setup  — a recognisable office ritual (a meeting about meetings),
//   twist  — the meeting itself becomes the problem it was called to fix,
//   payoff — the fix is another meeting, so the loop never closes.
// "Called" beats "scheduled" in the setup: one syllable shorter, and it
// sounds like something a real person says before the spiral starts.
// A single line, no trailing newline inside the joke itself; the file
// ends with one newline so the text reads cleanly as one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I called a meeting to discuss why we have too many meetings. " +
  "It ran over, so we booked a follow-up to discuss the follow-up.";

const MAX_CHARS = 200;

function main(): void {
  const text = JOKE.trim();

  // Gate, mirrored locally: 1-200 characters, not only whitespace.
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`joke is ${text.length} characters, must be 1-200`);
  }
  if (!/\S/.test(text)) {
    throw new Error("joke must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("joke must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");

  console.log(`wrote ${text.length} characters to ${join(outDir, "entry.txt")}`);
  console.log(text);
}

main();
