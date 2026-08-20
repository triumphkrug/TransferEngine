.PHONY: evidence-check test demo historical-replay
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
