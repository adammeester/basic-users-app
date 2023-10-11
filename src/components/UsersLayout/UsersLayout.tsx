import { useUsersContext } from '../../context/UsersContext';
import { UsersContainer } from '../UsersContainer';
import { UserRoleContainer } from '../UserRoleContainer';
import { Alert, styled } from '@mui/material';

const UserLayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const UsersLayout = () => {
  const { users, roles, selectedRole, handleUpdateSelectedRole } =
    useUsersContext();

  if (!users?.length)
    return <Alert severity='error'>Sorry, unable to retrieve users.</Alert>;

  return (
    <UserLayoutContainer>
      <UserRoleContainer
        roles={roles || []}
        selectedRole={selectedRole || 'Admin'}
        onRoleSelected={handleUpdateSelectedRole}
      />
      <UsersContainer users={users} roleSelected={selectedRole || 'Admin'} />
    </UserLayoutContainer>
  );
};
