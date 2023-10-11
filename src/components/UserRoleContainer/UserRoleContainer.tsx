import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material';

export type UserRoleContainerProps = {
  roles: Array<string>;
  selectedRole: string;
  onRoleSelected: (role: string) => void;
};

const Container = styled('div')({
  borderBottom: '1px solid lightGrey',
  paddingBottom: '2rem',
});

export const UserRoleContainer = ({
  roles,
  selectedRole,
  onRoleSelected,
}: UserRoleContainerProps) => {
  return (
    <Container>
      <Typography variant='h4' paddingBottom={'1.5rem'}>
        User Types
      </Typography>
      <RadioGroup
        aria-labelledby='role-selection-radio'
        name='role-selection-buttons-group'
      >
        {roles.map((role) => {
          return (
            <FormControlLabel
              key={role}
              sx={{ textTransform: 'capitalize' }}
              value={role}
              control={<Radio />}
              label={role}
              checked={selectedRole === role}
              onChange={() => onRoleSelected(role)}
            />
          );
        })}
      </RadioGroup>
    </Container>
  );
};
