import classic from '../../../data/oracles/datasworn/classic/classic.json' assert { type: 'json' };
import { type RandFn } from '../../types.ts';
import { randInt } from '../../functions.ts';
import { rollAndFind, parseDice } from './internal.ts';
import { NameOracle } from './name_oracle.ts';

const defaultInput = (): {
  rand: RandFn;
  data: typeof classic;
  nameOracle: NameOracle;
} => {
  return {
    rand: randInt,
    data: classic,
    nameOracle: new NameOracle({ rand: randInt, data: classic }),
  };
};

export class ClassicOracles {
  #rand: RandFn;
  #data: typeof classic;
  #nameOracle: NameOracle;

  constructor(input: {
    rand?: RandFn;
    data?: typeof classic;
    nameOracle?: NameOracle;
  }) {
    input = { ...defaultInput(), ...input };

    this.#rand = input.rand!;
    this.#data = input.data!;
    this.#nameOracle = input.nameOracle!;
  }

  action_and_theme(): { action: string; theme: string } {
    const action = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.action_and_theme.contents.action.dice),
      this.#data.oracles.action_and_theme.contents.action.rows,
    );
    const theme = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.action_and_theme.contents.theme.dice),
      this.#data.oracles.action_and_theme.contents.theme.rows,
    );
    return { action, theme };
  }

  character(): { descriptor: string; goal: string; role: string } {
    const descriptor = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.character.contents.descriptor.dice),
      this.#data.oracles.character.contents.descriptor.rows,
    );
    const goal = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.character.contents.goal.dice),
      this.#data.oracles.character.contents.goal.rows,
    );
    const role = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.character.contents.role.dice),
      this.#data.oracles.character.contents.role.rows,
    );
    return { descriptor, goal, role };
  }

  name(): NameOracle {
    return this.#nameOracle;
  }
}

export { parseDice, rollAndFind };
