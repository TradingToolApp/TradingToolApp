import React, {useState} from "react";
import AdBanner from "../common/AdBanner";
import WidgetPost from "../widget/WidgetPost";
import WidgetYoutubeVideo from "../widget/WidgetYoutubeVideo";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import {Pagination, Loader} from 'rsuite';
import {usePublicPaginatePosts} from "@/hooks/data/admin/usePosts";

const PostSectionFive = ({adBanner, pClass, initialData}) => {
    const [activePage, setActivePage] = useState(1);
    const {posts, total, isLoading, isFetching} = usePublicPaginatePosts(4, activePage, initialData);

    return (
        <div className={`random-posts ${pClass ?? "section-gap"}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 d-flex flex-column">
                        {adBanner === true ? <AdBanner/> : ""}
                        <div className="axil-content flex-grow-1" style={{position: 'relative'}}>
                            {isFetching && posts.length > 0 && (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'rgba(255,255,255,0.65)',
                                    zIndex: 10,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Loader size="md"/>
                                </div>
                            )}
                            {isLoading || posts.length === 0 && isFetching
                                ? <div style={{minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Loader size="lg"/>
                                </div>
                                : posts.map((data) => (
                                    <PostLayoutTwo data={data} postSizeMd={true} key={data.slug}/>
                                ))
                            }
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
