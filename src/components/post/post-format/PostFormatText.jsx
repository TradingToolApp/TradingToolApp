import React from "react";
import dynamic from 'next/dynamic'
import WidgetPost from "../../widget/WidgetPost";
import WidgetYoutubeList from "../../widget/WidgetYoutubeVideo";
import PostAuthor from "./elements/PostAuthor";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";

const MarkdownRenderer = dynamic(() => import("@/components/post/post-format/Markdown/MarkdownRenderer"), {ssr: false})

const PostFormatText = ({postData, allData}) => {
    const basePathLink = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH ?? "" : "";
    const postContent = postData.content;

    return (
        <>
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <article className="post-details">
                                    <div className="single-blog-wrapper">
                                        <SocialShareSide/>
                                        <h2 className="axil-post-title hover-line">{postData.title}</h2>
                                        <MarkdownRenderer content={postContent}/>
                                    </div>
                                </article>
                                <SocialShareBottom shareData={postData}/>
                                <hr className="m-t-xs-50 m-b-xs-60"/>
                                <PostAuthor authorData={postData}/>
                            </main>
                        </div>
                        <div className="col-lg-4">
                            <div className="post-sidebar">
                                <WidgetPost dataPost={allData}/>
                                <WidgetYoutubeList dataPost={allData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostFormatText;
