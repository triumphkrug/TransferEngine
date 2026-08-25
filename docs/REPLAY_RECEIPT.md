# Replay receipt

**The interval.** One owner-authored security repair from this account's
history, taken with its direct parent, and put through the transfer contract as
a compatibility case.

**Running it.** `KRUG_HISTORICAL_REPO=<clone> make historical-replay`, or
`make test`, which runs `spec/historical-replay.test.mjs` against the committed
bundle in an isolated checkout. Pinned SHAs, changed paths and the expected
disposition live in
[`replay/historical-owner-replay.json`](../replay/historical-owner-replay.json).

**The disposition.** The pinned interval must match exactly, the repair must be
owner-authored, the hardening markers must be present in the diff, and the
lesson must then satisfy every checkpoint before the transfer is applied.

**The limit.** This is local historical policy evidence over a committed
bundle. It writes nothing, stores nothing, and claims nothing about provider
behaviour.
