// returns a random integer from 0 to max-1 if only one argument is provided
export function randInt(max: number): number;
// returns a random integer from min to max-1 if two arguments are provided
export function randInt(min: number, max: number): number;
export function randInt(min: number, max?: number) {
  if (typeof max === 'undefined') {
    max = min;
    min = 0;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}
