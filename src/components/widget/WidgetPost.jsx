import {Tab, Nav} from "react-bootstrap";
import PostVideoTwo from "../post/layout/PostVideoTwo";
import {useMemo, useState} from "react";
import useTranslation from "@/hooks/useTranslation";
import {useWidgetPosts} from "@/hooks/data/admin/usePosts";

const sortRecent = (posts) => [...posts].sort((a, b) => (new Date(b.date) - new Date(a.date) || a.slug.localeCompare(b.slug))).slice(0, 4);
const sortPopular = (posts) => [...posts].sort((a, b) => (b.post_views - a.post_views || a.slug.localeCompare(b.slug))).slice(0, 4);

const WidgetPost = () => {
    const t = useTranslation();
    const {widgetPosts} = useWidgetPosts();
    const [activeKey, setActiveKey] = useState('recent');

    const data = useMemo(() => {
        if (!widgetPosts?.length) return [];
        if (activeKey === 'popular') return sortPopular(widgetPosts);
        return sortRecent(widgetPosts);
    }, [widgetPosts, activeKey]);

    const handleData = (key) => setActiveKey(key);

    return (
        <div className="post-widget sidebar-post-widget m-b-xs-40">
            <Tab.Container id="widget-post" onSelect={(selectedKey) => handleData(selectedKey)}
                           defaultActiveKey="recent">
                <Nav variant="pills" className="row no-gutters">
                    <Nav.Item className="col">
                        <Nav.Link eventKey="recent">{t.widget.recent}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col">
                        <Nav.Link eventKey="popular">{t.widget.popular}</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    {data.map((data) => (
                        <PostVideoTwo data={data} pClass="" key={data.slug}/>
                    ))}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default WidgetPost;
