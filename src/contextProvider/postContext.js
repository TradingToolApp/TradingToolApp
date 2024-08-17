import React, { createContext, useState, useEffect, use } from 'react';
import useLocalStorage from "@/hooks/useLocalStorage";
import postAPI from "@/services/posts-api";
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";
import formatPosts from "@/lib/formatPosts";

const contextDefaultValues = {
  posts: [],
  setPosts: (posts) => { },
  language: "EN",
  setLanguage: (language) => { },
  loading: true,
  setLoading: (loading) => { },
  error: ""
};

export const PostContext = createContext(contextDefaultValues)

export const PostProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useLocalStorage("language", "en");

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setLanguage(language)
  };

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const response = await postAPI.getPosts();
        setData(response.data.data);
        // const posts = formatPosts(response.data.data, language);
        // setPosts(posts);
      }
      fetchData();
      setLoading(false);
      // i18n.changeLanguage(language);
    } catch (error) {
      setError(error);
    }
  }, [loading]);

  useEffect(() => {
    i18n.changeLanguage(language);
    const posts = formatPosts(data, language);
    setPosts(posts);
  }, [language, i18n, data]);

  return (
    <PostContext.Provider value={{ posts, setPosts, language, setLanguage, error, loading, setLoading, handleLanguageChange }}>
      {posts.length !== 0 && children}
    </PostContext.Provider>
  )
}