// ---------------------------------------------------------------------< types
import { Vector } from '../types';
// ============================================================================
export function distanceBetween(a: Vector, b: Vector) {
  const { sqrt, pow, abs } = Math;

  const sq = (n: number) => pow(abs(n), 2);

  return sqrt(sq(a.x - b.x) + sq(a.y - b.y));
}
