# Demo Runbook — Transfer Engine

## Local recording sequence

```bash
make test
make demo
```

1. Show the source lesson: regulated-fund issuer proof, declared threshold, scope, rule version, evidence, and active lifecycle.
2. Run the compatible target. The evaluator returns `applied` only because every safety-critical field matches.
3. Run the superficially similar target with an unregulated issuer. The evaluator returns `rejected` and names the incompatible field.
4. Point to the regression test that blocks missing evidence, stale lifecycle, unknown attributes, and threshold drift.

## Claim boundary

This is a deterministic policy demo using a synthetic RWA-style fixture. It does not claim an on-chain score, a production financial decision, or a completed Mainnet write. Add live receipt/recovery footage only when a stage has a terminal `blob_id` and cold recall.
