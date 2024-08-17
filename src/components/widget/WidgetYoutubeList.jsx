import { Tab, Nav } from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import { useTranslation } from "react-i18next";


const WidgetYoutubeList = ({ dataPost }) => {
    const { t } = useTranslation();

    return (
        <div className="post-widget sidebar-post-widget m-b-xs-40">
            <Tab.Container id="widget-post" defaultActiveKey="recent">
                <Nav variant="pills" className="row no-gutters">
                    <Nav.Item className="col">
                        <Nav.Link eventKey="recent">{t("widget.recent")}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col">
                        <Nav.Link eventKey="popular">{t("widget.popular")}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col">
                        <Nav.Link eventKey="comments">{t("widget.comment")}</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="recent">
                        {dataPost.slice(0, 4).map((data) => (
                            <PostVideoTwo data={data} videoIcon={true} key={data.slug} />
                        ))}
                    </Tab.Pane>
                    <Tab.Pane eventKey="popular">
                        {dataPost.slice(0, 4).map((data) => (
                            <PostVideoTwo data={data} videoIcon={true} key={data.slug} />
                        ))}
                    </Tab.Pane>
                    <Tab.Pane eventKey="comments">
                        {dataPost.slice(0, 4).map((data) => (
                            <PostVideoTwo data={data} videoIcon={true} key={data.slug} />
                        ))}
                    </Tab.Pane>
                </Tab.Content>

            </Tab.Container>
        </div>
    );
};

export default WidgetYoutubeList;
