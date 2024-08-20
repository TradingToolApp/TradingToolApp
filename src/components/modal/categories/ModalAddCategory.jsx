import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormCategories from "@/components/form/FormCategories";

const ModalAddCategory = ( { open, handleClose }) => {
    return (
        <Modal size={"50%"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormCategories handleClose={handleClose} action={ACTION.CREATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddCategory;