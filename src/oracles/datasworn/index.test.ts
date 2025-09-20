import { describe, expect, test } from '@jest/globals';
import { type RandFn } from '../../types.ts';
import { ClassicOracles } from './index.ts';
import { NameOracle } from './name_oracle.ts';

describe.each<{ rand: RandFn; expected: { action: string; theme: string } }>`
  rand        | expected
  ${() => 0}  | ${{ action: 'Scheme', theme: 'Risk' }}
  ${() => 9}  | ${{ action: 'Control', theme: 'Shelter' }}
  ${() => 99} | ${{ action: 'Summon', theme: 'Supply' }}
`('ClassicOracles.action_and_theme', ({ rand, expected }) => {
  test(`ClassicOracles(${rand}).action_and_theme() => ${expected}`, () => {
    const oracles = new ClassicOracles({ rand });

    expect(oracles.action_and_theme()).toEqual(expected);
  });
});

describe.each<{
  rand: RandFn;
  expected: { descriptor: string; goal: string; role: string };
}>`
  rand        | expected
  ${() => 0}  | ${{ descriptor: 'Stoic', goal: 'Obtain an object', role: 'Criminal' }}
  ${() => 9}  | ${{ descriptor: 'Brave', goal: 'Undermine a relationship', role: 'Performer' }}
  ${() => 99} | ${{ descriptor: 'Ironsworn', goal: 'Roll twice', role: 'Unusual role' }}
`('ClassicOracles.character', ({ rand, expected }) => {
  test(`ClassicOracles(${rand}).character() => ${expected}`, () => {
    const oracles = new ClassicOracles({ rand });

    expect(oracles.character()).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: { name: string } }>`
  rand        | expected
  ${() => 0}  | ${{ name: 'Arsula' }}
  ${() => 9}  | ${{ name: 'Ninsunu' }}
  ${() => 99} | ${{ name: 'Faraza' }}
`('ClassicOracles.name("elf")', ({ rand, expected }) => {
  test(`ClassicOracles(${rand}).name('elf') => ${expected}`, () => {
    const oracles = new ClassicOracles({
      rand,
      nameOracle: new NameOracle({ rand }),
    });

    expect(oracles.name().elf()).toEqual(expected);
  });
});
