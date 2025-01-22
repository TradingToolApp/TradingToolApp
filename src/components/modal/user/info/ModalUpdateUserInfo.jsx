import {Modal} from 'rsuite';
import {ACTION} from "@/libs/constant";
import FormUserInfo from "@/components/form/user/FormUserInfo";

const ModalUpdateUserInfo = ({modalData, open, handleClose}) => {
    return (
        <Modal size="xs" open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormUserInfo formData={modalData} handleClose={handleClose} action={ACTION.UPDATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateUserInfo;