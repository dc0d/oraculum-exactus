import { describe, expect, test } from '@jest/globals';
import { commandsList, suggest } from './suggester';

describe.each<{ input: string; expected: string[] }>`
  input                           | expected
  ${''}                           | ${[]}
  ${' '}                          | ${[]}
  ${null}                         | ${[]}
  ${undefined}                    | ${[]}
  ${'ironsworn.a'}                | ${['ironsworn.action_and_theme']}
  ${' ironsworn.a '}              | ${['ironsworn.action_and_theme']}
  ${'ironsworn.action_and_theme'} | ${['ironsworn.action_and_theme']}
  ${'ironsworn.name'}             | ${['ironsworn.name.elf', 'ironsworn.name.ironlander', 'ironsworn.name.giants', 'ironsworn.name.varou', 'ironsworn.name.trolls']}
  ${'ironsworn.name.'}            | ${['ironsworn.name.elf', 'ironsworn.name.ironlander', 'ironsworn.name.giants', 'ironsworn.name.varou', 'ironsworn.name.trolls']}
  ${'ironsworn.name.v'}           | ${['ironsworn.name.varou']}
`('suggest', ({ input, expected }) => {
  test(`input: ${JSON.stringify(input)}`, () => {
    const actual = suggest(input);

    expect(actual).toEqual(expect.arrayContaining(expected));
    expect(expected).toEqual(expect.arrayContaining(actual));
  });
});

/*

*/

describe('commandsList', () => {
  test('returns sorted list of commands', () => {
    const actual = commandsList();
    expect(actual).toEqual(actual.slice().sort());
    expect(actual).toEqual([
      'immersion.feelings',
      'immersion.sights',
      'immersion.smells',
      'immersion.sounds',
      'immersion.tastes',
      'immersion.touches',
      'ironsworn.action_and_theme',
      'ironsworn.character',
      'ironsworn.name.elf',
      'ironsworn.name.giants',
      'ironsworn.name.ironlander',
      'ironsworn.name.trolls',
      'ironsworn.name.varou',
      'ironsworn.roll',
    ]);
  });
});
