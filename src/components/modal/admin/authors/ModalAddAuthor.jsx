import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormAuthors from "@/components/form/admin/FormAuthors";

const ModalAddAuthor = ({open, handleClose}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormAuthors handleClose={handleClose} action={ACTION.CREATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddAuthor;