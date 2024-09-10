import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormComments from "@/components/form/FormComments";

const ModalAdd = ( { open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <FormComments handleClose={handleClose} action={ACTION.CREATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalAdd;