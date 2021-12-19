const MESSEGE = require('../../Models/Message');


const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

let AllMessages = []
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);


const SendMessage = async (_, { input },) => {

    try {
        const response = await MESSEGE.create({ user: input.user, content: input.content })
        AllMessages.push(response);
        subscribers.forEach((fn) => fn());
        return response._id
    } catch (err) {
        throw new Error(err.message);
    }
}

const resolvers = {
    // Querys
    Query: {
        messages: async () => {
            try {
                const response = await MESSEGE.find({})
                AllMessages.push(...response)
                return AllMessages
            } catch (err) {
                throw new Error(err.message);
            }

        }
    },
    //Mutations
    Mutation: {
        sendMessage: SendMessage
    },
    //Subscriptions
    Subscription: {
        messages: {
            subscribe: async () => {
                const previous = await MESSEGE.find({})
                const channel = Math.random().toString(36).slice(2, 15);
                onMessagesUpdates(() => pubsub.publish(channel, { messages: AllMessages }));

                setTimeout(() => {
                    AllMessages = previous
                    // AllMessages.push(...previous)
                    pubsub.publish(channel, { messages: AllMessages })
                }, 10);

                return pubsub.asyncIterator(channel)
            }

        }
    }

};

module.exports = resolvers