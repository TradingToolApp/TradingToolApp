import React, { createContext, useState, useEffect, use } from 'react';
import { useTranslation } from "react-i18next";
import useLocalStorage from "@/hooks/useLocalStorage";
import postAPI from "@/services/posts-api";
import authorAPI from "@/services/author-api";
import { formatData, formatAuthors, formatCategories } from "@/lib/formatData";
import { prisma } from "@/lib/prisma";
import categoryAPI from "@/services/category-api";

const contextDefaultValues = {
    language: "en",
    setLanguage: ( language ) => { },
    posts: [],
    setPosts: ( posts ) => { },
    authors: [],
    setAuthors: ( authors ) => { },
    categories: [],
    setCategories: ( categories ) => { },
    tags: [],
    setTags: ( tags ) => { },
    fetching: true,
    setFetching: ( fetching ) => { },
    error: ""
};

export const AppContext = createContext(contextDefaultValues)

export const AppProvider = ( { children } ) => {
    const [ allDataPosts, setAllDataPosts ] = useState([])
    const [ allDataCategories, setAllDataCategories ] = useState([])
    const [ allDataAuthors, setAllDataAuthors ] = useState([])
    const [ allDataTags, setAllDataTags ] = useState([])
    const [ posts, setPosts ] = useState([])
    const [ categories, setCategories ] = useState([]);
    const [ authors, setAuthors ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ fetching, setFetching ] = useState(false);
    const [ error, setError ] = useState(null);
    const { i18n, t } = useTranslation();
    const [ language, setLanguage ] = useLocalStorage("language", "en");

    const handleLanguageChange = ( language ) => {
        setLanguage(language);
        i18n.changeLanguage(language);
    }

    useEffect(() => {
        setFetching(true);
        try {
            const fetchData = async () => {
                const posts = await postAPI.getPosts();
                setAllDataPosts(posts.data);
                const authors = await authorAPI.getAuthors();
                setAllDataAuthors(authors.data);
                const categories = await categoryAPI.getCategories();
                setAllDataCategories(categories.data);
            }
            fetchData();
            setFetching(false);
        } catch (error) {
            setError(error);
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(language);
        try {
            const posts = formatData(allDataPosts, language);
            setPosts(posts);
            const authors = formatAuthors(allDataAuthors, language);
            setAuthors(authors);
            console.log(authors)
            const categories = formatCategories(allDataCategories, language);
            setCategories(categories);
        } catch (error) {
            console.log(error);
        }
    }, [ language, i18n, allDataPosts, allDataAuthors, allDataCategories ]);

    return (<AppContext.Provider value={{
        language,
        setLanguage,
        handleLanguageChange,
        posts,
        setPosts,
        categories,
        setCategories,
        authors,
        setAuthors,
        tags,
        setTags,
        fetching,
        setFetching,
        error
    }}>
        {posts.length !== 0 && children}
    </AppContext.Provider>)
}