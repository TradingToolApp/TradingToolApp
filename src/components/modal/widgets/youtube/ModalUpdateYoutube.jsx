import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormYoutube from "@/components/form/FormYoutube";

const ModalUpdateYoutube = ( { modalData, open, handleClose }) => {
    return (
        <Modal size={"50%"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Youtube URL</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <FormYoutube formData={modalData} handleClose={handleClose} action={ACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateYoutube;