import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/posts')
            setPosts(response.data.data);
        }
        fetchData();
    },[])

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    )
}