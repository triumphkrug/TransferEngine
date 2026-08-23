# Transfer Engine — recording runbook

Record only after the owner has reviewed the final repository. No credentials, no wallet
material, no live writes on screen.

**The claim being demonstrated:** a recalled lesson is applied only when eight typed
checkpoints agree and a target-local verifier passes in the target.

## Before the camera starts

```bash
make test
```

Open <https://transfer-engine.vercel.app> with target case **01 Aligned target case**
selected. The eight checkpoint cards must be in frame.

## Segments — one field at a time

| Time | Screen | Spoken point |
|---|---|---|
| 0:00–0:12 | The two case descriptions side by side | "Same wording, same shape of question, different issuer domain. The recall was right; the transfer was not." |
| 0:12–0:26 | Case 01, press **Run the route** | "Eight checkpoints pass, the target-local verifier passes, and only then: APPLIED." |
| 0:26–0:44 | Switch to **02 Divergent issuer domain** | "Checkpoints 01 and 02 turn denied. The gate names the field instead of scoring a similarity." |
| 0:44–0:58 | Switch to **03 No target-local verifier** | "Every compared field matches and the route still does not open. Compatibility is not authorisation." |
| 0:58–1:12 | Paste an injection attempt into the operator note | "The note is scanned by the same trust boundary the CLI uses. It can never set a compared field." |
| 1:12–1:26 | Terminal: `node spec/lab.test.mjs` | "The same route mapping the page just rendered, asserted in the suite." |
| 1:26–1:38 | `docs/RECEIPTS.md` and the Walruscan link | "Persistence is a separate claim with its own evidence." |

## Closing line, mandatory

> Similarity proposes a candidate. A conjunctive typed gate and a reviewed target-local
> verifier decide. No score, no financial advice, no new Mainnet write.

## Check before publishing

- [ ] All three target cases appear, and the denied one names its field.
- [ ] The run counter and timestamp are visible so no run is mistaken for an earlier one.
- [ ] Historical replay is described as owner-scoped history, not as a live write.
- [ ] No key, token, private path, or personal data is on screen.
