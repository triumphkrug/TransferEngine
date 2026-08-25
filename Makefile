.PHONY: evidence-check test demo historical-replay
test: prompt-contract  evidence-check
	node records/validate.mjs
	node spec/evaluator.test.mjs
	node spec/route-console.test.mjs
	node spec/secret-scan.mjs
demo:
	node intelligence/demo.mjs

historical-replay:
	@test -n "$(KRUG_HISTORICAL_REPO)" || (echo "KRUG_HISTORICAL_REPO must point at a full clone of the owner history"; exit 2)
	KRUG_HISTORICAL_REPO="$(KRUG_HISTORICAL_REPO)" node scripts/check-historical-replay.mjs

evidence-check:
	node scripts/check-evidence.mjs records/mainnet-receipts.json records/checkpoints.json

prompt-contract:
	node spec/prompt-contract.test.mjs
