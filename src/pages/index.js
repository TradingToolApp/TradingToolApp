import React from "react";
import CategoryOne from "../../src/components/category/CategoryOne";
import HeadMeta from "../../src/components/elements/HeadMeta";
import FooterOne from "../../src/components/footer/FooterOne";
import HeaderFive from "../../src/components/header/HeaderFive";
import PostSectionFive from "../../src/components/post/PostSectionFive";
import SliderTwo from "../../src/components/slider/SliderTwo";
import db from "../../src/libs/prisma/db";

const Home = ({ssrSliderPosts, ssrCategories, ssrPaginatePosts}) => {
    return (
        <>
            <HeadMeta metaTitle="Home"/>
            <HeaderFive/>
            <SliderTwo initialData={ssrSliderPosts}/>
            <CategoryOne initialData={ssrCategories}/>
            <PostSectionFive pClass="section-gap bg-grey-light-three" initialData={ssrPaginatePosts}/>
            <FooterOne/>
        </>
    );
}

export async function getStaticProps() {
    const [sliderPosts, categories, [paginatePosts, total]] = await Promise.all([
        db.post.findMany({
            where: {trending: true, status: 'PUBLIC'},
            include: {
                translations: {select: {id: true, postId: true, languageCode: true, title: true, excerpt: true, quoteText: true}},
                author: {include: {translations: true}},
                category: {include: {translations: true}},
                tags: {include: {translations: true}},
            },
            orderBy: [{updatedAt: 'desc'}],
        }),
        db.category.findMany({
            include: {
                translations: true,
                _count: {select: {posts: true}},
            },
            orderBy: {id: 'asc'},
        }),
        db.$transaction([
            db.post.findMany({
                where: {status: 'PUBLIC'},
                take: 4,
                skip: 0,
                include: {
                    translations: {select: {id: true, postId: true, languageCode: true, title: true, excerpt: true, quoteText: true}},
                    tags: {include: {translations: true}},
                    author: {include: {translations: true}},
                    category: {include: {translations: true}},
                },
                orderBy: [{trending: 'desc'}, {updatedAt: 'desc'}],
            }),
            db.post.count({where: {status: 'PUBLIC'}}),
        ]),
    ]);

    return {
        props: {
            ssrSliderPosts: JSON.parse(JSON.stringify({data: sliderPosts})),
            ssrCategories: JSON.parse(JSON.stringify({data: categories})),
            ssrPaginatePosts: JSON.parse(JSON.stringify({data: {posts: paginatePosts, total}})),
        },
        revalidate: 3600,
    };
}

export default Home;
