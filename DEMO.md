# Demo Runbook — Transfer Engine

## Local recording sequence

```bash
make test
make demo
make historical-replay KRUG_HISTORICAL_REPO=/path/to/RWA-Sentinel
```

1. Show the source lesson: regulated-fund issuer proof, declared threshold, scope, rule version, evidence, and active lifecycle.
2. Run the **baseline**: identical fields but no caller-selected verifier. It returns `blocked — local verification missing`; compatibility is not permission.
3. Run the **evolved decision**: the same target becomes `applied` only after the committed target-local verifier passes.
4. Run the superficially similar target with an unregulated issuer. It returns `rejected` and names the incompatible field.
5. The terminal ends at a separate receipt-board boundary: it structurally reports the committed manifest only, not a new write. Point to the regression test that blocks missing evidence, stale lifecycle, unknown attributes, and threshold drift.

## Historical replay sequence

6. Use the full owner-scoped `triumphkrug/RWA-Sentinel` clone and run the `make historical-replay` command above.
7. The checker prints the selected direct interval: the MCP/anomaly/document/oracle expansion at `cf124f6…` and its immediate owner-authored security repair at `1bab9bc…`.
8. Show the machine-checked policy result `applied` only after exact commit, author, changed-file, hardening-marker, and prompt-hash checks pass. This is a replay of a historical security repair; it does not score a live asset.

## Claim boundary

The compatibility fixture is synthetic. The separate historical replay uses owner-scoped RWA-Sentinel commits and proves a reproducible policy application to a real historical input. Neither component claims an on-chain score, a production financial decision, a provider-model run, or a completed new Mainnet write. Add live receipt/recovery footage only when a stage has a terminal `blob_id` and cold recall.
