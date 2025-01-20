import React from 'react';
import {Navbar, Nav, Toggle} from 'rsuite';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';

interface NavToggleProps {
    expand?: boolean;
    onChange?: () => void;
}

const NavToggle = ({expand, onChange}: NavToggleProps) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle"
            // style={{margin: "auto", marginBottom: "10px", width: "100%"}}
        >
            <Nav style={{width: "100%"}}>
                <Nav.Item
                    onClick={onChange}
                    style={{textAlign: 'center', width: "100%", justifyContent: "center"}}
                    icon={expand ? <ArrowLeftLineIcon/> : <ArrowRightLineIcon/>}
                />
                {/*<Toggle*/}
                {/*    onChange={setExpand}*/}
                {/*    checked={expand}*/}
                {/*    // checkedChildren="Expand"*/}
                {/*    // unCheckedChildren="Collapse"*/}
                {/*/>*/}
            </Nav>
        </Navbar>
    );
};

export default NavToggle;
