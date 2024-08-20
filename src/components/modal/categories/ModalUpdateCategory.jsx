import { Modal } from 'rsuite';
import FormCategories from "@/components/form/FormCategories";
import { ACTION } from "@/lib/constant";

const ModalUpdateCategory = ( { modalData, open, handleClose }) => {
    return (
        <Modal size={"50%"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormCategories formData={modalData} handleClose={handleClose} action={ACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateCategory;