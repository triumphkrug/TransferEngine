.PHONY: evidence-check test demo historical-replay
test: evidence-check
	node records/validate.mjs
	node spec/evaluator.test.mjs
	node spec/lab.test.mjs
	node spec/secret-scan.mjs
demo:
	node intelligence/demo.mjs

historical-replay:
	@test -n "$(KRUG_HISTORICAL_REPO)" || (echo "Set KRUG_HISTORICAL_REPO to a full owner-scoped clone"; exit 2)
	KRUG_HISTORICAL_REPO="$(KRUG_HISTORICAL_REPO)" node scripts/check-historical-replay.mjs

evidence-check:
	node scripts/check-evidence.mjs records/mainnet-receipts.json
