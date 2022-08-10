const { gql } = require("apollo-server");

const typeDef = gql`
  type Hotel {
    id: ID!
    name: String!
    address: String!
    city: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getHotels: [Hotel]!
    searchHotels(search: String!): [Hotel]!
    getHotel(id: ID!): Hotel!
    getHotelByCity(city: String!): [Hotel]!
  }

  enum HotelStatus {
    ACTIVE
    INACTIVE
  }

  type Mutation {
    createHotel(
      name: String!
      address: String!
      city: String!
    ): Hotel!
    updateHotel(
      id: ID!
      name: String!
      address: String!
      city: String!
    ): Hotel!
    deleteHotel(id: ID!): Hotel!
  }
`;
module.exports = { typeDef };
