import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormComments from "@/components/form/FormComments";

const ModalUpdateYoutube = ( { modalData, open, handleClose }) => {
    return (
        <Modal size={"50%"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <FormComments formData={modalData} handleClose={handleClose} action={ACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateYoutube;