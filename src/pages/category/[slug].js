import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/app.provider";
import FooterOne from "../../components/footer/FooterOne";
import HeaderFive from "../../components/header/HeaderFive";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import PostLayoutTwo from "../../components/post/layout/PostLayoutTwo";
import WidgetPost from "../../components/widget/WidgetPost";
import WidgetYoutubeList from "@/components/widget/WidgetYoutubeVideo";
import {getPublicPosts} from "@/libs/api-client/prisma/post.api";
import {getCategories} from "@/libs/api-client/prisma/category.api";
import {translatePosts} from "@/utils/formatData";
import {useGetPublicPosts} from "@/hooks/data/admin/usePosts";

const PostCategory = ({cateData, allPostsData}) => {
    const {language} = useContext(AppContext);
    const {publicPosts} = useGetPublicPosts(allPostsData);
    const [postData, setPostData] = useState(translatePosts(cateData, language));
    const [cateContent, setCateContent] = useState(translatePosts(cateData, language)[0]);
    const allPosts = publicPosts;

    useEffect(() => {
        setPostData(translatePosts(cateData, language));
        setCateContent(translatePosts(cateData, language)[0]);
    }, [language, cateData]);

    return (
        <>
            <HeadMeta metaTitle={cateContent.cate}/>
            <HeaderFive/>
            <Breadcrumb bCat={cateContent.cate_slug} cateTitle={cateContent.cate}/>
            {/* Banner Start here  */}
            <div className="banner banner__default bg-grey-light-three shadow-dark rounded-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="post-title-wrapper">
                                <h2 className="m-b-xs-0 axil-post-title hover-line">{cateContent.cate}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Banner End here  */}
            <div className="random-posts section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="axil-content">
                                {postData.map((data) => (
                                    <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetPost dataPost={allPosts}/>
                                <WidgetYoutubeList dataPost={allPosts}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterOne/>
        </>
    );
}

export default PostCategory;

export async function getStaticPaths() {
    const categories = await getCategories();
    const paths = categories.map(category => ({
        params: {slug: category.cate_slug}
    }));

    return {
        paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps(context) {
    const postParams = context.params.slug;

    const allPostsData = await getPublicPosts([
        'slug',
        'featureImg',
        'createdAt',
        'translations',
        'category',
        'author'
    ]);
    const cateData = allPostsData.filter(post => post.category.cate_slug === postParams);

    if (cateData.length === 0) {
        return {
            redirect: {
                destination: "/404",
            },
        }
    }

    return {
        props: {
            cateData,
            allPostsData
        },
        revalidate: 300,
    }
}