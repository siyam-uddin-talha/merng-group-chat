import { gql } from '@apollo/client';

export const LOGIN_TYPE = gql`
mutation Login($email:String,$password:String){
  login(email:$email,
    password:$password){
    success
    message
    user {
      email
      firstName
      lastName
    }
  }
}


`
