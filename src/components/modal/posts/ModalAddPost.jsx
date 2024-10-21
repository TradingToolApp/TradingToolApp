import { Modal } from 'rsuite';
import FormPosts from "@/components/form/FormPosts.tsx";
import { ACTION } from "@/lib/constant";

const ModalAddPost = ({ open, handleClose }) => {
    return (
        <Modal size={"full"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPosts handleClose={handleClose} action={ACTION.CREATE} />
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddPost;