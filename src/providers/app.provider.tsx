import React, {createContext, useState, useEffect, useLayoutEffect} from 'react';

import {CustomProvider} from "rsuite"
import useLocalStorage from "@/hooks/useLocalStorage";

interface contextDefaultValues {
    language: "en",
    setLanguage: (language: string) => void,
    theme: "light",
    setTheme: (theme: string) => void,
    handleLanguageChange: (language: string) => void,
}

export const AppContext = createContext<contextDefaultValues>({} as contextDefaultValues)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [language, setLanguage]: any = useState("en");
    const [theme, setTheme]: any = useState("light");

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    }


    return (
        <AppContext.Provider value={{
            language,
            setLanguage,
            theme,
            setTheme,
            handleLanguageChange,
        }}>
            <CustomProvider theme={theme}>
                <div className={theme}>
                    {language && children}
                </div>
            </CustomProvider>
        </AppContext.Provider>
    )
}
