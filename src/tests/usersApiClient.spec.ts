import { API } from 'aws-amplify';
import { CustomersApiResponse, User } from '../api/types';
import UsersApiClient from '../api/usersApiClient';

jest.mock('aws-amplify');

describe('UsersApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchZellerCustomers should return users', async () => {
    const mockUsers: Array<User> = [
      { id: '1', name: 'User 1', email: 'test@email.com', role: 'ADMIN' },
      { id: '2', name: 'User 2', email: 'test2@email.com', role: 'MANAGER' },
    ];

    const mockResponse: CustomersApiResponse = {
      data: {
        listZellerCustomers: { items: mockUsers },
      },
    };

    (API.graphql as jest.Mock).mockResolvedValue(mockResponse);

    const usersApiClient = new UsersApiClient();
    const result = await usersApiClient.fetchZellerUsers();

    expect(result).toEqual({ users: mockUsers });
  });

  it('fetchZellerCustomers should handle errors', async () => {
    const mockError = new Error('Test error');

    (API.graphql as jest.Mock).mockRejectedValue(mockError);

    const usersApiClient = new UsersApiClient();

    await expect(usersApiClient.fetchZellerUsers()).rejects.toThrowError(
      'Test error'
    );
  });
});
