const DEBUG = true;

export const logger = {
  log: (msg: string, ...args: unknown[]) => {
    if (DEBUG) {
      console.debug(`>>> ${msg}`, ...args);
    }
  },
  error: (msg: string, ...args: unknown[]) => {
    if (DEBUG) {
      console.error(`>>> ${msg}`, ...args);
    }
  },
};
