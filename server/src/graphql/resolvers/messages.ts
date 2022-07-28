import { Message } from '../../models/Message';
import { User } from '../../models/User';

export const messagesResolvers = {
  Mutation: {
    async createMessage(_: any, { messageInput: { text, username } }:any) {
      const res = await Message.save({ text, createdBy: username, createdAt: new Date().toISOString() });

      return {
        ...res
      }
    }
  },
  Query: {
    getAllMessages: () => User.find(),
    getMessageById: ( _:any, { ID }:any ) => User.findOneById(ID)
  }
}
