import React, {createContext, useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/appProvider";
import categoryAPI from "@/services/category-api";
import {formatCategories} from "@/lib/formatData";

interface CategoryContextProps {
    loading: boolean,
    categories: any,
    setCategories: (value: any) => void,
    setAllData: (value: any) => void,
}

export const CategoryContext = createContext<CategoryContextProps>({} as CategoryContextProps);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {language} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [allData, setAllData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        console.log("calling api categories")
        const fetchData = async () => {
            const response = await categoryAPI.getCategories();
            setAllData(response.data);
        }
        fetchData();
        setLoading(false);
    }, [])

    useEffect(() => {
        console.log("formatting categories")
        setCategories(formatCategories(allData, language));
    }, [allData, language])

    return (
        <CategoryContext.Provider value={{loading, categories, setCategories, setAllData}}>
            {children}
        </CategoryContext.Provider>
    );
};
