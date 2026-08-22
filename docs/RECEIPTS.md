# Transfer Engine — Mainnet receipt inventory

This inventory is generated from the committed [`records/mainnet-receipts.json`](../records/mainnet-receipts.json). It records **10 terminal receipt rows** in the declared `mainnet` evidence run.

## Receipt rule

A checkpoint is counted only after MemWal rememberAndWait returns terminal completion with a non-empty blob_id. Job IDs are diagnostic metadata, not storage proof.

## Independently opened explorer proof

[`TE-01` — Walruscan Mainnet blob](https://walruscan.com/mainnet/blob/WD_mpJnBS4gz8iXd39Wgmu4DAY3M1o9HDe15jP8nalc) was opened in Walruscan on 2026-08-22. The explorer confirms that this referenced blob is reachable through the public Mainnet explorer. It does not establish the local policy outcome, a full semantic-recall inventory, or a new write from this repository’s demo.

## Committed receipt rows

| Stage | Terminal blob ID | Started at | Fresh-client cold recall |
|---|---|---|---|
| TE-01 | `WD_mpJnBS4gz8iXd39Wgmu4DAY3M1o9HDe15jP8nalc` | 2026-08-17T22:57:00.091Z | — |
| TE-02 | `ZgrbF0QdHaOiysGib0TeycJPTpqUUErmsGUPnwK8UNs` | 2026-08-17T22:57:44.708Z | — |
| TE-03 | `HItdmB2X0H-BTKKWdx6PbX0kQLWh7VIal5jc92hOAfI` | 2026-08-17T23:02:50.185Z | found (1 result(s)) |
| TE-04 | `uOvP4skVJQL-3nWV0Q37hHCBI_Dne9AYF20jqCUV2Kk` | 2026-08-17T23:03:37.107Z | — |
| TE-05 | `_q8ZndFi-pd2WslC-bfzV0mnNS27Ej_y-HT9L8CSabc` | 2026-08-17T23:04:06.752Z | — |
| TE-06 | `ryxvQKNMhKHzy8-HQ3KKEgf0Rb1SwHESjljX-nPcnmw` | 2026-08-17T23:04:27.417Z | found (4 result(s)) |
| TE-07 | `ALXZDm-NdipxtoCFVAevNvxCFSglg2OSmOwzZsh95os` | 2026-08-17T23:05:16.941Z | found (5 result(s)) |
| TE-08 | `sc8I_MT8i9kCphTcXr37AWQooq1nNba_5A6W6aSgrvc` | 2026-08-17T23:05:40.562Z | found (6 result(s)) |
| TE-09 | `UH4mmXn0KRnBzaLMzifgJSt4CddWFpK7P1OXTTdC_ac` | 2026-08-17T23:16:04.166Z | — |
| TE-10 | `hHztrPbQJU-rUnro-SYR6C8B9tvAb6N3EdSUXiZ3E_s` | 2026-08-17T23:16:29.070Z | found (2 result(s)) |

## What this inventory verifies

- Each listed row is a committed terminal receipt with a non-empty `blob_id` under the manifest rule.
- The listed cold-recall markers record the manifest’s fresh-client observations.
- The deterministic local test and demo verify policy behavior separately; they do not create these receipts.
