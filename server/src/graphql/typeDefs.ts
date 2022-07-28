import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Message {
        text: String
        createdAt: String
        createdBy: String
    }
    type User {
        username: String
        email: String
        password: String
        token: String
    }
    input MessageInput {
        text: String
        username: String
    }
    input RegisterInput {
        id: ID
        username: String
        email: String
        password: String
        confirmPassword: String
    }
    input LoginInput {
        email: String
        password: String
    }
    type Query {
        getMessageById(id: ID!): Message
        getAllMessages: [Message]
        getUserById(id: ID!): User
        getAllUsers: [User]
    }
    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        registerUser(registerInput: RegisterInput): User!
        loginUser(loginInput: LoginInput): User!
    }
`
