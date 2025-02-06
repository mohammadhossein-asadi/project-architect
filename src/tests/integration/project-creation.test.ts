import { jest, expect, describe, it, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';
import { createProject } from '../../index';
import { ProjectOptions } from '../../types';

jest.mock('fs-extra');

describe('Project Creation', () => {
  const mockProjectPath = '/mock/project/path';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('creates a React project with TypeScript', async () => {
    const options: ProjectOptions = {
      name: 'test-project',
      framework: 'react',
      typescript: true,
      testing: true,
      linting: true,
      type: 'frontend'
    };

    await createProject(options);

    expect(fs.existsSync(path.join(mockProjectPath, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.join(mockProjectPath, 'tsconfig.json'))).toBe(true);
    expect(fs.existsSync(path.join(mockProjectPath, 'src/App.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(mockProjectPath, 'Dockerfile'))).toBe(true);
    expect(fs.existsSync(path.join(mockProjectPath, '.github/workflows/ci.yml'))).toBe(true);
  });
});