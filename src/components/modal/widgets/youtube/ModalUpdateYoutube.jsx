import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormYoutube from "@/components/form/FormYoutube";

const ModalUpdateYoutube = ( { modalData, open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Youtube URL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormYoutube formData={modalData} handleClose={handleClose} action={ACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateYoutube;