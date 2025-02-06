import { jest } from '@jest/globals';
import { getProjectDetails } from './cli/prompts/projectPrompts';
import { createProject } from './utils/createProject';

jest.mock('inquirer', () => ({
  prompt: jest.fn()
}));

describe('CLI', () => {
  describe('getProjectDetails', () => {
    it('should prompt for project details when name is not provided', async () => {
      const mockAnswers = {
        name: 'test-project',
        type: 'frontend',
        framework: 'react',
        typescript: true,
        testing: true,
        linting: true,
        docker: true,
        cicd: true
      };

      require('inquirer').prompt.mockResolvedValue(mockAnswers);

      const result = await getProjectDetails();
      expect(result).toEqual(mockAnswers);
    });

    it('should skip name prompt when name is provided', async () => {
      const providedName = 'my-project';
      const mockAnswers = {
        type: 'frontend',
        framework: 'react',
        typescript: true,
        testing: true,
        linting: true,
        docker: true,
        cicd: true
      };

      require('inquirer').prompt.mockResolvedValue(mockAnswers);

      const result = await getProjectDetails(providedName);
      expect(result).toEqual({ name: providedName, ...mockAnswers });
    });
  });
});