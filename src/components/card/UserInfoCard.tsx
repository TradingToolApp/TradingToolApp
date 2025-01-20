import {Avatar, Button, Card, Dropdown, HStack, IconButton, Popover, Text, VStack, Whisper} from "rsuite";
import React from "react";
import ModalUpdateUserInfo from "@/components/modal/user/info/ModalUpdateUserInfo";
import ModalChangeAvatar from "@/components/modal/user/info/ModalChangeAvatar";
import ModalChangePassword from "@/components/modal/user/info/ModalChangePassword";

const UserInfoCard = ({user}: any) => {
    const [openEditAvatar, setOpenEditAvatar] = React.useState(false);
    const [openEditUserData, setOpenEditUserData] = React.useState(false);
    const [openChangePassword, setOpenChangePassword] = React.useState(false);

    const handleOpenEditAvatar = () => setOpenEditAvatar(true);
    const handleCloseEditAvatar = () => setOpenEditAvatar(false);
    const handleOpenEditUserData = () => setOpenEditUserData(true);
    const handleCloseEditUserData = () => setOpenEditUserData(false);
    const handleOpenChangePassword = () => setOpenChangePassword(true);
    const handleCloseChangePassword = () => setOpenChangePassword(false);

    const renderMenu = ({onClose, left, top, right, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    handleOpenEditAvatar();
                    break;
                case 2:
                    handleOpenEditUserData();
                    break;
                case 3:
                    handleOpenChangePassword();
                    break;
                default:
                    break;
            }
            onClose();
        };
        return (
            <>
                <Popover ref={ref} className={className} style={{right, top}} full>
                    <Dropdown.Menu onSelect={handleSelect}>
                        <Dropdown.Item eventKey={1}>Change Avatar</Dropdown.Item>
                        <Dropdown.Item eventKey={2}>Update Information</Dropdown.Item>
                        <Dropdown.Item eventKey={3}>Change Password</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            </>
        );
    }

    return (
        <>
            <Card width={320} shaded>
                <Card.Header>
                    <HStack justifyContent={"space-between"}>
                        <HStack>
                            <Avatar circle src={user.profile.image}/>
                            <VStack spacing={2}>
                                <Text>{user.profile.name}</Text>
                                <Text muted size="sm">
                                    Basic user
                                </Text>
                            </VStack>
                        </HStack>
                        <Whisper placement="auto" trigger="click" speaker={renderMenu}>
                            <Button size={"md"}>Update</Button>
                        </Whisper>
                    </HStack>
                </Card.Header>
                <Card.Body>
                    <Text size="md">Email: {user.profile.email}</Text>
                    <Text size="md">Phone Number: {user.profile.phone}</Text>
                </Card.Body>
            </Card>
            <ModalChangeAvatar open={openEditAvatar} handleClose={handleCloseEditAvatar} user={user}/>
            <ModalUpdateUserInfo modalData={user.profile} open={openEditUserData}
                                 handleClose={handleCloseEditUserData}/>
            <ModalChangePassword open={openChangePassword} handleClose={handleCloseChangePassword} user={user}/>
        </>
    )
}

export default UserInfoCard;