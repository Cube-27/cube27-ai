import { spawnSync } from "node:child_process";

const runner = process.env.npm_execpath;
if (!runner) throw new Error("pnpm execution path is unavailable");
const gates = [
  ["format:check"],
  ["lint"],
  ["check"],
  ["test"],
  ["build"],
  ["validate:build"],
  ["links:check"],
  ["audit:prod"],
];

for (const args of gates) {
  console.log(`\n> pnpm ${args.join(" ")}`);
  const result = spawnSync(process.execPath, [runner, ...args], {
    stdio: "inherit",
    shell: false,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log("\nAll mandatory verification gates passed.");
