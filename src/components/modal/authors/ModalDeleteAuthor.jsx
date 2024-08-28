import React, { useContext } from 'react';
import { Modal, Button, useToaster, Message } from 'rsuite';
import { AuthorContext } from "@/providers/author.provider";
import { toast } from 'react-toastify';
import { toastConfig } from "@/lib/constant";
import authorAPI from "@/services/author-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDeleteAuthor = ({ modalData, open, handleClose, ...rests }) => {
    const toaster = useToaster();
    const { allDataAuthors, setAllDataAuthors } = useContext(AuthorContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await authorAPI.deleteAuthor(modalData);
            if (!response.success) {
                return toast.error(response.message, toastConfig.error);
            }
            const newAuthors = allDataAuthors.filter(author => author.id !== modalData.id);
            setAllDataAuthors(newAuthors);
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

export default ModalDeleteAuthor;