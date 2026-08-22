# Transfer Engine — replay receipt

## What is replayed

Owner-history replay: a known repair interval is evaluated as a transfer-compatibility case.

## Reproduce

1. Run `make test`; it executes the self-contained historical replay test.
2. Inspect [`replay/historical-owner-replay.json`](../replay/historical-owner-replay.json) for the pinned provenance and outcome fields.

## Ground truth and policy result

The committed bundle is cloned into an isolated temporary repository by `spec/historical-replay.test.mjs`; it verifies the pinned interval and the required transfer disposition.

## Boundary

The replay is deterministic historical policy evidence, not a new storage operation.
