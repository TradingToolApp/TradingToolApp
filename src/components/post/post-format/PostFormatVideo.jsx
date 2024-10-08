import WidgetPost from "../../widget/WidgetPost";
import MetaDataTwo from "./elements/meta/MetaDataTwo";
import PostAuthor from "./elements/PostAuthor";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";
import WidgetYoutubeList from "../../widget/WidgetYoutubeList";
import React from "react";

const PostFormatVideo = ({ postData, allData }) => {
  const postContent = postData.content;

  return (
    <>
      <MetaDataTwo metaData={postData} allPost={allData} />
      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <main className="site-main">
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    <SocialShareSide />
                    <div className="post-media" style={{ marginBottom: "2rem" }}>
                      <iframe width="730" height="400"
                              src={postData.videoLink}>
                      </iframe>
                    </div>
                    <div className="content-post"
                      dangerouslySetInnerHTML={{ __html: postContent }}
                    ></div>
                  </div>
                </article>
                <SocialShareBottom shareData={postData}/>
                <hr className="m-t-xs-50 m-b-xs-60" />
                <PostAuthor authorData={postData} />
                <PostComment commentData={postData}/>
              </main>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetPost dataPost={allData} />
                <WidgetYoutubeList dataPost={allData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatVideo;
