import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../api/types';
import UsersApiClient from '../api/usersApiClient';

export type UserContextType = {
  users?: Array<User>;
  roles?: Array<string>;
  apiClient?: UsersApiClient;
  selectedRole?: string;
  setSelectedRole?: (role: string) => void;
};

export const UsersContext = createContext<UserContextType>({});

export const UsersContextProvider = ({
  value,
  children,
}: {
  value: UserContextType;
  children: ReactNode;
}) => {
  const [users, setUsers] = useState<Array<User> | undefined>(
    value.users || []
  );
  const [roles, setRoles] = useState<Array<string> | undefined>(
    value.roles || []
  );
  const [selectedRole, setSelectedRole] = useState<string>('admin');

  const { apiClient } = value;

  const mapUserRoles = (users?: Array<User>) => {
    if (!users) return [];
    return Array.from(
      new Set(users?.map((user) => user.role.toLowerCase()))
    ).sort();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (apiClient) {
          const usersData = await apiClient.fetchZellerUsers();
          setUsers(usersData.users);
          setRoles(mapUserRoles(usersData.users));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, roles, selectedRole, setSelectedRole }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(
      'useUserContext must be called within a UserContextProvider'
    );
  }
  const { users, roles, selectedRole, setSelectedRole } = context;

  const handleUpdateSelectedRole = (role: string) => {
    setSelectedRole && setSelectedRole(role);
  };

  return {
    roles,
    users,
    selectedRole,
    handleUpdateSelectedRole,
  };
};
