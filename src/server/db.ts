type User = {id: string, name: string};

const users: User[] = [];
export const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find(u => u.id === id),
    create: async (data: {name: string}) => {
      const user = {id: String(users.length + 1), ...data};
      users.push(user);
      return user;
    }
  }
};