import WidgetAd from "../../widget/WidgetAd";
import WidgetInstagram from "../../widget/WidgetInstagram";
import WidgetNewsletter from "../../widget/WidgetNewsletter";
import WidgetPost from "../../widget/WidgetPost";
import WidgetSocialShare from "../../widget/WidgetSocialShare";
import MetaDataTwo from "./elements/meta/MetaDataTwo";
import PostAuthor from "./elements/PostAuthor";
import PostComment from "./elements/PostComment";
import SocialShareBottom from "./elements/SocialShareBottom";
import SocialShareSide from "./elements/SocialShareSide";

const PostFormatVideo = ({ postData, allData }) => {
  const basePathLink = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH ?? "" : "";

  console.log(postData)
  let postContent = postData.content.replaceAll('/images/', basePathLink + '/images/');
  postContent = postContent.replaceAll('\n', '<br />');

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
                    {/* <figure className="post-media">
                      <video className="plyr-post" id="video-player-1" playsInline controls >
                        <source
                          src="https://www.youtube.com/embed/k9UZV6xPJS8?si=-_b86hW5-lHbQaFc"
                          // src={basePathLink + postData.videoLink}
                          type="video/mp4"
                        />
                      </video>
                    </figure> */}
                    {postData.videoLink !== "" &&
                      <div className="product-des " dangerouslySetInnerHTML={{ __html: postData.videoLink }}>
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
                <PostComment />
              </main>
            </div>
            <div className="col-lg-4">
              <div className="post-sidebar">
                <WidgetAd />
                <WidgetNewsletter />
                {/* <WidgetSocialShare /> */}
                <WidgetPost dataPost={allData} />
                <WidgetInstagram />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatVideo;
