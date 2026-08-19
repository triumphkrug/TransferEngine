import fs from 'node:fs';
import {evaluate} from './evaluator.mjs';

const x=JSON.parse(fs.readFileSync('cases/lessons.json','utf8'));
const show=(label,result)=>{
  console.log(`${label}: ${result.outcome} — ${result.reasons.join('; ')}`);
  return result;
};
console.log('TRANSFER ENGINE — READ-ONLY LOCAL POLICY DEMO');
console.log('BASELINE: matching fields alone cannot authorize transfer.');
const baseline=show('BASELINE',evaluate(x.lesson,x.compatible));
console.log('EVOLVED: a committed target-local verifier independently passes.');
const evolved=show('EVOLVED',evaluate(x.lesson,x.compatible,{verifyLocal:()=>true}));
const mismatch=show('MISMATCH',evaluate(x.lesson,x.mismatch,{verifyLocal:()=>true}));
if(baseline.outcome!=='blocked'||evolved.outcome!=='applied'||mismatch.outcome!=='rejected')throw new Error('transfer policy assertion failed');
const manifest=JSON.parse(fs.readFileSync('records/mainnet-receipts.json','utf8'));
const rows=manifest.receipts||manifest;
const cold=rows.filter(x=>x.cold_recall?.status==='found'||x.cold_recall_result==='found').length;
console.log(`COMMITTED MAINNET MANIFEST: ${rows.length} terminal receipt rows; ${cold} fresh-client cold recalls.`);
console.log('PROVIDER BEHAVIOR: INCOMPLETE — not asserted by this local demo.');
console.log('ASSERTION: PASS — compatibility blocked without local proof; mismatched transfer rejected.');
