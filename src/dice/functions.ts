export type DetectedDice = {
  count: number;
  sides: number;
  flag?: 'H' | 'h' | 'L' | 'l';
};

export const detectDiceExpression = (text: string): DetectedDice[] => {
  const trimmed = text.trim();
  const parts = text.split(',').map((part) => part.trim());
  const diceRegex = /^(\d*)d(\d+)([HhLl])?$/i;
  const detected: DetectedDice[] = [];
  for (const part of parts) {
    const match = part.match(diceRegex);
    if (!match) continue;
    const count = match[1] ? Number(match[1]) : 1;
    const sides = match[2] ? Number(match[2]) : 0;
    const flag = match[3] as DetectedDice['flag'] | undefined;
    if (flag !== undefined) {
      detected.push({ count, sides, flag });
    } else {
      detected.push({ count, sides });
    }
  }
  return detected;
};
