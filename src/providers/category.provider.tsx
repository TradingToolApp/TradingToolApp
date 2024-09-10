import React, {createContext, useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/app.provider";
import categoryAPI from "@/services/category-api";
import {formatCategories} from "@/lib/formatData";

interface CategoryContextProps {
    loading: boolean,
    categories: any,
    setCategories: (value: any) => void,
    allDataCategories: any,
    setAllDataCategories: (value: any) => void,
}

export const CategoryContext = createContext<CategoryContextProps>({} as CategoryContextProps);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {language} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [allDataCategories, setAllDataCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        try {
            setLoading(true);
            console.log("calling api categories")
            const fetchData = async () => {
                const response = await categoryAPI.getCategories();
                setAllDataCategories(response.data);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        try {
            console.log("formatting categories")
            setCategories(formatCategories(allDataCategories, language));
        } catch (error) {
            console.log(error);
        }
    }, [allDataCategories, language])

    return (
        <CategoryContext.Provider value={{loading, categories, setCategories, allDataCategories, setAllDataCategories}}>
            {!loading && children}
        </CategoryContext.Provider>
    );
};
