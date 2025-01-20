import React, {useState, useContext, useEffect} from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderThree from "../../components/header/HeaderThree";
import PostFormatAudio from "../../components/post/post-format/PostFormatAudio";
import PostFormatQuote from "../../components/post/post-format/PostFormatQuote";
import PostFormatStandard from "../../components/post/post-format/PostFormatStandard";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import PostFormatVideo from "../../components/post/post-format/PostFormatVideo";
import {AppContext} from "@/providers/app.provider";
import {getPublicPosts, getPostBySlug} from "@/libs/api-client/prisma/post.api";
import {translateOnePost} from "@/utils/formatData";
import {useGetPublicPosts} from "@/hooks/data/admin/usePosts";

const PostDetails = ({slug, postData, allPostsData}) => {
    const {language} = useContext(AppContext);
    const [postContent, setPostContent] = useState(translateOnePost(postData, language));
    const {publicPosts} = useGetPublicPosts(allPostsData);
    const allPosts = publicPosts;

    useEffect(() => {
        setPostContent(translateOnePost(postData, language));
    }, [language, postData]);

    const PostFormatHandler = () => {
        if (!postContent) return null;
        if (postContent.postFormat === 'video') {
            return <PostFormatVideo postData={postContent} allData={allPosts}/>
        } else if (postContent.postFormat === 'audio') {
            return <PostFormatAudio postData={postContent} allData={allPosts}/>
        } else if (postContent.postFormat === 'quote') {
            return <PostFormatQuote postData={postContent} allData={allPosts}/>
        } else if (postContent.postFormat === 'text') {
            return <PostFormatText postData={postContent} allData={allPosts}/>
        } else {
            return <PostFormatStandard postData={postContent} allData={allPosts}/>
        }
    }

    return (
        <>
            <HeadMeta metaTitle={postContent.title}/>
            <HeaderThree/>
            <Breadcrumb bCat={postContent.cate_slug} cateTitle={postContent.cate} aPage={postContent.title}/>
            <PostFormatHandler/>
            <FooterOne/>
        </>
    );
}

export default PostDetails;

export async function getStaticPaths() {
    const publicPosts = await getPublicPosts();
    const paths = publicPosts.map((post) => ({
        params: {slug: post.slug},
    }));

    return {paths, fallback: "blocking"};
}

export async function getStaticProps({params}) {
    const post = await getPostBySlug(params.slug)
    const allPostsData = await getPublicPosts([
        'title',
        'featureImg',
        'postFormat',
        'createdAt',
        'slug',
        'category',
        'author',
    ]);

    if (!post) {
        return {
            redirect: {
                destination: "/404",
            },
        }
    }

    return {
        props: {
            slug: params.slug,
            postData: post,
            allPostsData
        },
        revalidate: 1,
    }
}