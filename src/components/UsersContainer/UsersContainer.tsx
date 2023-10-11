import { Avatar, Typography, styled } from '@mui/material';
import { User } from '../../api/types';

const UserContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.8rem 0',
});

const UserInformation = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Container = styled('div')({
  borderbottom: '1px solid lightgrey',
  paddingBottom: '1.5rem',
});

type UsersContainerProps = {
  users: Array<User>;
  roleSelected: string;
};

export const UsersContainer = ({
  users,
  roleSelected,
}: UsersContainerProps) => {
  return (
    <Container>
      <Typography
        variant='h4'
        paddingBottom={'1.5rem'}
        textTransform={'capitalize'}
      >
        {roleSelected} Users
      </Typography>
      {users
        ?.filter((user) => user.role.toLowerCase() === roleSelected)
        ?.map((user) => {
          return (
            <UserContainer key={user.name}>
              <Avatar
                sx={{ bgcolor: 'skyblue', color: 'white' }}
                variant='rounded'
              >
                {user.name.substring(0, 1)}
              </Avatar>
              <UserInformation>
                <Typography textTransform={'capitalize'}>
                  {user.name}
                </Typography>
                <Typography color={'grey'} textTransform={'capitalize'}>
                  {user.role.toLowerCase()}
                </Typography>
              </UserInformation>
            </UserContainer>
          );
        })}
    </Container>
  );
};
