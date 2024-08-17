import Link from 'next/link';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import MessageIcon from '@rsuite/icons/Message';


const App = () => (
    <div className='h-full' style={{ width: 240 }}>
        <Sidenav defaultOpenKeys={['1', '2']}>
            <Sidenav.Body>
                <Nav activeKey="1">
                    <Nav.Item as={Link} href="/admin/dashboard" icon={<DashboardIcon />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Menu eventKey="2" title="User Group" icon={<PeoplesIcon />}>
                        <Nav.Item as={Link} href="/admin/subscripted-users">Subscripted</Nav.Item>
                        <Nav.Item as={Link} href="/admin/pending-users">Waiting</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu eventKey="3" title="Comment" icon={<MessageIcon />}>
                        <Nav.Item eventKey="3-1">Pending</Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Sidenav.Body>
        </Sidenav>
    </div>
);

export default App;