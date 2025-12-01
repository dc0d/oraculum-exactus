import immersion from '../../../data/oracles/immersion/immersion.json' assert { type: 'json' };
import { describe, expect } from '@jest/globals';
import { itif } from '../../test_support';
import { promises } from 'fs';

const shouldRunExploration = process?.env?.RUN_EXPLORATION === 'true';

// Define types for the original immersion structure
type OriginalRow = {
  Chance: number;
  Description: string;
};

type OriginalOracle = {
  Name: string;
  Source: string;
  Oracle_table: OriginalRow[];
  [key: string]: unknown;
};

// Define types for the transformed structure
type TransformedRow = {
  min: number;
  max: number;
  text: string;
};

type TransformedOracle = {
  name: string;
  source: string;
  dice: string;
  rows: TransformedRow[];
};

type TransformedContents = Record<string, TransformedOracle>;

type TransformedStructure = {
  name: string;
  source: string;
  date: string;
  description: string;
  url: string;
  contents: TransformedContents;
};

/**
 * Transform oracle rows from the original structure to the target structure
 */
function transformRows(originalRows: OriginalRow[]): TransformedRow[] {
  const transformedRows: TransformedRow[] = [];
  let min = 1;

  for (const row of originalRows) {
    const max = row.Chance;
    transformedRows.push({
      min,
      max,
      text: row.Description,
    });
    min = max + 1;
  }

  return transformedRows;
}

/**
 * Transform an oracle from the original structure to the target structure
 */
function transformOracle(oracle: OriginalOracle): TransformedOracle {
  const transformed: Partial<TransformedOracle> = {};

  // Transform all oracle properties
  for (const [key, value] of Object.entries(oracle)) {
    let normalizedKey = key.toLocaleLowerCase().replace(/ /g, '_');

    if (normalizedKey === 'oracle_table') {
      transformed.rows = transformRows(value as OriginalRow[]);
    } else {
      transformed[normalizedKey as keyof TransformedOracle] = value as never;
    }
  }

  return transformed as TransformedOracle;
}

describe('explorations', () => {
  itif(false)(
    'transform immersion to follow the same structure as ironsworn classic',
    async () => {
      const transformed: Partial<TransformedStructure> = {};

      // Copy top-level properties
      for (const [key, value] of Object.entries(immersion)) {
        const normalizedKey = key.toLocaleLowerCase();
        transformed[normalizedKey as keyof TransformedStructure] =
          value as never;
      }

      // Move oracles to contents
      const originalOracles = (
        immersion as unknown as { oracles: OriginalOracle[] }
      ).oracles;
      const contents: TransformedContents = {};

      for (const oracle of originalOracles) {
        const oracleName = oracle.Name.toLocaleLowerCase().replace(/ /g, '_');
        contents[oracleName] = transformOracle(oracle);
      }

      (transformed as TransformedStructure).contents = contents;
      delete (transformed as Record<string, unknown>).oracles;

      await promises.writeFile(
        'output.json',
        JSON.stringify(transformed, null, 2),
      );

      expect(1).toEqual(1);
    },
  );

  itif(shouldRunExploration)('PLACEHOLDER', () => {
    expect(1).toEqual(1);
  });
});
