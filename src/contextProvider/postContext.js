import React, { createContext, useState, useEffect, use } from 'react';
import useLocalStorage from "@/hooks/useLocalStorage";
import postAPI from "@/services/posts-api";
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";

const contextDefaultValues = {
  posts: [],
  setPosts: (posts) => { },
  language: "EN",
  setLanguage: (language) => { },
  loading: true,
  error: ""
};

export const PostContext = createContext(contextDefaultValues)

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);
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
        const response = await postAPI.getPosts(language);
        setPosts(response.data.data);
      }
      fetchData();
      setLoading(false);
      i18n.changeLanguage(language);
    } catch (error) {
      setError(error);
    }
  }, [language, i18n]);
  
  useEffect(() => {
    if (language === "vi") {
      i18n.changeLanguage("vi");
    } else {
      i18n.changeLanguage("en");
    }
  }, [language, i18n]);

  return (
    <PostContext.Provider value={{ posts, setPosts, language, setLanguage, error, loading, handleLanguageChange }}>
      {posts.length !== 0 && children}
    </PostContext.Provider>
  )
}