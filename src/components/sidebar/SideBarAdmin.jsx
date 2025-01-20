import React from "react";
import Link from 'next/link';
import {Container, Sidenav, Sidebar} from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import ProjectIcon from '@rsuite/icons/Project';
import useLocalStorage from "@/hooks/useLocalStorage";
import NavToggle from "@/components/sidebar/NavToggle";
import Nav from 'rsuite/Nav';
import NavMenu from 'rsuite/NavMenu';
import NavItem from 'rsuite/NavItem';

const SideBarAdmin = () => {
    const [expand, setExpand] = useLocalStorage("toggleSideBar", true);
    const [selectedKey, setSelectedKey] = useLocalStorage("sidebarActiveKey", "1-1")
    const handleSelect = (eventKey, e) => {
        setSelectedKey(eventKey)
    }

    return (
        <Container className="frame">
            <Sidebar
                style={{
                    display: 'flex', flexDirection: 'column', justifyContent: "space-between"
                }}
                width={expand ? 200 : 56}
                collapsible
            >
                <Sidenav expanded={expand} defaultOpenKeys={['1', '2', '3']} appearance="subtle">
                    <Sidenav.Body>
                        <Nav onSelect={handleSelect} activeKey={selectedKey}>
                            <NavMenu eventKey="1" title="Dashboard" icon={<DashboardIcon/>}>
                                <NavItem eventKey="1-1" id="1-1" as={Link} href="/admin/dashboard/posts">Posts</NavItem>
                                {/*<NavItem eventKey="1-2" id="1-2" as={Link}*/}
                                {/*         href="/admin/dashboard/comments">Comments</NavItem>*/}
                                <NavItem eventKey="1-3" id="1-3" as={Link}
                                         href="/admin/dashboard/categories">Categories</NavItem>
                                <NavItem eventKey="1-4" as={Link}
                                         href="/admin/dashboard/authors">Authors</NavItem>
                                <NavItem eventKey="1-5" as={Link} href="/admin/dashboard/tags">Tags</NavItem>
                                <NavItem divider/>
                                <NavItem eventKey="1-5-1" as={Link} href="/admin/assets/images">Images</NavItem>
                                <NavItem divider/>
                                <NavItem eventKey="1-5-2" as={Link}
                                         href="/admin/widgets/youtube-widgets">Youtube</NavItem>
                            </NavMenu>
                            <NavMenu eventKey="2" title="Users" icon={<PeoplesIcon/>}>
                                <NavItem eventKey="2-1" as={Link} href="/admin/users/subscribed">Subscribed</NavItem>
                            </NavMenu>
                            <NavMenu eventKey="3" title="Products" icon={<ProjectIcon/>}>
                                <NavItem eventKey="3-1" as={Link} href="/admin/products/trading-tools">Trading
                                    Tools</NavItem>
                            </NavMenu>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <NavToggle expand={expand} onChange={() => setExpand(!expand)}/>
            </Sidebar>
        </Container>
    );
}

export default SideBarAdmin;