import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/',
    }),
  ],
});

async function main() {
  const users = await trpc.userList.query();
  console.log(users);
  const createdUser = await trpc.createUser.mutate({ name: 'Sarah' });
  console.log(createdUser);
  const user = await trpc.userById.query('1');
  console.log(user);
}

main().catch(console.error);