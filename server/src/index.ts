import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import http from 'http';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Message } from './models/Message';
import { User } from './models/User';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

const main = async () => {
  await createConnection({
    type: 'mysql',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    logging: true,
    synchronize: false,
    entities: [Message, User],
  });
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  app.use(cors());
  app.use(express.json());
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main().catch((err) => {
  console.log(err);
});
