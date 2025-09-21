import classic from '../../../data/oracles/datasworn/classic/classic.json' assert { type: 'json' };
import { type RandFn } from '../../types.ts';
import { randInt } from '../../functions.ts';
import { rollAndFind, parseDice } from './internal.ts';

const defaultInput = (): {
  rand: RandFn;
  data: typeof classic;
} => {
  return {
    rand: randInt,
    data: classic,
  };
};

export class NameOracle {
  #rand: RandFn;
  #data: typeof classic;

  constructor(input: { rand?: RandFn; data?: typeof classic }) {
    input = { ...defaultInput(), ...input };

    this.#rand = input.rand!;
    this.#data = input.data!;
  }

  elf(): { name: string } {
    const name = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.name.contents.elf.dice),
      this.#data.oracles.name.contents.elf.rows,
    );
    return { name };
  }

  ironlander(): { name: string } {
    const choose = this.#rand(2);
    let name: string = '';

    if (choose === 0) {
      name = rollAndFind(
        this.#rand,
        parseDice(
          this.#data.oracles.name.collections.ironlander.contents.a.dice,
        ),
        this.#data.oracles.name.collections.ironlander.contents.a.rows,
      );
    } else {
      name = rollAndFind(
        this.#rand,
        parseDice(
          this.#data.oracles.name.collections.ironlander.contents.b.dice,
        ),
        this.#data.oracles.name.collections.ironlander.contents.b.rows,
      );
    }

    return { name: name };
  }

  giants(): { name: string } {
    const name = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.name.collections.other.contents.giants.dice),
      this.#data.oracles.name.collections.other.contents.giants.rows,
    );
    return { name };
  }

  varou(): { name: string } {
    const name = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.name.collections.other.contents.varou.dice),
      this.#data.oracles.name.collections.other.contents.varou.rows,
    );
    return { name };
  }

  trolls(): { name: string } {
    const name = rollAndFind(
      this.#rand,
      parseDice(this.#data.oracles.name.collections.other.contents.trolls.dice),
      this.#data.oracles.name.collections.other.contents.trolls.rows,
    );
    return { name };
  }
}
