import { describe, expect, test } from '@jest/globals';
import { type RandFn } from '../../types.ts';
import { ImmersionOracles } from './immersion.ts';

describe.each<{ rand: RandFn; expected: string }>`
  rand         | expected
  ${() => 0}   | ${'Absorbed'}
  ${() => 9}   | ${'Admiration'}
  ${() => 99}  | ${'Ashamed'}
  ${() => 999} | ${'Withdrawn'}
`('ImmersionOracles.feelings', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).feelings() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.feelings().chosen_immersion).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: string }>`
  rand         | expected
  ${() => 0}   | ${'Aged'}
  ${() => 9}   | ${'Angular'}
  ${() => 99}  | ${'Broad'}
  ${() => 999} | ${'Yellow'}
`('ImmersionOracles.sights', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).sights() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.sights().chosen_immersion).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: string }>`
  rand         | expected
  ${() => 0}   | ${'Acid'}
  ${() => 11}  | ${'Acrid'}
  ${() => 99}  | ${'Burnt'}
  ${() => 999} | ${'Woody'}
`('ImmersionOracles.smells', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).smells() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.smells().chosen_immersion).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: string }>`
  rand         | expected
  ${() => 0}   | ${'Babble'}
  ${() => 11}  | ${'Bang'}
  ${() => 99}  | ${'Chattering'}
  ${() => 999} | ${'Yelp'}
`('ImmersionOracles.sounds', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).sounds() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.sounds().chosen_immersion).toEqual(expected);
  });
});
