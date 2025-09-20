export interface Settings {
  trigger: string;
}

const BEGIN_TRIGGER = '.\\';

const DEFAULT_SETTINGS: Partial<Settings> = {
  trigger: BEGIN_TRIGGER,
};

export const getDefaultSettings = (): Settings => {
  return { ...DEFAULT_SETTINGS } as Settings;
};

export interface SettingsReader {
  readSettings(): Promise<Settings>;
}

export interface SettingsReaderSync {
  readSettingsSync(): Settings;
}

export interface SettingsWriter {
  writeSettings(settings: Settings): Promise<void>;
}

export interface SettingsStorage
  extends SettingsReader,
    SettingsReaderSync,
    SettingsWriter {}
