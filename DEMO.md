# Demo Runbook — Transfer Engine

## Local recording sequence

```bash
make test
make demo
```

1. Show the source lesson: regulated-fund issuer proof, declared threshold, scope, rule version, evidence, and active lifecycle.
2. Run the **baseline**: identical fields but no caller-selected verifier. It returns `blocked — local verification missing`; compatibility is not permission.
3. Run the **evolved decision**: the same target becomes `applied` only after the committed target-local verifier passes.
4. Run the superficially similar target with an unregulated issuer. It returns `rejected` and names the incompatible field.
5. The terminal ends at a separate receipt-board boundary: it structurally reports the committed manifest only, not a new write. Point to the regression test that blocks missing evidence, stale lifecycle, unknown attributes, and threshold drift.

## Claim boundary

This is a deterministic policy demo using a synthetic RWA-style fixture. It does not claim an on-chain score, a production financial decision, or a completed Mainnet write. Add live receipt/recovery footage only when a stage has a terminal `blob_id` and cold recall.
