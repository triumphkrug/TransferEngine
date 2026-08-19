.PHONY: evidence-check test demo
test: evidence-check
	node records/validate.mjs
	node spec/evaluator.test.mjs
	node spec/secret-scan.mjs
demo:
	node intelligence/demo.mjs

evidence-check:
	node scripts/check-evidence.mjs records/mainnet-receipts.json
