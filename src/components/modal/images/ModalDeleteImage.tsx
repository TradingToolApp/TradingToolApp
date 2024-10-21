import React from 'react';
import {Modal, Button} from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import {useDeleteImages} from "@/hooks/data/useImages";

interface ModalDeleteImageProps {
    open: boolean;
    handleClose: () => void;
    selectedImg: any;
    setSelectedImg: ([]) => void;
}

const ModalDeleteImage = ( { open, handleClose, selectedImg, setSelectedImg, ...rests }: ModalDeleteImageProps) => {
    const deleteImages = useDeleteImages();
    const [loading, setLoading] = React.useState(false);
    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            const response: any = await deleteImages.mutateAsync(selectedImg);

            if (response.success) {
                setSelectedImg([]);
                handleClose();
            }
            setLoading(false);
        } catch (error: any) {
            console.log(error)
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
                        onClick={handleConfirmDelete} appearance="primary" disabled={loading}
                    >
                        Yes
                    </Button>
                    <Button onClick={handleClose} appearance="subtle" disabled={loading}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteImage;