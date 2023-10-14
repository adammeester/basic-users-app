import {
  Alert,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material';
import { useUsersContext } from '../../context/UsersContext';

const Container = styled('div')({
  borderBottom: '1px solid lightGrey',
  paddingBottom: '2rem',
});

export const UserRoleContainer = () => {
  const { roles, selectedRole, handleUpdateSelectedRole } = useUsersContext();

  if (!roles?.length)
    return <Alert severity='error'>Sorry, unable to retrieve roles.</Alert>;

  return (
    <Container>
      <Typography variant='h4' paddingBottom={'1.5rem'}>
        User Types
      </Typography>
      <RadioGroup
        aria-labelledby='role-selection-radio'
        name='role-selection-buttons-group'
      >
        {roles?.map((role) => {
          return (
            <FormControlLabel
              key={role}
              sx={{ textTransform: 'capitalize' }}
              value={role}
              control={<Radio />}
              label={role}
              checked={selectedRole === role}
              onChange={() => handleUpdateSelectedRole(role)}
            />
          );
        })}
      </RadioGroup>
    </Container>
  );
};
