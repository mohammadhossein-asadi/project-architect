export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getCurrentDateTime = (): string => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

export const getCurrentUser = (): string => {
  return process.env.USER || process.env.USERNAME || 'unknown';
};