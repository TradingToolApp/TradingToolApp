import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import useLocalStorage from "@/hooks/useLocalStorage";
import postAPI from "@/services/posts-api";
import { formatData, formatCategories } from "@/lib/formatData";
import categoryAPI from "@/services/category-api";

interface contextDefaultValues {
    language: "en",
    setLanguage: ( language: string ) => void,
    posts: [],
    setPosts: ( posts: object ) => void,
    fetching: true,
    setFetching: ( fetching: object ) => void,
    error: "",
    handleLanguageChange: (language: string) => void,
}

export const AppContext = createContext<contextDefaultValues>({} as contextDefaultValues)

export const AppProvider: React.FC<{children: React.ReactNode}> = ( { children } ) => {
    const { i18n, t } = useTranslation();
    const [ allDataPosts, setAllDataPosts ] = useState<any>([])
    const [ posts, setPosts ]: any = useState<any>([])
    const [ fetching, setFetching ]: any = useState<any>(false);
    const [ error, setError ]: any = useState<any>();
    const [ language, setLanguage ]: any = useLocalStorage("language", "en");

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
        i18n.changeLanguage(language);
    }

    useEffect(() => {
        setFetching(true);
        try {
            console.log("calling api app providers");
            const fetchData = async () => {
                const posts = await postAPI.getPosts();
                setAllDataPosts(posts.data);
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
            console.log("formatting app providers");
            const posts = formatData(allDataPosts, language);
            setPosts(posts);
        } catch (error) {
            console.log(error);
        }
    }, [ language, i18n, allDataPosts ]);

    return (<AppContext.Provider value={{
        language,
        setLanguage,
        handleLanguageChange,
        posts,
        setPosts,
        fetching,
        setFetching,
        error
    }}>
        {posts.length !== 0 && children}
    </AppContext.Provider>)
}