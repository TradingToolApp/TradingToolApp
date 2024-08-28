import React, {createContext, useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/app.provider";
import authorAPI from "@/services/author-api";
import {formatAuthors} from "@/lib/formatData";

interface AuthorContextProps {
    authors: any,
    setAuthors: any,
    allDataAuthors: any,
    setAllDataAuthors: any,
}

export const AuthorContext = createContext<AuthorContextProps>({} as AuthorContextProps);

export const AuthorProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {language} = useContext(AppContext);
    const [allDataAuthors, setAllDataAuthors] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        console.log("calling api authors")
        const fetchData = async () => {
            const response = await authorAPI.getAuthors();
            setAllDataAuthors(response.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        try {
            console.log("formatting authors")
            setAuthors(formatAuthors(allDataAuthors, language));
        } catch (error) {
            console.log(error);
        }
    }, [allDataAuthors, language])

    return (
        <AuthorContext.Provider value={{authors, setAuthors, allDataAuthors, setAllDataAuthors}}>
            {children}
        </AuthorContext.Provider>
    );
};
