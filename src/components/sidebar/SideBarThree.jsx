import Link from 'next/link';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import MessageIcon from '@rsuite/icons/Message';

const panelStyles = {
    padding: '0 30px',
    // color: '#aaa'
};

const headerStyles = {
    padding: 20,
    fontSize: 16,
    background: '#34c3ff',
    color: ' #fff'
};
const SideBarOne = () => (
    <div className='h-full' style={{ width: 240 }}>
        <Sidenav defaultOpenKeys={['1', '2']}>
            <Sidenav.Body>
                <Nav activeKey="1">
                    <Nav.Menu eventKey="1" title="Dashboard" icon={<DashboardIcon />}>
                        <Nav.Item panel style={panelStyles}>Post</Nav.Item>
                        <Nav.Item eventKey="1-1" as={Link} href="/admin/dashboard/posts">Posts</Nav.Item>
                        <Nav.Item eventKey="1-1" as={Link} href="/admin/dashboard/comments">Comments</Nav.Item>
                        <Nav.Item eventKey="1-2" as={Link} href="/admin/dashboard/categories">Categories</Nav.Item>
                        <Nav.Item eventKey="1-3" as={Link} href="/admin/dashboard/authors">Authors</Nav.Item>
                        <Nav.Item eventKey="1-4" as={Link} href="/admin/dashboard/tags">Tags</Nav.Item>
                        <Nav.Item divider />
                        <Nav.Item panel style={panelStyles}>Assets</Nav.Item>
                        <Nav.Item eventKey="1-5-1" as={Link} href="/admin/assets/images">Images</Nav.Item>
                        <Nav.Item divider />
                        <Nav.Item panel style={panelStyles}>Widgets</Nav.Item>
                        <Nav.Item eventKey="1-5-1" as={Link} href="/admin/widgets/youtube-widgets">Youtube</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu eventKey="2" title="Users" icon={<PeoplesIcon />}>
                        <Nav.Item as={Link} href="/admin/users/subscribed">Subscribed</Nav.Item>
                        <Nav.Item as={Link} href="/admin/users/pending">Waiting</Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    </div>
);

export default SideBarOne;