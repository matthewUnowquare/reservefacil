const { gql } = require("apollo-server");

const typeDef = gql`
  type Auth {
    name: String
    email: String
    password: String
    token: String
    id: ID
  }
  
  type Query {
    Login(email: String, password: String): SuccessResponse
    me(email: String): SuccessResponse
  }
  type Mutation {
    Register(name: String, email: String, password: String): SuccessResponse
  }
  `;

module.exports = { typeDef };
