import { Modal } from 'rsuite';
import { ACTION } from "@/lib/constant";
import FormTags from "@/components/form/FormTags";

const ModalUpdateTag = ( { modalData, open, handleClose }) => {
    return (
        <Modal size={"50%"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Update Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <FormTags formData={modalData} handleClose={handleClose} action={ACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateTag;