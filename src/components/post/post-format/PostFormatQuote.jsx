import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import WidgetYoutubeList from "../../widget/WidgetYoutubeVideo";
import MetaDataFour from "./elements/meta/MetaDataFour";
import PostAuthor from "./elements/PostAuthor";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";
import React from "react";
import dynamic from 'next/dynamic'

const MarkdownRenderer = dynamic(() => import("@/components/post/post-format/Markdown/MarkdownRenderer"), {ssr: false})

const PostFormatQuote = ({postData, allData}) => {
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
                                        <MetaDataFour metaData={postData}/>
                                        <MarkdownRenderer content={postContent}/>
                                    </div>
                                </article>
                                <SocialShareBottom shareData={postData}/>
                                <hr className="m-t-xs-50 m-b-xs-60"/>
                                <PostAuthor authorData={postData}/>
                                <PostComment commentData={postData}/>
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

export default PostFormatQuote;
