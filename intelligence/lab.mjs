// Shared lab runner used by both the CLI and the web API route.
// It calls the canonical evaluator in ./evaluator.mjs and derives a per-field
// checkpoint view from the canonical reasons. No outcome is invented here.
import { evaluate } from './evaluator.mjs';

export const COMPARED_FIELDS = [
  { key: 'domain', label: 'Domain' },
  { key: 'issuer_class', label: 'Issuer class' },
  { key: 'factor', label: 'Factor' },
  { key: 'threshold', label: 'Threshold value' },
  { key: 'threshold_direction', label: 'Threshold direction' },
  { key: 'rule_version', label: 'Rule version' },
  { key: 'scope', label: 'Scope' }
];

export const SCENARIOS = [
  {
    id: 'compatible',
    tag: '01',
    name: 'Aligned target case',
    summary: 'Every compared field carries the same typed value, and a committed target-local verifier is selected.',
    target: 'compatible',
    verifier: 'committed allowlisted scorer'
  },
  {
    id: 'mismatch',
    tag: '02',
    name: 'Divergent issuer domain',
    summary: 'A superficially similar case arrives from a different issuer domain, so the conjunctive gate stops the route.',
    target: 'mismatch',
    verifier: 'committed allowlisted scorer'
  },
  {
    id: 'no-verifier',
    tag: '03',
    name: 'No target-local verifier',
    summary: 'Fields align, but no reviewed target-local scorer is supplied, so compatibility alone cannot authorise a transfer.',
    target: 'compatible',
    verifier: null
  }
];

// Public route language. The canonical token is always carried alongside it in
// the trace so the surface stays honest and reproducible.
const ROUTES = {
  applied: {
    route: 'Transfer route open',
    detail: 'Every compared field matched and the target-local scorer passed, so the prior lesson is applied to this case.'
  },
  rejected: {
    route: 'Non-transfer route',
    detail: 'At least one safety-critical field diverges. Compatibility is conjunctive, so the lesson stays with its own case.'
  },
  rejected_transfer: {
    route: 'Quarantine route',
    detail: 'Instruction-shaped or secret-like content was found while scanning the record, so the candidate is quarantined before any comparison.'
  },
  blocked: {
    route: 'Local-verification route',
    detail: 'The gate holds the transfer until a reviewed target-local verifier runs in the target itself.'
  },
  conflict: {
    route: 'Owner escalation route',
    detail: 'Viable records disagree, so the choice is escalated instead of picked by similarity or recency.'
  }
};

export function routeFor(outcome) {
  return ROUTES[outcome] || {
    route: 'Owner escalation route',
    detail: 'The canonical resolver returned an outcome this surface does not map, so the case is escalated.'
  };
}

function checkpointsFrom(result, quarantined) {
  const reasonFields = new Set(
    (result.reasons || [])
      .map((r) => String(r).split(':')[0].trim())
  );
  const list = COMPARED_FIELDS.map(({ key, label }) => ({
    key,
    label,
    state: quarantined ? 'not-compared' : reasonFields.has(key) ? 'diverges' : 'match'
  }));
  const verification = quarantined
    ? 'not-compared'
    : result.outcome === 'applied'
      ? 'match'
      : result.outcome === 'blocked'
        ? 'awaiting'
        : 'not-compared';
  list.push({ key: 'local_verification', label: 'Target-local verifier', state: verification });
  return list;
}

/**
 * Run one committed scenario through the canonical evaluator.
 * `note` is real, bounded operator text: it is attached to the target record as
 * an `analyst_note` field and is therefore scanned by the canonical
 * trust-boundary scan. It never sets or overrides any compared field value.
 */
export function runScenario(scenarioId, note = '', cases) {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  const lesson = cases.lesson;
  const trimmed = String(note || '').slice(0, 600).trim();
  const target = trimmed
    ? { ...cases[scenario.target], analyst_note: trimmed }
    : { ...cases[scenario.target] };
  const options = scenario.verifier ? { verifyLocal: () => true } : {};
  const result = evaluate(lesson, target, options);
  const quarantined = result.outcome === 'rejected_transfer';
  return {
    scenario: {
      id: scenario.id,
      tag: scenario.tag,
      name: scenario.name,
      summary: scenario.summary,
      verifier: scenario.verifier
    },
    ...routeFor(result.outcome),
    canonical: { outcome: result.outcome, reasons: result.reasons },
    checkpoints: checkpointsFrom(result, quarantined),
    noteScanned: Boolean(trimmed),
    noteQuarantined: quarantined,
    source: 'intelligence/evaluator.mjs',
    cli: 'make test && make demo'
  };
}
