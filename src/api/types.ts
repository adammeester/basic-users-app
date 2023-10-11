export type CustomersApiResponse = {
  data: {
    listZellerCustomers: {
      items: Array<User>;
    };
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type UserRole = 'ADMIN' | 'MANAGER';
