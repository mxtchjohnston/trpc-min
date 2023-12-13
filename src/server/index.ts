import { router, procedure } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { db } from './db';

const appRouter = router({
  userList: procedure
    .query(async () => {
      return await db.user.findMany();
    }),
  userById: procedure
    .input(z.string())
    .query(async (opts) => {
      const {input} = opts;
      const user = await db.user.findById(input);
      return user;
    }),
  createUser: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const {input} = opts;
      const user = await db.user.create({name: input.name});
      return user;
    })
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);



