import { gql } from '@apollo/client';

export const GET_ALL_MESSEGE_SUBSCRIBE = gql`
subscription Messenger {
  messages {
    content
    user
  }
}
`

export const GET_ALL_MESSEGE_QUERY = gql`
query Messenger {
  messages {
    content
    user
  }
}
`
