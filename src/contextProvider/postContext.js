import React, { createContext, useState, useEffect } from 'react';
import postAPI from "@/services/posts-api";

const contextDefaultValues = {
    posts: [],
    setPosts: (posts) => {},
    language: "EN",
    setLanguage: (language) => {},
    loading: true,
    error: ""
};

export const PostContext = createContext(contextDefaultValues)

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState("EN");

    useEffect(() => {
        setLoading(true);
        try {
            const fetchData = async () => {
                const response = await postAPI.getPosts(language);
                setPosts(response.data.data);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            setError(error);
        }
    }, [language])

    return (
        <PostContext.Provider value={{ posts, setPosts, language, setLanguage, error, loading }}>
            {posts.length !== 0 && children}
        </PostContext.Provider>
    )
}