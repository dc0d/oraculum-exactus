import { ClassicOracles } from '../oracles/datasworn';
import { NameOracle } from '../oracles/datasworn/name_oracle';
import { ImmersionOracles } from '../oracles/immersion';
import { selectionFormatter } from './selection_formatter';
import { detectDiceExpression, rollOnDetected } from '../dice';

const defaultDependencies = {
  ironsworn: new ClassicOracles({}),
  immersion: new ImmersionOracles({}),
  formatter: selectionFormatter,
};

type Dependencies = typeof defaultDependencies;

export const selectionHandler = (
  input: { selected: string; prefix: string },
  dependencies: Dependencies = defaultDependencies,
): string | undefined => {
  const { ironsworn, immersion, formatter } = {
    ...defaultDependencies,
    ...dependencies,
  };
  const { selected } = input;
  const command = selected;

  if (command == 'ironsworn.roll') {
    const dice = detectDiceExpression('d6,2d10');
    return formatter({ rolled: rollOnDetected(dice) });
  }

  if (command === 'ironsworn.action_and_theme') {
    return formatter(ironsworn.action_and_theme());
  }
  if (command === 'ironsworn.character') {
    return formatter(ironsworn.character());
  }
  if (command.startsWith('ironsworn.name.')) {
    const cmd = command.replace('ironsworn.name.', '') as keyof NameOracle;
    const nameOracle = ironsworn.name();
    const method = nameOracle[cmd];
    if (typeof method === 'function') {
      return formatter(method.call(nameOracle));
    }
  }
  if (command.startsWith('immersion.')) {
    const cmd = command.replace('immersion.', '') as keyof ImmersionOracles;
    const method = immersion[cmd];
    if (typeof method === 'function') {
      return formatter(method.call(immersion));
    }
  }

  const detected = detectDiceExpression(command);
  if (detected.length > 0) {
    return formatter({ rolled: rollOnDetected(detected) });
  }

  return undefined;
};
