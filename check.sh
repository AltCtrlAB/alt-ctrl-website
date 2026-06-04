#!/usr/bin/env bash

cd "$(dirname "$0")/frontend"

# Prettier runs first in --write mode: it auto-fixes formatting and only fails on
# issues it can't fix (e.g. syntax errors). Running it before the read-only checks
# avoids races on files being rewritten while TypeScript/ESLint read them.
if bun run format >/dev/null 2>&1; then
  prettier_line="  ✓ Prettier"
  prettier_fail=0
else
  prettier_line="  ✗ Prettier"
  prettier_fail=1
fi

# TypeScript + ESLint are independent and read-only, so they run in parallel on the
# now-formatted code. `build` is intentionally excluded: it re-runs typecheck + lint
# internally (duplicating work) and is better left to CI.
names=("TypeScript" "ESLint")
cmds=("typecheck" "lint")

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

# Fold in the Prettier result (kept last to match the original ordering).
results+="$prettier_line\n"
if [ "$prettier_fail" -eq 0 ]; then ((pass++)); else ((fail++)); fi

echo ""
echo "─── Check Results ───"
printf "$results"
echo "─────────────────────"
echo "  $pass passed, $fail failed"
echo ""

exit "$fail"
