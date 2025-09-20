import { describe, expect, test } from '@jest/globals';
import { createRandFn } from '../../test_support';
import { type RandFn } from '../../types.ts';
import { NameOracle } from './name_oracle.ts';

describe.each<{ rand: RandFn; expected: { name: string } }>`
  rand        | expected
  ${() => 0}  | ${{ name: 'Arsula' }}
  ${() => 9}  | ${{ name: 'Ninsunu' }}
  ${() => 99} | ${{ name: 'Faraza' }}
`('NameOracle.elf', ({ rand, expected }) => {
  test(`NameOracle(${rand}).elf() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.elf()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>`
  rand                     | expected
  ${createRandFn([0, 0])}  | ${{ name: 'Solana' }}
  ${createRandFn([1, 0])}  | ${{ name: 'Segura' }}
  ${createRandFn([0, 10])} | ${{ name: 'Bastien' }}
  ${createRandFn([1, 10])} | ${{ name: 'Owena' }}
  ${createRandFn([0, 99])} | ${{ name: 'Tallus' }}
  ${createRandFn([1, 99])} | ${{ name: 'Chandra' }}
  ${createRandFn([0, 1])}  | ${{ name: 'Keelan' }}
  ${createRandFn([1, 1])}  | ${{ name: 'Gethin' }}
`('NameOracle.ironlander', ({ rand, expected }) => {
  test(`NameOracle(${rand}).ironlander() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.ironlander()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>`
  rand        | expected
  ${() => 0}  | ${{ name: 'Chony' }}
  ${() => 9}  | ${{ name: 'Jochu' }}
  ${() => 99} | ${{ name: 'Denua' }}
`('NameOracle.giants', ({ rand, expected }) => {
  test(`NameOracle(${rand}).giants() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.giants()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>`
  rand        | expected
  ${() => 0}  | ${{ name: 'Vata' }}
  ${() => 9}  | ${{ name: 'Jasna' }}
  ${() => 99} | ${{ name: 'Vojan' }}
`('NameOracle.varou', ({ rand, expected }) => {
  test(`NameOracle(${rand}).varou() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.varou()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>`
  rand        | expected
  ${() => 0}  | ${{ name: 'Rattle' }}
  ${() => 9}  | ${{ name: 'Wallow' }}
  ${() => 99} | ${{ name: 'Herk' }}
`('NameOracle.trolls', ({ rand, expected }) => {
  test(`NameOracle(${rand}).trolls() => ${expected}`, () => {
    const oracles = new NameOracle({ rand });

    expect(oracles.trolls()).toEqual(expected);
  });
});
