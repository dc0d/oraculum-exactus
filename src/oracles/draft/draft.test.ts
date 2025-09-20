import immersion from '../../../data/oracles/immersion/immersion.json' assert { type: 'json' };
import { describe, expect, test } from '@jest/globals';
import { itif } from '../../test_support';
import { promises } from 'fs';

const shouldRunExploration = process?.env?.RUN_EXPLORATION === 'true';

describe('explorations', () => {
  itif(false)(
    'transform immersion to follow the same structure as ironsworn classic',
    async () => {
      const transformed: any = {};
      for (const [key, table] of Object.entries(immersion)) {
        transformed[key.toLocaleLowerCase()] = table;
      }

      transformed.contents = transformed.oracles;
      delete transformed.oracles;

      const o1: any = {};
      for (const oracle of transformed.contents) {
        o1[oracle.Name.toLocaleLowerCase().replace(/ /g, '_')] = oracle;
      }

      for (const [key, table] of Object.entries(o1)) {
        const t1: any = {};
        for (const [k, v] of Object.entries(table as any)) {
          let newKey = k.toLocaleLowerCase().replace(/ /g, '_');
          if (newKey === 'oracle_table') {
            newKey = 'rows';
          }
          t1[newKey] = v;
        }

        let min = 1;
        let max = 1;
        const newRows: any[] = [];
        for (const row of t1.rows) {
          max = row['Chance'];
          newRows.push({ min, max, text: row['Description'] });
          min = max + 1;
        }
        t1.rows = newRows;

        o1[key] = t1;
      }

      transformed.contents = o1;

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
