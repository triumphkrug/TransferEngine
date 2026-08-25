import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

const tracked = execFileSync('git', ['ls-files'], {encoding: 'utf8'}).split('\n').filter(Boolean);
const forbidden = [
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{30,}/,
  /vcp_[A-Za-z0-9]{20,}/,
  /(?:PRIVATE_KEY|DELEGATE_KEY|SECRET)\s*=\s*[^\s'"#]+/,
];

let checked = 0;
const flagged = [];
for (const file of tracked) {
  if (file.endsWith('secret-scan.mjs')) continue;
  let body;
  try { body = readFileSync(file, 'utf8'); } catch { continue; }
  checked += 1;
  if (forbidden.some((rx) => rx.test(body))) flagged.push(file);
}

if (flagged.length) {
  console.error(`secret scan: FAIL — credential-shaped content in ${flagged.join(', ')}`);
  process.exit(1);
}
console.log(`secret scan: OK (${checked} tracked files)`);
