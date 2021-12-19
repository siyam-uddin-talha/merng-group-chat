import { useQuery } from '@apollo/client'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { GET_USER } from '../../Graphql/Query/GetUser';
const Context = createContext()

const ChatContext = ({ children }) => {

    const { data, loading } = useQuery(GET_USER)

    const [state, setstate] = useState({
        user: null,
    })

    useEffect(() => {
        if (data) {
            if (data.user) {
                setstate({
                    currentUser: data.user.user
                })
            }
        }
    }, [loading, data])

    return (
        <Context.Provider value={{ ...state, setstate, loading }} >
            {children}
        </Context.Provider>
    )
}

export const UseGlobalContext = () => {
    return useContext(Context)
}

export default ChatContext
