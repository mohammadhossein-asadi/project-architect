import validateNpmPackageName from 'validate-npm-package-name';

export const validateProjectName = (name: string): boolean | string => {
  const validation = validateNpmPackageName(name);
  if (!validation.validForNewPackages) {
    return validation.errors?.join(', ') || 'Invalid package name';
  }
  return true;
};