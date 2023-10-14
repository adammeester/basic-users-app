import { UsersContainer } from '../UsersContainer';
import { UserRoleContainer } from '../UserRoleContainer';
import { styled } from '@mui/material';

const UserLayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const UsersLayout = () => {
  return (
    <UserLayoutContainer>
      <UserRoleContainer />
      <UsersContainer />
    </UserLayoutContainer>
  );
};
