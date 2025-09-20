const DEBUG = true;

export const logger = {
  log: (msg: string, ...args: any[]) => {
    if (DEBUG) {
      console.log(`>>> ${msg}`, ...args);
    }
  },
  error: (msg: string, ...args: any[]) => {
    if (DEBUG) {
      console.error(`>>> ${msg}`, ...args);
    }
  },
};
