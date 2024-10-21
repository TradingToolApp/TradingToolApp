import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormAuthors from "@/components/form/FormAuthors";

const ModalUpdateAuthor = ( { modalData, open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Author</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <FormAuthors formData={modalData} handleClose={handleClose} action={ACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateAuthor;