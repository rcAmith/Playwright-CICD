export function getMissingEnvVars(names: string[]): string[] {
  return names.filter(name => !process.env[name]?.trim());
}

export function validateRequiredEnvVars(names: string[], context: string): void {
  const missing = getMissingEnvVars(names);

  if (missing.length > 0) {
    throw new Error(
      `${context} requires missing environment variables: ${missing.join(', ')}. ` +
      'Set them locally or configure them as CI secrets.'
    );
  }
}
