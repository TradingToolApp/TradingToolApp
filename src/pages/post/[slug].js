import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { AppContext } from "@/providers/app.provider";
import Breadcrumb from "../../components/common/Breadcrumb";
import HeadMeta from "../../components/elements/HeadMeta";
import FooterOne from "../../components/footer/FooterOne";
import HeaderThree from "../../components/header/HeaderThree";
import PostFormatAudio from "../../components/post/post-format/PostFormatAudio";
import PostFormatQuote from "../../components/post/post-format/PostFormatQuote";
import PostFormatStandard from "../../components/post/post-format/PostFormatStandard";
import PostFormatText from "../../components/post/post-format/PostFormatText";
import PostFormatVideo from "../../components/post/post-format/PostFormatVideo";
import { Loader } from "rsuite";

const PostDetails = ( { allPosts, params } ) => {
    const router = useRouter()
    const { publicPosts } = useContext(AppContext);
    allPosts = publicPosts;

    const post = allPosts.filter(post => post.slug === router.query.slug);
    const postContent = post[0];

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

    if (allPosts.length === 0) return <Loader style={{marginTop: "25%"}} backdrop size="md" content="loading..."/>;

    if (allPosts && post.length === 0) {
        router.push('/404');
        return null;
    }

    return (
        <>
            <HeadMeta metaTitle={postContent.title}/>
            <HeaderThree/>
            <Breadcrumb bCat={postContent.cate} aPage={postContent.title}/>
            <PostFormatHandler/>
            <FooterOne/>
        </>
    );
}

export default PostDetails;