import React from "react";
import {Tab, Nav} from "react-bootstrap";
import {Loader} from "rsuite";
import {useGetYoutubeVideos} from "@/hooks/data/admin/useYoutubeVideos";


const WidgetYoutubeVideo = () => {
    const {youtubeVideos, isFetching} = useGetYoutubeVideos();
    return (
        <div className="post-widget sidebar-post-widget m-b-xs-40">
            <Tab.Container id="widget-post" defaultActiveKey="youtube">
                <Nav variant="pills" className="row no-gutters">
                    <Nav.Item className="col">
                        <Nav.Link eventKey="youtube">Youtube</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col">
                        {/*<Nav.Link eventKey="youtube">Youtube</Nav.Link>*/}
                    </Nav.Item>
                    <Nav.Item className="col">
                        {/*<Nav.Link eventKey="youtube">Youtube</Nav.Link>*/}
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    {isFetching && !youtubeVideos?.length
                        ? <div style={{minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Loader size="sm"/>
                        </div>
                        : youtubeVideos?.map((item) =>
                            item.published &&
                            <div key={item.title} className="post-media" style={{marginBottom: "2rem"}}>
                                <iframe width="320" height="160"
                                        src={item.embedUrl}>
                                </iframe>
                            </div>
                        )
                    }
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default WidgetYoutubeVideo;
