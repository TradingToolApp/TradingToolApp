import React, {createContext, useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/appProvider";
import authorAPI from "@/services/author-api";
import {formatAuthors} from "@/lib/formatData";

interface AuthorContextProps {
    authors: any,
    setAuthors: any,
}

export const AuthorContext = createContext<AuthorContextProps>({} as AuthorContextProps);

export const AuthorProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {language} = useContext(AppContext);
    const [allData, setAllData] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        console.log("calling api authors")
        const fetchData = async () => {
            const response = await authorAPI.getAuthors();
            setAllData(response.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        console.log("formatting authors")
        setAuthors(formatAuthors(allData, language));
    }, [allData, language])

    return (
        <AuthorContext.Provider value={{authors, setAuthors}}>
            {children}
        </AuthorContext.Provider>
    );
};
