.PHONY: provider-matrix  evidence-check test demo historical-replay
provider-matrix:
	node scripts/check-provider-matrix.mjs records/provider-matrix-2026-08-21.json PROMPT.md

test: evidence-check
	node records/validate.mjs
	node spec/evaluator.test.mjs
	node spec/historical-replay.test.mjs
	node spec/secret-scan.mjs
demo:
	node intelligence/demo.mjs

historical-replay:
	node scripts/check-historical-replay.mjs

evidence-check:
	node scripts/check-evidence.mjs records/mainnet-receipts.json
