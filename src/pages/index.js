import React, { useContext, useEffect, useState } from "react";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderThree from "../../src/components/header/HeaderThree";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";
import { AppContext } from "@/providers/app.provider";
import postAPI from "@/services/posts-api";
import { Loader } from "rsuite";
import { formatPosts } from "@/lib/formatData";

const HomeThree = () => {
    const {language} = useContext(AppContext);
    const [ loading, setLoading ] = useState(true);
    const [ allPostData, setAllPostData ] = useState([]);
    const [ allPosts, setAllPosts ] = useState([]);

    useEffect(() => {
        try {
            setLoading(true);
            const fetchData = async () => {
                const posts = await postAPI.getPublicPosts();
                setAllPostData(posts.data);
            }
            fetchData();
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        setAllPosts(formatPosts(allPostData, language));
    }, [allPostData, language])

    if (loading) {
        return <Loader style={{marginTop: "25%"}} backdrop size="md" content="loading..."/>
    }

    return (
        <>
            <HeadMeta metaTitle="Home"/>
            <HeaderThree/>
            <SliderTwo slidePost={allPosts}/>
            <CategoryOne cateData={allPosts}/>
            <PostSectionFive postData={allPosts} pClass="section-gap bg-grey-light-three"/>
            <FooterOne/>
        </>
    );
}

export default HomeThree;