import React, {useState} from "react";
import AdBanner from "../common/AdBanner";
import WidgetPost from "../widget/WidgetPost";
import WidgetYoutubeVideo from "../widget/WidgetYoutubeVideo";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import {Pagination} from 'rsuite';
import {usePublicPaginatePosts} from "@/hooks/data/admin/usePosts";

const PostSectionFive = ({adBanner, pClass}) => {
    const [activePage, setActivePage] = useState(1);
    const {posts, total} = usePublicPaginatePosts(4, activePage);

    return (
        <div className={`random-posts ${pClass ?? "section-gap"}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 d-flex flex-column">
                        {adBanner === true ? <AdBanner/> : ""}
                        <div className="axil-content flex-grow-1">
                            {posts.map((data) => (
                                <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                            ))}
                        </div>
                        <div className="row mb-4">
                            <Pagination size={"md"} style={{justifyContent: "center"}} total={total} limit={4}
                                        activePage={activePage} onChangePage={setActivePage}/>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="post-sidebar">
                            <WidgetPost/>
                            <WidgetYoutubeVideo/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostSectionFive;
