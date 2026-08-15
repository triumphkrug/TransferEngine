# Proposed issue — Mistake memory needs a transfer compatibility check

A mistake record can be recalled for a new task based on semantic similarity even when its domain, rule version, threshold, or safety scope differs. Consider an optional record extension with `domain`, `applies_to`, rule version, effective time, supersession, and an explicit transfer check that either applies a compatible lesson or records a reasoned rejection. This would make “learn from mistakes” safer when tasks are only superficially similar.
