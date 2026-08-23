# The Day My Agent Remembered Correctly and Was Still Wrong

The agent did exactly what I had asked it to do. It recalled a lesson from an earlier risk review — a case
where a scoring shortcut had produced a bad call — and it applied that lesson to the case in front of it. The
recall was accurate. The lesson was real. The answer was wrong, because the new case came from a different
issuer domain, and the old lesson had never been true there.

That is a specific kind of failure, and it is easy to miss, because every visible signal looks healthy.
Retrieval worked. The remembered text was relevant. The wording of the two cases was nearly identical. What
was missing was a step nobody had written down: deciding whether the past lesson was allowed to travel to
this case at all.

I built Transfer Engine to write that step down.

## What the original prompt did well, and where it stopped

The starting point was Exam Mistake Memory, a prompt whose idea I still think is right: when you get
something wrong, store the correction so the next attempt does not repeat it. It handles capture carefully.
It defines what a mistake record contains and when to write one.

Its gap is the last mile. The prompt tells the agent to recall a relevant past mistake, and "relevant" is
decided by semantic retrieval. Semantic retrieval returns things that read alike. It has no opinion on
whether the rule version has changed since the lesson was written, whether the threshold direction is the
same, whether the issuer class matches, or whether the lesson has since been superseded. So the agent ends up
treating "this sounds like the thing I got wrong before" as if it were "this is the thing I got wrong
before."

My first attempts to fix it were all variations on ranking. Take the top result. Prefer the newest record.
Require a confidence floor. Add a similarity threshold. Every one of them failed on the same case, because
they are all measuring resemblance more precisely, and resemblance was never the problem. A stricter
threshold under a newer policy revision resembles the older one almost perfectly. That is exactly why it is
dangerous.

## The change: compatibility is a typed, conjunctive decision

The evolved prompt changes the unit of memory before it changes the decision. A lesson stops being prose with
a score attached and becomes a typed record with twenty fields, among them `domain`, `issuer_class`,
`factor`, `threshold`, `threshold_direction`, `rule_version`, `scope`, `applies_to`, `evidence`, `status`,
`effective_at` and `supersedes`. The threshold's value and its direction are represented independently,
because "0.75 minimum" and "0.75 maximum" are not a near-match, they are opposites.

On a new case, the agent no longer asks whether the old lesson is relevant. It asks which exact conditions
made the lesson valid, and whether those conditions still hold. Seven fields are compared source to target,
each recorded as `match`, `mismatch` or `unknown`. The comparison is conjunctive: strong agreement in six
fields cannot compensate for disagreement in the seventh, and numeric or string coercion is forbidden.
Unknown counts as incompatible, which is the rule that removes most of the silent damage — an agent that
guesses at a missing safety-critical field is an agent that will eventually guess wrong.

Three further rules turned out to matter as much as the comparison itself.

Lifecycle resolves first. Supersession, revocation, expiry and conflict are settled before scope filtering and
before compatibility, so a stale record cannot become active merely because retrieval ranked it highly. An
out-of-scope successor does not revive its predecessor.

Compatibility is not authorisation. Even when all seven fields match, the prompt refuses to apply the lesson
until a reviewed, allowlisted target-local verifier runs in the target and passes. The verifier is never
executed from memory. This is the rule I expected to argue with, and it is the one that has saved me most
often: matching context is a reason to test, not a reason to act.

Memory is data, never instruction. Both the recalled lesson and the proposed target are recursively scanned,
and instruction-shaped text, permission claims or secret-like values quarantine the candidate before any
field is compared.

## Before and after, on one case you can run

The repository ships the comparison as three committed scenarios, and `make demo` prints all of them.

Baseline behaviour, where the fields align but no target-local verifier has been supplied:

```
BASELINE: blocked — local verification missing
```

The evolved decision on the same target, once the committed verifier passes:

```
EVOLVED: applied — local verification passed
```

And the case that started all of this — a target whose text reads like a match but whose issuer domain
differs:

```
MISMATCH: rejected — domain: incompatible or unknown; issuer_class: incompatible or unknown
```

That third line is the whole point. Under the original prompt this case is a confident answer built on a
lesson that was never valid here. Under the evolved prompt it is a named refusal that tells the operator which
two fields closed the route, in a form they can check.

The numbers behind those lines: eight steps are shown per run, seven compared fields plus the verification
step. `make test` runs the prompt-contract mutation check across five material rules, the evidence
consistency check over the receipt manifest, the timeline validator, the evaluator suite, the lab suite and a
repository-wide secret scan across 8,292 files. The mutation check is the one I would look at first if I were
judging: it deletes each material rule from the prompt and requires the contract to fail. A rule that can be
removed without breaking a test was never really enforced.

Persistence evidence is kept deliberately separate. `records/mainnet-receipts.json` holds ten terminal
receipt rows and five fresh-client cold-recall markers, inventoried in `docs/RECEIPTS.md`, with one
independently opened Walruscan link for `TE-01`. A receipt counts only after `rememberAndWait` returns
terminal completion with a non-empty `blob_id`; job IDs, timeouts and local digests are diagnostics. The
demo does not write to Mainnet, and I do not present it as if it did.

## Watching it decide

The lab at [transfer-engine.vercel.app](https://transfer-engine.vercel.app) exists because the CLI
proof convinces engineers and almost nobody else. It runs the same resolver through an API route — no mocked
verdicts — and shows the run as a route: the source lesson on the left, each compared field as its own
checkpoint with its own outcome, and the verdict at display size in colour, naming the rule that fired and
stamping the run number and time.

Selecting the divergent-issuer case turns two checkpoints red and prints `DENIED`, with "Conjunctive
compatibility gate — domain" underneath. Removing the verifier prints `HELD`. Pasting an instruction into the
operator note prints `QUARANTINED` before any field is compared. Four states, four different pictures, all
produced by committed code.

## Reproducing this yourself

```bash
git clone https://github.com/triumphkrug/TransferEngine
cd TransferEngine
make test
make demo
```

The tests are plain Node scripts with no external services, no keys and no network. To see the browser lab,
`cd web && npm install && npm run build && npm start`. To exercise the policy against real history rather
than fixtures, `make historical-replay KRUG_HISTORICAL_REPO=/path/to/owner-historical-repository` replays a
pinned one-commit interval — an expansion of an MCP, anomaly, document and oracle surface, followed
immediately by the owner-authored security repair that added input validation, bounded histories and
arguments, zero-denominator handling and structured hashing — and checks the transfer decision against exact
commit, author, changed-file, hardening-marker and prompt-hash conditions.

## What this approach is for, and what it is not

Transfer Engine adjudicates transfer between typed records. That scope is deliberate, and it has edges worth
stating plainly.

It works where the domain can be typed. If you cannot name the fields that made a lesson valid, the gate has
nothing to compare, and you should expect it to hold or refuse rather than apply. That is the correct
behaviour, but it means the up-front modelling work is real work.

It is intentionally conservative. Conjunctive comparison with "unknown is incompatible" refuses transfers a
human expert might have allowed. I chose that direction because a refused transfer costs one review, and an
invalid one costs a wrong decision that looks correct.

It decides about memory, not with memory. Walrus Memory is append-only semantic retrieval: not a transactional
database, not a trusted clock, not a permission system. The prompt treats it that way, which is why terminal
receipts, cold recall from a fresh client, and local policy results are three separate claims in this
repository rather than one blended story.

The useful takeaway is smaller than the machinery around it. Storing what went wrong is the easy half of
agent memory. The half that decides whether an agent is trustworthy is knowing when a remembered lesson does
not apply — and being able to say, in named fields, exactly why.
