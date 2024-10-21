import React, { useState, useContext, useEffect } from "react";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderThree from "../../src/components/header/HeaderThree";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";
import { getPublicPosts } from "@/services/prisma/post.api";
import { useGetPublicPosts } from "@/hooks/data/usePosts";

const Home = ({ allPosts }) => {
    const { publicPosts } = useGetPublicPosts(allPosts);
    return (
        <>
            <HeadMeta metaTitle="Home" />
            <HeaderThree />
            <SliderTwo slidePost={publicPosts} />
            <CategoryOne cateData={publicPosts} />
            <PostSectionFive postData={publicPosts} pClass="section-gap bg-grey-light-three" />
            <FooterOne />
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