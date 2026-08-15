.PHONY: test demo
test:
	node records/validate.mjs
	node spec/evaluator.test.mjs
	node spec/secret-scan.mjs
demo:
	node intelligence/demo.mjs
