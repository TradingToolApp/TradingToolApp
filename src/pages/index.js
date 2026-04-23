import React from "react";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderFive from "../../src/components/header/HeaderFive";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";

const Home = () => {
    return (
        <>
            <HeadMeta metaTitle="Home"/>
            <HeaderFive/>
            <SliderTwo/>
            <CategoryOne/>
            <PostSectionFive pClass="section-gap bg-grey-light-three"/>
            <FooterOne/>
        </>
    );
}

export default Home;
