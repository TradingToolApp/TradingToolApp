import { useContext } from 'react';
import { Modal, Button} from 'rsuite';
import { AppContext } from "@/providers/app.provider";
import { toast } from 'react-toastify';
import { toastConfig } from "@/lib/constant";
import postAPI from '@/services/posts-api';
import RemindIcon from '@rsuite/icons/legacy/Remind';

const ModalDeletePost = ( { modalData, open, handleClose, ...rests }) => {
    const { allDataPosts, setAllDataPosts } = useContext(AppContext);

    const handleConfirmDelete = async () => {
        try {
            const response = await postAPI.deletePost(modalData);
            if(!response.success) {
                return toast.error(response.message, toastConfig.error);
            }
            const newPosts = allDataPosts.filter(post => post.id !== modalData.id);
            setAllDataPosts(newPosts);
            handleClose();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Modal style={{ marginTop: "150px" }} backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24, marginRight: "15px" }} />
                    Are you sure
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleConfirmDelete} appearance="primary"
                    >
                        Yes
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeletePost;