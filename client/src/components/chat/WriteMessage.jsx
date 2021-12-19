import React from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { GET_ALL_MESSEGE } from "../../Graphql/Mutations/SendMessage"
import { useMutation } from '@apollo/client'
import { UseGlobalContext } from "../Provider/Context"

const WriteMessage = () => {
    const [value, setValue] = React.useState('')
    const { currentUser } = UseGlobalContext()

    const [sendMessage,] = useMutation(GET_ALL_MESSEGE, {
        variables: {
            input: {
                user: `${currentUser.firstName} ${currentUser.lastName}`,
                content: value
            }
        }

    })

    const handleSubmit = (e) => {

        sendMessage()

        setTimeout(() => {
            setValue("")
        }, 10)

    }

    return (
        <Box className='write_so_ss' >
            <form className='d-flex j-c-s-b' onSubmit={(e) => e.preventDefault()} >
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className='write_input' placeholder='A...' />
                <Button type='button' onClick={handleSubmit} >
                    send
                </Button>
            </form>
        </Box>
    )
}

export default WriteMessage
