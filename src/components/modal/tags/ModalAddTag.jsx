import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormTags from "@/components/form/FormTags";

const ModalAddTag = ( { open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <FormTags handleClose={handleClose} action={ACTION.CREATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddTag;