import { describe, expect, test } from '@jest/globals';
import { type RandFn } from '../../types.ts';
import { ImmersionOracles } from './immersion.ts';

describe.each<{ rand: RandFn; expected: string }>([
  { rand: () => 0, expected: 'Absorbed' },
  { rand: () => 9, expected: 'Admiration' },
  { rand: () => 99, expected: 'Ashamed' },
  { rand: () => 999, expected: 'Withdrawn' },
])('ImmersionOracles.feelings', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).feelings() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.feelings().chosen_immersion).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: string }>([
  { rand: () => 0, expected: 'Aged' },
  { rand: () => 9, expected: 'Angular' },
  { rand: () => 99, expected: 'Broad' },
  { rand: () => 999, expected: 'Yellow' },
])('ImmersionOracles.sights', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).sights() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.sights().chosen_immersion).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: string }>([
  { rand: () => 0, expected: 'Acid' },
  { rand: () => 11, expected: 'Acrid' },
  { rand: () => 99, expected: 'Burnt' },
  { rand: () => 999, expected: 'Woody' },
])('ImmersionOracles.smells', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).smells() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.smells().chosen_immersion).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: string }>([
  { rand: () => 0, expected: 'Babble' },
  { rand: () => 11, expected: 'Bang' },
  { rand: () => 99, expected: 'Chattering' },
  { rand: () => 999, expected: 'Yelp' },
])('ImmersionOracles.sounds', ({ rand, expected }) => {
  test(`ImmersionOracles(${rand}).sounds() => ${expected}`, () => {
    const oracles = new ImmersionOracles({ rand });

    expect(oracles.sounds().chosen_immersion).toEqual(expected);
  });
});
