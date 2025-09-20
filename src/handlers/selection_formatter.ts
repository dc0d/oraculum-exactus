import { type RollResult } from '../dice';

type DiceDict = { [key: number]: number[] };

const getGlyph = (input: { sides: number; rolled: number }) => {
  const { sides, rolled } = input;

  if (![4, 6, 8, 10, 12, 20, 100].includes(sides)) {
    return null;
  }

  if (sides == 100) {
    const tens = Math.floor(rolled / 10);
    const ones = rolled % 10;
    return `${tens}_ON_D10 ${ones}_ON_D10`;
  }

  return `${rolled}_ON_D${sides}`;
};

export const selectionFormatter = (obj: any): string => {
  const { action, theme } = obj;
  if (action && theme) {
    return `${action} ${theme}`;
  }

  const { descriptor, goal, role } = obj;
  if (descriptor && goal && role) {
    return `${descriptor} ${role} - goal: ${goal}`;
  }

  const { name } = obj;
  if (name) {
    return name;
  }

  const { chosen_immersion } = obj;
  if (chosen_immersion) {
    return chosen_immersion;
  }

  const { rolled } = obj as { rolled?: RollResult[] };
  if (rolled) {
    let result = '';

    for (const r of rolled) {
      const nonStandardDice = {} as DiceDict;

      for (const roll of r.rolls) {
        const glyph = getGlyph({ sides: r.sides, rolled: roll });

        if (glyph) {
          result += `<span class="dicier_flat_light">${glyph}</span> `;
          continue;
        }

        let set = nonStandardDice[r.sides] || [];
        set.push(roll);
        nonStandardDice[r.sides] = set;
      }

      for (const sides in nonStandardDice) {
        const rolls = nonStandardDice[sides] as number[];
        result += `d${sides}: {${rolls.join(', ')}} `;
      }

      result += ' - ';
    }

    result = result.slice(0, -3).trim();

    return `${result} `;
  }

  return JSON.stringify(obj);
};
