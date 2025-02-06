import { jest } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';
import { createProject } from '../../utils/createProject';
import { ProjectOptions } from '../../types';

describe('Project Creation Integration Tests', () => {
  const testDir = path.join(__dirname, 'test-projects');

  beforeEach(() => {
    fs.ensureDirSync(testDir);
  });

  afterEach(() => {
    fs.removeSync(testDir);
  });

  it('should create a React project with all features', async () => {
    const options: ProjectOptions = {
      name: 'test-react-app',
      type: 'frontend',
      framework: 'react',
      typescript: true,
      testing: true,
      linting: true,
      docker: true,
      cicd: true
    };

    const projectPath = path.join(testDir, options.name);
    await createProject(options, projectPath);

    // Verify essential files exist
    expect(fs.existsSync(path.join(projectPath, 'package.json'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, 'tsconfig.json'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, 'src/App.tsx'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, 'Dockerfile'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, '.github/workflows/ci.yml'))).toBeTruthy();
  });

  it('should create a FastAPI project with all features', async () => {
    const options: ProjectOptions = {
      name: 'test-fastapi-app',
      type: 'backend',
      framework: 'fastapi',
      typescript: false,
      testing: true,
      linting: true,
      docker: true,
      cicd: true
    };

    const projectPath = path.join(testDir, options.name);
    await createProject(options, projectPath);

    // Verify essential files exist
    expect(fs.existsSync(path.join(projectPath, 'requirements.txt'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, 'app/main.py'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, 'tests/conftest.py'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, 'Dockerfile'))).toBeTruthy();
    expect(fs.existsSync(path.join(projectPath, '.github/workflows/ci.yml'))).toBeTruthy();
  });
});