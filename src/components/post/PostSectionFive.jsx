import React, { useState, useContext } from "react";
import AdBanner from "../common/AdBanner";
import WidgetPost from "../widget/WidgetPost";
import WidgetYoutubeList from "../widget/WidgetYoutubeList";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import { AppContext } from "@/providers/app.provider";
import { Pagination } from 'rsuite';

const PostSectionFive = ( { postData, adBanner, pClass } ) => {
    const { posts } = useContext(AppContext);
    const [ activePage, setActivePage ] = useState(1);
    const length = postData.length;
    postData = posts;
    const renderPost = postData.slice(activePage * 4 - 4, activePage * 4);
    return (
        <div className={`random-posts ${pClass ?? "section-gap"}`}>
            <div className="container">
                <div className="row" >
                    <div className="col-lg-8" style={{height:"1270px"}}>
                        {adBanner === true ? <AdBanner/> : ""}
                        <div className="axil-content">
                            {renderPost.map(( data ) => (
                                <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                            ))}

                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="post-sidebar">
                            <WidgetPost dataPost={postData}/>
                            <WidgetYoutubeList dataPost={postData}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Pagination size={"md"} style={{ justifyContent: "center" }} total={length} limit={4} activePage={activePage}
                                onChangePage={setActivePage}/>
                </div>
            </div>
        </div>

    );
}

export default PostSectionFive;