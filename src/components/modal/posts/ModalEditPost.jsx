import { Modal } from 'rsuite';
import FormPosts from "../../form/FormPosts.tsx";
import { ACTION } from "@/lib/constant";

const ModalEditPost = ( { modalData, open, handleClose }) => {
    return (
        <Modal size={"full"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "scroll", overflowX: "hidden"}}>
                <FormPosts formData={modalData} handleClose={handleClose} action={ACTION.UPDATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditPost;