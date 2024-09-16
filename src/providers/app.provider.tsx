import React, {createContext, useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import useLocalStorage from "@/hooks/useLocalStorage";
import postAPI from "@/services/posts-api";
import {formatPosts} from "@/lib/formatData";
import {Loader} from 'rsuite';

interface contextDefaultValues {
    language: "en",
    setLanguage: (language: string) => void,
    posts: [],
    setPosts: (posts: object) => void,
    allDataPosts: [],
    setAllDataPosts: (allDataPosts: object) => void,
    loading: true,
    setLoading: (bool: Boolean) => void,
    error: "",
    handleLanguageChange: (language: string) => void,
}

export const AppContext = createContext<contextDefaultValues>({} as contextDefaultValues)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {i18n, t} = useTranslation();
    const [allDataPosts, setAllDataPosts] = useState<any>([])
    const [posts, setPosts]: any = useState<any>([])
    const [loading, setLoading]: any = useState<boolean>(true);
    const [error, setError]: any = useState<any>();
    const [language, setLanguage]: any = useLocalStorage("language", "en");

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
        i18n.changeLanguage(language);
    }

    useEffect(() => {
        try {
            console.log("calling api app providers");
            const fetchData = async () => {
                const posts = await postAPI.getPosts();
                setAllDataPosts(posts.data);
            }
            fetchData();
        } catch (error) {
            setError(error);
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(language);
        try {
            setLoading(true);
            console.log("formatting app providers");
            const posts = formatPosts(allDataPosts, language);
            setPosts(posts);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [language, i18n, allDataPosts]);

    return (<AppContext.Provider value={{
        language,
        setLanguage,
        handleLanguageChange,
        posts,
        setPosts,
        allDataPosts,
        setAllDataPosts,
        loading,
        setLoading,
        error
    }}>
        {loading ? <Loader style={{marginTop: "25%"}} backdrop size="md" content="loading..."/> : children}
    </AppContext.Provider>)
}