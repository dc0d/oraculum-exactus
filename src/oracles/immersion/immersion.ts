import immersion from '../../../data/oracles/immersion/immersion.json' assert { type: 'json' };
import { type RandFn } from '../../types.ts';
import { randInt } from '../../functions.ts';
import { rollAndFind, parseDice } from '../datasworn';

const defaultInput = (): {
  rand: RandFn;
  data: typeof immersion;
} => {
  return {
    rand: randInt,
    data: immersion,
  };
};

export class ImmersionOracles {
  #rand: RandFn;
  #data: typeof immersion;

  constructor(input: { rand?: RandFn; data?: typeof immersion }) {
    input = { ...defaultInput(), ...input };

    this.#rand = input.rand!;
    this.#data = input.data!;
  }

  feelings(): { chosen_immersion: string } {
    const result = rollAndFind(
      this.#rand,
      parseDice(this.#data.contents.feelings.dice),
      this.#data.contents.feelings.rows,
    );
    return { chosen_immersion: result };
  }

  sights(): { chosen_immersion: string } {
    const result = rollAndFind(
      this.#rand,
      parseDice(this.#data.contents.sights.dice),
      this.#data.contents.sights.rows,
    );
    return { chosen_immersion: result };
  }

  smells(): { chosen_immersion: string } {
    const result = rollAndFind(
      this.#rand,
      parseDice(this.#data.contents.smells.dice),
      this.#data.contents.smells.rows,
    );
    return { chosen_immersion: result };
  }

  sounds(): { chosen_immersion: string } {
    const result = rollAndFind(
      this.#rand,
      parseDice(this.#data.contents.sounds.dice),
      this.#data.contents.sounds.rows,
    );
    return { chosen_immersion: result };
  }

  tastes(): { chosen_immersion: string } {
    const result = rollAndFind(
      this.#rand,
      parseDice(this.#data.contents.tastes.dice),
      this.#data.contents.tastes.rows,
    );
    return { chosen_immersion: result };
  }

  touches(): { chosen_immersion: string } {
    const result = rollAndFind(
      this.#rand,
      parseDice(this.#data.contents.touches.dice),
      this.#data.contents.touches.rows,
    );
    return { chosen_immersion: result };
  }
}
