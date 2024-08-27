import React, { useContext } from 'react';
import { Modal, Button, useToaster, Message } from 'rsuite';
import { AuthorContext } from "@/providers/authorProvider";
import authorAPI from "@/services/author-api";
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDeleteAuthor = ({ modalData, open, handleClose, ...rests }) => {
    const toaster = useToaster();
    const { authors, setAuthors } = useContext(AuthorContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await authorAPI.deleteAuthor(modalData);
            if (!response.success) {
                return toaster.push(<Message type={"error"}>{response.message}</Message>);
            }
            const newAuthors = authors.filter(author => author.author_slug !== modalData.author_slug);
            setAuthors(newAuthors);
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