import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {evaluate} from '../intelligence/evaluator.mjs';

const repo=process.env.KRUG_HISTORICAL_REPO;
if(!repo){
  console.log('historical replay: SKIP (set KRUG_HISTORICAL_REPO to a full owner-scoped clone)');
  process.exit(0);
}
const root=resolve(repo);
const manifest=JSON.parse(readFileSync(new URL('../replay/historical-owner-replay.json',import.meta.url)));
const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
const base=manifest.base_commit, repair=manifest.repair_commit;

assert.equal(git('rev-parse',`${repair}^`),base,'repair must directly follow the selected historical base');
assert.equal(git('rev-list','--count',`${base}..${repair}`),'1','replay interval must be one commit');
assert.equal(git('show','-s','--format=%an <%ae>',repair),'triumphkrug <triumphkrug@gmail.com>','repair must be owner-authored');
assert.match(git('show','-s','--format=%s',repair),/^security: input validation, bounded arrays, division-by-zero, hash collision fixes$/,'selected repair subject changed');
const paths=git('diff-tree','--no-commit-id','--name-only','-r',repair).split('\n');
assert.deepEqual(paths,manifest.historical_input.changed_paths,'repair file boundary changed');
const diff=git('diff',`${base}`,repair,'--',...paths);
for(const marker of [
  'Number.isFinite(report.price)',
  'MAX_REPORTS_PER_ASSET',
  'overallMean === 0',
  'JSON.stringify({',
  'function validateId(',
]){
  assert.match(diff,new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),`missing historical hardening marker: ${marker}`);
}
const prompt=readFileSync(new URL('../PROMPT.md',import.meta.url));
const promptHash=createHash('sha256').update(prompt).digest('hex');
assert.notEqual(manifest.policy_application.source_prompt_sha256,'TO_BE_FILLED_BY_CHECKER','manifest prompt hash is not frozen');
assert.equal(promptHash,manifest.policy_application.source_prompt_sha256,'source prompt revision changed');
const {lesson,target}=manifest.policy_application;
const result=evaluate(lesson,target,{verifyLocal:()=>true});
assert.equal(result.outcome,'applied','validated historical repair should satisfy the transfer contract');
assert.deepEqual(result.reasons,['local verification passed']);
console.log(JSON.stringify({
  replay_id:manifest.replay_id,
  source_repository:manifest.source_repository,
  base_commit:base,
  repair_commit:repair,
  changed_paths:paths,
  source_prompt_sha256:promptHash,
  policy_outcome:result.outcome,
  boundary:manifest.evidence_boundary
},null,2));
