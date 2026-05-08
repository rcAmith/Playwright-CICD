const DEFAULT_BASE_URL = 'https://www.automationexercise.com';

function readBoolean(name: string, defaultValue: boolean): boolean {
  const value = process.env[name];

  if (!value) {
    return defaultValue;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function readNumber(name: string, defaultValue: number): number {
  const value = process.env[name];
  const parsed = value ? Number(value) : Number.NaN;

  return Number.isFinite(parsed) ? parsed : defaultValue;
}

const isCI = readBoolean('CI', false);
const defaultVideo = isCI ? 'retain-on-failure' : 'off';

export const testConfig = {
  baseURL: (process.env.BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, ''),
  headless: readBoolean('HEADLESS', true),
  isCI,
  retries: readNumber('RETRIES', isCI ? 1 : 0),
  slowMo: readNumber('SLOW_MO', 0),
  video: (process.env.VIDEO || defaultVideo) as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry',
  workers: readNumber('WORKERS', isCI ? 1 : 3)
};
