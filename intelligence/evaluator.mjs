const UNTRUSTED=/(ignore (all )?(prior|policy|instructions)|curl\b|api[_ -]?key|private key|password|seed phrase|ghp_[a-z0-9]{20,}|\bsk-[a-z0-9]{8,}|token\s*[=:]|run (this )?command|override .*instruction)/i;
const lifecycle=new Set(['active','superseded','expired','quarantined','rejected']);
function strings(value,out=[]){
  if(typeof value==='string')out.push(value);
  else if(Array.isArray(value))for(const item of value)strings(item,out);
  else if(value&&typeof value==='object')for(const item of Object.values(value))strings(item,out);
  return out;
}
export function evaluate(lesson,target){
  const reasons=[];
  // The prompt quarantines untrusted content in ANY field, so scan every string
  // value rather than a hand-picked list that a new field could slip past.
  const lessonText=strings(lesson).join(' ');
  const targetText=strings(target).join(' ');
  if(UNTRUSTED.test(lessonText)||UNTRUSTED.test(targetText))return {outcome:'rejected_transfer',reasons:['untrusted-content: quarantined candidate, not compared for compatibility']};
  if(!Number.isFinite(Date.parse(lesson.effective_at))||!Number.isFinite(Date.parse(target.effective_at)))
    return {outcome:'rejected_transfer',reasons:['schema: invalid effective_at']};
  if(!lifecycle.has(lesson.status)||!lifecycle.has(target.status))
    return {outcome:'rejected_transfer',reasons:['schema: invalid lifecycle status']};
  if((lesson.expires_at&&Date.parse(lesson.expires_at)<=Date.now())||(target.expires_at&&Date.parse(target.expires_at)<=Date.now()))
    return {outcome:'rejected_transfer',reasons:['lifecycle: expired']};
  for(const f of ['domain','issuer_class','factor','threshold_direction','rule_version','scope'])
    if(!lesson[f]||!target[f]||lesson[f]!==target[f])reasons.push(`${f}: incompatible or unknown`);
  if(!Number.isFinite(lesson.threshold)||!Number.isFinite(target.threshold)||target.threshold!==lesson.threshold)
    reasons.push('threshold: incompatible or unknown');
  if(!lesson.evidence||lesson.confidence!=='high')reasons.push('evidence: source lesson is not grounded/high confidence');
  if(['superseded','expired','quarantined','rejected'].includes(lesson.status))reasons.push(`lifecycle: ${lesson.status}`);
  return {outcome:reasons.length?'rejected':'applied',reasons}
}
