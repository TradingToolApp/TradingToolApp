import React, {useRef} from "react";
import {Divider, Dropdown, Popover, Whisper} from "rsuite";
import {signOut} from "next-auth/react";
import {GoSignOut, GoTab} from "react-icons/go";
import {IoIosHelpCircleOutline} from "react-icons/io";
import Image from "next/image";

interface IAvatarOne {
    user: {
        profile: {
            id: string;
            image: string;
            name: string;
            email: string;
            phone: string;
        },
        status: string;
        session: any;
        redirect: (route: any) => void;
    }
}

const AvatarOne = ({user}: IAvatarOne) => {
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
        // console.log(user)
        return (
            <>
                <Popover ref={ref} className={className} style={{left, top}} full>
                    <Dropdown.Menu onSelect={handleSelect}>
                        <Dropdown.Item eventKey={1} icon={<GoTab/>}>Dashboard</Dropdown.Item>
                        <Divider style={{margin: "5px"}}/>
                        <Dropdown.Item eventKey={2} icon={<GoSignOut/>}>Sign Out</Dropdown.Item>
                        <Dropdown.Item
                            href="https://rsuitejs.com"
                            target="_blank"
                            as="a"
                            icon={<IoIosHelpCircleOutline/>}
                        >
                            Help{' '}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            </>
        );
    };

    return (
        <>
            <Whisper placement="bottomEnd" trigger="click" ref={trigger}
                     speaker={renderAdminSpeaker}>
                <Image src={user.profile.image} alt={"@avatar"} width={35} height={35} className="rounded-circle"/>
            </Whisper>
        </>
    );
}

export default AvatarOne;