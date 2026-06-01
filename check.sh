#!/usr/bin/env bash

cd "$(dirname "$0")/frontend"

pass=0
fail=0
results=""

run_check() {
  local name="$1"
  shift
  if "$@" >/dev/null 2>&1; then
    results+="  ✓ $name\n"
    ((pass++))
  else
    results+="  ✗ $name\n"
    ((fail++))
  fi
}

run_check "TypeScript"       bun run typecheck
run_check "ESLint"           bun run lint
run_check "Prettier"         bun run format:check
run_check "Build"            bun run build

echo ""
echo "─── Check Results ───"
printf "$results"
echo "─────────────────────"
echo "  $pass passed, $fail failed"
echo ""

exit "$fail"
