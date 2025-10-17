import React, {useState, useRef} from "react";
import {Divider, Dropdown, Popover, Whisper} from "rsuite";
import {signOut} from "next-auth/react";
import {GoSignOut, GoTab} from "react-icons/go";
import {TbBrandPaypal} from "react-icons/tb";

import Image from "next/image";
import ModalTopUp from "@/components/modal/payments/ModalTopUp";
import {DUserSession} from "@/utils/types/user";

const AvatarOne = ({user}: { user: DUserSession }) => {
    const trigger = useRef(null);
    const [openTopUp, setOpenTopUp] = useState(false);

    const handleOpenTopUp = () => setOpenTopUp(true);
    const handleCloseTopUp = () => setOpenTopUp(false);

    const renderAdminSpeaker = ({onClose, left, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    user.redirect("/dashboard");
                    break;
                case 2:
                    handleOpenTopUp();
                    break;
                case 3:
                    signOut({callbackUrl: '/login'});
                    break;
            }
            onClose();
        };

        return (
            <>
                <Popover ref={ref} className={className} style={{left, top}} full>
                    <Dropdown.Menu onSelect={handleSelect}>
                        <Dropdown.Item eventKey={1} icon={<GoTab/>}>Dashboard</Dropdown.Item>
                        <Dropdown.Item eventKey={2} icon={<TbBrandPaypal/>}>Top-up</Dropdown.Item>
                        <Divider style={{margin: "5px"}}/>
                        <Dropdown.Item eventKey={3} icon={<GoSignOut/>}>Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            </>
        );
    };

    if (user.profile === undefined) {
        return;
    }
    return (
        <>
            <Whisper placement="bottomEnd" trigger="click" ref={trigger}
                     speaker={renderAdminSpeaker}>
                <Image src={user.profile.image} alt="@avatar" width={35} height={35}
                       className="rounded-circle navbar-avatar"/>
            </Whisper>
            <ModalTopUp open={openTopUp} handleClose={handleCloseTopUp} user={user} />
        </>
    );
}

export default AvatarOne;