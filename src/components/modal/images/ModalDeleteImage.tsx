import React, { useContext } from 'react';
import {Modal, Button, Message, useToaster} from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
// import { AppContext } from "@/providers/appProvider";
import imageAPI from "@/services/image-api";

interface ModalDeleteImageProps {
    open: boolean;
    handleClose: () => void;
    images: any;
    setImages: any;
    selectedImg: any;
    setSelectedImg: any;
}

const ModalDeleteImage = ( { open, handleClose, images, setImages, selectedImg, setSelectedImg, ...rests }: ModalDeleteImageProps) => {
    const toaster = useToaster();

    const handleConfirmDelete = async () => {
        try {
            const response: any = await imageAPI.deleteImages(selectedImg);

            if (!response.success) {
                toaster.push(<Message type={"error"}>{response.message}</Message>);
                return;
            }

            setImages(images.filter((item: any) => !selectedImg.includes(item.url)));
            setSelectedImg([]);
            handleClose();
        } catch (error) {
            toaster.push(<Message type={"error"}>Error Deleting Images</Message>);
        }
    }

    return (
        <>
            <Modal style={{ marginTop: "150px" }} backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24, marginRight: "15px" }} />
                    Are you sure
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleConfirmDelete} appearance="primary"
                    >
                        Yes
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteImage;