import {Modal} from 'rsuite';
import FormPosts from "@/components/form/admin/FormPosts";
import {ACTION} from "@/libs/constant";

const ModalEditPost = ({modalData, open, handleClose}) => {
    return (
        <Modal size={"full"} open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPosts formData={modalData} handleClose={handleClose} action={ACTION.UPDATE}/>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditPost;