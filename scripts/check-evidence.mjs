import {readFileSync} from 'node:fs';

const [manifestPath, checkpointPath] = process.argv.slice(2);
if (!manifestPath) throw new Error('check-evidence: pass the receipt manifest path');

const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const manifest = read(manifestPath);
const receipts = Array.isArray(manifest) ? manifest : manifest.receipts ?? [];

const problems = [];
if (receipts.length !== 10) problems.push(`stage count is ${receipts.length}, the published inventory says 10`);
receipts.forEach((r, i) => {
  if (!r.blob_id) problems.push(`stage ${i + 1} has no terminal blob_id`);
});
const cold = receipts.filter((r) => r.cold_recall?.status === 'found' || r.cold_recall_result === 'found');
if (cold.length !== 5) problems.push(`cold recalls: ${cold.length}, published inventory says 5`);

if (checkpointPath) {
  const cp = read(checkpointPath);
  if (cp.evidence_status !== 'mainnet_confirmed_10_of_10') problems.push('checkpoint evidence_status drifted');
  for (const row of cp.checkpoints ?? []) {
    if (row.mainnet_status !== 'confirmed' || !row.blob_id) problems.push(`checkpoint ${row.stage_id ?? '?'} is not backed by a confirmed receipt`);
  }
}

if (problems.length) {
  console.error(['receipt consistency: FAIL', ...problems.map((p) => `  - ${p}`)].join('\n'));
  process.exit(1);
}
console.log(`receipt consistency: OK (${receipts.length} stages / ${cold.length} cold recalls)`);
