import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const result=spawnSync(process.execPath,['scripts/check-historical-replay.mjs'],{encoding:'utf8'});
assert.equal(result.status,0,result.stderr);
assert.match(result.stdout,/historical replay: SKIP|TE-HIST-RWAS-01/);
console.log('historical replay test: PASS');
