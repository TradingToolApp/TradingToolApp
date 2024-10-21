import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormYoutube from "@/components/form/FormYoutube";

const ModalAdd = ( { open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Youtube URL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormYoutube handleClose={handleClose} action={ACTION.CREATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalAdd;