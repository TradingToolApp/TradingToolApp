import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import WidgetYoutubeList from "../../widget/WidgetYoutubeList";
import MetaDataThree from "./elements/meta/MetaDataThree";
import PostAuthor from "./elements/PostAuthor";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";

const PostFormatAudio = ({ postData, allData }) => {
  const basePathLink = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH ?? "" : "";
  
  // let postContent = postData.content.replaceAll('/images/', basePathLink + '/images/');
  // postContent = postContent.replaceAll('\n', '<br />');
  const postContent = postData.content;

  return (
    <>
      <MetaDataThree metaData={postData} />
      <div className="post-single-wrapper p-t-xs-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <main className="site-main">
                <article className="post-details">
                  <div className="single-blog-wrapper">
                    <SocialShareSide />
                    {/* <div className="audio mb-5">
                      <iframe
                        height={300}
                        width="100%"
                        allow="autoplay"
                        src={postData.audioLink}
                      />
                    </div> */}
                    {postData.audioLink !== "" &&
                      <div className="audio mb-5" dangerouslySetInnerHTML={{ __html: postData.audioLink }}>
                      </div>
                    }
                    <div className="content-post"
                      dangerouslySetInnerHTML={{ __html: postContent }}
                    ></div>
                  </div>
                </article>
                <SocialShareBottom />
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

export default PostFormatAudio;
