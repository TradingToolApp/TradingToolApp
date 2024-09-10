import { Tab, Nav } from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const WidgetPost = ( { dataPost } ) => {
    const { t } = useTranslation();
    const [ data, setData ] = useState([]);

    const handleData = ( key ) => {
        // let data = [];
        switch (key) {
            case 'recent':
                console.log("recent")
                setData(dataPost.sort(( a, b ) => (new Date(b.date) - new Date(a.date) || a.slug.localeCompare(b.slug))).slice(0,4));
                break;
            case 'popular':
                console.log("popular")
                setData(dataPost.sort(( a, b ) => (b.post_views - a.post_views || a.slug.localeCompare(b.slug))).slice(0,4));
                break;
            case 'comments':
                console.log("comments")
                setData(dataPost.sort(( a, b ) => (b.comments - a.comments || a.slug.localeCompare(b.slug))).slice(0,4));
                break;
            default:
                break;
        }
        console.log(data)
    }

    useEffect(() => {
        setData(dataPost.sort(( a, b ) => (new Date(b.date) - new Date(a.date) || a.slug.localeCompare(b.slug))).slice(0,4));
    },[dataPost])

    return (
        <div className="post-widget sidebar-post-widget m-b-xs-40">
            <Tab.Container id="widget-post" onSelect={( selectedKey ) => handleData(selectedKey)} defaultActiveKey="recent">
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
                    {data.map(( data ) => (
                        <PostVideoTwo data={data} pClass="" key={data.slug}/>
                    ))}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default WidgetPost;
