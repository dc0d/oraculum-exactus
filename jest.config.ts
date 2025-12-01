import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest';

const presetConfig = createDefaultPreset({
  //...options
});

console.debug('>>> presetConfig', presetConfig);

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
};

export default jestConfig;
