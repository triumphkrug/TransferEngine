# Transfer Engine — what is on Mainnet

Source of truth: [`records/mainnet-receipts.json`](../records/mainnet-receipts.json).
Ten stages of the 2026-08-17 evidence run reached terminal completion; the
manifest keeps the per-stage timing, this page keeps the identifiers.

## Counting rule

A stage counts only when MemWal `rememberAndWait` comes back terminal with a
non-empty `blob_id`. Job IDs, acknowledgements and timeouts are diagnostics and
were never counted as storage.

## Spot check in the explorer

[`TE-01`](https://walruscan.com/mainnet/blob/WD_mpJnBS4gz8iXd39Wgmu4DAY3M1o9HDe15jP8nalc)
was opened by hand on Walruscan on 2026-08-22 and resolves. That establishes
public reachability of one blob — nothing about the local policy outcome, the
full recall inventory, or any write made by the demo in this repository.

## Stage table

| Stage | Terminal blob ID | Re-read by a fresh client |
|---|---|---|
| TE-01 | `WD_mpJnBS4gz8iXd39Wgmu4DAY3M1o9HDe15jP8nalc` | no |
| TE-02 | `ZgrbF0QdHaOiysGib0TeycJPTpqUUErmsGUPnwK8UNs` | no |
| TE-03 | `HItdmB2X0H-BTKKWdx6PbX0kQLWh7VIal5jc92hOAfI` | yes (1 result matches) |
| TE-04 | `uOvP4skVJQL-3nWV0Q37hHCBI_Dne9AYF20jqCUV2Kk` | no |
| TE-05 | `_q8ZndFi-pd2WslC-bfzV0mnNS27Ej_y-HT9L8CSabc` | no |
| TE-06 | `ryxvQKNMhKHzy8-HQ3KKEgf0Rb1SwHESjljX-nPcnmw` | yes (4 result matches) |
| TE-07 | `ALXZDm-NdipxtoCFVAevNvxCFSglg2OSmOwzZsh95os` | yes (5 result matches) |
| TE-08 | `sc8I_MT8i9kCphTcXr37AWQooq1nNba_5A6W6aSgrvc` | yes (6 result matches) |
| TE-09 | `UH4mmXn0KRnBzaLMzifgJSt4CddWFpK7P1OXTTdC_ac` | no |
| TE-10 | `hHztrPbQJU-rUnro-SYR6C8B9tvAb6N3EdSUXiZ3E_s` | yes (2 result matches) |

## Reading this honestly

- Every row is a committed terminal receipt carrying a non-empty `blob_id`.
- Five of the ten stages were re-read by a client with no prior state; the other five were not.
- `make test` and the demo evaluate transfer policy over committed fixtures. They perform no write and did not create these receipts.
