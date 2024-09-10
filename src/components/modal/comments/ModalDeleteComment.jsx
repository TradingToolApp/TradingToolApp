import React, { useContext } from 'react';
import { Modal, Button } from 'rsuite';
import { CommentContext } from "@/providers/comment.provider";
import { toast } from 'react-toastify';
import { toastConfig } from "@/lib/constant";
import commentAPI from "@/services/comment-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDelete = ({ modalData, open, handleClose, ...rests }) => {
    const { allDataComment, setAllDataComment } = useContext(CommentContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await commentAPI.deleteComment(modalData);
            if (!response.success) {
                return toast.error(response.message, toastConfig.error);
            }
            const newComments = allDataComment.filter(comment => comment.id !== modalData.id);
            setAllDataComment(newComments);
            handleClose();
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

export default ModalDelete;