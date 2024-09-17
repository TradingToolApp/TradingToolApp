import React, {createContext, useState, useEffect, cache} from 'react';
import {useTranslation} from "react-i18next";
import useLocalStorage from "@/hooks/useLocalStorage";
import postAPI from "@/services/posts-api";
import {formatPosts} from "@/lib/formatData";
import {Loader} from 'rsuite';
import {useQuery} from '@tanstack/react-query'

interface contextDefaultValues {
    language: "en",
    setLanguage: (language: string) => void,
    posts: [],
    setPosts: (posts: object) => void,
    publicPosts: [],
    setPublicPosts: (posts: object) => void,
    allDataPosts: [],
    setAllDataPosts: (allDataPosts: object) => void,
    loading: true,
    setLoading: (bool: Boolean) => void,
    handleLanguageChange: (language: string) => void,
}

export const AppContext = createContext<contextDefaultValues>({} as contextDefaultValues)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {i18n} = useTranslation();
    const [allDataPosts, setAllDataPosts] = useState<any>([])
    const [posts, setPosts]: any = useState<any>([]) // this is use for template rsuite
    const [publicPosts, setPublicPosts]: any = useState<any>([]) // this is use for template papr
    const [loading, setLoading]: any = useState<boolean>(true);
    const [language, setLanguage]: any = useLocalStorage("language", "en");
    const {isPending, error, data} = useQuery({
        queryKey: ['todo'],
        queryFn: () =>
            fetch('/api/posts').then((res) =>
                res.json()
            ),
    })
    const handleLanguageChange = (language: string) => {
        setLanguage(language);
        i18n.changeLanguage(language);
    }

    useEffect(() => {
        if (data) {
            console.log("calling api app providers");
            setAllDataPosts(data.data)
        }
    }, [data])

    useEffect(() => {
        i18n.changeLanguage(language);
        try {
            setLoading(true);
            const posts = formatPosts(allDataPosts, language);
            const publicPosts = posts.filter((post: any) => post.status === "public");
            setPosts(posts);
            setPublicPosts(publicPosts);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [language, allDataPosts]);

    return (
        <AppContext.Provider value={{
            language,
            setLanguage,
            handleLanguageChange,
            posts,
            setPosts,
            publicPosts,
            setPublicPosts,
            allDataPosts,
            setAllDataPosts,
            loading,
            setLoading,
        }}>{
            loading ? <Loader style={{marginTop: "25%"}} backdrop size="md" content="loading..."/> : children}
        </AppContext.Provider>
    )
}
