import { useContext } from "react";
import AdBanner from "../common/AdBanner";
import WidgetAd from "../widget/WidgetAd";
import WidgetCategory from "../widget/WidgetCategory";
import WidgetInstagram from "../widget/WidgetInstagram";
import WidgetNewsletter from "../widget/WidgetNewsletter";
import WidgetPost from "../widget/WidgetPost";
import WidgetSocialShare from "../widget/WidgetSocialShare";
import WidgetYoutubeList from "../widget/WidgetYoutubeList";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import { AppContext } from "@/providers/app.provider";

const PostSectionFive = ({postData, adBanner, pClass}) => {
    const { posts } = useContext(AppContext);
    postData = posts;
    return ( 
        <div className={`random-posts ${pClass ?? "section-gap"}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        {adBanner === true ? <AdBanner /> : "" }
                        <div className="axil-content">
                            {postData.slice(0, 8).map((data) => (
                                <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                            ))}

                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="post-sidebar">
                            <WidgetPost dataPost={postData} />
                            <WidgetYoutubeList dataPost={postData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default PostSectionFive;