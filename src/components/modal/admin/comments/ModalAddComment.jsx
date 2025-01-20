import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormComments from "@/components/form/admin/FormComments";

const ModalAdd = ({open, handleClose}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormComments handleClose={handleClose} action={ACTION.CREATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAdd;