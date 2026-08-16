# Transfer Engine

> **A past lesson transfers only when its domain compatibility can be explained.**

An evolution of [Exam Mistake Memory](https://github.com/EAZITECH1/exam-mistake-memory). That prompt captures mistakes so they are not repeated. Transfer Engine adds a compatibility gate: a lesson from one risk case can guide a new case only if the factor, issuer/domain, threshold, scope, and effective rule version match.

![Compatibility pipeline](./visuals/transfer-pipeline.svg)

## Problem

Semantic similarity is not compatibility. A prior scoring anomaly may look relevant to a new asset while involving a different issuer type, risk factor, threshold, or policy revision. Blindly transferring it creates a confident wrong answer; discarding all history loses useful learning.

## Reproduce

```bash
make test
make demo
```

The local scenario uses an RWA-style risk model. It accepts a prior lesson for the same factor/domain/rule revision, and rejects a superficially similar lesson when issuer domain differs. It is a deterministic policy demonstration, not a claim about a live asset or on-chain score.

## Evidence plan

[`records/checkpoints.json`](./records/checkpoints.json) defines ten distinct checkpoints, including cold recall, explicit mismatch rejection, compatible application, supersession, and late regression. Live Mainnet evidence is pending until confirmed receipts are produced; see [`records/mainnet-receipts.json`](./records/mainnet-receipts.json).

## Structure

```text
TransferEngine/
├── intelligence/     compatibility evaluator and transfer map
├── cases/            versioned RWA-style risk cases
├── records/          stage plan and safe receipts
├── visuals/          rendered pipeline graphic
├── spec/             deterministic regression test
├── PROMPT.md
├── ARTICLE.md
├── ISSUE.md
└── Makefile
```

## Video

Show a risk lesson entering the compatibility gate twice: one case shares its risk context and is applied after a local scorer check; the other has a domain mismatch and is rejected with a reason. Add Mainnet receipt evidence only after actual confirmation.

## Validation matrix

| Domain | Unsafe shortcut | Final transfer condition | Fixture | Status |
|---|---|---|---|---|
| identity | semantic similarity | exact domain and issuer class | `spec/evaluator.test.mjs` | pass |
| policy | rule drift | exact rule version and scope | `spec/evaluator.test.mjs` | pass |
| threshold | “stricter” treated as equivalent | exact value and direction | `spec/evaluator.test.mjs` | pass |
| provenance | ungrounded lesson transfers | high-confidence evidence | `spec/evaluator.test.mjs` | pass |
| lifecycle | stale lesson transfers | reject non-active lesson | `spec/evaluator.test.mjs` | pass |
| recall | empty/corrupt recall | diagnostic retry then block | live fixture | pending |
