import React, { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
// import { AppContext } from "@/providers/appProvider";
import imageAPI from "@/services/image-api";

interface ModalDeleteImageProps {
    setConfirmDelete: (value: boolean) => void;
    open: boolean;
    handleClose: () => void;
}

const ModalDeleteImage = ( { setConfirmDelete, open, handleClose, ...rests }: ModalDeleteImageProps) => {

    const handleConfirmDelete = () => {
        setConfirmDelete(true);
        handleClose();
    }

    const handleCancelDelete = () => {
        setConfirmDelete(false);
        handleClose();
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
                    <Button onClick={handleCancelDelete} appearance="subtle">
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteImage;