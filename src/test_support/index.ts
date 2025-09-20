import type { RandFn } from '../types';

export const createRandFn = (values: number[]): RandFn => {
  let callCount = 0;
  return (max: number): number => {
    const value = values[callCount % values.length];
    callCount++;
    return (value as any) % max;
  };
};

export const itif = (condition: boolean) => (condition ? it : it.skip);
