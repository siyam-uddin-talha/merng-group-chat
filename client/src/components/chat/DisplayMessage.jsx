import React, { useRef, useEffect } from 'react'
import { Box } from '@mui/system'
import { UseGlobalContext } from "../Provider/Context"


const DisplayMessage = ({ data }) => {
    return (
        <Box className='read_capble read' >
            <Title />
            <Messeges data={data} />
        </Box>
    )
}

const Title = () => {
    return <Box sx={{ p: 1, ml: 1 }} className='border-bottom' >
        <h6>
            Group chat app
        </h6>
    </Box>
}


const Messeges = ({ data }) => {

    const { currentUser } = UseGlobalContext()

    const containerRef = useRef()

    const scrollToBottom = () => {
        containerRef.current?.scrollIntoView({ behavior: "smooth", })
    }

    useEffect(scrollToBottom, []);
    useEffect(scrollToBottom, [data])

    return (
        <Box className='m-box-wraper'>
            <Box className='m-container d-flex f-d-c gap-2'  >
                {data && data.messages.map((e, i) => {
                    return <div key={i} className='single_mess d-flex ' style={{ justifyContent: `${currentUser.firstName} ${currentUser.lastName}` === e.user ? "flex-end" : "flex-start" }} ref={containerRef} >

                        <Box className='a_cont gap-1' style={{ alignItems: `${currentUser.firstName} ${currentUser.lastName}` === e.user ? "end" : "start" }} >
                            <span className='user_' >
                                {e.user.split(" ")[0]}
                            </span>

                            <span className='content d-flex'  >
                                {e.content}
                            </span>

                        </Box>
                    </div>
                })}
            </Box>
        </Box>
    )
}

export default DisplayMessage
