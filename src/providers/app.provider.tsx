import React, {createContext, useState, useEffect} from 'react';

interface contextDefaultValues {
    language: "en",
    setLanguage: (language: string) => void,
    handleLanguageChange: (language: string) => void,
}

export const AppContext = createContext<contextDefaultValues>({} as contextDefaultValues)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [language, setLanguage]: any = useState("en");

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    }

    useEffect(() => {
        handleLanguageChange(language)
    }, [])

    return (
        <AppContext.Provider value={{
            language,
            setLanguage,
            handleLanguageChange,
        }}>{language && children}
        </AppContext.Provider>
    )
}
