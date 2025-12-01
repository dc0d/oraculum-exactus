import { describe, expect, test } from '@jest/globals';
import { type RandFn } from '../../types.ts';
import { ClassicOracles } from './index.ts';
import { NameOracle } from './name_oracle.ts';

describe.each<{ rand: RandFn; expected: { action: string; theme: string } }>([
  { rand: () => 0, expected: { action: 'Scheme', theme: 'Risk' } },
  { rand: () => 9, expected: { action: 'Control', theme: 'Shelter' } },
  { rand: () => 99, expected: { action: 'Summon', theme: 'Supply' } },
])('ClassicOracles.action_and_theme', ({ rand, expected }) => {
  test(`ClassicOracles(${rand}).action_and_theme() => ${expected}`, () => {
    const oracles = new ClassicOracles({ rand });

    expect(oracles.action_and_theme()).toEqual(expected);
  });
});

describe.each<{
  rand: RandFn;
  expected: { descriptor: string; goal: string; role: string };
}>([
  {
    rand: () => 0,
    expected: {
      descriptor: 'Stoic',
      goal: 'Obtain an object',
      role: 'Criminal',
    },
  },
  {
    rand: () => 9,
    expected: {
      descriptor: 'Brave',
      goal: 'Undermine a relationship',
      role: 'Performer',
    },
  },
  {
    rand: () => 99,
    expected: {
      descriptor: 'Ironsworn',
      goal: 'Roll twice',
      role: 'Unusual role',
    },
  },
])('ClassicOracles.character', ({ rand, expected }) => {
  test(`ClassicOracles(${rand}).character() => ${expected}`, () => {
    const oracles = new ClassicOracles({ rand });

    expect(oracles.character()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>([
  { rand: () => 0, expected: { name: 'Arsula' } },
  { rand: () => 9, expected: { name: 'Ninsunu' } },
  { rand: () => 99, expected: { name: 'Faraza' } },
])('ClassicOracles.name("elf")', ({ rand, expected }) => {
  test(`ClassicOracles(${rand}).name('elf') => ${expected}`, () => {
    const oracles = new ClassicOracles({
      rand,
      nameOracle: new NameOracle({ rand }),
    });

    expect(oracles.name().elf()).toEqual(expected);
  });
});
