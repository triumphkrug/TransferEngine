import { NextResponse } from 'next/server';
import { runScenario, SCENARIOS } from '../../../../intelligence/lab.mjs';
import cases from '../../../../cases/lessons.json';

export const dynamic = 'force-dynamic';

function respond(scenarioId, note) {
  const id = SCENARIOS.some((s) => s.id === scenarioId) ? scenarioId : SCENARIOS[0].id;
  return NextResponse.json(runScenario(id, note, cases));
}

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  return respond(params.get('scenario'), params.get('note') || '');
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  return respond(body.scenario, typeof body.note === 'string' ? body.note : '');
}
