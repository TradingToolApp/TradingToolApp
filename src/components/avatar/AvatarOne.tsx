import React, {useRef} from "react";
import {Divider, Dropdown, Loader, Popover, Whisper} from "rsuite";
import {signOut} from "next-auth/react";
import {GoSignOut, GoTab} from "react-icons/go";
import Image from "next/image";
import {DUserSession} from "@/utils/types/user";

const AvatarOne = ({user}: { user: DUserSession }) => {
    const trigger = useRef(null);
    const renderAdminSpeaker = ({onClose, left, top, className}: any, ref: any) => {

        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    user.redirect("/dashboard");
                    break;
                case 2:
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
                        <Divider style={{margin: "5px"}}/>
                        <Dropdown.Item eventKey={2} icon={<GoSignOut/>}>Sign Out</Dropdown.Item>
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
        </>
    );
}

export default AvatarOne;