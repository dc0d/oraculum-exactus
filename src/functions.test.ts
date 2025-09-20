import { describe, expect, test } from '@jest/globals';
import { randInt } from './functions.ts';
import { type RandFn } from './types.ts';

describe.each<{ min: number; max: number }>`
  min  | max
  ${0} | ${1}
  ${0} | ${10}
  ${1} | ${10}
  ${1} | ${1001}
`('randInt with min & max', ({ min, max }) => {
  test(`randInt(${min}, ${max})`, () => {
    for (let i = 0; i < 100; i++) {
      const r = randInt(min, max);
      expect(r).toBeGreaterThanOrEqual(min);
      expect(r).toBeLessThan(max);
      expect(Number.isInteger(r)).toBe(true);
    }
  });
});

describe.each<{ n: number }>`
  n
  ${1}
  ${10}
  ${10}
  ${1001}
  ${10}
`('randInt with min & max', ({ n }) => {
  test(`randInt(${n})`, () => {
    for (let i = 0; i < 100; i++) {
      const r = randInt(n);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThan(n);
      expect(Number.isInteger(r)).toBe(true);
    }
  });
});

const _: RandFn = randInt;
