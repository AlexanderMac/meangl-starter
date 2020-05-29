const _ = require('lodash');
const userHelpers = require('./helpers');
const userSrvc = require('./data-service');

exports.schema = `
type User {
  userId: ID!
  name: String!
  email: String!
}
type Query {
  user(userId: ID!): User
  users(name: String): [User]!
}

input UserInput {
  name: String!
  email: String!
}
type Mutation {
  createUser(input: UserInput!): User!
  updateUser(userId: ID!, input: UserInput!): User!
  deleteUser(userId: ID!): Boolean
}
`;

exports.root = {
  user: async (args) => {
    let user = await userSrvc.getUserOne({
      filter: userHelpers.getSingleFilter(args)
    });
    return user.toJSON();
  },
  users: async () => {
    let users = await userSrvc.getUsers({});
    return _.map(users, u => u.toJSON());
  },
  createUser: async (args) => {
    let userData = userHelpers.parseUserParams(args.input || {});
    let user = await userSrvc.createUser({ userData });
    return user.toJSON();
  },
  updateUser: async (args) => {
    let user = await userSrvc.findAndUpdateUser({
      filter: userHelpers.getSingleFilter(args),
      userData: userHelpers.parseUserParams(args.input || {})
    });
    return user.toJSON();
  },
  deleteUser: async (args) => {
    let user = await userSrvc.deleteUser({
      filter: userHelpers.getSingleFilter(args)
    });
    return !!user;
  }
};
