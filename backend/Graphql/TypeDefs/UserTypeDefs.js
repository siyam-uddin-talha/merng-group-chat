const { gql } = require("apollo-server-express");

const typeDefs = gql`

type UserType{
    success:Boolean!
    message:String
    token:String
    user:User
}
type DefaultType{
    success:Boolean!
    message:String
}

type User{
     _id:ID!
    firstName:String!
    lastName: String!
    email: String!
    createdAt: String
}

input signUpInput {
    firstName:String!
    lastName: String!
    email: String!
    password: String
}


type Query{
    user:UserType
    logout:DefaultType
}
type Mutation{
    signUp(input:signUpInput):UserType
    login(email:String password:String):UserType
    forgetPassword(email:String):DefaultType
    resetPassword(resetToken:String password:String):DefaultType
}

`

module.exports = typeDefs