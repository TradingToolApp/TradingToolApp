import React, {createContext, useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/appProvider";
import tagAPI from "@/services/tag-api";
import {formatTags} from "@/lib/formatData";

interface TagContextProps {
    loading: boolean,
    tags: any,
    setTags: (value: any) => void,
}

export const TagContext = createContext<TagContextProps>({} as TagContextProps);

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {language} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        setLoading(true);
        console.log("calling api tags")
        const fetchData = async () => {
            const response = await tagAPI.getTags();
            setAllData(response.data);
        }
        fetchData();
        setLoading(false);
    }, [])

    useEffect(() => {
        console.log("formatting tags")
        setTags(formatTags(allData, language));
    }, [allData, language])

    return (
        <TagContext.Provider value={{loading, tags, setTags}}>
            {children}
        </TagContext.Provider>
    );
};
