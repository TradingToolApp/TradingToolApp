import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import { useDeleteComment } from "@/hooks/data/useComments";

const ModalDelete = ({ modalData, open, handleClose, ...rests }) => {
const deleteComment = useDeleteComment();
const [loading, setLoading] = useState(false);
    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            const response = await deleteComment.mutateAsync(modalData);
            if (response.success) {
                handleClose();
            }
            setLoading(false);
        } catch (error) {
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

export default ModalDelete;