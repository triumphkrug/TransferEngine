import { NextResponse } from 'next/server';
import { evaluate } from '../../../../intelligence/evaluator.mjs';
import cases from '../../../../cases/lessons.json';
export const dynamic = 'force-dynamic';
export async function GET(request) {
  const scenario = new URL(request.url).searchParams.get('scenario') || '0';
  const out = scenario === '0' ? evaluate(cases.lesson, cases.compatible, {verifyLocal:()=>true}) : scenario === '1' ? evaluate(cases.lesson, cases.mismatch, {verifyLocal:()=>true}) : evaluate(cases.lesson, cases.compatible);
  return NextResponse.json({outcome:out.outcome, reasons:out.reasons, source:'intelligence/evaluator.mjs'});
}
