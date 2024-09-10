import React, {createContext, useContext, useEffect, useState} from "react";
import youtubeAPI from "@/services/widgets/youtube-api";

interface YoutubeContextProps {
    loading: boolean,
    allDataYoutube: any,
    setAllDataYoutube: (value: any) => void,
}

export const YoutubeContext = createContext<YoutubeContextProps>({} as YoutubeContextProps);

export const YoutubeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [allDataYoutube, setAllDataYoutube] = useState([]);

    useEffect(() => {
        try {
            setLoading(true);
            console.log("calling api tags")
            const fetchData = async () => {
                const response = await youtubeAPI.getYoutubeURLs();
                setAllDataYoutube(response.data);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <YoutubeContext.Provider value={{loading, allDataYoutube, setAllDataYoutube}}>
            {!loading && children}
        </YoutubeContext.Provider>
    );
};
