import { type RandFn } from '../../types.ts';

export function findRolled(
  rolled: number,
  rows: Array<{ min: number; max: number; text: string }>,
): string {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row && rolled >= row.min && rolled <= row.max) {
      return row.text;
    }
  }
  throw new Error(`No result found for roll: ${rolled}`);
}

export function rollAndFind(
  rand: RandFn,
  dice: number,
  rows: Array<{ min: number; max: number; text: string }>,
): string {
  const rolled = 1 + rand(dice);
  return findRolled(rolled, rows);
}

export function parseDice(dice: string | number): number {
  if (typeof dice === 'number') return dice;
  if (typeof dice === 'string') {
    // Match patterns like '1d100', 'd100', '100'
    const match = dice.match(/^(?:\d*d)?(\d+)$/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  throw new Error(`Invalid dice format: ${dice}`);
}
