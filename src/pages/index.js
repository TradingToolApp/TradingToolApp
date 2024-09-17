import React, { useContext, Suspense } from "react";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderThree from "../../src/components/header/HeaderThree";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";
import { AppContext } from "@/providers/app.provider";
import { Loader } from "rsuite";

const HomeThree = () => {
    const { publicPosts } = useContext(AppContext);
    const allPosts = publicPosts

    return (
        <Suspense fallback={<Loader style={{marginTop: "25%"}} backdrop size="md" content="loading..."/>}>
            <HeadMeta metaTitle="Home"/>
            <HeaderThree/>
            <SliderTwo slidePost={allPosts}/>
            <CategoryOne cateData={allPosts}/>
            <PostSectionFive postData={allPosts} pClass="section-gap bg-grey-light-three"/>
            <FooterOne/>
        </Suspense>
    );
}

export default HomeThree;