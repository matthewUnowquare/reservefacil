const { gql } = require("apollo-server");

const typeDef = gql`
type SuccessResponse {
    success: Boolean!
    data: Data!
    code: Int!
  }

  union Data = Auth | Error | Test

  type Test {
    name: String
  }

  type Error {
    message: String!
  } 
  `;

    module.exports = {typeDef};