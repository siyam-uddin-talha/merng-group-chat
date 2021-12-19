const { gql } = require("apollo-server-express");


const typeDefs = gql`
 
  input MessageInput {
    user: String!
    content: String
  }
  type Message {
    _id:ID
    user: String
    content: String
  }

  type Query {
    messages:[Message]
    singleMessage(id:ID):Message!
  }
  
  type Mutation {
    sendMessage(input:MessageInput):ID!
  }

  type Subscription{
    messages:[Message]
  }

`;

module.exports = typeDefs