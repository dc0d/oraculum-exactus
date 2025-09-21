import { describe, expect, test } from '@jest/globals';
import { roll, seededRNG, getRandomInt, type RollResult } from './roller';

describe.each<{ expr: string; expected: RollResult[] }>`
  expr               | expected
  ${'d6'}            | ${[{ sides: 6, rolls: [1] }]}
  ${'d10'}           | ${[{ sides: 10, rolls: [2] }]}
  ${'d6,d10'}        | ${[{ sides: 6, rolls: [1] }, { sides: 10, rolls: [6] }]}
  ${'2d6,2d10'}      | ${[{ sides: 6, rolls: [1, 4] }, { sides: 10, rolls: [4, 2] }]}
  ${'3d6'}           | ${[{ sides: 6, rolls: [1, 4, 3] }]}
  ${'3d6H'}          | ${[{ sides: 6, rolls: [1, 4, 3], highest: 4 }]}
  ${'3d6h'}          | ${[{ sides: 6, rolls: [1, 4, 3], highest: 4 }]}
  ${'3d6L'}          | ${[{ sides: 6, rolls: [1, 4, 3], lowest: 1 }]}
  ${'3d6l'}          | ${[{ sides: 6, rolls: [1, 4, 3], lowest: 1 }]}
  ${'2d100'}         | ${[{ sides: 100, rolls: [12, 53] }]}
  ${'d6,d10,d12'}    | ${[{ sides: 6, rolls: [1] }, { sides: 10, rolls: [6] }, { sides: 12, rolls: [5] }]}
  ${'1d6,1d10,1d12'} | ${[{ sides: 6, rolls: [1] }, { sides: 10, rolls: [6] }, { sides: 12, rolls: [5] }]}
`('roll', ({ expr, expected }) => {
  test(`expr: ${expr}`, () => {
    const actual = roll(expr, { seed: 123 });

    expect(actual).toEqual(expected);
  });
});

describe.each<{ min: number; max: number; expected: number[] }>`
  min  | max    | expected
  ${1} | ${6}   | ${[1, 4, 3, 2, 2]}
  ${1} | ${10}  | ${[2, 6, 4, 2, 3]}
  ${1} | ${12}  | ${[2, 7, 5, 3, 3]}
  ${1} | ${100} | ${[12, 53, 40, 19, 21]}
`('getRandomInt', ({ min, max, expected }) => {
  test(`min: ${min}, max: ${max}`, () => {
    const rng = seededRNG(123);
    const actual = Array.from({ length: expected.length }, () =>
      getRandomInt(min, max, rng),
    );

    expect(actual).toEqual(expected);
  });
});

describe('seededRNG', () => {
  test('produces consistent sequences', () => {
    const rng1 = seededRNG(123);
    const rng2 = seededRNG(123);
    const rng3 = seededRNG(789);

    const seq1 = Array.from({ length: 5 }, () => rng1());
    const seq2 = Array.from({ length: 5 }, () => rng2());
    const seq3 = Array.from({ length: 5 }, () => rng3());

    expect(seq1).toEqual(seq2);
    expect(seq1).not.toEqual(seq3);
  });
});
