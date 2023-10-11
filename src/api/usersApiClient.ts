import { API, graphqlOperation } from 'aws-amplify';
import { ListZellerCustomers } from '../queries/queries';
import { CustomersApiResponse } from './types';
import { UserContextType } from '../context/UsersContext';

class UsersApiClient {
  async fetchZellerUsers() {
    try {
      const response = (await API.graphql(
        graphqlOperation(ListZellerCustomers)
      )) as CustomersApiResponse;

      return {
        users: response.data.listZellerCustomers.items,
      } as UserContextType;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}

export default UsersApiClient;
