import { User } from '../../models/User';
import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export const usersResolvers = {
  Mutation: {
    async registerUser(parent: any, { registerInput: { username, email, password } }:any ) {
      // check if user exists and throw an error
      const oldUser = _.find(User, { email: email });
      if (oldUser) {
        throw new ApolloError('A user is already registered with this email' + email, 'USER_ALREADY_EXISTS')
      }

      // encrypt password
      let encryptedPassword = await bcrypt.hash(password, 10);

      // create user
      const newUser = await User.save({ username, email: email.toLowerCase(), password: encryptedPassword });

      // create jwt
      const token = jwt.sign(
        {user_id: newUser.id, email},
        "UNSAFE_STRING",
        {
          expiresIn: '2h'
        }
      );

      // add token to user
      await User.update({ email: email }, { token: token });

      return {
        ...newUser,
        token: token
      }
    },
    async loginUser(parent: any, {loginInput: {email, password} }:any) {
      // check if user exists
      const user = await User.findOne({ where: { email: email } });
      // check if password = encrypted password
      if (user && (await bcrypt.compare(password, user.password))) {
        // create a new token
        const token = jwt.sign(
          {user_id: user.id, email},
          "UNSAFE_STRING",
          {
            expiresIn: '2h'
          }
        );
        // add token to user
        await User.update({ email: email }, { token: token });

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          token: user.token,
        }
      } else {
        throw new ApolloError('Incorrect Password', 'INCORRECT_PASSWORD')
      }
    }
  },
  Query: {
    getAllUsers: () => User.find(),
    getUserById: (parent:any, {ID}:any) => User.findOneById(ID)
  }
}
