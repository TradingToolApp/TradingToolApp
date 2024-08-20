import Link from 'next/link';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import MessageIcon from '@rsuite/icons/Message';


const SideBarOne = () => (
    <div className='h-full' style={{ width: 240 }}>
        <Sidenav defaultOpenKeys={['1', '2']}>
            <Sidenav.Body>
                <Nav activeKey="1">
                    <Nav.Menu eventKey="1" title="Dashboard" icon={<DashboardIcon />}>
                        <Nav.Item as={Link} href="/admin/dashboard/posts">Posts</Nav.Item>
                        <Nav.Item as={Link} href="/admin/dashboard/categories">Categories</Nav.Item>
                        <Nav.Item as={Link} href="/admin/dashboard/authors">Authors</Nav.Item>
                        <Nav.Item as={Link} href="/admin/dashboard/tags">Tags</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu eventKey="2" title="Users" icon={<PeoplesIcon />}>
                        <Nav.Item as={Link} href="/admin/users/subscribed">Subscribed</Nav.Item>
                        <Nav.Item as={Link} href="/admin/users/pending">Waiting</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu eventKey="3" title="Comment" icon={<MessageIcon />}>
                        <Nav.Item eventKey="3-1">Pending</Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    </div>
);

export default SideBarOne;