import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/app.provider";
import commentAPI from "@/services/comment-api";
import { formatComments } from "@/lib/formatData";

interface CommentContextProps {
    loading: boolean,
    comments: any,
    setComments: (value: any) => void,
    allDataComment: any,
    setAllDataComment: (value: any) => void,
}

export const CommentContext = createContext<CommentContextProps>({} as CommentContextProps);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {language} = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [allDataComment, setAllDataComment] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        try {
            setLoading(true);
            console.log("calling api tags")
            const fetchData = async () => {
                const response = await commentAPI.getComments();
                setAllDataComment(response.data);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        try {
            console.log("formatting comments")
            setComments(formatComments(allDataComment, language));
        } catch (error) {
            console.log(error);
        }
    }, [allDataComment, language])

    return (
        <CommentContext.Provider value={{loading, comments, setComments, allDataComment, setAllDataComment}}>
            {!loading && children}
        </CommentContext.Provider>
    );
};
