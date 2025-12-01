import classic from '../../../data/oracles/datasworn/classic/classic.json' assert { type: 'json' };
import { describe, expect, test } from '@jest/globals';
import { type RandFn } from '../../types.ts';
import { findRolled, rollAndFind, parseDice } from './internal.ts';

describe.each<{ rolled: number; expected: string }>`
  rolled | expected
  ${1}   | ${'Scheme'}
  ${10}  | ${'Control'}
  ${100} | ${'Summon'}
`('findRolled', ({ rolled, expected }) => {
  test(`findRolled(${rolled}, [...actions]) => ${expected}`, () => {
    const rows = classic.oracles.action_and_theme.contents.action.rows;

    expect(findRolled(rolled, rows)).toEqual(expected);
  });
});

describe.each<{ rand: RandFn; expected: string }>([
  { rand: () => 0, expected: 'Scheme' },
  { rand: () => 9, expected: 'Control' },
  { rand: () => 99, expected: 'Summon' },
])('rollAndFind', ({ rand, expected }) => {
  test(`rollAndFind(rand, _, [...actions]) => ${expected}`, () => {
    const nopDice = -1; // not used
    const rows = classic.oracles.action_and_theme.contents.action.rows;

    expect(rollAndFind(rand, nopDice, rows)).toEqual(expected);
  });
});

describe.each<{ dice: string; expected: number }>`
  dice       | expected
  ${'1d100'} | ${100}
  ${'d100'}  | ${100}
  ${'100'}   | ${100}
  ${100}     | ${100}
`('parseDice', ({ dice, expected }) => {
  test(`parseDice(${dice}) => ${expected}`, () => {
    expect(parseDice(dice)).toEqual(expected);
  });
});
