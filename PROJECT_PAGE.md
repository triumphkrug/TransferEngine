# Transfer Engine — hackathon project page

Copy for the Walrus Sessions 7 project listing. Every claim here is reproducible
from this repository. Owner review is required before publication.

- **Project name:** Transfer Engine
- **Tagline:** A recalled lesson travels only as far as its checkpoints allow.
- **Tags:** Walrus Memory · Prompt evolution · Retrieval · Risk review
- **Owner:** `triumphkrug`
- **Logo:** [`brand/logo.png`](./brand/logo.png) — 512x512
- **Cover image:** [`brand/article-banner.png`](./brand/article-banner.png) — 1200x630

## Short description

Turns "this looks like the thing I got wrong before" into a typed, conjunctive compatibility decision with a target-local verifier.

## About

### The failure this came from

An agent recalled a past scoring lesson and applied it to a case that read almost identically: same wording, same shape of question, different issuer domain.

The recall was accurate. The lesson was real. The answer was wrong.

Every visible signal looked healthy, which is what makes this class of failure easy to miss. What was missing was a step nobody had written down: deciding whether the past lesson was allowed to travel to this case at all.

### What the evolved prompt changes

Ranking cannot fix this. Taking the top result, preferring the newest record, requiring a confidence floor, adding a similarity threshold — all four measure resemblance more precisely, and resemblance was never the problem. A stricter threshold under a newer rule version resembles the older one almost perfectly. That is exactly why it is dangerous.

The unit of memory changes first. A lesson stops being prose with a score and becomes a typed record of twenty fields, among them `domain`, `issuer_class`, `factor`, `threshold`, `threshold_direction`, `rule_version`, `scope` and `supersedes`. Threshold value and direction are represented independently, because "0.75 minimum" and "0.75 maximum" are not a near-match, they are opposites.

Seven fields are then compared source to target as `match`, `mismatch` or `unknown`. The comparison is conjunctive: strong agreement in six fields cannot compensate for disagreement in the seventh, and numeric or string coercion is forbidden. Unknown counts as incompatible.

Even when all seven agree, the route stays closed until a reviewed target-local verifier passes in the target. Compatibility is not authorisation.

### For judges

Open the route console, select "Divergent issuer domain", and read the checkpoint that fired. Then `node spec/lab.test.mjs` asserts the same route mapping.

## Evidence boundary

The deterministic policy result, the historical replay, and Mainnet persistence are three separate claims. The route console proves the first one live and makes no storage claim.

The historical replay pins a real one-commit interval in owner history, `cf124f6` → `1bab9bc`, machine-checked against exact commit, author, changed-file, hardening-marker and prompt-hash conditions. It produces no new Mainnet write, no financial score and no advice.

## Links

| Label | URL |
|---|---|
| Live demo | https://transfer-engine.vercel.app |
| Repository | https://github.com/triumphkrug/TransferEngine |
| Evolved prompt | https://github.com/triumphkrug/TransferEngine/blob/main/PROMPT.md |
| Source prompt | Exam Mistake Memory — https://github.com/EAZITECH1/exam-mistake-memory |
| Write-up | https://github.com/triumphkrug/TransferEngine/blob/main/ARTICLE.md |
| Receipts | https://github.com/triumphkrug/TransferEngine/blob/main/docs/RECEIPTS.md |

## Media gallery captions

1. `brand/article-banner.png` — cover: the failure and the changed behaviour in one frame.
2. The demo screenshot committed in this repository — the named scenario with its verdict and the rule that produced it.
3. The architecture diagram committed in this repository — how a recalled record reaches, or fails to reach, the agent.

## Owner fields to complete before submitting

- Team members and handles: `TEAM_HANDLES`
- Published article URL: `ARTICLE_URL`
- Source-repository feedback issue URL: `SOURCE_ISSUE_URL`
- Demo video URL: `VIDEO_URL`
- Sessions wallet public address: `SESSIONS_WALLET_ADDRESS`
