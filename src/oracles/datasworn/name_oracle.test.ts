import { describe, expect, test } from '@jest/globals';
import { createRandFn } from '../../test_support';
import { type RandFn } from '../../types.ts';
import { NameOracle } from './name_oracle.ts';

describe.each<{ rand: RandFn; expected: { name: string } }>([
  { rand: () => 0, expected: { name: 'Arsula' } },
  { rand: () => 9, expected: { name: 'Ninsunu' } },
  { rand: () => 99, expected: { name: 'Faraza' } },
])('NameOracle.elf', ({ rand, expected }) => {
  test(`NameOracle(${rand}).elf() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.elf()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>([
  { rand: createRandFn([0, 0]), expected: { name: 'Solana' } },
  { rand: createRandFn([1, 0]), expected: { name: 'Segura' } },
  { rand: createRandFn([0, 10]), expected: { name: 'Bastien' } },
  { rand: createRandFn([1, 10]), expected: { name: 'Owena' } },
  { rand: createRandFn([0, 99]), expected: { name: 'Tallus' } },
  { rand: createRandFn([1, 99]), expected: { name: 'Chandra' } },
  { rand: createRandFn([0, 1]), expected: { name: 'Keelan' } },
  { rand: createRandFn([1, 1]), expected: { name: 'Gethin' } },
])('NameOracle.ironlander', ({ rand, expected }) => {
  test(`NameOracle(${rand}).ironlander() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.ironlander()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>([
  { rand: () => 0, expected: { name: 'Chony' } },
  { rand: () => 9, expected: { name: 'Jochu' } },
  { rand: () => 99, expected: { name: 'Denua' } },
])('NameOracle.giants', ({ rand, expected }) => {
  test(`NameOracle(${rand}).giants() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.giants()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>([
  { rand: () => 0, expected: { name: 'Vata' } },
  { rand: () => 9, expected: { name: 'Jasna' } },
  { rand: () => 99, expected: { name: 'Vojan' } },
])('NameOracle.varou', ({ rand, expected }) => {
  test(`NameOracle(${rand}).varou() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.varou()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>([
  { rand: () => 0, expected: { name: 'Rattle' } },
  { rand: () => 9, expected: { name: 'Wallow' } },
  { rand: () => 99, expected: { name: 'Herk' } },
])('NameOracle.trolls', ({ rand, expected }) => {
  test(`NameOracle(${rand}).trolls() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.trolls()).toEqual(expected);
  });
});
