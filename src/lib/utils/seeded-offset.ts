/**
 * Deterministic pseudo-random offset in [-0.5, 0.5) derived from an integer
 * seed. Used to give rendered handwriting a stable per-line jitter (replacing
 * Math.random(), which re-randomized already-drawn lines on every keystroke).
 * The same seed always yields the same offset.
 */
export function seededOffset(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x) - 0.5
}
