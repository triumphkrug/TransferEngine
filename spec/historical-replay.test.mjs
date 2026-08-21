import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
if(!process.env.KRUG_HISTORICAL_REPO){
  console.log('historical replay test: UNVERIFIED (set KRUG_HISTORICAL_REPO to a full owner-scoped clone)');
  process.exit(0);
}
const result=spawnSync(process.execPath,['scripts/check-historical-replay.mjs'],{encoding:'utf8',env:process.env});
assert.equal(result.status,0,result.stderr);
assert.match(result.stdout,/TE-HIST-RWAS-01/);
console.log('historical replay test: PASS');
