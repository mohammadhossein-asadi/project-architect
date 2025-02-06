export const getTestFiles = () => [
  {
    path: 'tests/unit/controllers/userController.test.ts',
    content: `import { getUsers } from '../../../src/controllers/userController';
import { Request, Response } from 'express';

describe('User Controller', () => {
  it('should get all users', () => {
    const req = {} as Request;
    const res = {
      send: jest.fn()
    } as unknown as Response;

    getUsers(req, res);

    expect(res.send).toHaveBeenCalledWith('Get all users');
  });
});`
  }
];