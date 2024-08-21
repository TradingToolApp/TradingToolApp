import React, { createContext, useState, useEffect, use } from 'react';
import { useTranslation } from "react-i18next";
import useLocalStorage from "@/hooks/useLocalStorage";
import postAPI from "@/services/posts-api";
import authorAPI from "@/services/author-api";
import { formatData, formatAuthors, formatCategories } from "@/lib/formatData";
import categoryAPI from "@/services/category-api";

interface Category {
    id: number,
    value: string,
    label: string,
    cate_slug: string,
    cate_bg: string,
    cate_img: string,
    cateEN: string,
    descriptionEN: string,
    cateVI: string,
}

interface contextDefaultValues {
    language: "en",
    setLanguage: ( language: string ) => void,
    posts: [],
    setPosts: ( posts: object ) => void,
    authors: [],
    setAuthors: ( authors: object ) => void,
    categories: Category[],
    setCategories: ( categories: object ) => void,
    tags: [],
    setTags: ( tags: object ) => void,
    fetching: true,
    setFetching: ( fetching: object ) => void,
    error: "",
    handleLanguageChange: (language: string) => void,
}

export const AppContext = createContext<contextDefaultValues>({} as contextDefaultValues)

export const AppProvider: React.FC<{children: React.ReactNode}> = ( { children } ) => {
    const { i18n, t } = useTranslation();
    const [ allDataPosts, setAllDataPosts ] = useState<any>([])
    const [ allDataCategories, setAllDataCategories ] = useState<any>([])
    const [ allDataAuthors, setAllDataAuthors ] = useState<any>([])
    const [ allDataTags, setAllDataTags ] = useState<any>([])
    const [ posts, setPosts ]: any = useState<any>([])
    const [ categories, setCategories ]: any = useState<any>([]);
    const [ authors, setAuthors ]: any = useState<any>([]);
    const [ tags, setTags ]: any = useState<any>([]);
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
        {posts.length !== 0 && categories.length !== 0 && authors.length !== 0 && children}
    </AppContext.Provider>)
}