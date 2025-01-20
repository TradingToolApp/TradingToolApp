import React from "react";
import Link from 'next/link';
import {Container, Sidenav, Sidebar} from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import ProjectIcon from '@rsuite/icons/Project';
import useLocalStorage from "@/hooks/useLocalStorage";
import NavToggle from "@/components/sidebar/NavToggle";
import Nav from 'rsuite/Nav';
import NavItem from 'rsuite/NavItem';
import useCurrentUser from "@/hooks/useCurrentUser";

const SideBarUser = () => {
    const user = useCurrentUser();
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
                            <NavItem eventKey="1-1" as={Link} href={`/user/dashboard/${user.profile.id}`}
                                     icon={<DashboardIcon/>}>Info</NavItem>
                            <NavItem eventKey="2-1" as={Link} href="/user/products/trading-tools"
                                     icon={<ProjectIcon/>}>Trading Tools</NavItem>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <NavToggle expand={expand} onChange={() => setExpand(!expand)}/>
            </Sidebar>
        </Container>
    );
}

export default SideBarUser;