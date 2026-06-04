#!/usr/bin/env bash

cd "$(dirname "$0")/frontend"

# Checks run in parallel - each is independent, so wall time is the slowest
# step rather than the sum. `build` is intentionally excluded: it re-runs
# typecheck + lint internally (duplicating work) and is better left to CI.
names=("TypeScript" "ESLint" "Prettier")
cmds=("typecheck" "lint" "format:check")

pids=()
for cmd in "${cmds[@]}"; do
  bun run "$cmd" >/dev/null 2>&1 &
  pids+=($!)
done

pass=0
fail=0
results=""
for i in "${!names[@]}"; do
  if wait "${pids[$i]}"; then
    results+="  ✓ ${names[$i]}\n"
    ((pass++))
  else
    results+="  ✗ ${names[$i]}\n"
    ((fail++))
  fi
done

echo ""
echo "─── Check Results ───"
printf "$results"
echo "─────────────────────"
echo "  $pass passed, $fail failed"
echo ""

exit "$fail"
