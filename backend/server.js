/*
author: Arnob Islam
date: '14-12-21' 
description: ''
*/

const express = require("express");
const { app } = require("./app")
const { ApolloServer, } = require('apollo-server-express');
const { createServer } = require('http')
const path = require('path');
const { execute, subscribe } = require("graphql")
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require("subscriptions-transport-ws")
const jwt = require('jsonwebtoken');

const typeDefs = require('./Graphql/TypeDefs/app');
const resolvers = require('./Graphql/Resolvers/app');
const { PubSub } = require('graphql-subscriptions');

const PORT = process.env.PORT || 5000;
const pubsub = new PubSub();


// front-end 
app.use("/", express.static(path.join(__dirname, "../client/build")))
// front-end index file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

const GetStar = async () => {
    try {
        const httpServer = createServer(app)

        const getUser = token => {
            try {
                if (token) {
                    return jwt.verify(token, process.env.JWT_SECRET_KEY)
                }
                return null
            } catch (err) {
                return null
            }
        }

        const schema = makeExecutableSchema({ typeDefs, resolvers, });

        const subscriptionServer = new SubscriptionServer(
            { schema, execute, subscribe, },
            { server: httpServer, path: '/graphql' }
        );

        const server = new ApolloServer({
            schema,
            context: ({ req, res }) => {
                const token = req.cookies.token || ""
                const user = getUser(token)
                return { req, res, pubsub, user }
            },
            plugins: [{
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    };
                }
            }],
        })

        await server.start()
        server.applyMiddleware({
            app,
            // in playground make sure corse is false
            // cors: false

            // in react or client, make sure corse is this
            cors: {
                // origin: 'http://localhost:3000',
                credentials: true
            }
        })

        httpServer.listen(PORT, () => console.log('server is running on port ', + PORT))

    } catch (error) {
        throw new Error(error.message)
    }
}


GetStar()
