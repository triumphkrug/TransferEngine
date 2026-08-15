# Draft article — Transfer Engine

> Publication draft; replace bracketed evidence only after live execution and owner review.

## I taught a memory agent when not to transfer a lesson

I selected Exam Mistake Memory because remembering an earlier mistake is valuable only if a later task can use it correctly. The difficult part is transfer. A prior lesson can be semantically close to a new case and still be wrong because the issuer domain, risk factor, threshold, or policy version differs.

I evolved the prompt into Transfer Engine. It stores a lesson with its domain, factor, threshold, rule version, scope, evidence, and effective time. On a new case, it makes the agent compare those safety-critical attributes before applying the lesson. A mismatch is not silent failure: it is a recorded rejected transfer with a reason.

I tested the policy on a small RWA-style risk scenario. A verified issuer-proof lesson transfers to another regulated-fund case at the same threshold and policy version. The same lesson is rejected for an unregulated issuer, despite matching wording and factor. That rejection is useful; it prevents semantic memory from becoming unsafe generalization.

The demo is local and deterministic. It does not claim a live score or chain transaction. For the Mainnet evidence run, I will execute ten distinct development checkpoints across observation, cold recall, diagnosis, compatible application, mismatch rejection, supersession, and a late regression. **[Replace after run: agent ID, confirmed blob count, receipts, and observed outcomes.]**
