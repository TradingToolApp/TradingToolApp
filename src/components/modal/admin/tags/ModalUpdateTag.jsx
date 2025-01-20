import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormTags from "@/components/form/admin/FormTags";

const ModalUpdateTag = ({modalData, open, handleClose}) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormTags formData={modalData} handleClose={handleClose} action={ACTION.UPDATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateTag;