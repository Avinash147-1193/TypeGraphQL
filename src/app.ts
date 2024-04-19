import Koa from 'koa';
import 'reflect-metadata';
import createApolloServer from './helpers/createApolloServer';
import { getConnection } from './helpers/database';

const PORT = process.env.PORT || 3003;
const app = new Koa();

const apolloServer = createApolloServer();

(async () => {
  await getConnection();
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/' });
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}`);
  });
})();
