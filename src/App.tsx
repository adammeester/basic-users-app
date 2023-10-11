import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { UsersLayout } from './components/UsersLayout';
import styled from '@emotion/styled';
import { UsersContextProvider } from './context/UsersContext';
import UsersApiClient from './api/usersApiClient';

Amplify.configure(awsconfig);

const Page = styled('div')({
  maxWidth: '70.25rem',
  padding: '4rem',
});

const usersApiClient = new UsersApiClient();

const App = () => {
  return (
    <Page>
      <UsersContextProvider value={{ apiClient: usersApiClient }}>
        <UsersLayout />
      </UsersContextProvider>
    </Page>
  );
};

export default App;
