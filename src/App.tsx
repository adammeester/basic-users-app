import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { UsersLayout } from './components/UsersLayout';
import styled from '@emotion/styled';
import UsersApiClient from './api/usersApiClient';

Amplify.configure(awsconfig);

const Page = styled('div')({
  maxWidth: '70.25rem',
  padding: '4rem',
});

const App = () => {
  return (
    <Page>
      <UsersLayout />
    </Page>
  );
};

export default App;
