import { Container } from '@mui/material'
import React from 'react'
import DisplayMessage from './DisplayMessage';
import WriteMessage from './WriteMessage';
import { useSubscription } from '@apollo/client';
import { Box } from '@mui/system'

import { GET_ALL_MESSEGE_SUBSCRIBE } from '../../Graphql/Query/GetMesseges';

const Index = () => {

    const { error, data, } = useSubscription(GET_ALL_MESSEGE_SUBSCRIBE)

    // React.useEffect(() => {
    //     let unsubscribe

    //     unsubscribe = subscribeToMore({
    //         document: GET_ALL_MESSEGE_SUBSCRIBE,
    //         updateQuery: (prev, { subscriptionData }) => {
    //             console.log(prev, "prev")
    //             console.log(subscriptionData, "subscriptionData")
    //             if (!subscriptionData.data) return prev
    //             return {
    //                 messages: subscriptionData.data.messages
    //             }
    //         }
    //     })
    //     // Unsubscribe here
    //     if (unsubscribe) return () => unsubscribe()

    // }, [subscribeToMore])

    if (error) {
        return <h1> Error... </h1>
    }

    return (
        <Container maxWidth='md' className='d-flex j-c-c' >
            <Box className='chat_container' sx={{ borderRadius: ".8rem" }} >
                <Box className='wrapper_box'  >
                    <DisplayMessage data={data} />
                    <WriteMessage />
                </Box>
            </Box>
        </Container>
    )
}

export default Index
