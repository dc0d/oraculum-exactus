const COMMANDS_LIST = [
  'ironsworn.name.elf',
  'ironsworn.name.ironlander',
  'ironsworn.name.giants',
  'ironsworn.name.varou',
  'ironsworn.name.trolls',
  'ironsworn.action_and_theme',
  'ironsworn.character',
  'ironsworn.roll',
  'immersion.feelings',
  'immersion.sights',
  'immersion.smells',
  'immersion.sounds',
  'immersion.tastes',
  'immersion.touches',
].sort();

export const commandsList = (): string[] => {
  return [...COMMANDS_LIST];
};

export const suggest = (
  input: string,
  cmdList: string[] = commandsList(),
): string[] => {
  const lowerInput = input?.toLowerCase()?.trim();
  if (!lowerInput) {
    return [];
  }

  const result = cmdList.filter((cmd) => {
    const ok = cmd.startsWith(lowerInput);

    return ok;
  });

  return result;
};
