import {Modal} from 'rsuite';
import FormPosts from "@/components/form/admin/FormPosts.tsx";
import {ACTION} from "@/libs/constant";

const ModalAddPost = ({open, handleClose}) => {
    return (
        <Modal size={"full"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Add Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPosts handleClose={handleClose} action={ACTION.CREATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddPost;