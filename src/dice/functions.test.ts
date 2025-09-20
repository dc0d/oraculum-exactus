import { describe, expect, test } from '@jest/globals';
import { detectDiceExpression, type DetectedDice } from './functions';

describe.each<{ text: string; expected: DetectedDice[] }>`
  text           | expected
  ${'d6'}        | ${[{ count: 1, sides: 6 }]}
  ${'2d10'}      | ${[{ count: 2, sides: 10 }]}
  ${'3d20'}      | ${[{ count: 3, sides: 20 }]}
  ${'d4'}        | ${[{ count: 1, sides: 4 }]}
  ${'5d8'}       | ${[{ count: 5, sides: 8 }]}
  ${'d100'}      | ${[{ count: 1, sides: 100 }]}
  ${'abc'}       | ${[]}
  ${'2d'}        | ${[]}
  ${'d'}         | ${[]}
  ${'d1000'}     | ${[{ count: 1, sides: 1000 }]}
  ${'2d6,2d4'}   | ${[{ count: 2, sides: 6 }, { count: 2, sides: 4 }]}
  ${'2d6H,2d4L'} | ${[{ count: 2, sides: 6, flag: 'H' }, { count: 2, sides: 4, flag: 'L' }]}
`('detectDiceExpression', ({ text, expected }) => {
  test(`text: ${text}`, () => {
    const actual = detectDiceExpression(text);

    expect(actual).toEqual(expected);
  });
});
