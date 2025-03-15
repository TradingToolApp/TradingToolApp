import React from "react";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderFive from "../../src/components/header/HeaderFive";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";
import {useGetPublicPosts} from "@/hooks/data/admin/usePosts";
import {getPublicPosts} from "@/libs/api-client/prisma/post.api";

const Home = ({allPosts}) => {
    const {publicPosts, sliderPosts} = useGetPublicPosts(allPosts);

    return (
        <>
            <HeadMeta metaTitle="Home"/>
            <HeaderFive/>
            <SliderTwo slidePost={sliderPosts}/>
            <CategoryOne cateData={publicPosts}/>
            <PostSectionFive postData={publicPosts} pClass="section-gap bg-grey-light-three"/>
            <FooterOne/>
        </>
    );
}

export default Home;

export async function getStaticProps() {
    const allPosts = await getPublicPosts();

    return {
        props: {
            allPosts
        },
        revalidate: 1800,
    };
}