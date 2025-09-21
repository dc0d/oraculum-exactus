import { type Settings, ACTIVATOR_TRIGGER } from './definitions';

let instance: Settings = { trigger: ACTIVATOR_TRIGGER };

type SettingsChangeCallback = (settings: Settings) => void;
const observers: SettingsChangeCallback[] = [];

function subscribe(callback: SettingsChangeCallback): void {
  observers.push(callback);
}

function notifyObservers(): void {
  for (const callback of observers) {
    callback({ ...instance });
  }
}

class Reader {
  get settings() {
    return { ...instance };
  }

  onChange(cb: SettingsChangeCallback): void {
    subscribe(cb);
  }
}

class ReaderWriter {
  get settings() {
    return { ...instance };
  }

  set settings(v: Settings) {
    instance = { ...instance, ...v };
    notifyObservers();
  }
}

export const reader = new Reader();
export const readerWriter = new ReaderWriter();
