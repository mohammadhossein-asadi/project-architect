import validateNpmPackageName from 'validate-npm-package-name';

export function validateProjectName(name: string): boolean {
  const validation = validateNpmPackageName(name);
  return validation.validForNewPackages;
}