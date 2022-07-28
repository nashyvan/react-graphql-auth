import { messagesResolvers } from './messages';
import { usersResolvers } from './users';

export const resolvers = {
  Query: {
    ...messagesResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...messagesResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
