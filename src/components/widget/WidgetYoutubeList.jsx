import React, { useContext } from "react";
import { Tab, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { YoutubeContext } from "@/providers/widgets/youtube.provider";


const WidgetYoutubeList = ( { dataPost } ) => {
    const { t } = useTranslation();
    const { allDataYoutube, setAllDataYoutube } = useContext(YoutubeContext);

    return (
        <div className="post-widget sidebar-post-widget m-b-xs-40">
            <Tab.Container id="widget-post" defaultActiveKey="youtube">
                <Nav variant="pills" className="row no-gutters">
                    <Nav.Item className="col">
                        <Nav.Link eventKey="youtube">Youtube</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col">
                        {/*<Nav.Link eventKey="popular">{t("widget.popular")}</Nav.Link>*/}
                    </Nav.Item>
                    <Nav.Item className="col" style={{ borderBottom: "none" }}>
                        {/*<Nav.Link eventKey="comments">{t("widget.comment")}</Nav.Link>*/}
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    {allDataYoutube.map((item) =>
                        item.published &&
                        <figure key={item.title} className="post-media" style={{ marginBottom: "2rem" }}>
                            <iframe width="320" height="160"
                                    src={item.embedUrl}>
                            </iframe>
                        </figure>
                    )}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default WidgetYoutubeList;
