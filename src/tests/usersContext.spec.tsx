import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { useUsersContext, UsersContextProvider } from '../context/UsersContext';
import UsersApiClient from '../api/usersApiClient';
import { User } from '../api/types';

const apiClient = new UsersApiClient();

const mockUsers: Array<User> = [
  { id: '1', name: 'User 1', email: 'test@email.com', role: 'ADMIN' },
  { id: '2', name: 'User 2', email: 'test2@email.com', role: 'MANAGER' },
];
const mockRoles: Array<string> = ['admin', 'manager'];
const TestContainer = ({ children }: { children: ReactNode }) => {
  return (
    <UsersContextProvider
      value={{
        users: mockUsers,
        roles: mockRoles,
        selectedRole: 'admin',
        apiClient: apiClient,
      }}
    >
      {children}
    </UsersContextProvider>
  );
};

const TestComponent = () => {
  const { users, selectedRole, roles } = useUsersContext();

  return (
    <div>
      <span>{users?.[0].name} </span>
      <span>{users?.[0].role} </span>
      <span>{selectedRole}</span>
    </div>
  );
};

describe('UsersContextProvider', () => {
  beforeEach(() => {
    render(
      <TestContainer>
        <TestComponent />
      </TestContainer>
    );
  });
  it('should render a user name taken from context', () => {
    expect(screen.getByText('User 1')).toBeInTheDocument();
  });
  it('should render a user role taken from context', () => {
    expect(screen.getByText('admin')).toBeInTheDocument();
  });
});
