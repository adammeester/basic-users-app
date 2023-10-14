import { UsersContainer } from '../UsersContainer';
import { UserRoleContainer } from '../UserRoleContainer';
import { Alert, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '../../api/types';
import UsersApiClient from '../../api/usersApiClient';

const UserLayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const usersApiClient = new UsersApiClient();

export const UsersLayout = () => {
  const [roles, setRoles] = useState<Array<string>>();
  const [users, setUsers] = useState<Array<User> | undefined>();
  const [selectedRole, setSelectedRole] = useState<string>('admin');
  const [error, setError] = useState<Error>();

  const mapUserRoles = (users?: Array<User>) => {
    if (!users) return [];
    return Array.from(
      new Set(users?.map((user) => user.role.toLowerCase()))
    ).sort();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await usersApiClient.fetchZellerUsers();
        setUsers(usersData.users);
        setRoles(mapUserRoles(usersData.users));
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (!users?.length || error)
    return <Alert severity='error'>Sorry, unable to retrieve users.</Alert>;

  return (
    <UserLayoutContainer>
      <UserRoleContainer
        roles={roles || []}
        selectedRole={selectedRole || 'Admin'}
        onRoleSelected={setSelectedRole}
      />
      <UsersContainer users={users} roleSelected={selectedRole || 'Admin'} />
    </UserLayoutContainer>
  );
};
