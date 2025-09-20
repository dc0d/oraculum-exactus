import { ClassicOracles } from '../oracles/datasworn';
import { ImmersionOracles } from '../oracles/immersion';
import { selectionFormatter } from './selection_formatter';
import { detectDiceExpression, rollOnDetected } from '../dice';

const defaultDependencies = {
  ironsworn: new ClassicOracles({}),
  immersion: new ImmersionOracles({}),
  formatter: selectionFormatter,
};

export const selectionHandler = (
  input: { selected: string; prefix: string },
  dependencies = defaultDependencies,
) => {
  const { ironsworn, immersion, formatter } = {
    ...defaultDependencies,
    ...dependencies,
  };
  const { selected, prefix } = input;
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
    const cmd = command.replace('ironsworn.name.', '');
    return formatter((ironsworn.name() as any)[cmd as any]());
  }
  if (command.startsWith('immersion.')) {
    const cmd = command.replace('immersion.', '');
    return formatter((immersion as any)[cmd as any]());
  }

  const detected = detectDiceExpression(command);
  if (detected.length > 0) {
    return formatter({ rolled: rollOnDetected(detected) });
  }

  // console.log(`Unknown command`, JSON.stringify({ command, prefix }));
};
