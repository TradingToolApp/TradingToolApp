import React, {createContext, useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/app.provider";
import tagAPI from "@/services/tag-api";
import {formatTags} from "@/lib/formatData";

interface TagContextProps {
    loading: boolean,
    tags: any,
    setTags: (value: any) => void,
    allDataTags: any,
    setAllDataTags: (value: any) => void,
}

export const TagContext = createContext<TagContextProps>({} as TagContextProps);

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {language} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [allDataTags, setAllDataTags] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        try {
            setLoading(true);
            console.log("calling api tags")
            const fetchData = async () => {
                const response = await tagAPI.getTags();
                setAllDataTags(response.data);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        try {
            console.log("formatting tags")
            setTags(formatTags(allDataTags, language));
        } catch (error) {
            console.log(error);
        }
    }, [allDataTags, language])

    return (
        <TagContext.Provider value={{loading, tags, setTags, allDataTags, setAllDataTags}}>
            {!loading && children}
        </TagContext.Provider>
    );
};
