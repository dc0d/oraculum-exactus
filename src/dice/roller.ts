import { detectDiceExpression, type DetectedDice } from './functions';

export type RollOptions = {
  seed?: number;
};

export const getRandomInt = (
  min: number,
  max: number,
  rng: () => number,
): number => {
  return Math.floor(rng() * (max - min + 1)) + min;
};

export const seededRNG = (seed: number): (() => number) => {
  let s = seed;
  return () => {
    // Simple LCG for reproducibility
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export type RollResult = {
  sides: number;
  rolls: number[];
  highest?: number;
  lowest?: number;
};

export const rollOnDetected = (
  detected: DetectedDice[],
  options: RollOptions = {},
): RollResult[] => {
  const rng =
    options.seed !== undefined ? seededRNG(options.seed) : Math.random;
  const results: RollResult[] = [];

  for (const dice of detected) {
    const { count, sides, flag } = dice;
    if (sides < 2) {
      throw new Error(`Dice must have at least 2 sides: ${sides}`);
    }
    if (count <= 0) {
      throw new Error(`Dice count must be positive: ${count}`);
    }
    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(getRandomInt(1, sides, rng));
    }
    const result: RollResult = { sides, rolls };
    if (flag && (flag === 'h' || flag === 'H')) {
      result.highest = Math.max(...rolls);
    } else if (flag && (flag === 'l' || flag === 'L')) {
      result.lowest = Math.min(...rolls);
    }
    results.push(result);
  }

  return results;
};

export const roll = (expr: string, options: RollOptions = {}): RollResult[] => {
  const detected = detectDiceExpression(expr);
  return rollOnDetected(detected, options);
};
