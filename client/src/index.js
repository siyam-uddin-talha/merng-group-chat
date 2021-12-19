import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style/app.css"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { WebSocketLink } from "@apollo/client/link/ws"
import Context from './components/Provider/Context'


import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: '/graphql', credentials: 'include',
})

const wsLink = new WebSocketLink({
  uri: 'ws://mr-merng-group-chat.herokuapp.com/graphql',
  options: { reconnect: true }
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
}, wsLink, httpLink)



const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include',
})





ReactDOM.render(
  <React.Fragment>
    <Router>
      <ApolloProvider client={client} >
        <Context>
          <App />
        </Context>
      </ApolloProvider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);

