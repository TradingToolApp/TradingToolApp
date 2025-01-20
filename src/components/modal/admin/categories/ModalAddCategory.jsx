import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormCategories from "@/components/form/admin/FormCategories";

const ModalAddCategory = ({open, handleClose}) => {
    return (
        <Modal className="modal-add" open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormCategories handleClose={handleClose} action={ACTION.CREATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddCategory;