import { gql } from '@apollo/client';


const REGISTER = gql`mutation Signup($input: signUpInput) {
 signUp (input: $input) {
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
export default REGISTER