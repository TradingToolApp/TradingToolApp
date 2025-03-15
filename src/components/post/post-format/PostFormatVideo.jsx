import React from "react";
import dynamic from 'next/dynamic'
import WidgetPost from "../../widget/WidgetPost";
import MetaDataTwo from "./elements/meta/MetaDataTwo";
import PostAuthor from "./elements/PostAuthor";
import SocialShareBottom from "./elements/SocialShareBottom";
import WidgetYoutubeList from "../../widget/WidgetYoutubeVideo";

const MarkdownRenderer = dynamic(() => import("@/components/post/post-format/Markdown/MarkdownRenderer"), {ssr: false})

const PostFormatVideo = ({postData, allData}) => {
    const postContent = postData.content;

    return (
        <>
            <MetaDataTwo metaData={postData} allPost={allData}/>
            <div className="post-single-wrapper p-t-xs-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <main className="site-main">
                                <article className="post-details">
                                    <MarkdownRenderer content={postContent}/>
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

export default PostFormatVideo;
