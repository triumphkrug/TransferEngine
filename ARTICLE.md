# I Taught a Memory Agent When *Not* to Transfer a Lesson

> **Publication status: owner-review draft.** First-person voice and factual
> claims require adoption and approval by triumphkrug before publication.

I selected Exam Mistake Memory because remembering a previous error is useful only when the next task is genuinely compatible with that lesson. That final condition is easy to overlook. A new case can look similar in language while differing in issuer type, safety scope, decision threshold, or policy revision. If an agent transfers the old lesson anyway, memory has turned a past correction into a confident new mistake.

I evolved the prompt into **Transfer Engine**. A lesson is no longer just “what went wrong and what to do next.” It carries the attributes needed to test its applicability: domain, issuer class, factor, threshold and direction, rule version, scope, evidence, confidence, lifecycle, and effective time. On a new case, the agent evaluates those critical attributes conjunctively. Unknown is incompatible. A mismatch returns a named rejection rather than a softened similarity score.

I used a local RWA-style risk fixture to make the distinction visible. A high-confidence issuer-proof lesson applies to a regulated-fund case with the same factor, threshold, scope, and policy version. Then I present an unregulated-issuer case with superficially similar wording. The evaluator rejects it despite the lexical overlap, because domain compatibility is not established. That rejection is not an error path to hide; it is the outcome that protects the operator from an invalid transfer.

The baseline behavior I wanted to avoid was simple semantic reuse: find a remembered mistake that sounds relevant and use it as guidance. The evolved behavior asks a more useful question: *which exact conditions made this past lesson valid, and are they still true now?* If they are not, the agent retains the lesson as context but blocks its application. It can request evidence, create a narrower lesson, or escalate rather than pretending that memory gave a safe answer.

I added lifecycle rules for the same reason. A superseded, expired, quarantined, or weakly evidenced lesson cannot become active merely because retrieval ranked it highly. A top-K result is a candidate set, not a chronological database or proof that no newer record exists. The demo resolves eligibility before it decides whether scope allows use, so an out-of-scope successor cannot accidentally revive an older predecessor.

The repository contains the prompt, compatibility evaluator, deterministic scenario, regression suite, visual pipeline, ten-stage evidence plan, and a video runbook. The local tests prove the rule engine: compatible transfer applies; incompatible transfer names the failed fields; stale or ungrounded lessons are blocked. They do not claim a live financial score or Mainnet storage result.

The committed Mainnet evidence records ten terminal receipt rows and fresh-client cold-recall observations. [`docs/RECEIPTS.md`](./docs/RECEIPTS.md) gives the complete inventory and an independently opened Mainnet explorer link. An accepted asynchronous job, a timeout, or a local digest is never counted as storage proof. The practical result is a memory agent that learns from mistakes without treating similarity as permission to repeat them elsewhere.
