# Transfer Engine — project page copy

**A recalled lesson travels only as far as its checkpoints allow.**

Turns "this looks like the thing I got wrong before" into a typed, conjunctive compatibility decision with a target-local verifier.

## §1 Entry details

- Owner: `triumphkrug`
- Evolved from: Exam Mistake Memory — https://github.com/EAZITECH1/exam-mistake-memory
- Topics: Walrus Memory · Prompt evolution · Retrieval · Risk review
- Demo: https://transfer-engine.vercel.app
- Repository: https://github.com/triumphkrug/TransferEngine

## §2 The case that produced the rule

An agent recalled a past scoring lesson and applied it to a case that read almost identically: same wording, same shape of question, different issuer domain.

The recall was accurate. The lesson was real. The answer was wrong.

Every visible signal looked healthy, which is what makes this class of failure easy to miss. What was missing was a step nobody had written down: deciding whether the past lesson was allowed to travel to this case at all.

## §3 The adjudication

Ranking cannot fix this. Taking the top result, preferring the newest record, requiring a confidence floor, adding a similarity threshold — all four measure resemblance more precisely, and resemblance was never the problem. A stricter threshold under a newer rule version resembles the older one almost perfectly. That is exactly why it is dangerous.

The unit of memory changes first. A lesson stops being prose with a score and becomes a typed record of twenty fields, among them `domain`, `issuer_class`, `factor`, `threshold`, `threshold_direction`, `rule_version`, `scope` and `supersedes`. Threshold value and direction are represented independently, because "0.75 minimum" and "0.75 maximum" are not a near-match, they are opposites.

Seven fields are then compared source to target as `match`, `mismatch` or `unknown`. The comparison is conjunctive: strong agreement in six fields cannot compensate for disagreement in the seventh, and numeric or string coercion is forbidden. Unknown counts as incompatible.

Even when all seven agree, the route stays closed until a reviewed target-local verifier passes in the target. Compatibility is not authorisation.

## §4 Two minutes as a judge

Open the route console, select "Divergent issuer domain", and read the checkpoint that fired. Then `node spec/route-console.test.mjs` asserts the same route mapping.

## §5 Evidence, kept in separate boxes

The deterministic policy result, the historical replay, and Mainnet persistence are three separate claims. The route console proves the first one live and makes no storage claim.

The historical replay pins a real one-commit interval in owner history, `cf124f6` → `1bab9bc`, machine-checked against exact commit, author, changed-file, hardening-marker and prompt-hash conditions. It produces no new Mainnet write, no financial score and no advice.

## §6 Assets

| Asset | Path |
|---|---|
| Evolved prompt | `PROMPT.md` |
| Write-up | `ARTICLE.md` |
| Receipts | `docs/RECEIPTS.md` |
| Cover, 1200x630 | `brand/article-banner.png` |
| Mark, 512x512 | `brand/logo.png` |

Gallery order: cover, then the denied-route screenshot, then the transfer-route flowchart.

## §7 Owner blanks

`TEAM_HANDLES` · `ARTICLE_URL` · `SOURCE_ISSUE_URL` · `VIDEO_URL` · `SESSIONS_WALLET_ADDRESS`
